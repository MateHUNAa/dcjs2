const commando = require('discord.js-commando');
const szinek = require("./colours.json")
const emo = require("./emoji.json")
const discord = require('discord.js');
const moment = require('moment')
var bot = new commando.Client ({
    owner: '393380978766381061',
    disabledEvryone: true,
    commandPrefix: '!',
    unknownCommandResponse: false,
    invite: 'https://discord.gg/wUXP5UX',
});


/*
bot.on("message", message => {
  if (message.content.startsWith(prefix + "role")) {
  var server = message.guild;
  server.createRole().then(role => {
   let rolee = server.roles.find(role => role.name === "new role").setName("Admin").setColor(szinek.világos_piros)
  })
  }
});
*/













bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1);

  if (cmd === `${prefix}report`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channelsend("Nem talált felhasználó!");
    let reson = args.join(" ").slice(22);

    let reportEmbed = new discord.RichEmbed()
    .setDescription("Reports")
    .setColor(szinek.világos_piros)
    .addField('Reportólt user ', `${rUser} ID: ${rUser.id}`)
    .addField('reportot küldte: ', `${message.author} ID: ${rUser.id}`)
    .addField('Time: ', moment().format('YYYY, MMMM, hh:mm:ss'))
    .addField('Indok: ', reson)
    let repch = message.guild.channels.find(channel => channel.name === 'reportlog')
    repch.send(reportEmbed)
    return;
  }
})













bot.on("message", message => {
  if (message.content.toLowerCase() === prefix + "userinfo") {
    const uembed = new discord.RichEmbed()
    .setColor(szinek.világos_kék)
    .setTitle("User Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Info: `, message.author.displayAvatarURL)
    .addField("**UserName:**", `${message.author.username}`, true)
    .addField("**#ID:**", `${message.author.discriminator}`, true)
    .addField("**DevID:**", `${message.author.id}`, true)
    .addField("**SztátUsZ:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${moment(message.author.createdAt).format('YYYY, MMMM, hh:mm:ss')}`, true)
    .setFooter(`${bot.user.username} | !/Mééz\!`, bot.user.displayAvatarURL);
    message.channel.send({embed: uembed});
  }
})





















//registry
bot.registry.registerGroup("parancsok", "Parancsok");
bot.registry.registerDefaults();
//bot.registry.registerGroups();
bot.registry.registerCommandsIn(__dirname + "/commands");
//registry vége 

bot.on("message", message => {
  if (message.content.toLowerCase() === prefix + "serverinfo") {
    const EmbedAmyad = new discord.RichEmbed()
    .setTitle("Szerver Info")
    .setDescription(`parancsok meg hívta: ${message.author.toString()}`)
    .addField("[Szerver Készítette]", message.guild.owner.user.tag)
    .addField("[Regio]", message.guild.region)
    .addField("[Szerver Neve]", message.guild.name)
    .addField("[Létszám]", `Total members ${message.guild.memberCount}\n members: ${message.guild.members.filter(m => !m.user.bot).size}`)
    message.channel.send(EmbedAmyad)
  }
})

bot.on("message", message => {
  if (message.content.toLowerCase() === prefix + "botinfo") {
    const botinfos = new discord.RichEmbed()
    .setTitle("Bot Info")
    .addField("Bot név", bot.user.username)
    .addField("[Bot létrehozásának napja]", moment(bot.user.createdAt).format('YYYY, MMMM, h:mm:ss'))
    .addField("[Szerverek]", bot.guilds.size)
    message.channel.send(botinfos)
  }
})



//Console Chatter -------------------------

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("705443215083569173").send(x.join(" "));
});

//Console Chatter vege --------------------

//Changing Status -------------------------

let activNum = 0;
setInterval(function() {
    if (activNum === 0 ) {
       bot.user.setActivity("✔️Creator:!/Mééz\\!MateHUN!/Mééz\\!#2427✔️", {type: "WATCHING"});
       activNum = 1;
     } else if (activNum === 1) {
       bot.user.setActivity(`✍️!help✍️`, {type: "WATCHING"});
       activNum = 0;
     }
}, 3*10000);

//Changing Status -------------------------

const serverStats = {
  guildID: '675315478624731136',
  totalUsersID: '710336403891945543',
  memberCountID: '710336554467590187',
  botCountID: '710336436402127008',
}

bot.on("guildMemberAdd", member => {
  if(member.guild.id !== serverStats.guildID) return;
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
});

bot.on("guildMemberRemove", member => {
  if(member.guild.id !== serverStats.guildID) return;
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
});
bot.on("message", message => {
const guild = bot.guilds.get('675315478624731136');
/*console.log(`${onEmoji} ${onlineCount}`)
console.log(`${dndEmoji} ${dnd}`)
console.log(`${offEmoji} ${Offline}`)*/
if (message.content === prefix + `info`) {
  let userCount = guild.memberCount;
let onlineCount = guild.members.filter(m => m.presence.status === 'online').size
let Offline = guild.members.filter(m => m.presence.status === 'offline').size
let dnd = guild.members.filter(m => m.presence.status === 'dnd').size
    message.channel.send(`Online members ${emo[":online"]} ${onlineCount}`)
    message.channel.send(`DnD members ${emo[":dnd"]} ${dnd}`)
    message.channel.send(`Offline members ${emo[":offline"]} ${Offline}`)
}

});
setInterval(function(){ 
  bot.channels.get("711078769045143615").setName(`Time ${moment().format('LT')}`)
}, 60*1000);


//idul --------------------------------------------------
bot.on("ready", () => {
  bot.channels.get("711078769045143615").setName(`Time ${moment().format('LT')}`)
    console.log("A Bot Sikeressen Elindult! Ekkor:"+ "\n" + "\n" + "\n" + "\n" + "\n" + "\n" );
});
//Inul vége ---------------------------------------------

