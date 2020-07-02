const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require('./config.json');
var prefix = config.prefix;
const ping = require('minecraft-server-util');


//avisar que o bot tá on
client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
  //O numero de activies tem que ser igual ao numero de actions
  let activities = [
    `Utilize ${config.prefix}help para obter ajuda`,
    `${client.guilds.cache.size} servidores!`,
    `${client.channels.cache.size} canais!`,
    `${client.users.cache.size} usuários!`,
    `em Seu servidor`
  ]
  let actions = [
    `WATCHING`,
    `PLAYING`,
    `LISTENING`,
    `PLAYING`,
    `PLAYING`
  ],
  i = 0;
  j = 0;
setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: `${actions[j++ % actions.length]}`
    }), 1000*10);  // WATCHING, LISTENING, PLAYING, STREAMING
 //Seta o Status do bot
client.user
    .setStatus("online") // idle = ausente, dnd = ocupado, online, invisible
    .catch(console.error);
  
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type !== "dm") return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  if (comando === "quest") {
    try {
      message.channel.send("O céu é azul?")
      message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
          //max = maximo
          //time = tempo em que vai ser coletado contado em milisegundos 1000 * 30 = 30 segundos
          if (collected.first().content.toLowerCase() == 'sim') {
            console.log(collected.first().content) //valor digitado pelo membro
            message.reply('Parabens você acertou');
          }
          else
            message.reply('Tente novamente digitando uma resposta valida');
        }).catch(() => {
          message.reply('Você não pode ultrapasar os 30 segundos.');
        });

    } catch (err) {
      console.log(err)
    }
  }

});

//sistema de separar comandos
client.on("message", async mg => {
    if (mg.author.bot) return;
    if (mg.channel.type === "dm") return;
    if (!mg.content.startsWith(prefix)) return;
    if (mg.content.startsWith(`<@!${client.user.id}>`) || mg.content.startsWith(`<@${client.user.id}>`)
    ) return;
  
    let args = mg.content.split(" ").slice(1);
    let command = mg.content.split(" ")[0];
    command = command.slice(prefix.length);
    try {
      let commandFile = require(`./commands/${command}.js`);
      delete require.cache[require.resolve(`./commands/${command}.js`)];
      return commandFile.run(client, mg, args);
    } catch (err) {
      console.error("Erro:" + err);
    }
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
