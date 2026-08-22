# Auto Theorie B Oefenexamen

Een zelfstandige Nederlandse oefenquiz voor rijbewijs B, gebaseerd op de actuele CBR-opzet zoals gecontroleerd op 6 juli 2026.

Open `index.html` in je browser om te oefenen.

## Inhoud

- 2 oefenvragen om de bediening te leren.
- 52 examenvragen, waarvan 50 meetellen en 2 testvragen niet meetellen.
- Normale variant, moeilijke variant en willekeurige mix.
- 255 vragen in de totale vragenbank, plus 2 oefenvragen om de bediening te leren.
- Timer van 30 minuten.
- Slaaggrens van 44 goed op 50 meetellende vragen.
- Vraagsoorten: meerkeuze, ja/nee-achtige meerkeuze, multiple response, invulvraag, hotspotvraag en sleepvraag-simulatie.
- Echte foto-assets per verkeerssituatie, lokaal opgeslagen in `assets/images`.
- AI-gegenereerde situatiebeelden voor visuele hotspotvragen, lokaal opgeslagen in `assets/generated`.
- Moeilijkheidslabel per vraag: makkelijk, gemiddeld of moeilijk.
- Directe uitleg na elk antwoord: je ziet meteen welk antwoord fout was en welk antwoord goed is, met uitleg erbij. Dit staat standaard aan en is uit te zetten op het startscherm, zodat je ook een echte examenronde zonder tussentijdse uitleg kunt draaien.
- Leerstand zonder timer, met altijd directe uitleg.
- Meldknop per vraag; meldingen worden lokaal opgeslagen en kunnen als JSON worden gedownload.
- Uitslag met uitleg per vraag.
- Licht en donker thema, standaard volgens je systeeminstelling en handmatig om te schakelen.
- Android-vriendelijke bediening met grote knoppen, foto boven de vraag en sticky navigatie op kleine schermen.

## Directe uitleg

Bij meerkeuze- en hotspotvragen is een klik meteen je definitieve antwoord: de uitleg verschijnt direct. Bij multiple response, sleepvragen en invulvragen bepaal je zelf wanneer je klaar bent met de knop "Controleer antwoord".

Zodra een vraag is nagekeken, ligt het antwoord vast. Je kunt het niet meer aanpassen nadat je het juiste antwoord hebt gezien, zodat je score blijft kloppen. In de antwoordlijst wordt het juiste antwoord groen gemarkeerd en je eigen foute keuze rood.

## Toegankelijkheid

- Antwoordopties gebruiken echte radiogroup- en checkbox-rollen, zodat schermlezers de keuzes correct aankondigen.
- Na elk nagekeken antwoord wordt goed/fout, het juiste antwoord en de uitleg voorgelezen via een live region.
- Zichtbare focusranden op alles wat bedienbaar is, plus een skip-link naar de inhoud.
- Sneltoetsen: A tot en met F kiezen een antwoordoptie, pijltjes links en rechts bladeren door de vragen.
- Bij het wisselen van vraag springt de focus naar de vraagtekst.
- Voortgangsbalk met `progressbar`-rol en beschrijvende labels op de knoppen in het vraagoverzicht.
- Respecteert `prefers-reduced-motion` en `prefers-color-scheme`.

## Variatie

Elke examensessie schudt de vraagvolgorde. Bij meerkeuze en multiple-response worden ook de antwoordopties per sessie geschud. Sleepvragen beginnen met een wisselende volgorde.

De normale variant put uit 100 meetellende vragen, waarvan er per sessie 50 worden getrokken. Twee sessies achter elkaar leveren dus verschillende vragen op.

De moeilijke variant gebruikt een aparte set van 58 vragen. Deze vragen zijn strenger geformuleerd en bevatten meer strikvragen, samengestelde voorrangssituaties, matrixbord-vragen, bijzondere manoeuvres en meerdere-antwoorden-vragen.

De willekeurige mix trekt elke keer 52 vragen uit de normale, moeilijke en extra vragenbank samen. Ook in deze modus tellen 50 vragen mee, zijn 2 vragen testvragen, en is 44 goed geslaagd.

## Belangrijk

