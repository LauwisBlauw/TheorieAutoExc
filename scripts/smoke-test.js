const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);

if (!scriptMatch) {
  throw new Error("No inline script found in index.html");
}

const app = { innerHTML: "" };
const warnings = [];
let intervalId = 0;

const documentElement = {
  attributes: {},
  setAttribute: function (name, value) { this.attributes[name] = value; },
  removeAttribute: function (name) { delete this.attributes[name]; },
  getAttribute: function (name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null;
  }
};

global.window = {
  localStorage: {
    getItem: function () { return null; },
    setItem: function () {}
  },
  scrollTo: function () {},
  setTimeout: function (fn) { return fn ? 0 : 0; },
  console: {
    warn: function () {
      warnings.push(Array.prototype.slice.call(arguments));
    }
  }
};

global.console = global.window.console;
global.document = {
  documentElement: documentElement,
  getElementById: function () { return app; },
  querySelector: function () { return null; },
  addEventListener: function () {},
  createElement: function () {
    return {
      click: function () {},
      remove: function () {}
    };
  },
  body: {
    appendChild: function () {}
  }
};
global.URL = {
  createObjectURL: function () { return "blob:test"; },
  revokeObjectURL: function () {}
};
global.Blob = function Blob() {};
global.setInterval = function () {
  intervalId += 1;
  return intervalId;
};
global.clearInterval = function () {};

