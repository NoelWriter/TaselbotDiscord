module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.reply("Sorry, you don't have permissions to use this!");
  } else {
    if(message.channel.nsfw) {
      message.reply("NSFW is allowed here");
    } else {
      message.reply("NSFW is *not* allowed here");
    }
  }
}
module.exports.help = {
  name: "nsfwstatus",
  help: "Returns nsfw status in current channel",
  usage: ">nsfwstatus"
}
