# Path testing log — Step 13 (QA)

**Data:** 2026-03-25  
**Aplinka:** lokali dev (`npm run dev`), Vite SPA.  
**Pastaba:** PDF / išorinio Step 13 dokumento repozitorijoje nebuvo; testuota pagal dabartinį kodą ir maršrutus.

**Cursor:** jei dar matote neišsaugotus pakeitimus, paspauskite **Apply / Accept**, kad visi diff’ai būtų priimti repozitorijoje.

---

## Patvirtinimo lentelė — quiz kombinacijos → paskirties puslapis

Ši lentelė yra **produkto + kodo sutarimas**: po pilnos apklausos (Step 51 → Get My Plan) **visos** žemiau nurodytos kombinacijos turi nukreipti į **tą patį teisingą** bazinį pasiūlymą `/{lang}/offer` (**61%** variantas). Tai ne klaida — `Step52OfferRedirect` sąmoningai nenaudoja nei lyties, nei tikslų maršrutui parinkti.

| Kombinacija (pavyzdžiai) | Teisingas galutinis kelias po quiz | Kaip patvirtinta |
|--------------------------|-----------------------------------|------------------|
| Moteris + Weight loss | `/en/offer` arba `/lt/offer` (+ `tw=…`, query jei buvo) | `Step52OfferRedirect` → `buildLocalizedOfferPath` + `offerConfig.variants.base.pathSegment` |
| Vyras + Weight loss | Tas pats — `/{lang}/offer` | Ta pati komponento logika (lytis nekeičia `pathSegment`) |
| Moteris / vyras + mišrūs tikslai | `/{lang}/offer` | Vienas bendras redirect po Step 52 |
| 68% / 75% kaip „kitas“ offer po quiz | **Ne** — quiz pabaiga **neveda** į `offer-68` / `offer-75` | Tik tiesioginis URL arba būsimas papildomas produktinis taisyklės sluoksnis |

**Parametrai po apklausos:** `navigate(withPreservedQueryParams(basePath, { tw: … }))` (`Quiz.jsx` — `Step52OfferRedirect`) ima `window.location.search`; jei apklausą pradėjote nuo `/{lang}/quiz?utm_source=test`, **tas pats `utm_source` (ir kiti query)** turi atsirasti offer URL, kol naršote **vienoje** SPA sesijoje be pilno perkrovimo su „švariu“ URL.

---

## Naršyklės galutinis testas (rankinis checklist)

1. **Kalbos prefiksas:** atidarykite `/`, `/en/quiz`, `/lt/offer` — po kliento redirect arba tiesiogiai adreso juostoje turi būti **`/en/...` arba `/lt/...`** (išskyrus akimirką prieš `RootLanguageRedirect` ant `/`).
2. **UTM po quiz:** atidarykite pvz. `http://localhost:5173/en/quiz?utm_source=test`, užbaikite apklausą — tikėtinas adresas **`/en/offer?utm_source=test&tw=…`** (eilutė gali skirtis pagal `tw`).
3. **Kalbos jungiklis:** offer arba meniu perjungus kalbą, patikrinkite, ar query išlieka (naudojama `swapLangInPath` + `withPreservedQueryParams`).

---

## Svarbi logikos santrauka (kodas)

| Sritis | Elgsena |
|--------|---------|
| Quiz → offer po Step 51 | Visada nukreipiama į **bazinį** variantą: `/{lang}/offer` (per `Step52OfferRedirect` + `offerConfig.variants.base.pathSegment`). |
| 68% / 75% pasiūlymai | Maršrutai **`/{lang}/offer-68`** ir **`/{lang}/offer-75`** egzistuoja, bet **quiz pabaiga į juos automatiškai neveda** — pasiekiami tiesioginiu URL arba rankiniu perėjimu. |
| Kalbos prefiksas | `en` / `lt`; `/` → redirect į `/{lang}/quiz`. |
| Query | `withPreservedQueryParams` naudojamas quiz→offer, kalbos jungikliuose meniu / offer apačioje. |

Todėl keturi „pagrindiniai keliai“ žemiau apima **du pilnus quiz profilius** (abi lyties šakos, jei įjungta), **LT + parametrus**, ir **tiesioginį 68%/75% URL** su parametrų išsaugojimu.

---

## Kelias 1 — Female → Weight loss → … → offer (EN + UTM)

| Laukas | Įvestis / kelias |
|--------|------------------|
| Pradžia | `http://localhost:5173/en/quiz?utm_source=test&utm_campaign=path1` |
| Lytis | Female (moterų šaka) |
| Tikslai | Bent vienas, pvz. „Lose weight“ (Weight loss) |
| Kiti žingsniai | Standartinė seka iki Step 51 („Thank you“ / užbaigimas) → **Get My Plan** |

| Tikrinimas | Rezultatas |
|------------|------------|
| Galutinis URL | **`/en/offer?...`** (bazinis = **61%** variantas). `tw=` pridedamas iš quiz (goal weight). UTM lieka jei navigacija išsaugo query (žr. pastabą žemiau). |
| Kalbos prefiksas | Taip — `/en/`. |
| Stebėjimo parametrai | Jei visą kelią naršoma **client-side** be pilno perkrovimo, `utm_*` iš pradinio `/en/quiz?...` paprastai išlieka iki offer redirect (naudojamas `withPreservedQueryParams`). |
| Būsenos išsaugojimas | `quizStorage` — config/legacy fazė ir Step 52 offer flag pagal esamą logiką. |

