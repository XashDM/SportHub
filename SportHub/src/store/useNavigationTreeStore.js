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
            const newCategory = {id : uuid(),title: CategoryName,new: true}
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
        clearNew: () => set((state)=>{
            for (let category of state.categories){
                if (category.new){
                    delete category.new
                }
            }
            return state.categories
        })
    }))

    export const useNavigationItemsSubCategories = create((set) =>(
        {
            subcategories : {},
            loading : false,
            error: null,
            addSubCategory: (categoryId,newSubCategory) => set((state) => {
                return {subcategories: {...state.subcategories,[categoryId]: newSubCategory}}
            }),
            addNewSubCategory: (categoryId,SubCategoryname) => set((state) => {
                const newSubCategory = {id : uuid(),title:SubCategoryname,new:true}
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
            clear: () => set({subcategories:[]})
        }))

        export const useNavigationItemsTeams = create((set) =>(
            {
                teams : {},
                loading : false,
                error: null,
                addTeam: (subCategoryId,newTeam) => set((state) => {
                    return {teams: {...state.teams,[subCategoryId]: newTeam}}
                }),
                addNewTeam: (SubCategoryId,teamName) => set((state) => {
                    const newTeam = {id : uuid(),title:teamName,description:"There is no description",new:true}
                    const new_element_list = state.teams
                    new_element_list[SubCategoryId] = [...new_element_list[SubCategoryId],newTeam]
                    return {teams: new_element_list}
                }),
                addNewSubCategory: (subCategoryId) => set((state) => {
                    const new_element_list = state.teams
                    new_element_list[subCategoryId] = []
                    return {teams: new_element_list}
                }),
                clear: () => set({teams:[]})
            }))