import React from 'react'
import { render, screen } from '@testing-library/react'
import AdminArticlesList from '../index'
import {createServer} from "../../../helpers/forTests/server"
import '@testing-library/jest-dom/extend-expect'



jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => {},
    }
}))
const articlesFromBackend =  [
    {
        image: {url: "https://api.time.com/wp-content/uploads/2017/03/panda-black-white-study.jpg"},
        mainText: "The Black Panther team has emerged as an unstoppable force in the world of sports...",
        title: "Dominant Black Panther Team Continues to Reign Supreme in the Sporting World",
        isPublished: false,
        location: {locationName: "Kiev"},
        subCategory: {subCategoryName: "AFC South"}
    },
    {
        image: {url: "https://www.macmillandictionaryblog.com/wp-content/uploads/2019/07/148640-1024x680.jpg"},
        mainText: "Experience the thrill and excitement as the Lightning Strikers...",
        title: "The Lightning Strikers: Unleashing the Power of Speed",
        isPublished: true,
        location: {locationName: "Manchester"},
        subCategory: {subCategoryName: "Premier League"}
    },
    {
        image: {url:  "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg"},
        mainText: "Discover the unstoppable force that is the Phoenix...",
        title: "Phoenix Warriors: Rising from Ashes to Conquer",
        isPublished: true,
        location: {locationName: "Tokyo"},
        subCategory: {subCategoryName: "NFC West"}
    }
]

function renderComponentWithArticlesFromBackend(){
    render(
        <AdminArticlesList />
    )
}

async function getFirstArticle(){
    const cards = await screen.findAllByRole("card")

    return cards[0]
}
describe("ArticlesList tests", () => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST
    createServer([
        {
            path: `${backendHost}/Article/GetPageOfArticlesByCategory`,
            res: () => articlesFromBackend
        }
    ])

    test("component should render a list of articles", async () =>{
        renderComponentWithArticlesFromBackend()

        const articles = await screen.findAllByRole("img")

        expect(articles).toHaveLength(3)
    })

    test("2 articles should be published", async () =>{
        renderComponentWithArticlesFromBackend()

        const publishedArticles = await screen.findAllByText("Published")

        expect(publishedArticles).toHaveLength(2)
    })

    test("article card should have title, description, location, subCategory", async () =>{
        renderComponentWithArticlesFromBackend()
        const {title, mainText, location, subCategory} = articlesFromBackend[0]

        const firstArticle = await getFirstArticle()

        expect(firstArticle).toHaveTextContent(title)
        expect(firstArticle).toHaveTextContent(mainText)
        expect(firstArticle).toHaveTextContent(location.locationName)
        expect(firstArticle).toHaveTextContent(subCategory.subCategoryName)
    })
})