const assertions = `
  if (!app.innerHTML.includes("Rijbewijs B oefenexamen")) {
    throw new Error("Intro did not render");
  }

  startPractice("normal");
  if (state.phase !== "practice" || state.variant !== "normal" || state.sessionQuestions.length !== 0) {
    throw new Error("Practice reset failed");
  }

  startExam("mix");
  if (state.phase !== "exam" || state.mode !== "exam" || state.variant !== "mix") {
    throw new Error("Mix exam state failed");
  }
  if (state.sessionQuestions.length !== sessionQuestionCount()) {
    throw new Error("Mix exam question count failed");
  }
  if (state.sessionQuestions.filter(function (q) { return q.counts !== false; }).length !== EXAM_CONFIG.scoredQuestionCount) {
    throw new Error("Mix scored question count failed");
  }
  if (state.sessionQuestions.filter(function (q) { return q.counts === false; }).length !== EXAM_CONFIG.testQuestionCount) {
    throw new Error("Mix test question count failed");
  }
  if (state.remaining !== EXAM_CONFIG.durationSeconds) {
    throw new Error("Timer reset failed");
  }

  // Elke variant hoort een sessie van vaste lengte te leveren, ongeacht hoe groot
  // de bank eronder wordt. Dit ging eerder mis: normaal en moeilijk gaven hun hele
  // bank terug, wat pas opviel toen de normale bank tot boven een sessie groeide.
  ["normal", "hard", "mix"].forEach(function (variant) {
    var sessie = buildExamQuestions(variant);
    if (sessie.length !== sessionQuestionCount()) {
      throw new Error("Variant " + variant + " levert " + sessie.length + " vragen in plaats van " + sessionQuestionCount());
    }
    var meetellend = sessie.filter(function (q) { return q.counts !== false; }).length;
    var test = sessie.filter(function (q) { return q.counts === false; }).length;
    if (meetellend !== EXAM_CONFIG.scoredQuestionCount) {
      throw new Error("Variant " + variant + " heeft " + meetellend + " meetellende vragen");
    }
    if (test !== EXAM_CONFIG.testQuestionCount) {
      throw new Error("Variant " + variant + " heeft " + test + " testvragen");
    }
    var ids = sessie.map(function (q) { return q.id; });
    if (new Set(ids).size !== ids.length) {
      throw new Error("Variant " + variant + " zet dezelfde vraag twee keer in een sessie");
    }
  });

  // De examentimer rekent terug vanaf een eindtijdstip in plaats van tikken te
  // tellen, zodat een afgeknepen achtergrondtab geen gratis tijd oplevert.
  startExam("normal");
  if (typeof state.deadline !== "number") {
    throw new Error("Timer zet geen eindtijdstip");
  }
  state.deadline = Date.now() + 90 * 1000;
  tickExamTimer();
  if (state.remaining < 88 || state.remaining > 92) {
    throw new Error("Timer rekent niet terug vanaf de klok: " + state.remaining);
  }

  // Een sleepvraag krijgt zijn beginvolgorde bij het tekenen; die telt niet als
  // antwoord zolang de kandidaat niets heeft verschoven.
  startExam("normal");
  var slepen = state.sessionQuestions.filter(function (q) { return q.kind === "order"; })[0];
  if (slepen) {
    state.index = state.sessionQuestions.indexOf(slepen);
    render();
    if (hasAnswer(slepen, state.answers)) {
      throw new Error("Onaangeraakte sleepvraag telt al als beantwoord");
    }
    if (answerToText(slepen, state.answers[slepen.id]) === correctToText(slepen)) {
      throw new Error("Beginvolgorde is gelijk aan het juiste antwoord");
    }
    moveOrder(slepen.id, -1, 1);
    if (!hasAnswer(slepen, state.answers)) {
      throw new Error("Sleepvraag telt na een verplaatsing nog niet als beantwoord");
    }
    if (correctToText(slepen) === "Geen antwoord") {
      throw new Error("Het juiste antwoord van een sleepvraag wordt niet meer getoond");
    }
  }

  startTraining("hard");
  if (state.phase !== "exam" || state.mode !== "training" || state.variant !== "hard") {
    throw new Error("Training state failed");
  }
  if (state.sessionQuestions.length !== sessionQuestionCount()) {
    throw new Error("Hard training question count failed");
  }

  function firstOfKind(kind) {
    var match = state.sessionQuestions.filter(function (q) { return q.kind === kind; })[0];
    if (!match) throw new Error("No " + kind + " question in session");
    state.index = state.sessionQuestions.indexOf(match);
    return match;
  }

  // --- Directe feedback ---

  if (state.instantFeedback !== true) {
    throw new Error("Instant feedback should default to on");
  }

  state.instantFeedback = true;
  startExam("normal");
  var single = firstOfKind("single");
  var wrong = single.options.filter(function (o) { return o.id !== single.correct; })[0];
  setAnswer(single.id, wrong.id);
  if (!isRevealed(single)) {
    throw new Error("A single-choice answer should be checked immediately in exam mode");
  }
  if (!answerLocked(single)) {
    throw new Error("A checked answer should be locked");
  }
  if (app.innerHTML.indexOf("Juiste antwoord") < 0) {
    throw new Error("Feedback should name the correct answer after a wrong pick");
  }
  if (app.innerHTML.indexOf("is-correct") < 0 || app.innerHTML.indexOf("is-wrong") < 0) {
    throw new Error("Options should be marked correct and wrong after checking");
  }

  var other = single.options.filter(function (o) { return o.id !== wrong.id; })[0];
  setAnswer(single.id, other.id);
  if (state.answers[single.id] !== wrong.id) {
    throw new Error("A locked answer must not change");
  }

  // Vraagsoorten met meerdere handelingen wachten op "Controleer antwoord".
  startExam("normal");
  var multi = firstOfKind("multi");
  toggleMulti(multi.id, multi.options[0].id);
  if (isRevealed(multi)) {
    throw new Error("A multiple-response answer should not check itself");
  }
  revealCurrentAnswer();
  if (!isRevealed(multi) || !answerLocked(multi)) {
    throw new Error("Check button should reveal and lock the answer");
  }

  // Met de instelling uit blijft het examen een echt examen.
  state.instantFeedback = false;
  startExam("normal");
  var quiet = firstOfKind("single");
  setAnswer(quiet.id, quiet.correct);
  if (isRevealed(quiet) || answerLocked(quiet)) {
    throw new Error("No instant feedback when the setting is off");
  }
  if (app.innerHTML.indexOf("feedback-card") >= 0) {
    throw new Error("No feedback card should render when the setting is off");
  }

  // Oefenvragen en leerstand leggen altijd meteen uit, ongeacht de instelling.
  startTraining("normal");
  var learn = firstOfKind("single");
  setAnswer(learn.id, learn.correct);
  if (!isRevealed(learn)) {
    throw new Error("Training mode must always explain immediately");
  }

  state.instantFeedback = true;

  // Scoren mag niet veranderen door het tonen van feedback.
  startExam("normal");
  state.sessionQuestions.forEach(function (q) {
    if (q.kind === "single") state.answers[q.id] = q.correct;
  });
  var score = scoreExam();
  if (score.correct !== state.sessionQuestions.filter(function (q) {
    return q.counts !== false && q.kind === "single";
  }).length) {
    throw new Error("Scoring changed unexpectedly");
  }

  // --- Foto's bij vragen ---

  var allQuestions = practiceQuestions
    .concat(examQuestions, hardExamQuestions, extraExamQuestions);

  // De blauwe parkeerzonefoto mag niet terugkeren bij vragen over de 30 km/u-zone
  // of over het ronde blauwe fietsbord: die tonen een heel ander bord.
  allQuestions.forEach(function (q) {
    if (q.scene !== "signs") return;
    if (/30-zone|blauw bord/i.test(q.prompt)) {
      throw new Error(q.id + ": bordvraag staat op de parkeerzonefoto");
    }
  });

  // Een bijschrift mag de vraagtekst niet tegenspreken.
  allQuestions.forEach(function (q) {
    if (q.scene === "motorway" && /niet op een autosnelweg/i.test(q.prompt)) {
      throw new Error(q.id + ": snelwegfoto bij een vraag die de snelweg uitsluit");
    }
    // Het mistachterlicht mag wel bij mist en niet bij regen. Staat de mistfoto
    // boven een regenvraag daarover, dan bevestigt het beeld juist de afleider.
    if (q.scene === "weather" && /regen/i.test(q.prompt) && /mistachterlicht/i.test(q.prompt)) {
      throw new Error(q.id + ": mistfoto bij een regenvraag over het mistachterlicht");
    }
    if (q.scene === "city" && /buiten de bebouwde kom/i.test(q.prompt)) {
      throw new Error(q.id + ": stadsfoto bij een vraag buiten de bebouwde kom");
    }
  });

  // Alle hotspotbeelden hebben dezelfde verhouding, zodat de stippen kloppen.
  allQuestions.forEach(function (q) {
    if (q.kind !== "hotspot") return;
    if (!q.image) {
      throw new Error(q.id + ": hotspotvraag zonder eigen afbeelding");
    }
    q.hotspots.forEach(function (spot) {
      if (spot.x < 3 || spot.x > 97 || spot.y < 3 || spot.y > 97) {
        throw new Error(q.id + ": hotspot " + spot.id + " ligt te dicht op de rand");
      }
    });
  });

  startExam("normal");
  var noPhoto = state.sessionQuestions.filter(function (q) { return q.scene === "none"; })[0];
  if (noPhoto) {
    state.index = state.sessionQuestions.indexOf(noPhoto);
    render();
    if (app.innerHTML.indexOf("no-visual") < 0) {
      throw new Error("Vraag zonder foto moet de volle breedte krijgen");
    }
    if (app.innerHTML.indexOf("scene-photo") >= 0) {
      throw new Error("Vraag met scene 'none' mag geen foto tonen");
    }
  }

  var spot = state.sessionQuestions.filter(function (q) { return q.kind === "hotspot"; })[0];
  if (spot) {
    state.index = state.sessionQuestions.indexOf(spot);
    render();
    if (app.innerHTML.indexOf("hotspot-scene") < 0) {
      throw new Error("Hotspotvraag mist de klasse die de beeldverhouding vastzet");
    }
  }

  // --- Thema ---

  if (state.theme !== "system") {
    throw new Error("Theme should start on system");
  }
  cycleTheme();
  if (state.theme !== "light" || document.documentElement.getAttribute("data-theme") !== "light") {
    throw new Error("Theme toggle should switch to light");
  }
  cycleTheme();
  if (state.theme !== "dark" || document.documentElement.getAttribute("data-theme") !== "dark") {
    throw new Error("Theme toggle should switch to dark");
  }
  cycleTheme();
  if (state.theme !== "system" || document.documentElement.getAttribute("data-theme") !== null) {
    throw new Error("Theme toggle should return to system");
  }
`;

new Function(scriptMatch[1] + assertions)();

if (warnings.length) {
  process.stderr.write("Question-bank warnings:\n" + JSON.stringify(warnings, null, 2) + "\n");
  process.exit(1);
}

process.stdout.write("Smoke test passed\n");