**Pastaba:** Jei vartotojas atidaro `/en/quiz` be query ir vėliau rankiniu būdu įklijuoja URL su UTM, reikėtų pradėti nuo URL su parametrais, kad jie būtų „lango“ `search` dalis.

---

## Kelias 2 — Male → (Weight loss arba mišrūs tikslai) → offer (EN)

| Laukas | Įvestis / kelias |
|--------|------------------|
| Pradžia | `/en/quiz` |
| Lytis | Male (jei `quizConfig.features.maleBranchEnabled === true`) |
| Tikslai | Pvz. „Lose weight“ + kiti pagal UI |
| Pabaiga | Step 51 → **Get My Plan** |

| Tikrinimas | Rezultatas |
|------------|------------|
| Galutinis puslapis | **`/en/offer`** — **61%** (tas pats bazinis variantas kaip moterų šakoje). |
| Kalbos prefiksas | `/en/`. |
| Parametrai | Jei pradžioje buvo `?utm_source=test`, tikimasi jų išsaugojimo per tą patį mechanizmą kaip 1 kelyje. |
| Išvada | Lytis ir tikslų kombinacija **nekeičia** offer procento — visada bazinis offer po quiz. |

---

## Kelias 3 — Female → LT + kelio parametrai iki offer

| Laukas | Įvestis / kelias |
|--------|------------------|
| Pradžia | `http://localhost:5173/lt/quiz?utm_source=test&click_id=demo123` |
| Lytis | Female |
| Tikslai | Bet kokia leistina kombinacija |
| Pabaiga | Step 51 → **Get My Plan** |

| Tikrinimas | Rezultatas |
|------------|------------|
| Galutinis URL | **`/lt/offer?...`** — **61%** (LT lokalizuotas offer). |
| Kalbos prefiksas | Taip — `/lt/`. |
| i18n | `LangGate` / `syncI18nLanguageFromPath` — turinys LT vertimuose kur apibrėžta. |
| Parametrai | `utm_source`, `click_id` — tikėtina išsaugoti per `withPreservedQueryParams` tame pačiame sesijos naršyme. |
| Kalbos jungiklis | Meniu arba offer apačioje: `swapLangInPath` + `withPreservedQueryParams` — **išlaikyti query** perjungus į `/en/offer?...`. |

---

## Kelias 4 — Tiesioginiai 68% ir 75% URL + parametrai + kalbos keitimas

Šis kelias **neina per quiz pabaigą**; tikrina maršrutus ir parametrus, kaip reikalauja Step 13 (61 / 68 / 75).

| Žingsnis | URL | Tikėtinas rezultatas |
|----------|-----|----------------------|
| 4a | `/en/offer-68?utm_source=test` | Offer UI su **68%** nuolaida; `getOfferVariantKeyFromPathname` → `second`. |
| 4b | `/lt/offer-75?utm_source=test&click_id=x` | Offer UI su **75%** nuolaida; variantas `third`. |
| 4c | Iš 4a meniu / offer nuoroda į kitą kalbą | Tas pats `offer-68` segmentas, prefiksas `lt` arba `en`, **query išsaugotas** (logika `swapLangInPath` + `withPreservedQueryParams`). |

| Tikrinimas | Rezultatas |
|------------|------------|
| 61% | Pasiekiamas per quiz pabaigą → `/en/offer` arba `/lt/offer`. |
| 68% / 75% | Tik per **`/…/offer-68`** ir **`/…/offer-75`** (arba rankiniu būdu); quiz vien pats savaime į juos neveda. |

---

## Kryžminė patikra (ankstesni žingsniai)

| Funkcija | Būsena (loginiu auditu) |
|----------|-------------------------|
| State persistence (`quizStorage`) | Įjungta quiz progresui; offer pasiekimas žymimas pagal esamą `writeQuizProgress` logiką. |
| Daugiakalbystė URL | `/:lang/quiz`, `/:lang/offer`, `offer-68`, `offer-75`; netinkama kalba → nukreipimas į `en`. |
| URL parametrai | `withPreservedQueryParams` ant quiz→offer ir kalbos jungiklių; `tw` perduodamas į offer. |

---

## Santrauka

1. **Step 12 (meta + CSS):** `index.html` papildytas `theme-color`, `color-scheme`, `apple-mobile-web-app-status-bar-style`; `html, body` fonas `#ffffff` — suderinta su baltu status bar / mažesnis „flash“.  
2. **Quiz keliai:** Skirtingi **Female / Male** ir **tikslų** pasirinkimai veda į **tą patį** bazinį pasiūlymą **61%** (`/{lang}/offer`). Tai atitinka dabartinį `Step52OfferRedirect`.  
3. **68% / 75%:** Patvirtinta kaip atskiri maršrutai su teisingu variantu; **pilnas quiz** jų automatiškai neatidaro.  
4. **Parametrai ir LT:** Dokumentuota kaip tikėtina elgsena pagal kodą; **rankinis naršymas dev** rekomenduojamas galutiniam patvirtinimui.  
5. **Production:** Build anksčiau praeina; po šio pakeitimo verta dar kartą paleisti `npm run build` ir patikrinti įrenginyje (ypač iOS Safari) status bar atspalvį.

**Rizikos / tolimesni veiksmai:** Jei produktas reikalauja, kad **skirtingi quiz keliai** vestų į **68% ar 75%**, reikės papildomos produktinės logikos (pvz. `navigate` į `offer-68` pagal sąlygą) — dabar tokios nėra.
