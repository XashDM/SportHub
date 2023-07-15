import React,{useState,useRef, useEffect} from 'react'
import styles from '../styles/style.module.scss'
import EditmenuElement from './EditMenuElement.js'
import { useNavigationItemsCategories,useNavigationItemsSubCategories,useNavigationItemsTeams } from '../../../../../../../store/useNavigationTreeStore'
import PopUpRemovalWarning from "./PopUpRemovalWarning"


const EditMenu = ({item,setShowEditMenu,itemId,depthLevel}) => {
  const addDeletedCatogory = useNavigationItemsCategories((state) => state.addDeletedCategory)
  const deletecategory = useNavigationItemsCategories((state) => state.deleteCategory)
  const addDeletedSubCategory = useNavigationItemsSubCategories((state) => state.addDeletedSubCategory)
  const deleteSubCategory = useNavigationItemsSubCategories((state) => state.deleteSubCategory)
  const addDeletedTeam = useNavigationItemsTeams((state) => state.addDeletedTeam)
  const deleteTeam = useNavigationItemsTeams((state) => state.deleteTeam)

  const hideCategory = useNavigationItemsCategories((state) => state.hideCategory)
  const hideSubCategory = useNavigationItemsSubCategories((state) => state.hideSubCategory)
  const hideTeam = useNavigationItemsTeams((state) => state.hideTeam)

  const [showDeletePopUp,setShowDeletePopUp] = useState(false)
  const [deleteTitle,setDeleteTitle] = useState("")

  const HideCategory = () => {
    hideCategory(itemId)
  }
  
  const HideSubCategory = () => {
    hideSubCategory(item.categoryId,itemId)
  }

  const HideTeam = () => {
    hideTeam(item.subCategoryId,itemId)
  }

  const hideElement = () => {
    switch (depthLevel){
      case 0:
        HideCategory()
        break
      case 1:
        HideSubCategory()
        break
      case 2:
        HideTeam()
        break
    }
  }

  const deleteCategory = () => {
    if (useNavigationItemsSubCategories.getState().subcategories[itemId].length === 0){
      addDeletedCatogory(itemId)
      deletecategory(itemId)
    }
  }

  const deleteSubcategory = () => {
    if (useNavigationItemsTeams.getState().teams[itemId].length === 0){
      addDeletedSubCategory(itemId)
      deleteSubCategory(itemId)
    }
  }

  const deleteteam = () => {
    addDeletedTeam(itemId)
    deleteTeam(itemId)
  }

  const deleteElement = () => {
    switch(depthLevel){
      case 0:
        deleteCategory()
        break
      case 1:
        deleteSubcategory()
        break
      case 2:
        deleteteam()
        break
    }
    setShowEditMenu(false)
  }

  useEffect(()=>{
    switch(depthLevel){
      case 0:
        setDeleteTitle("You are about to delete this category!")
        break
      case 1:
        setDeleteTitle("You are about to delete this subcategory!")
        break
      case 2:
        setDeleteTitle("You are about to delete this team!")
        break
    }
  },[])

  return (
    <div  onMouseLeave={() => setShowEditMenu(false)}>
    <div className={styles.EditMenu}>
      <div style={{height:"40px"}}></div>
      <EditmenuElement text={"Hide"} clickFunction={hideElement}/>
      <EditmenuElement text={"Delete"} clickFunction={() => setShowDeletePopUp(true)}/>
      <EditmenuElement text={"Edit"}/>
    </div>
    <PopUpRemovalWarning title={deleteTitle} open={showDeletePopUp} handleClose={() => {setShowEditMenu(false);setShowDeletePopUp(false)}} handleDelete={deleteElement}/>
    </div>
  )
}


export default EditMenu