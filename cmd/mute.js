const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  let modlog = message.guild.channels.find('name', 'mod-log');
  let muteRole = message.guild.roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor("#42adf4")
  .setTimestamp()
  .setDescription(`**Action:** Un/mute\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (member.roles.has(muteRole.id)) {
    member.removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("Cannot remove muted role: " + e));
  } else {
    member.addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("Cannot add muted role: " + e));
  }
}
module.exports.help = {
  name: "mute",
  help: "Mutes a member, needs a Muted role and a mod-log text channel to work",
  usage: ">mute [@user]"
}
