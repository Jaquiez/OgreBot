module.exports = {
    name: 'unban',
    description: 'Unbans a member from their user ID',

    // Unbans a member from their user ID, can't unban from @ mention
    // Also, can't @ mention a member in chat after they have been unbanned because they aren't in the server anymore
    execute(message, args) {
        const member = args[0];

        if (!member) {
            message.channel.send('Please enter a User ID');
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member);
            })
            message.channel.send('The user has been unbanned. Don\'t fuck up.');
        } catch (e) {
            message.channel.send('An error has occured');
        }
    }
}