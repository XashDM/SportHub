import React, { useEffect, useState } from "react"
import { TextField, Paper } from "@mui/material"
import SearchbarStyles from "../styles/SearchbarStyles"
import styles from "../styles/style.module.scss"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from "../../../routes/routes"
import getSearchArticlesRequest from "../helpers/getSearchArticlesRequest"
import { useTranslation } from "react-i18next"
import * as DOMPurify from 'dompurify'

const SearchDropdownList = ({ setIsContentSearch, setContentSearchValue }) => {
  const navigate = useNavigate()

  const { t, i18n } = useTranslation()

  const [articles, setArticles] = useState([])

  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const handleInputChange = async (event, value) => {
    if (!showSuggestions) {
      setShowSuggestions(true)
    }
    setInputValue(value)
  }

  const handleArticlesGet = async () => {
    if (inputValue.trim()) { // preventing error when first symbol is space
      const pageNumber = 1 // first because need to suggest last articles
      const pageSize = 2
      const result = await getSearchArticlesRequest(i18n.language, inputValue, pageNumber, pageSize)
      console.log(result)
      setArticles(result.data)
    }
  }

  const handleRedirectToArticle = async (articleId) => {
    // using navigate breaks search dropdown (it isn't work until refreshing page)
    window.location.href = ROUTES.ARTICLE.replace(':articleId', articleId)
  }

  const showDropdownShadows = (children) => {
    // removing shadows when nothing printed/no results
    if (showSuggestions && inputValue && articles.length !== 0) {
      return <div className={styles.optionsContainer}>{children}</div>
    }
    return <div>{children}</div>
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
        ListboxProps={{ style: { maxHeight: 'none', width: "100%", padding: 0 } }}
        getOptionLabel={(option) => `${option.title} 
                                      ${option.mainText}
                                      ${option.subtitle}  
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
              const regex = new RegExp(inputValue, "i")
              matchedMainText = `<span>` + mainText.replace(regex, (match) => `<span class="${styles.highlightedText}">${match}</span>`) + `</span>`
              break
            }
          }
          if (!matchedMainText) {
            matchedMainText = mainTexts[0]
          }

          return (
            <div {...props} onClick={() => handleRedirectToArticle(option.articleId)} className={styles.option}>
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
                <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(matchedMainText) }}></li>
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
                  if (inputValue.trim()) {
                    setShowSuggestions(false)
                    setContentSearchValue(inputValue)
                    setIsContentSearch(true)
                  }
                }
              },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          showDropdownShadows(children)
        )}
      />
    </>
  )
}

export default SearchDropdownList
