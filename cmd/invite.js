module.exports.run = async (client, message, args) => {
  message.delete().catch(owo=>{});
  message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=407220057505267733&permissions=8&redirect_uri=http%3A%2F%2Fplspetdoge.com%2F&scope=bot");
}
module.exports.help = {
  name: "invite",
  help: "Returns an invite link for adding the bot",
  usage: ">invite",
}
