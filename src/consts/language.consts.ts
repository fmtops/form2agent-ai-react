// make them as accept langauage header - format: Language-Region
enum LANGUAGES_VALUES {
  EN = "en-US",
  ES = "es-ES",
  FR = "fr-CA",
  PL = "pl-PL",
  RU = "ru-RU",
}

const LANGUAGES = [
  {
    value: LANGUAGES_VALUES.EN,
    name: "English",
    englishName: "English",
  },
  {
    value: LANGUAGES_VALUES.ES,
    name: "Español (Latinoamérica)",
    englishName: "Spanish (Latin America)",
  },
  {
    value: LANGUAGES_VALUES.FR,
    name: "Français (Canada)",
    englishName: "French (Canada)",
  },
  {
    value: LANGUAGES_VALUES.PL,
    name: "Polski",
    englishName: "Polish",
  },
  {
    value: LANGUAGES_VALUES.RU,
    name: "Русский",
    englishName: "Russian",
  },
];

const LANGUAGE_KEY = "language_value";

export { LANGUAGES, LANGUAGES_VALUES, LANGUAGE_KEY };