moment.locale("hu")



/*
bot.on("message", message => {
  if (message.content.toLowerCase() === prefix + "time") {
        const sTime = new discord.RichEmbed()
    .addField("Jelenlegi idő:", moment().format('LTS'))
    message.channel.send(sTime)
  }
})
*/







//Segéd -------------------------------------------------
const prefix = "!"

const tok = process.env.token;

bot.login(tok).catch(err => console.log(err));

//Segéd vége --------------------------------------------


bot.on("message", message => {
    if (message.content.toLowerCase() === prefix + "emo") {
        const dEmbed = new discord.RichEmbed()
        .addField("**Test**", "Ez egy Test Field")
        .setDescription(`${emo[":D"]}Parancsot meg hívta ${emo[":D"]} :\n ${message.author.toString()}`)
        .setColor(szinek.világos_piros)
        .setTitle(`${emo[":kpipa"]}Ez egy Test Embed ${emo[":kpipa"]}`)
        message.channel.send(dEmbed)
    }
});
bot.on("message", message => {
    if (message.content.startsWith(`${prefix}emo`)) {
        message.channel.send(`${emo[":pipa"]}Parancsod Elfogadva${emo[":pipa"]}`)
        message.react(emo[":pipa"])
    }
});


//Clear Chat -------------------------------------------------------------------
bot.on("message", message => {
  let kuldo = message.author;
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);
  if (message.content.startsWith(prefix + "cc")) {

      async function purge() {
          message.delete();
          if (!message.member.roles.find("name", "Mééz")) {
              message.channel.send("Nincs jogosultságod a használatához! :)))" + kuldo.toString());
              return;
          }
          if (isNaN(args[0])) {
              message.channel.send('Kérlek adj meg egy számot \n Használat :: !cc Szám');
              return;
          }

          const fetched = await message.channel.fetchMessages({limit: args[0]});
          console.log(fetched.size + ' Üzenet találva, törlés');

          message.channel.bulkDelete(fetched)
          .catch(error => console.log(`Error: ${error}`));
      }
      purge(message.channel.send(`${emo[":kpipa"]}Sikeres üzenet törlés ${emo[":kpipa"]}`));
  }
});

//Clear Chat vége -----------------------------------------

//Create Channel

bot.on(`message`, async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}createtext`)) {
    const args = message.content.slice(10);
    message.guild.createChannel(`${args}`, "text").then(channel => {
      channel.setTopic(`${message.author.toString()}Szobálya!`)
      channel.setParent('696533008957833246')
      console.log(`(${message.author.tag}) Létre hozta ezt a szobát: [${args}]`)
    })
  }
});

//Create Channel

//Create Channel

bot.on(`message`, async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}createvoice`)) {
    const args = message.content.slice(12);
    message.guild.createChannel(`${args}`, `voice`).then(channel => {
      channel.setTopic(`${message.author.toString()}Szobálya!`)
      channel.setParent('696533008957833246')
      console.log(`(${message.author.tag}) Létre hozta ezt a szobát: [${args}]`)
    })
  }
});

//Create Channel

//Counter Installálása

bot.on(`message`, async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}setupcounter`)) {
    var server = message.guild;
    server.createChannel(`Counter`, "category")
      server.createChannel(`Total Members:`, "voice")
      server.createChannel(`Members Counter:`, "voice")
      server.createChannel(`bot Counter:`, "voice").then(channel => {
        let categoryID = server.channels.find(channel => channel.name === 'Counter');
    server.channels.find(channel => channel.name === 'Total Members:').setParent(categoryID);
    server.channels.find(channel => channel.name === 'Members Counter:').setParent(categoryID);
    server.channels.find(channel => channel.name === 'bot Counter:').setParent(categoryID);
    message.channel.send("Annak érdekében, hogy ne tudjon senkise be menni a szobákba a Connect et Tiltsd le a @everyone rang nak!")
   })
  }
});

//Counter Számlálás
/*
const counterSystem = {
  guildID: '',
  totalUsersID: '',
  memberCountID: '',
  botCountID: ''
}
*/

/*    [NEM MÜKÖDIK!] [JAVÍTÁS RA SZORUL!]
bot.on("guildMemberAdd", member => {
  if(member.guild.id !== member.guild.id) return;
  bot.channels.get().setName(`Total Users: ${member.guild.memberCount}`)
  bot.channels.get().setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`)
  bot.channels.get().setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`)
});

bot.on("guildMemberRemove", member => {
  if(member.guild.id !== member.guild.id) return;
  bot.channels.get().setName(`Total Users: ${member.guild.memberCount}`)
  bot.channels.get().setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`)
  bot.channels.get().setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`)
});
*/


/*
bot.on(`message`, async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}setupserver`)) {
    var server = message.guild;
    server.createChannel(`Public Rooms`, "category")
      server.createChannel(`🔊Voice [1]`, "voice")
      server.createChannel(`🔊Voice [2]`, "voice")
      server.createChannel(`🔊Voice [3]`, "voice").then(channel => {
        let categoryID2 = server.channels.find(channel => channel.name === 'Public Rooms');
    server.channels.find(channel => channel.name === 'Voice [1]').setParent(categoryID2);
    server.channels.find(channel => channel.name === 'Voice [2]').setParent(categoryID2);
    server.channels.find(channel => channel.name === 'Voice [3]').setParent(categoryID2);
   })
  }
});
*/


bot.on("message", message => {
  if (message.content === prefix + "?time") {
    const timee = new discord.RichEmbed()
    .setTitle(moment().format('YYYY, MMMM, hh:mm:ss'))
    .addField("Idő: ", moment().format('LTS'))
    message.channel.send(timee)
  }
});