Dit is geen officieel CBR-materiaal. De vragen zijn origineel gemaakt om te oefenen met de onderwerpen, vraagvormen en verkeersregels. De echte CBR-vragen zijn anders en kunnen wijzigen.

## Codecontrole

Controleer na code- of vraagbankwijzigingen of de app nog start en de vragenbank intern klopt:

```sh
node scripts/smoke-test.js
```

## Bronnen en betrouwbaarheid

De inhoud is gecontroleerd op 6 juli 2026. De quiz gebruikt meerdere openbare bronnen:

- CBR-bronnen voor de examenopzet, vraagsoorten, onderwerpen, slaaggrens en voorbeeldvraagstijl.
- RVV 1990 en Rijksoverheid/Rijkswaterstaat-bronnen voor verkeersregels, verkeerstekens en maximumsnelheden.
- Politie-bronnen voor situaties met voorrangsvoertuigen en noodsignalen.
- RDW-bronnen voor voertuigkennis, APK, banden, verlichting en technische staat.
- SWOV, Veilig Verkeer Nederland en ANWB voor verkeersveiligheid, risico-inschatting en begrijpelijke uitleg van praktijksituaties.
- TheorieToppers als aanvullende commerciële oefen- en vergelijkingsbron voor uitleg over examenaanpak, borden en praktijksituaties.

Antwoorden zijn met deze bronnen gespiegeld, maar blijven oefenmateriaal. Bij twijfel geldt altijd de actuele officiële bron of de instructie van een erkende rijschool.

## Afbeeldingen

### Sfeerfoto's van Wikimedia Commons

Deze elf foto's in `assets/images` komen van Wikimedia Commons en staan hier met hun licentie:

- `motorway.jpg`: Traffic jam in the Netherlands, Petra de Boevere, CC BY 2.0.
- `city.jpg`: Hauptstrassenradweg in Amsterdam, W.-D. Haberland, CC BY-SA 4.0.
- `intersection.jpg`: Road crossing Amsterdamseweg/Schelmseweg, Henk Monster, CC BY 3.0.
- `residential.jpg`: Woonerf De Mient, Historisch Archief Haarlemmermeer, CC0.
- `parking.jpg`: 20200925 parking lined perpendicular, Jeroen Hoek, CC0.
- `dashboard.jpg`: Dash Mazda 3, John W/dcJohn, CC BY 2.0.
- `weather.jpg`: A12 mist, M.Minderhoud/Michiel1972, CC BY-SA 3.0 or GFDL.
- `signs.jpg`: Parking zone 30 sign, Rotterdam, Donald Trung Quoc Don, CC BY-SA 4.0. Let op: dit is een blauw *parkeer*zonebord, geen snelheidsbord. Het wordt daarom alleen gebruikt bij vragen over onderborden, niet bij vragen over de 30 km/u-zone.
- `rail.jpg`: HALI Amsterdam Houtrakpolder, Pbech, CC0.
- `haaientanden-kruispunt.jpg`: Haaientanden (verkeer), Delft Tanthof, M.Minderhoud, CC BY-SA 3.0. Gebruikt bij h54, waar de punten van de haaientanden naar de kijker wijzen.
- `rotonde-haaientanden-bord.jpg`: Oldenzaal, Denekamperstraat, Frans-Banja Mulder, CC BY 3.0. Gebruikt bij q35: nadering van een rotonde met bord B6, bord D1 en haaientanden.

### Situatiebeelden van derden, licentie niet geregeld

Let op: de licenties hierboven gelden **alleen** voor die elf bestanden. In `assets/images` staan
daarnaast zestien situatierenders die afkomstig zijn van Nederlandse commerciele theorie-aanbieders. Drie
daarvan dragen een zichtbaar merk van de maker:

- `1651240037-tt-36-watermerk-concept-01.webp`: watermerk "THEORIE TOPPERS" over het hele beeld.
- `BP02_Auto_V1.png`: copyrightvermelding "(c) Theorie.nl" linksonder.
- `19-20SEPPPT12.jpg`: lesauto met TSH-logo en kenteken 12-TSH-1.

