const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  let modlog = message.guild.channels.find(x => x.name === "mod-log");
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor('#ff0043')
  .setTimestamp()
  .setDescription(`**Action:** Ban\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  message.delete().catch(owo=>{});
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.reply("Sorry, you don't have permissions to use this!");

  if(!member.bannable || args[0] == "<@77332086087757824>" || args[0] == "@CosmicWolf#0001" || args[0] == "<@!77332086087757824>")
  return message.reply("I can't ban this user. Does he have a higher role?");

  await member.ban(reason).then(() => {
    client.channels.get(modlog.id).send({embed}).catch(console.error);
  })
  .catch(error => message.reply(`Sorry ${message.author} I couldn't ban this user because of : ${error}`));
}
module.exports.help = {
  name: "ban",
  help: "Ban's a member",
  usage: ">ban [@user]"
}
