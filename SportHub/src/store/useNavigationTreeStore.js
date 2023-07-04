import { create } from "zustand";
import { useId } from "react";

export const useNavigationItemsCategories = create((set) =>(
    {
        categories : [],
        tempory_id : 0,
        loading : false,
        error: null,
        setCategory: (categoryList) => set((state) => {
            return {categories: categoryList}
        }),

        addCategory: (CategoryName) => set((state) => {
            const newCategory = {id : state.tempory_id,title: CategoryName,new: true}
            state.tempory_id += 1
            return {categories: [...state.categories,newCategory]}
        })
    }))

    export const useNavigationItemsSubCategories = create((set) =>(
        {
            subcategories : {},
            tempory_id : 0,
            loading : false,
            error: null,
            addSubCategory: (categoryId,newSubCategory) => set((state) => {
                return {subcategories: {...state.subcategories,[categoryId]: newSubCategory}}
            }),
            addNewSubCategory: (categoryId,SubCategoryname) => set((state) => {
                const newSubCategory = {id : state.tempory_id,title:SubCategoryname,new:true}
                const new_element_list = state.subcategories
                new_element_list[categoryId] = [...new_element_list[categoryId],newSubCategory]
                state.tempory_id += 1
                return {subcategories: new_element_list}
            })
        }))

        export const useNavigationItemsTeams = create((set) =>(
            {
                teams : {},
                tempory_id : 0,
                loading : false,
                error: null,
                addTeam: (subCategoryId,newTeam) => set((state) => {
                    return {teams: {...state.teams,[subCategoryId]: newTeam}}
                })
            }))