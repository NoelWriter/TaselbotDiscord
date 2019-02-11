module.exports.run = async (client, message, args) => {
    const superagent = require('superagent');
    var alineas = 7;
    var query = {SM_API_KEY: "5597FDAB4F", SM_URL: args[0]}
    if(args[1]){
        alineas = args[1];
        query = {SM_API_KEY: "5597FDAB4F", SM_URL: args[0], SM_LENGTH: alineas}
    }

    if(!args[0]){
        message.reply("Please include a webadress");
        return;
    }
    else {
        superagent.post("https://api.smmry.com/")
        .query(query)
        .end((err, res) => {
            if (!err && res.status === 200 && res) {
                var result = res.body;
                if (result.sm_api_error){
                    console.log(res);
                    message.reply("The API returned " + result.sm_api_message.toLowerCase())
                    return;
                }
                if (result.sm_api_content.length > 1950) {
                    message.reply("This summary is not summed up enough to send it on discord.")
                }
                else if(result.sm_api_content.length > 800){
                    let split = result.sm_api_content.split("\.");
                    let halfWayThough = Math.floor(split.length / 2);
                    let arrayFirstHalf = split.slice(0, halfWayThough);
                    let arraySecondHalf = split.slice(halfWayThough, split.length);
                    let array1 = arrayFirstHalf.join();
                    let array2 = arraySecondHalf.join();
                    for(var i=0;i<array1.length;i++){
                        array1[i]=array1[i] + ".";
                    }
                    for(var i=0;i<array2.length;i++){
                        array2[i]=array2[i] + ".";
                    }
                    console.log(array1);
                    message.channel.sendMessage({embed :{
                        color: 0x6832e3,
                        title: result.sm_api_title,
                        url: args[0],
                        timestamp: new Date(),
                        fields: [
                          {name: 'Summary', value: `\`\`\`${array1}\`\`\``},
                          {name: ' 󠀀󠀀', value: `\`\`\`${array2}\`\`\``},
                          {name: 'Reduced by', value: `${result.sm_api_content_reduced}`},
                          {name: 'Characters', value: `${result.sm_api_character_count}`},
                        ]
                    }})
                } else {
                    message.channel.sendMessage({embed :{
                        color: 0x6832e3,
                        title: result.sm_api_title,
                        url: args[0],
                        timestamp: new Date(),
                        fields: [
                          {name: 'Summary', value: `\`\`\`${result.sm_api_content}\`\`\``},
                          {name: 'Reduced by', value: `${result.sm_api_content_reduced}`},
                          {name: 'Characters', value: `${result.sm_api_character_count}`},
                        ]
                    }})
                }
            }
            else {
                message.reply('The API returned an unconventional response.' + err)
            }
        })
    }
  }
  module.exports.help = {
    name: "summary",
    help: "Summarizes any pdf you feed it, the pdf has to be supplied in the form of a webhosted pdf.",
    usage: ">summary [webadress] (Amount of alinea's) "
  }
  