var Scraper = require('images-scraper');
const fetch = require("node-fetch");
const jsdom = require("jsdom");
module.exports = {
    name: 'ud',
    description: 'Gets the urban dictionary definition of a word/term',
    permissions: [],

    async execute(client, message, args, Discord) {
        var balls = "";
        for (var word of args) {
            balls += word + " ";
        }
        const url = "https://www.urbandictionary.com/define.php?term=" + balls;
        fetch(url).then(async function (response) {
            // The API call was successful!
            return response.text();
        }).then(async function (html) {
            // This is the HTML from our response as a text string    
            const dom = new jsdom.JSDOM(html);
            try {
                var definition = dom.window.document.getElementsByClassName("meaning").item(0).textContent;
                var word = dom.window.document.getElementsByClassName("word").item(0).textContent;
                if (definition.length > 2000) {
                    definition = definition.substring(0, 2000);
                }
                const embed = new Discord.MessageEmbed()
                    .setTitle('Urban Dictionary - ' + word)
                    .setDescription(definition)
                    .setColor('#093396')
                    .setImage("https://miro.medium.com/max/4000/1*ctUugc4pAxlLweBOxzySLg.png")
                message.channel.send(embed);
            }
            catch (e) {
                message.channel.send("This word ain't defined..");
            }
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
        

    }
}