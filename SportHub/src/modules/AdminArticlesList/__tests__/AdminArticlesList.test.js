import React from 'react'
import { render, screen } from '@testing-library/react'
import AdminArticlesList from '../index'

const articlesFromBackend =  [
    {
        imageUrl: "https://api.time.com/wp-content/uploads/2017/03/panda-black-white-study.jpg",
        mainText: "The Black Panther team has emerged as an unstoppable force in the world of sports, captivating audiences with their awe-inspiring athleticism, unrivaled skill, and unyielding determination. This talented group of individuals has not only redefined the game but has also shattered records and established themselves as true champions. In this article, we will delve into the extraordinary journey of the Black Panther team, examining their rise to prominence, their remarkable achievements, and the enduring legacy they have created.",
        title: "Dominant Black Panther Team Continues to Reign Supreme in the Sporting World",
        isPublished: false,
        location: "Kiev",
        subCategory: "AFC South"
    },
    {
        imageUrl: "https://www.macmillandictionaryblog.com/wp-content/uploads/2019/07/148640-1024x680.jpg",
        mainText: "Experience the thrill and excitement as the Lightning Strikers dominate the soccer field with their lightning-fast speed, impeccable teamwork, and unmatched goal-scoring abilities. In this article, we explore the rise of the Lightning Strikers, their unforgettable victories, and the electrifying legacy they leave behind.",
        title: "The Lightning Strikers: Unleashing the Power of Speed",
        isPublished: true,
        location: "Manchester",
        subCategory: "Premier League"
    },
    {
        imageUrl: "data:image/jpeg;base64,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",
        mainText: "Discover the unstoppable force that is the Phoenix Warriors! With their fiery determination, unyielding strength, and exceptional skills, they have conquered the world of martial arts. This article takes you on an exhilarating journey through the rise of the Phoenix Warriors, their relentless battles, and the legacy they have forged in the realm of combat sports.",
        title: "Phoenix Warriors: Rising from Ashes to Conquer",
        isPublished: true,
        location: "Tokyo",
        subCategory: "NFC West"
    }
]

function renderComponentWithArticlesFromBackend(){
    render(<AdminArticlesList articles={articlesFromBackend}/>)
}

function getFirstArticle(){
    return screen.queryAllByRole("img")[0].parentNode
}
describe("ArticlesList tests", () => {

    test("component should render a list of articles", () =>{
        renderComponentWithArticlesFromBackend()

        const articles = screen.getAllByRole("img")

        expect(articles).toHaveLength(3)
    })

    test("2 articles should be published", () =>{
        renderComponentWithArticlesFromBackend()

        const publishedArticles = screen.getAllByText("Published")

        expect(publishedArticles).toHaveLength(2)
    })

    test("article card should have title, description, location, subCategory", () =>{
        renderComponentWithArticlesFromBackend()
        const {title, mainText, location, subCategory} = articlesFromBackend[0]

        const firstArticle = getFirstArticle()
        const articleTextContent = firstArticle.textContent

        expect(articleTextContent).toMatch(title)
        expect(articleTextContent).toMatch(mainText)
        expect(articleTextContent).toMatch(location)
        expect(articleTextContent).toMatch(subCategory)
    })
})
