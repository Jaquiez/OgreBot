module.exports = {
    name: 'clear',
    description: 'Clears the entire queue of songs',
    permissions: [],
    async execute(client, message, args, Discord, queue) {
        const serverQueue = await queue.get(message.guild.id);
        if (serverQueue) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Queue`)
                .setDescription(`**${serverQueue.songs.length} songs have been cleared!**`)
                .setColor('#7508cf')
            message.channel.send(embed);
            serverQueue.songs = [];
            if (serverQueue.connection.dispatcher !== null) {
                serverQueue.connection.dispatcher.end();
                //queue.delete(message.guild.id);
            }
            else {
                message.channel.send("An error occured");
                queue.delete(message.guild.id);
            }
        }
        else {
            return message.channel.send("There are no songs in queue bruh.")
        }
    }
}