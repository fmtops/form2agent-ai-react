import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { LANGUAGES, LANGUAGES_VALUES } from "../../consts/language.consts";
import {
  setStoredLanguage,
  getStoredLanguage,
  removeRegion,
} from "../../utils/language.utils";
import StyledSelect from "../common/mui-styled/styled-select";

export default function LanguageSelect() {
  const [chosenLanguage, setChosenLanguage] = useState(LANGUAGES[0].value);

  const handleChange = (event: SelectChangeEvent<any>) => {
    setChosenLanguage(event.target.value as LANGUAGES_VALUES);
    setStoredLanguage(event.target.value);
  };

  const renderValue = (value: any) => {
    return removeRegion(value).toUpperCase();
  };

  useEffect(() => {
    if (!getStoredLanguage()) {
      if (
        LANGUAGES.map((language) => language.value).includes(
          navigator.language as LANGUAGES_VALUES
        )
      ) {
        setChosenLanguage(navigator.language as LANGUAGES_VALUES);
        setStoredLanguage(navigator.language);
      } else {
        setChosenLanguage(LANGUAGES[0].value);
        setStoredLanguage(LANGUAGES[0].value);
      }
    } else {
      setChosenLanguage(getStoredLanguage() || LANGUAGES[0].value);
    }
  }, []);

  return (
    <StyledSelect
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={chosenLanguage}
      onChange={handleChange}
      renderValue={renderValue}
    >
      {LANGUAGES.map((language) => (
        <MenuItem
          value={language.value}
          key={language.value}
          sx={{
            padding: "8px",
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm">{language.name}</span>
            <span className="text-xs text-text-secondary">
              {language.englishName}
            </span>
          </div>
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
