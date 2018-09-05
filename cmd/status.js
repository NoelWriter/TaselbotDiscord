module.exports.run = async (client, message, args) => {
  message.channel.send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
}
module.exports.help = {
  name: "status",
  help: "Returns bot status on users, channels and guilds",
  usage: ">status",
}
