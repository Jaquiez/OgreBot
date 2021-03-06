
module.exports = {
    name: 'skip',
    description: 'skips the song playing in the bot',
    permissions: [],

    async execute(client, message, args, Discord, queue) {
        const serverQueue = await queue.get(message.guild.id);
        if (!message.member.voice.channel)
            return message.channel.send("You have to be in a voice channel to stop the music!");
        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
        try {
            await serverQueue.connection.dispatcher.end();
        }
        catch (err) {
            console.error("SKIP ERROR OCCURED \n", err);
            message.channel.send("An error occured");
        }

    }
}