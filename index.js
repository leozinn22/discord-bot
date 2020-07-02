const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require('./config.json');
var prefix = config.prefix;
const ping = require('minecraft-server-util');


//sistema de separar comandos
  client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
       .trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
 }
});

//avisar que o bot tá on
client.on("ready", () => {
    console.log(`O bot foi iniciado !`);
    });

    //bem vindo 
client.on("guildMemberAdd", async (member) =>{
    let guild = client.guilds.cache.get("id da sua guild"); 
    let channel = client.channels.cache.get("id do canal"); 
    if(guild !=member.guild){
      return console.log('Sai daqui, você não é do meu servidor');
    } else{
          let embed = new Discord.MessageEmbed()
          .setColor('#191970')
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setTitle(`Boas Vindas`)
          .setImage('url/caminho da sua imagem')
          .setDescription(`${member.user} Boas-vindas ao servidor ${guild.name} ! Atualmente estamos com ${member.guild.memberCount} membros`)
          .setThumbnail(member.user.displayAvatarURL({dynamic:true, format:"png",size:1024}))
          .setFooter('ID do usuário'  + member.user.id)
          await channel.send(embed)
          
    }
  });

  
  client.on("messageReactionAdd", async (reaction, user,) =>{
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if (reaction.message.channel.id === "id do canal que vai ser lido as reações") { 
      if (reaction.emoji.name === '🆗') {
        await reaction.message.guild.members.cache.get(user.id).roles.add("id da role(cargo)"); 
      }
    }
  });
  
  
  client.on("messageReactionRemove", async (reaction, user) =>{
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if (reaction.message.channel.id === "id do canal que vai ser lido as reações") { 
      if (reaction.emoji.name === '🆗') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove("id da role(cargo)"); 
      }
    }
  });














    client.login(config.token)
