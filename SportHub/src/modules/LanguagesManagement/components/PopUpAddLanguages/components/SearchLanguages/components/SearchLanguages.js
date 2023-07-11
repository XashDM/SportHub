import TextField from '@mui/material/TextField'
import SearchLanguagesStyles from '../styles/SearchLanguagesStyles'
import CheckboxStyles from '../styles/CheckboxStyles'
import LabelStyles from '../styles/LabelStyles'
import CloseIcon from '@mui/icons-material/Close'
import styles from "../styles/style.module.scss"

import { LANGUAGES_CONSTANTS } from '../../../../../../../constants/LanguagesConstants'
import { useTranslation } from "react-i18next"


function SearchLanguages({ currentLanguages, selectedLanguages, onSelectedLanguagesChange }) {
  const { t } = useTranslation()
  const filteredLanguages = LANGUAGES_CONSTANTS.filter(language => {
    return !currentLanguages?.some(lang => lang.shortTitle === language.code);
  })

  const handleChange = (event, value) => {
    onSelectedLanguagesChange(value)
  }

  return (
    <SearchLanguagesStyles
      multiple
      disableClearable
      id="add_languages_autocomplete"
      options={filteredLanguages}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      value={selectedLanguages}
      ChipProps={{ deleteIcon: <CloseIcon /> }}
      renderOption={(props, option, { selected }) => (
        <div component="li" {...props} className={styles.option}>
          <img
            loading="lazy"
            height="12"
            src={`https://flagcdn.com/w20/${option.flag_code.toLowerCase()}.png`}
            alt=""
          />
          {option.label}
          <div className={styles.checkbox}>
            <CheckboxStyles
              disableRipple
              checked={selected}
            />
          </div>
        </div>
      )}
      renderInput={(params) => (
        <>
          <LabelStyles>{t('AdminPage.LanguagesManagement.PopUpAddLanguages.SelectLanguageCaption')}</LabelStyles>
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps
            }} />
        </>
      )}
    />
  );
}

export default SearchLanguages;
