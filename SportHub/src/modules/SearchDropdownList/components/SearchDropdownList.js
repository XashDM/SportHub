import React, { useState } from "react"
import { Autocomplete, TextField, Box, Paper } from "@mui/material"
import SearchbarStyles from "../styles/SearchbarStyles"
import styles from "../styles/style.module.scss"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../../routes/routes"

const SearchDropdownList = () => {
  const navigate = useNavigate()
  const ARTICLES = [
    { id: 1, title: "Soccer" },
    { id: 2, title: "Football" },
    { id: 3, title: "Basketball" }
  ];
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  return (
    <SearchbarStyles
      id="global-searchbar"
      options={ARTICLES}
      freeSolo
      disableClearable
      autoHighlight
      fullWidth
      inputValue={inputValue}
      onInputChange={handleInputChange}
      ListboxProps={{ style: { maxHeight: 'none' } }}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => {
        if (!inputValue) {
          // Перевірка, чи введений текст є порожнім
          return null; // Повертаємо null, якщо текст порожній
        }
        return (
          <div {...props} onClick={() => navigate(ROUTES.LOGIN)} className={styles.option}>
            <ul>
              <li>
                <span>Category</span>
                <span>{" > "}</span>
                <span>SubCategory</span>
                <span>{" > "}</span>
                <span>{option.title}</span>
              </li>
              <li><span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></li>
            </ul>
          </div>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search by"
          style={{ width: "100%" }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
      PaperComponent={({ children }) => (
        <Paper
          style={{
            width: "50vw",
            maxWidth: "none",
            marginTop: 3,
            backgroundColor: "rgba(0, 0, 0, .0)",
            borderRadius: 0,
            boxShadow: "none"
          }}>{children}</Paper>
      )}
    />
  );
};

export default SearchDropdownList;
