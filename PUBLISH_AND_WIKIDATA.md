# Entity home — publikacja (GitHub Pages) + Wikidata

Cel: jeden kanoniczny URL z Organization JSON-LD + `sameAs` → Google/AI scalają wszystkie nasze
profile w jedną encję „Nature Sounds Therapy".

## A. Publikacja strony (GitHub Pages, darmowo)
1. Załóż konto na github.com (jeśli nie masz). Zapamiętaj login `<login>`.
2. Nowy repozytorium: nazwa **`naturesoundstherapy`**, Public.
3. Wgraj do repo: `index.html` (ten z tego folderu) + `logo.png` (z `V3/NSTLOGO.jpg` — przekonwertuj na PNG i zmień nazwę na `logo.png`).
4. Settings → Pages → Source: `Deploy from a branch` → branch `main`, folder `/ (root)` → Save.
5. Po ~minucie adres: **`https://<login>.github.io/naturesoundstherapy/`** ← to jest CANONICAL_URL.
6. W `index.html` podmień **wszystkie** `CANONICAL_URL` na ten adres (3 miejsca w JSON-LD + canonical) i wgraj ponownie.
7. Sprawdź JSON-LD: https://validator.schema.org/ (wklej adres strony) — ma pokazać Organization bez błędów.

## B. URL-e, które muszę dostać od Ciebie (do `sameAs` + sekcji „Find us")
Wpisane już: Patreon, Dailymotion, TikTok. Brakuje (wklej dokładne adresy):
- **GŁÓWNY kanał YouTube** (z filmami) — NIE black-screen `UCJkFMbf5vUOAr16R0TvstzA`!
- Odysee, Rumble, BitChute, Spotify (adres show), Internet Archive (profil), Instagram, Facebook, X.

> Główny kanał YT najszybciej wyciągniesz u siebie (masz token):
> `py -c "import playlist_sync as p; s=p.get_service(); print(s.channels().list(part='id,snippet',mine=True).execute()['items'][0]['id'])"`
> Zwróci `UC...` → adres = `https://www.youtube.com/channel/UC...`

Jak podeślesz, uzupełnię `sameAs` i „Find us" (spójność = warunek scalenia encji).

## C. Wikidata (darmowe, daje QID dla `sameAs` Google)
⚠️ Uwaga: Wikidata wymaga „możliwości jednoznacznej identyfikacji" + zwykle poważnego źródła.
Nowa, mała marka **może zostać usunięta za brak notability**. To bonus, nie filar — entity home
+ spójne `sameAs` są pewną częścią. Jeśli przejdzie, QID wzmacnia rozpoznanie.

Tworzysz ręcznie na https://www.wikidata.org (zaloguj się → „Create a new Item"):
- **Label (en):** Nature Sounds Therapy
- **Description (en):** father-and-son nature field-recording project from Central Europe
- **Also known as:** NST
- **Statements:**
  - `instance of` (P31): **YouTube channel** (Q17558136)
  - `official website` (P856): `https://<login>.github.io/naturesoundstherapy/`
  - `YouTube channel ID` (P2397): `UCXmqKRmmSKc6ZmzzLdYq7UA` (główny kanał)
  - `Patreon ID` (P4175): `NatureSoundsTherapy`
  - `country` (P17): Poland (Q36)  *(opcjonalnie)*
  - `inception` (P571): rok startu kanału  *(opcjonalnie)*
- Po zapisaniu skopiuj **QID** (np. Q123456789) i dodaj do `sameAs` w JSON-LD:
  `"https://www.wikidata.org/wiki/Q123456789"`

## D. Po publikacji
- Z każdego itemu IA/DM/YT link wraca na YT/Patreon (mamy) → wspólnie z entity home boty wiążą encję.
- Sygnał świeżości: aktualizuj stronę przy nowych profilach.
- Test: po kilku tygodniach sprawdź w Perplexity „Nature Sounds Therapy" — najszybciej widać, czy łapie encję.
