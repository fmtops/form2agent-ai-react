// make them as accept langauage header - format: Language-Region
enum LANGUAGES_VALUES {
  EN = "en-US",
  ES = "es-US",
  FR = "fr-CA",
  DE = "de-DE",
  IT = "it-IT",
  // TODO #46443: Add Polish and Russian back once supported by Google Cloud TTS Journey
  // PL = "pl-PL",
  // RU = "ru-RU",
}

const LANGUAGES = [
  {
    value: LANGUAGES_VALUES.EN,
    name: "English (United States)",
    englishName: "English (United States)",
  },
  {
    value: LANGUAGES_VALUES.ES,
    name: "Español (Estados Unidos)",
    englishName: "Spanish (United States)",
  },
  {
    value: LANGUAGES_VALUES.FR,
    name: "Français (Canada)",
    englishName: "French (Canada)",
  },
  {
    value: LANGUAGES_VALUES.DE,
    name: "Deutsch (Deutschland)",
    englishName: "German (Germany)",
  },
  {
    value: LANGUAGES_VALUES.IT,
    name: "Italiano (Italia)",
    englishName: "Italian (Italy)",
  },
  // TODO #46443: Add Polish and Russian back once supported by Google Cloud TTS Journey
  // {
  //   value: LANGUAGES_VALUES.PL,
  //   name: "Polski",
  //   englishName: "Polish",
  // },
  // {
  //   value: LANGUAGES_VALUES.RU,
  //   name: "Русский",
  //   englishName: "Russian",
  // },
];

const LANGUAGE_KEY = "language_value";

export { LANGUAGES, LANGUAGES_VALUES, LANGUAGE_KEY };
