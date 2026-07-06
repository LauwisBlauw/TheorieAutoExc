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

global.window = {
  localStorage: {
    getItem: function () { return null; },
    setItem: function () {}
  },
  scrollTo: function () {},
  console: {
    warn: function () {
      warnings.push(Array.prototype.slice.call(arguments));
    }
  }
};

global.console = global.window.console;
global.document = {
  getElementById: function () { return app; },
  querySelector: function () { return null; },
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

  startTraining("hard");
  if (state.phase !== "exam" || state.mode !== "training" || state.variant !== "hard") {
    throw new Error("Training state failed");
  }
  if (state.sessionQuestions.length !== sessionQuestionCount()) {
    throw new Error("Hard training question count failed");
  }
`;

new Function(scriptMatch[1] + assertions)();

if (warnings.length) {
  process.stderr.write("Question-bank warnings:\n" + JSON.stringify(warnings, null, 2) + "\n");
  process.exit(1);
}

process.stdout.write("Smoke test passed\n");
