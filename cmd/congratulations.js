module.exports.run = async (client, message, args) => {
  if(args.length > 0) {
    message.delete().catch(owo=>{});
    message.channel.send("https://www.youtube.com/watch?v=1Bix44C1EzY");
    message.channel.send("CONGRATULATIONS " + args[0] + ", from " + message.author.tag);
  } else {
    message.delete().catch(owo=>{});
    message.channel.send("https://www.youtube.com/watch?v=1Bix44C1EzY");
  }
}
module.exports.help = {
  name: "congratulations",
  help: "Congratulates a user with the help of big man tyrone",
  usage: ">congratulations [@user]",
}
