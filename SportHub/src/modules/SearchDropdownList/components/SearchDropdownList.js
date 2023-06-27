import React, { useEffect, useState } from "react"
import { TextField, Paper } from "@mui/material"
import SearchbarStyles from "../styles/SearchbarStyles"
import styles from "../styles/style.module.scss"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../../routes/routes"
import getSearchArticlesRequest from "../helpers/getSearchArticlesRequest"

const SearchDropdownList = () => {
  const navigate = useNavigate()

  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("i18nextLng"))

  const ARTICLES = [
    { id: 1, title: "Soccer" },
    { id: 2, title: "Football" },
    { id: 3, title: "Basketball" }
  ]

  const [articles, setArticles] = useState([])

  const [inputValue, setInputValue] = useState("")
  const handleInputChange = async (event, value) => {
    setInputValue(value)
  }

  const handleArticlesGet = async () => {
    if (inputValue) {
      const result = await getSearchArticlesRequest(currentLanguage, inputValue, 1, 3)
      console.log(result)
      setArticles(result.data)
    }
  }

  useEffect(() => {
    handleArticlesGet()
  }, [inputValue])

  return (
    <SearchbarStyles
      id="global-searchbar"
      options={articles}
      freeSolo
      disableClearable
      autoHighlight
      fullWidth
      inputValue={inputValue}
      onInputChange={handleInputChange}
      ListboxProps={{ style: { maxHeight: 'none' } }}
      getOptionLabel={(option) => `${option.title} ${option.category.categoryName} ${option.subCategory.subCategoryName} ${option.mainText} ${option.team.teamName} ${option.location.locationName}`}
      renderOption={(props, option) => {
        if (!inputValue) {
          return null
        }

        const mainTexts = option.mainText.split(". ")
        let matchedMainText = null
        for (let i = 0; i < mainTexts.length; i++) {
          const mainText = mainTexts[i]
          if (mainText.toLowerCase().includes(inputValue.toLowerCase())) {
            matchedMainText = mainText
            break
          }
        }
        if (!matchedMainText) {
          matchedMainText = mainTexts[0]
        }

        return (
          <div {...props} onClick={() => navigate(ROUTES.LOGIN)} className={styles.option}>
            <ul>
              <li>
                <span>{option.category.categoryName}</span>
                <span>{" > "}</span>
                <span>{option.subCategory.subCategoryName}</span>
                <span>{" > "}</span>
                <span>{option.title}</span>
              </li>
              <li><span>{matchedMainText}</span></li>
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
            autoComplete: 'off', // disable autocomplete and autofill
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