De overige tien zijn dezelfde soort renders in dezelfde stijl: `1648562081-bestand-20-kopie.webp`,
`1651240230-tt-24-182.webp`, `1652716426-bestand-8-tram.webp`,
`69fb20c070a96d525530e0fe_3176a336.png.webp`, `BM19_Auto_V1.png`, `BP11_Auto_V1.png`,
`Motor-63a54e0cd13a4288.jpg`, `a.jpg`, `militaire-colonne-voorrangskruispunt.jpg`,
`voorrang-rechtdoorgaand-jpg.jpg`, `Auto-73f981a7b5c39ca2.webp`, `voetganger-van-rechts-1.jpg` en
`kruispunt-linksaf-bromfiets-voetganger.jpg`. Die laatste is een schermafdruk die tot 1600 pixels breed is
teruggebracht; als PNG woog hij 5,5 MB.

Voor geen van deze zestien is toestemming of een licentie vastgelegd. Ze worden gebruikt door de vragen
q9, e15, e54, e58, e59, e60, e61, e65, e66, e67, e68, e82, e83, e84, e85 en h55. Wie deze repository hergebruikt of
publiceert, moet dit eerst oplossen: vervangen door eigen beeld, of alsnog toestemming regelen. De overige
238 vragen raken deze bestanden niet.

### Zelf gegenereerde hotspotbeelden

De hotspotvragen gebruiken zelf gegenereerde oefenbeelden in `assets/generated`:

- `p2-child-ball.jpg`: woonstraat met kind en bal tussen geparkeerde auto's.
- `residential-30zone-child.jpg`: 30-zone met kind tussen geparkeerde auto's.
- `motorway-hard-shoulder.jpg`: autosnelweg met vluchtstrook rechts.
- `motorway-blind-spot.jpg`: rijstrookwisseling met rechter dode hoek.
- `intersection-shark-teeth.jpg`: kruispunt met haaientanden.
- `intersection-cross-traffic.jpg`: kruispuntgebied met kruisend verkeer.

Alle beelden in `assets/generated` zijn 1586x992. De hotspotstippen zijn percentages van hun container, dus die container krijgt via `.hotspot-scene` exact dezelfde verhouding. Zonder dat zou `object-fit: cover` de foto bijsnijden en zouden de stippen per schermbreedte verschuiven ten opzichte van wat ze aanwijzen.

## Foto's bij vragen

Met negen sfeerfoto's voor het merendeel van de vragen zijn die foto's bewust illustratief, niet letterlijk. Eén regel geldt wel hard: het zichtbare bijschrift mag de vraagtekst niet tegenspreken en de kandidaat niet naar een fout antwoord duwen.

Vragen waarbij geen van de beschikbare foto's past, krijgen `scene: "none"` en worden zonder beeld getoond over de volle breedte. Dat is beter dan een bijschrift dat de vraag onderuithaalt: bij een vraag over een autoweg is "Autosnelweg met meerdere rijstroken" niet neutraal maar misleidend.

De smoke test bewaakt deze regel voor de gevallen die eerder misgingen.

Voor situatievragen waarbij het om de verkeerssituatie zelf gaat, staan in `assets/diagrams` zelfgetekende
SVG-schema's met een bovenaanzicht. Een foto voldoet daar niet: elk Nederlands tramkruispunt op foto heeft
verkeerslichten, en die spreken een vraag over een gelijkwaardig kruispunt tegen.

- `kruispunt-tram-gelijkwaardig.svg`: gelijkwaardig kruispunt zonder borden of lichten, met een genummerde
  tram, tegenligger en eigen auto.
- `kruispunt-tram-linksaf.svg`: hetzelfde kruispunt, maar nu slaat de eigen auto linksaf en kruist daarbij
  zowel de trambaan als het pad van de tegenligger, zodat de volgorde eenduidig vastligt.
- `kruispunt-tram-haaientanden.svg`: kruispunt waar de voorrang wel geregeld is. De eigen auto rijdt op de
  voorrangsweg en op de kruisende weg liggen haaientanden, ook voor de tram.
- `kruispunt-tram-voorrangsvoertuig.svg`: gelijkwaardig kruispunt met een ambulance met blauw zwaailicht en
  sirene, die iedereen voorgaat, de tram inbegrepen.
- `kruispunt-colonne-gelijkwaardig.svg`: militaire colonne van rechts, met de blauwe vlag voorop en de groene
  vlag achteraan, en een gemarkeerd gat tussen twee voertuigen.
