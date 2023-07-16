import { create } from "zustand";
import { useId } from "react";
import uuid from 'react-uuid';

export const useNavigationItemsCategories = create((set) =>(
    {
        categories : [],
        deleted : [],
        loading : false,
        error: null,
        setCategory: (categoryList) => set((state) => {
            return {categories: categoryList}
        }),

        addCategory: (CategoryName) => set((state) => {
            const newCategory = {id : uuid(),title: CategoryName,new: true,isHidden:false}
            useNavigationItemsSubCategories.getState().addNewCategory(uuid())
            return {categories: [...state.categories,newCategory]}
        }),
        addDeletedCategory: (CategoryId) => set((state) => {
            return {deleted: [...state.deleted,CategoryId]}
        }),
        deleteCategory: (CategoryId) => set((state) => {
            state.setCategory(state.categories.filter(obj => obj.id != CategoryId))
            return  state.categories
        }),
        hideCategory: (CategoryId) => set((state) => {
            const hideIndex = state.categories.findIndex(element => element.id == CategoryId)
            state.categories[hideIndex]["hide"] = true
            state.categories[hideIndex]["isHidden"] = !state.categories[hideIndex]["isHidden"]
            console.log(state.categories)
            return {categories: state.categories}
        }),
        clearDeleted: () => set((state) =>{
            return {deleted:[]}
        })
    }))

    export const useNavigationItemsSubCategories = create((set) =>(
        {
            subcategories : {},
            deleted: [],
            loading : false,
            error: null,
            addSubCategory: (categoryId,newSubCategory) => set((state) => {
                return {subcategories: {...state.subcategories,[categoryId]: newSubCategory}}
            }),
            addNewSubCategory: (categoryId,SubCategoryname) => set((state) => {
                const newSubCategory = {id : uuid(),title:SubCategoryname,categoryId:categoryId,isHidden:false,new:true}
                const new_element_list = state.subcategories
                new_element_list[categoryId] = [...new_element_list[categoryId],newSubCategory]
                useNavigationItemsTeams.getState().addNewSubCategory(uuid())
                console.log(state.subcategories)
                return {subcategories: new_element_list}
            }),
            addNewCategory: (categoryId) => set((state) => {
                const new_element_list = state.subcategories
                new_element_list[categoryId] = []
                return {subcategories: new_element_list}
            }),
            addDeletedSubCategory: (SubCategoryId) => set((state) => {
                return {deleted: [...state.deleted,SubCategoryId]}
            }),
            deleteSubCategory: (SubCategoryId) => set((state) => {
                for (let category in state.subcategories){
                    state.subcategories[category] = state.subcategories[category].filter(obj => obj.id != SubCategoryId)
                }         
                return  state.subcategories
            }),
            clear: () => set({subcategories:[]}),
            hideSubCategory: (categoryId,subCategoryId) => set((state) =>{
                console.log(categoryId,subCategoryId)
                const hideIndex = state.subcategories[categoryId].findIndex(element => element.id == subCategoryId)
                state.subcategories[categoryId][hideIndex]["hide"] = true
                state.subcategories[categoryId][hideIndex]["isHidden"] = !state.subcategories[categoryId][hideIndex]["isHidden"]
                return {subcategories:state.subcategories}
            }),
            clearDeleted: () => set((state) =>{
                return {deleted:[]}
            })
            
        }))

        export const useNavigationItemsTeams = create((set) =>(
            {
                teams : {},
                deleted : [],
                loading : false,
                error: null,
                addTeam: (subCategoryId,newTeam) => set((state) => {
                    return {teams: {...state.teams,[subCategoryId]: newTeam}}
                }),
                addNewTeam: (SubCategoryId,teamName) => set((state) => {
                    const newTeam = {id : uuid(),title:teamName,description:"There is no description",subCategoryId:SubCategoryId,isHidden:false,new:true}
                    const new_element_list = state.teams
                    new_element_list[SubCategoryId] = [...new_element_list[SubCategoryId],newTeam]
                    return {teams: new_element_list}
                }),
                addNewSubCategory: (subCategoryId) => set((state) => {
                    const new_element_list = state.teams
                    new_element_list[subCategoryId] = []
                    return {teams: new_element_list}
                }),
                addDeletedTeam: (TeamId) => set((state) => {
                    return {deleted: [...state.deleted,TeamId]}
                }),
                deleteTeam: (TeamId) => set((state) => {
                    for (let subcategory in state.teams){
                        state.teams[subcategory] = state.teams[subcategory].filter(obj => obj.id != TeamId)
                    }         
                    return  state.teams
                }),
                clear: () => set({teams:[]}),
                hideTeam: (subCategoryId,teamId) => set((state) =>{
                    const hideIndex = state.teams[subCategoryId].findIndex(element => element.id == teamId)
                    state.teams[subCategoryId][hideIndex]["hide"] = true
                    state.teams[subCategoryId][hideIndex]["isHidden"] = !state.teams[subCategoryId][hideIndex]["isHidden"]
                    return {teams:state.teams}
                }),
                clearDeleted: () => set((state) =>{
                    return {deleted:[]}
                })
            }))