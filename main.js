const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const embed = new Discord.RichEmbed();
const randomCat = require('random.cat.js');
const randomCatApi = randomCat.api();
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

try {
    var request = require("request");
} catch (e) {
    console.log("Can't request request, sorry. reason:" + e)
}

fs.readdir("./cmd/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop()=== "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  bot.user.setActivity(`with CosmicWolf#0001, Use >help for help`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let cmd = bot.commands.get(command);

  if(command === "help") {
    if (args[0]) {
      args[0] = args[0].toLowerCase();
      let cmd = bot.commands.get(args[0]);
      if(cmd){ message.author.send({embed : {
        color: (133, 0, 255),
        title: ">" + cmd.help.name,
        fields: [{
          name: "Info",
          value: "```" + cmd.help.help + "```",
        },{
          name: "Usage",
          value: "```" + cmd.help.usage + "```"
        }],
        footer: {
          icon_url: bot.user.avatarURL,
          text: "© Taselbot 2018",
          timestamp: new Date(),
        }
      }}); } else { message.reply("not a command!")}
    } else {
      message.author.send({embed: {
        color: (133, 0, 255),
        title: "Help",
        author: {
          name: "👑 List of commands 👑",
        },
        fields: [{
          name: "🛠️-Admin",
          value: "```Ban \nKick \nMute \nStatus \nPurge \nInvite \nNsfwstatus```"
        },{
          name: "😁-Fun",
          value: "```Meow \nWoof \nInsult \nCongratulations \nAdvice \nSog \n8Ball \nCyka```"
        },{
          name: "🔆-Useful",
          value: "```Crypto```"
        },{
          name: "🔞-NSFW",
          value: "```Rule34 \nE621```"
        },{
          name: "Note",
          value: "```Prefix : '>'\nUse >help [command] for more info and usage```"
        }
        ],
      timestamp: new Date(),
      footer: {
        icon_url: bot.user.avatarURL,
        text: "© Taselbot 2018",
        timestamp: new Date(),

        }}
      });
    }
  } else {
    if(cmd){ cmd.run(bot, message, args); } else { console.log("not a command!")}
  }


//
//   if(command === "kick") {
//     if(!message.member.hasPermission("ADMINISTRATOR"))
//       return message.reply("Sorry, you don't have permissions to use this!");
//
//     let member = message.mentions.members.first();
//     if(!member)
//       return message.reply("*uwu*, twat ish no wember sawwy");
//     if(!member.kickable || args[0] == "<@77332086087757824>" || args[0] == "@CosmicWolf#9999" || args[0] == "<@!77332086087757824>")
//       return message.reply("I canno kiwk twis uwuser. Dos hew havwe a hiwwer rowole?");
//
//     let reason = args.slice(1).join(' ');
//     if(!reason)
//       return message.reply("Pwease indicwate a weason fur the kwick!");
//
//     await member.kick(reason)
//       .catch(error => message.reply(`Sowwy dwady ${message.author} I culd no kwick becwause of : ${error}`));
//     message.reply(`*notices viowolation*. ${member.user.tag} has been kwicked by ${message.author.tag} becwause: ${reason}`);
//
//   }
//
//   if(command === "ban") {
//     if(!message.member.hasPermission("ADMINISTRATOR"))
//       return message.reply("Sorry, you don't have permissions to use this!");
//
//     let member = message.mentions.members.first();
//     if(!member)
//       return message.reply("*uwu*, That's no member");
//     if(!member.bannable || args[0] == "<@77332086087757824>" || args[0] == "@CosmicWolf#9999" || args[0] == "<@!77332086087757824>")
//       return message.reply("I can't ban this user. Does he have a higher role?");
//
//     let reason = args.slice(1).join(' ');
//     if(!reason)
//       return message.reply("Please indicate a reason for the ban");
//
//     await member.ban(reason)
//       .catch(error => message.reply(`Sorry daddy ${message.author} I couldn't ban this user because of : ${error}`));
//     message.reply(`*notices viowolation*. ${member.user.tag} has been banned by ${message.author.tag} becwause: ${reason}`);
//   }
//
//   if(command === "woof") {
//     request("http://random.dog/woof", function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             if (typeof (body) != "undefined") {
//                 message.channel.send("http://random.dog/" + body);
//               } else {
//                 message.channel.send("Things are going wrong all over.");
//               }
//         } else {
//           message.channel.send(error);
//         }
//     });
//   }
//
//   if(command === "meow") {
//     randomCatApi.getCat().then((cat) => message.channel.send(cat.file))
//   }
//
//   if(command === "sog") {
//     message.channel.send(`Studie Ontwijkend Gedrag Inbound`, {
//       files: [
//         "./assets/SOG_2.gif"
//       ]
//     })
//   }
});

bot.login(config.token);
