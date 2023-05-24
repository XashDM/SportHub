import axios from "axios"


const mainArticlesRequest = async (language) => {
    const backendHost = process.env.REACT_APP_BACKEND_HOST

    try {
        const response = await axios.get(`${backendHost}/Article/MainArticles?language=${language}`)

        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error.code
    }

    // return [
    //     {
    //         articleId: 1,
    //         title: "Real Madrid wins La Liga title",
    //         subtitle: "Zidane's side triumphs after a tense season",
    //         mainText:
    //             "Real Madrid has won the La Liga title after finishing top of the table in a tense season. Zinedine Zidane's side secured the title with a 2-1 victory over Villarreal on the final day of the season.",
    //         publishingDate: "2021-05-23",
    //         imageUrl: "https://source.unsplash.com/featured/300x201",
    //         author: "Oleh Kril",
    //         category: "NBA"
    //     },
    //     {
    //         articleId: 2,
    //         title: "Manchester City dominates Premier League",
    //         subtitle: "Guardiola's side cruises to title with record-breaking season",
    //         mainText:
    //             "Manchester City has won the Premier League title in style, with a record-breaking season that saw the team amass 100 points. Pep Guardiola's side won the title with several games to spare, highlighting their dominance over the competition.",
    //         publishingDate: "2018-05-13",
    //         imageUrl: "https://source.unsplash.com/featured/300x204",
    //         author: "Bohdan Malevich",
    //         category: "NNA"
    //     },
    //     {
    //         articleId: 3,
    //         title: "Simone Biles wins gold at Tokyo Olympics",
    //         subtitle: "American gymnast dominates with impressive performance",
    //         mainText:
    //             "Simone Biles has won gold at the Tokyo Olympics, cementing her status as one of the greatest gymnasts of all time. Biles put on a stunning performance in the women's all-around competition, earning the top score and beating out her competitors by a wide margin.",
    //         publishingDate: "2021-08-02",
    //         imageUrl: "https://source.unsplash.com/featured/320x201",
    //         author: "Beb Bebenko",
    //         category: "FBA"
    //     },
    //     {
    //         articleId: 4,
    //         title: "Serena Williams advances to Wimbledon final",
    //         subtitle: "Tennis star continues impressive run at the All England Club",
    //         mainText:
    //             "Serena Williams has advanced to the Wimbledon final with a commanding performance against her opponent. The tennis star, who is seeking her eighth Wimbledon title, looked strong throughout the match and will be the favorite heading into the final.",
    //         publishingDate: "2018-07-12",
    //         imageUrl: "https://source.unsplash.com/featured/500x201",
    //         author: "Solomia Vasilivna",
    //         category: "FVA"
    //     },
    //     {
    //         articleId: 5,
    //         title: "LeBron James leads Lakers to NBA championship",
    //         subtitle: "James named Finals MVP after impressive performance",
    //         mainText:
    //             "LeBron James has led the Los Angeles Lakers to the NBA championship, earning Finals MVP honors in the process. James put on a dominant performance in the Finals, helping the Lakers win their first championship in a decade.",
    //         publishingDate: "2020-10-11",
    //         imageUrl: "https://source.unsplash.com/featured/300x301",
    //         author: "Dude Petrovich",
    //         category: "FGA"
    //     }
    // ];
}

export default mainArticlesRequest
