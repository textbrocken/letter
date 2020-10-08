# Professionelle Briefe per YAML-Konfiguration

Erzeugt PDF-Dateien aus YAML-Dateien. Zum Beispiel [dieses PDF](./examples/text.pdf) aus [jenem YAML](./examples/text.yml).

Orientiert sich lose an der DIN-Norm 5008.

## Ausführen

npx @textbrocken/letter -i brief.yml

## YAML

### YAML-Hauptfelder

| YAML-Feld     | Typ | Beschreibung           |
| ------------- |--- | ------------- |
| header      | String | Text über dem Adressfeld |
| sender      | String| Zeile über dem Adressaten      |
| address | String| Adressfeld      |
| subject | String| Betreff      |
| body | String| Eigentlicher Brieftext      |
| salutation     | [String, String] | [Hochachtungsvoll, Max Mustermann] |

### YAML-Metadaten

| YAML-Feld     | Typ | Beschreibung | Default |
| ------------- | --- | ------------ | ------- |
| meta.date | String | Datum | Heute |
| meta.pagenums | Boolean | Seitennummern | false |
| meta.punchingMark | Boolean | Lochmarke  | false |
| meta.foldingMarks | Boolean | Faltmarken | false |
| meta.justifyBody | Boolean | Blocksatz | false |
| meta.hyphenate | Boolean | Silbentrennung | true |
| meta.fixTypesetting | Boolean | Typographische Behandlung von Bindestrichen, Anführungszeichen etc. | true |
| meta.largeFont | Boolean | große Schrift | false |

## CLI-Optionen

| Option     | Beschreibung  |
| ---------- | ------------- |
| -i, --input | Input YAML file (alternatively: pass YAML via stdin) |
| -o, --output | Output PDF file (defaults to input yaml file name with .pdf extension) |
| -v, --verbose | Log verbosely (default false) |
| -q, --quiet | Log nothing (default false) |
| -a, --auto-open | Open PDF file in PDF viewer (default true) |
