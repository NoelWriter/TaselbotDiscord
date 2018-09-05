module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("Sorry, you don't have permissions to use this!");

    //if (message.author.id === client.User.id) return // To statisfy our styleguide :P
    var util = require('util')
    try {
      var returned = eval(args) // eslint-disable-line no-eval
      var str = util.inspect(returned, {
        depth: 1
      })
      if (str.length > 1900) {
        str = str.substr(0, 1897)
        str = str + '...'
      }
      str = str.replace(new RegExp(client.token, 'gi'), '( ͡° ͜ʖ ͡°)') // Because some frog broke this string with a shruglenny
      message.channel.sendMessage('```xl\n' + str + '\n```').then((ms) => {
        if (returned !== undefined && returned !== null && typeof returned.then === 'function') {
          returned.then(() => {
            var str = util.inspect(returned, {
              depth: 1
            })
            if (str.length > 1900) {
              str = str.substr(0, 1897)
              str = str + '...'
            }
            ms.edit('```xl\n' + str + '\n```')
          }, (e) => {
            var str = util.inspect(e, {
              depth: 1
            })
            if (str.length > 1900) {
              str = str.substr(0, 1897)
              str = str + '...'
            }
            ms.edit('```xl\n' + str + '\n```')
          })
        }
      })
    } catch (e) {
      message.channel.sendMessage('```xl\n' + e + '\n```')
}
}
module.exports.help = {
    name: "eval",
    help: "Executes arbitrary javascript",
    usage: ">eval [javascript]",
}
  