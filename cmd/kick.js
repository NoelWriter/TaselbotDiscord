const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  let modlog = message.guild.channels.find(x => x.name === "mod-log");
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor('#ffc700')
  .setTimestamp()
  .setDescription(`**Action:** Kick\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.reply("Sorry, you don't have permissions to use this!");

  if(!member.kickable || args[0] == "<@77332086087757824>" || args[0] == "@CosmicWolf#9999" || args[0] == "<@!77332086087757824>")
  return message.reply("I cannot kick this user, does he have a higher role?");

  await member.kick(reason).then(() => {
    client.channels.get(modlog.id).send({embed}).catch(console.error);
  })
  .catch(error => message.reply(`Sorry daddy ${message.author} I could not kick this member: ${error}`));
}
module.exports.help = {
  name: "kick",
  help: "Kicks a member",
  usage: ">kick [@user]",
}