- `kruispunt-voorrangsvoertuig-voorrangsweg.svg`: eigen auto op de voorrangsweg, ambulance en gewone auto op
  de kruisende weg met haaientanden.
- `kruispunt-tram-links-tegenligger-linksaf.svg`: tram van links, eigen auto rechtdoor, tegenligger die
  linksaf slaat en daarbij zowel de trambaan als het eigen pad kruist.
- `kruispunt-rechtsaf-fietser-auto-links.svg`: eigen auto slaat rechtsaf over een fietspad, fietser rechtdoor
  ernaast, auto van links.

Bij een volgordevraag moet elke stap afgedwongen zijn, anders zijn er meerdere goede antwoorden. Twee
weggebruikers die elkaars pad niet kruisen leggen niets vast; daarom kruist in elk van deze schema's elke
volgende weggebruiker het pad van de vorige.

De waarschuwingslampjes op het dashboard zijn PNG-symbolen in `assets/images`, gebruikt door e86 tot en
met e91: `1037_olie_rood.png`, `1038_Remmen_rood.png`, `1031_accu_rood.png`, `1035_koeling_rood.png`,
`1036_motor_geel.png` en `bandenspanning-waarschuwingslampje.png`. Daarnaast hoort `airbag-waarschuwingslampje.png` bij e92. Ook voor deze zeven symbolen is geen herkomst
of licentie vastgelegd; ze vallen in dezelfde categorie als de situatierenders hierboven.

Elk symbool is 86 bij 85 pixels. Uitrekken over de volle paneelbreedte zou ze wazig maken, dus `.symbol-scene`
zet ze op 128 pixels gecentreerd op een donker paneel dat een instrumentenpaneel nabootst. De eerder
zelfgetekende `warning-*.svg` zijn hiermee vervallen en uit `assets/diagrams` verwijderd; ze staan nog wel
in de git-historie.

Gebaseerd op openbare bronnen:

- https://www.cbr.nl/nl/rijbewijs-halen/auto/theorie-examen-auto/hoe-gaat-het-theorie-examen-auto
- https://www.cbr.nl/nl/rijbewijs-halen/auto/theorie-examen-auto/soort-vragen-tijdens-theorie
- https://www.cbr.nl/nl/rijbewijs-halen/auto/theorie-examen-auto/onderwerpen-in-het-theorie-examen
- https://www.cbr.nl/nl/voor-rijscholen/nl/inhoud-theorie-examen-auto-motor-en-bromfiets
- https://www.cbr.nl/nl/over-het-cbr/over/laatste-nieuws/nieuws/leren-en-oefenen-voorbeeldvragen-theorie-examen-auto-1
- https://wetten.overheid.nl/BWBR0004825/
- https://www.rijksoverheid.nl/onderwerpen/verkeersveiligheid
- https://www.rijkswaterstaat.nl/wegen/wetten-regels-en-vergunningen/verkeerswetten
- https://www.politie.nl/informatie/wat-u-moet-doen-als-een-politievoertuig-zwaailichten-en-sirene-gebruikt.html
- https://www.rdw.nl/particulier/voertuigen/auto/apk
- https://swov.nl/nl/factsheet/riskant-verkeersgedrag-verkeersagressie-en-veelplegers
- https://swov.nl/nl/factsheet/advanced-driver-assistance-systems-adas
- https://verkeersregels.vvn.nl/
- https://www.anwb.nl/verkeer/veiligheid/verkeersregels
- https://www.anwb.nl/verkeer/nederland/verkeersinformatie/verkeersborden-nederland
- https://www.anwb.nl/verkeer/veiligheid/verkeersregels/voorrang
- https://www.anwb.nl/verkeer/veiligheid/verkeersregels/snelheid
- https://www.anwb.nl/auto/onderhoud-en-reparatie/apk/wat-is-een-apk-keuring
- https://www.theorietoppers.nl/theorie-examen-oefenen/auto
- https://www.theorietoppers.nl/blog/vernieuwde-cbr-theorie-examen-7-april-2025
- https://www.theorietoppers.nl/verkeersborden
- https://www.theorietoppers.nl/blog/invoegen-en-uitvoegen-snelweg
- https://www.theorietoppers.nl/blog/woonerf-snelheid-voorrang-en-parkeren-uitgelegd
