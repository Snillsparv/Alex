# Alex – Rutnätsminne

<<<<<<< HEAD
En enkel offline-kompatibel webbapp för minnesträning på ett 6x6-rutnät.

## Funktioner
- 60 sekunders memoreringsfas.
- 2-färgersläge: 12 gula + 12 lila rutor.
- 3-färgersläge: 9 gula + 9 lila + 9 blå rutor.
- Fyll-i-fas där du trycker i rutorna och sedan rättar.
- Service worker + manifest för offlinekörning på mobil.

## Kör lokalt
Öppna filerna via en enkel server, t.ex.:

=======
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
>>>>>>> origin/codex/create-memorization-game-app-hhllhj
```bash
python3 -m http.server 8080
```

<<<<<<< HEAD
Besök sedan `http://localhost:8080`.
=======
Öppna `http://localhost:8080`.

## Installera på telefon (offline)
1. Öppna sidan i mobilens webbläsare.
2. Välj **Lägg till på hemskärmen**.
3. Starta appen från hemskärmen. Efter första laddning fungerar den offline.

## Merga till `main`
Om din branch heter `work` kan du köra:

```bash
git checkout main
git pull origin main
git merge work
git push origin main
```

Om du vill göra en squash-merge:

```bash
git checkout main
git pull origin main
git merge --squash work
git commit -m "Merge rutnätsminne-appen"
git push origin main
```
>>>>>>> origin/codex/create-memorization-game-app-hhllhj
