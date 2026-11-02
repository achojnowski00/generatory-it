# Generatory IT — rozszerzenie Chrome

Kliknięcie ikony rozszerzenia otwiera popup ze stroną [generatory.netlify.app](https://generatory.netlify.app/).
Wtyczka jest gotowa do wczytania, bez instalowania zależności i budowania aplikacji.

## Instalacja

1. Otwórz `chrome://extensions`.
2. Włącz **Tryb dewelopera**.
3. Kliknij **Załaduj rozpakowane** i wybierz ten katalog (`chrome-extension`), zawierający `manifest.json`.
4. W menu rozszerzeń (ikona puzzla) przypnij **Generatory IT** do paska.
5. Kliknij ikonę rozszerzenia.

[Oficjalna instrukcja Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

## Działanie

- Popup ładuje aktualną stronę z Netlify; zmiany opublikowane na stronie pojawiają się również w rozszerzeniu.
- Wymaga połączenia z internetem.
- Popup ma rozmiar 800 × 480 px. Osadzona strona ma obszar roboczy o szerokości 1040 px, pomniejszony do około 77%, żeby zachować cztery kolumny i dostęp do wszystkich generatorów.
- Kopiowanie działa po kliknięciu karty. Ramka ma delegowane uprawnienie `clipboard-write`; rozszerzenie nie odczytuje schowka.
- Link na dole otwiera pełną stronę w nowej karcie.
- Chrome zamyka popup po kliknięciu poza nim. Preferencje generatorów zapisuje osadzona strona w swoich plikach cookie; ustawienia prywatności Chrome mogą wpływać na ich zapamiętywanie w ramce.

Rozszerzenie nie korzysta z uprawnień do otwartych kart, historii, skryptów stron ani procesów w tle. Jedyną dozwoloną zewnętrzną ramką jest `https://generatory.netlify.app/`.

## Zmiany rozszerzenia

Po zmianie manifestu lub ikon kliknij **Odśwież** na karcie rozszerzenia w `chrome://extensions`.
Zmiana adresu strony wymaga aktualizacji `popup.html` i `manifest.json` (adres strony i `frame-src`).

Ikony PNG są dołączone. Na Windows można odtworzyć je skryptem:

```powershell
powershell -File .\chrome-extension\scripts\generate-icons.ps1
```
