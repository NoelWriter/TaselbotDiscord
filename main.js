const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const embed = new Discord.RichEmbed();
const randomCat = require('random.cat.js');
const randomCatApi = randomCat.api();
const fs = require('fs');
const path = require("path");

bot.commands = new Discord.Collection();

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
  bot.user.setActivity(`with CosmicWolf#0001, >help`);
});

bot.on("message", async message => {
  if(message.author.bot) return;

  var data = fs.readFileSync(path.resolve(__dirname, "./mutes.json"));
  var json = JSON.parse(data);
  json.mutedIds.forEach(element => {
    if(message.author.id == element){
      console.log("message catched from " + message.author.username);
      message.delete().catch(owo=>{});
      return;
    }
  });
  

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
    if(cmd){ 
      cmd.run(bot, message, args)
      .catch(console.error); 
      console.log(message.author.id + " " + message.author.username + " used command " + command); 
    } else { 
      console.log("not a command!")
    }
  }
});

bot.login(config.token);
