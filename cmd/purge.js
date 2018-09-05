module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.reply("Sorry, you don't have permissions to use this!");
  } else {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`))
  }
}
module.exports.help = {
  name: "purge",
  help: "Purges a gives amount of messages",
  usage: ">purge [amount of messages]",
}
