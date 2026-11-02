# Generatory IT

Lokalne generatory danych testowych z kopiowaniem numerów jednym kliknięciem.
Numery są pogrupowane w sekcje: Tożsamość, Firma, Finanse i Pojazdy.

## REGON

Przycisk obok etykiety REGON przełącza wariant 9- i 14-cyfrowy jednym kliknięciem.
Wybór jest zapamiętywany i zachowywany przy generowaniu wszystkich numerów.

## Karty płatnicze

Generator obsługuje Visa, Mastercard (również serię 2), American Express, Discover, JCB, Diners Club i UnionPay.
Losuje numer o długości i prefiksie właściwym dla wybranej sieci oraz wylicza cyfrę kontrolną Luhna.
Wyświetlany numer jest grupowany dla czytelności; do schowka trafia sam ciąg cyfr.
Wybrana sieć jest zapamiętywana w pliku cookie.

To losowe dane do testowania formularzy. Do symulowania transakcji w sandboxie operatora użyj jego oficjalnych kart testowych, np. [kart Stripe](https://docs.stripe.com/testing#cards).
Prefiksy i długości oparto na [bibliotece Braintree credit-card-type](https://github.com/braintree/credit-card-type/blob/main/src/lib/card-types.ts).

## Generator IBAN

Generator obsługuje 89 formatów krajowych z [rejestru SWIFT IBAN, wydanie 103 (wrzesień 2026)](https://www.swift.com/swift-resource/9606/download).
Kliknięcie skrótu kraju obok etykiety IBAN otwiera listę z wyszukiwarką. Wybór od razu generuje nowy numer. Domyślny kraj to Polska; wybrany kraj jest zapamiętywany w pliku cookie.
Każdy numer ma długość i układ liter/cyfr właściwe dla kraju oraz wyliczoną sumę kontrolną MOD97-10.
Odświeżanie pola i „Przeładuj wszystkie” zachowują wybrany kraj, a kliknięcie numeru kopiuje go bez spacji.

Generowane wartości służą do testowania formatu i sumy kontrolnej IBAN. Dodatkowe krajowe sumy kontrolne BBAN oraz istnienie banku i rachunku nie są weryfikowane.

## PESEL

Płeć wybiera się z listy obok etykiety PESEL, a datę urodzenia przez przycisk kalendarza.
Zmiany od razu generują nowy numer. Płeć i data mają osobne opcje przywracania losowych danych, a ustawienia są zapamiętywane.

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
