module.exports.run = async (client, message, args) => {
    const config = require("../config.json");
    const path = require("path");
    const fs = require('fs');

    var data = fs.readFileSync(path.resolve(__dirname, "../mutes.json"));
    var json = JSON.parse(data);
    console.log(json);

    if(message.author.id !== config.ownerId) 
    return message.reply("Sorry, you don't have permissions to use this!");

    let isMuted = false;
    let existingElement;
    json.mutedIds.forEach(element => {
        if(element == args[0]) {
            isMuted = true;
            existingElement = element;
        } 
    });

    if (!isMuted) {
        json.mutedIds.push(args[0]);
        fs.writeFile(path.resolve(__dirname, "../mutes.json"), JSON.stringify(json))
        message.reply("User added to pMuted list");
    } else {
        json.mutedIds.splice(json.mutedIds.indexOf(existingElement), 1);
        fs.writeFile(path.resolve(__dirname, "../mutes.json"), JSON.stringify(json))
        message.reply("User removed from pMuted list");
    }

  }
  module.exports.help = {
    name: "pmute",
    help: "Global mutes a user",
    usage: ">pmute UID"
  }
  