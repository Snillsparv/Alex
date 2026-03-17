# Alex – Rutnätsminne

En snygg, mobilanpassad och offline-kompatibel webbapp för minnesträning på ett 6x6-rutnät.

## Funktioner
- 60 sekunders memoreringsfas.
- Två stora lägesknappar:
  - 2 färger: 12 gula + 12 lila rutor.
  - 3 färger: 9 gula + 9 lila + 9 blå rutor.
- Återkallning med färgpalett: välj färg längst ner och klicka i rutor (ingen flerklick-växling).
- Stor timer och tydligare UI för mobil.
- Service worker + manifest för offlinekörning på telefon.

## Kör lokalt
```bash
python3 -m http.server 8080
```

Öppna `http://localhost:8080`.

## Installera på telefon (offline)
1. Öppna sidan i mobilens webbläsare.
2. Välj **Lägg till på hemskärmen**.
3. Starta appen från hemskärmen. Efter första laddning fungerar den offline.
