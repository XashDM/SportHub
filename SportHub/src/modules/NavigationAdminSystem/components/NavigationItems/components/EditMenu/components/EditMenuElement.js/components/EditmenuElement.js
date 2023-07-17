import React from 'react'
import styles from '../styles/style.module.scss'

const EditmenuElement = ({text,clickFunction}) => {
  return (
    <div onClick={clickFunction} className={styles.EditmenuElement}><span>{text}</span></div>
  )
}

export default EditmenuElement