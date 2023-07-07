import React, { useEffect, useState } from "react"
import { TextField, Paper } from "@mui/material"
import SearchbarStyles from "../styles/SearchbarStyles"
import styles from "../styles/style.module.scss"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../../routes/routes"
import getSearchArticlesRequest from "../helpers/getSearchArticlesRequest"
import { useTranslation } from "react-i18next"

const SearchDropdownList = ({ setIsContentSearch, setContentSearchValue }) => {
  const navigate = useNavigate()

  const { t, i18n } = useTranslation()

  const [articles, setArticles] = useState([])

  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const handleInputChange = async (event, value) => {
    if (!showSuggestions) {
      setShowSuggestions(true);
    }
    setInputValue(value)
  }

  const handleArticlesGet = async () => {
    if (inputValue) {
      const result = await getSearchArticlesRequest(i18n.language, inputValue, 1, 3)
      console.log(result)
      setArticles(result.data)
    }
  }

  useEffect(() => {
    handleArticlesGet()
  }, [inputValue])

  return (
    <>
      <img className={styles.img_icon} src={'/icons/Magnifying-glass.svg'} ></img>
      <SearchbarStyles
        id="global-searchbar"
        options={articles}
        freeSolo
        disableClearable
        autoHighlight
        fullWidth
        inputValue={inputValue}
        onInputChange={handleInputChange}
        ListboxProps={{ style: { maxHeight: 'none', transform: 'translateX(-3rem)' } }}
        getOptionLabel={(option) => `${option.title} 
                                      ${option.category.categoryName} 
                                      ${option.subCategory?.subCategoryName || ''} 
                                      ${option.team?.teamName || ''} 
                                      ${option.location?.locationName || ''}`}
        renderOption={(props, option) => {
          if (!inputValue || !showSuggestions) {
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
                  {
                    option.subCategory
                      ?
                      <>
                        <span>{" > "}</span>
                        <span>{option.subCategory.subCategoryName}</span>
                      </>
                      :
                      <></>
                  }
                  {
                    option.team
                      ?
                      <>
                        <span>{" > "}</span>
                        <span>{option.team.teamName}</span>
                      </>
                      :
                      <></>
                  }
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
            placeholder={t('Header.UserHeader.SearchByCaption')}
            style={{ width: "100%" }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off', // disable autocomplete and autofill
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation()
                  setShowSuggestions(false)
                  setContentSearchValue(inputValue)
                  setIsContentSearch(true)
                }
              },
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
    </>
  )
}

export default SearchDropdownList
