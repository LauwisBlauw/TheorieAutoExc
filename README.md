# Auto Theorie B Oefenexamen

Een zelfstandige Nederlandse oefenquiz voor rijbewijs B, gebaseerd op de actuele CBR-opzet zoals gecontroleerd op 6 juli 2026.

Open `index.html` in je browser om te oefenen.

## Inhoud

- 2 oefenvragen om de bediening te leren.
- 52 examenvragen, waarvan 50 meetellen en 2 testvragen niet meetellen.
- Normale variant, moeilijke variant en willekeurige mix.
- 156 vragen in de totale vragenbank.
- Timer van 30 minuten.
- Slaaggrens van 44 goed op 50 meetellende vragen.
- Vraagsoorten: meerkeuze, ja/nee-achtige meerkeuze, multiple response, invulvraag, hotspotvraag en sleepvraag-simulatie.
- Echte foto-assets per verkeerssituatie, lokaal opgeslagen in `assets/images`.
- AI-gegenereerde situatiebeelden voor visuele hotspotvragen, lokaal opgeslagen in `assets/generated`.
- Moeilijkheidslabel per vraag: makkelijk, gemiddeld of moeilijk.
- Leerstand met directe uitleg tijdens het oefenen.
- Meldknop per vraag; meldingen worden lokaal opgeslagen en kunnen als JSON worden gedownload.
- Uitslag met uitleg per vraag.
- Android-vriendelijke bediening met grote knoppen, foto boven de vraag en sticky navigatie op kleine schermen.

## Variatie

Elke examensessie schudt de vraagvolgorde. Bij meerkeuze en multiple-response worden ook de antwoordopties per sessie geschud. Sleepvragen beginnen met een wisselende volgorde.

De moeilijke variant gebruikt een aparte set van 52 vragen. Deze vragen zijn strenger geformuleerd en bevatten meer strikvragen, samengestelde voorrangssituaties, matrixbord-vragen, bijzondere manoeuvres en meerdere-antwoorden-vragen.

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

De basisfoto's staan lokaal in `assets/images` en komen van Wikimedia Commons:

- `motorway.jpg`: Traffic jam in the Netherlands, Petra de Boevere, CC BY 2.0.
- `city.jpg`: Hauptstrassenradweg in Amsterdam, W.-D. Haberland, CC BY-SA 4.0.
- `intersection.jpg`: Road crossing Amsterdamseweg/Schelmseweg, Henk Monster, CC BY 3.0.
- `residential.jpg`: Woonerf De Mient, Historisch Archief Haarlemmermeer, CC0.
- `parking.jpg`: 20200925 parking lined perpendicular, Jeroen Hoek, CC0.
- `dashboard.jpg`: Dash Mazda 3, John W/dcJohn, CC BY 2.0.
- `weather.jpg`: A12 mist, M.Minderhoud/Michiel1972, CC BY-SA 3.0 or GFDL.
- `signs.jpg`: Parking zone 30 sign, Rotterdam, Donald Trung Quoc Don, CC BY-SA 4.0.
- `rail.jpg`: HALI Amsterdam Houtrakpolder, Pbech, CC0.

De hotspotvragen gebruiken daarnaast zelf gegenereerde oefenbeelden in `assets/generated`:

- `p2-child-ball.jpg`: woonstraat met kind en bal tussen geparkeerde auto's.
- `residential-30zone-child.jpg`: 30-zone met kind tussen geparkeerde auto's.
- `motorway-hard-shoulder.jpg`: autosnelweg met vluchtstrook rechts.
- `motorway-blind-spot.jpg`: rijstrookwisseling met rechter dode hoek.
- `intersection-shark-teeth.jpg`: kruispunt met haaientanden.
- `intersection-cross-traffic.jpg`: kruispuntgebied met kruisend verkeer.

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
