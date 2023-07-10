import React from 'react';
import styles from '../styles/style.module.scss';
import EditmenuElement from './EditMenuElement.js';
import { useNavigationItemsCategories } from '../../../../../../../store/useNavigationTreeStore';

const EditMenu = ({setShowEditMenu,itemId}) => {
  const deletedCategories = useNavigationItemsCategories((state) => state.deleted)
  const addDeletedCatogory = useNavigationItemsCategories((state) => state.addDeletedCategory)
  const deleteCategoryFromList = useNavigationItemsCategories((state) => state.deleteCategory)

  const deleteCategory = () => {
    addDeletedCatogory(itemId)
    deleteCategoryFromList(itemId)
  }
  return (
    <div onMouseLeave={() => setShowEditMenu(false)} className={styles.EditMenu}>
      <div style={{height:"40px"}}></div>
      <EditmenuElement text={"Hide"}/>
      <EditmenuElement text={"Delete"} clickFunction={deleteCategory}/>
      <EditmenuElement text={"Edit"}/>
    </div>
  )
}


export default EditMenu