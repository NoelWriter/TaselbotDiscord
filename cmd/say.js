module.exports.run = async (client, message, args) => {
  const config = require("../config.json");
    if(message.author.id !== config.ownerId) 
    return message.reply("Sorry, you don't have permissions to use this!");
  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.reply("Sorry, you don't have permissions to use this!");

  } else {
    const sayMessage = args.join(" ");
    message.delete().catch(owo=>{});
    message.channel.send(sayMessage);
  }
}
module.exports.help = {
  name: "say",
  help: "Repeats the sentence as if the bot were saying it",
  usage: ">say [sentence]"
}
