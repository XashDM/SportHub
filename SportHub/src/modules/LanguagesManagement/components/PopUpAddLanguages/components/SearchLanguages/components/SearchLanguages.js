import TextField from '@mui/material/TextField'
import SearchLanguagesStyles from '../styles/SearchLanguagesStyles'
import CheckboxStyles from '../styles/CheckboxStyles'
import LabelStyles from '../styles/LabelStyles'
import BoxStyles from '../styles/BoxStyles'
import CloseIcon from '@mui/icons-material/Close';

import { LANGUAGES_CONSTANTS } from '../../../../../../../constants/LanguagesConstants'


function SearchLanguages({ currentLanguages, selectedLanguages, onSelectedLanguagesChange }) {
  const filteredLanguages = LANGUAGES_CONSTANTS.filter(language => {
    return !currentLanguages.some(lang => lang.shortTitle === language.code);
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
        <BoxStyles component="li" {...props}>
          <img
            loading="lazy"
            height="12"
            src={`https://flagcdn.com/w20/${option.flag_code.toLowerCase()}.png`}
            alt=""
          />
          {option.label}
          <CheckboxStyles
            disableRipple
            checked={selected}
          />
        </BoxStyles>
      )}
      renderInput={(params) => (
        <>
          <LabelStyles>SELECT LANGUAGE</LabelStyles>
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
