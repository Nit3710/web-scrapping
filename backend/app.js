const express = require("express")
const app = express();
const axios = require("axios")
const cors=require("cors")
const cheerio = require('cheerio');
app.use(cors({origin:"http://localhost:3000"}))
app.get("/scrap", async (req, res) => {
    const url = "http://books.toscrape.com";
    try {
        const { data } = await axios.get(url);
        // console.log("response>>>>>",data);
        // res.json(data);
        const $ = cheerio.load(data);
        const scrapData = [];
        $(".product_pod").each((index, element) => {
            const title = $(element).find("h3 a").attr("title");
            const price = $(element).find(".price_color").text();
            scrapData.push({ title, price });
        });
        console.log("scrapped data>>>>", scrapData)
        res.json(scrapData)
    }
    catch (err) {
        console.log("error while scrapping data>>>>>>", err)
    }
})
app.listen(4000, () => {
    console.log("app is running on port 4000")
})