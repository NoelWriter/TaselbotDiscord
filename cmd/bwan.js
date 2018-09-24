const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  if (reason.length < 1) return message.reply('Pwease indicwate a weason fur the bwan!').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('*uwu*, twat ish no wember sawwy').catch(console.error);

  message.delete().catch(owo=>{});
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.reply("Sowwy >~<, you dowon't hav pwermwisswions to uwuse twhis! >->");

  if(!member.bannable || args[0] == "<@77332086087757824>" || args[0] == "@CosmicWolf#0001" || args[0] == "<@!77332086087757824>")
  return message.reply("I canno kiwk twis uwuser. Dos hew havwe a hiwwer rowole?");

  message.reply(`*notices viowolation*. ${member.user.tag} has been bwanned o.o by ${message.author.tag} ^3^ becwause: ${reason} x.x`);
}
module.exports.help = {
  name: "bwan",
  help: "Bwan's a member",
  usage: ">bwan [@user]"
}
