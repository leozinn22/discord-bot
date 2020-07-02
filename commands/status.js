const Discord = require('discord.js');
const ping = require('minecraft-server-util')




module.exports.run = async (client, message, member, guild) => {
 
            ping('redeexplore.com.br', (error,response) => {
                if(error) throw error
                const Embed = new Discord.MessageEmbed()
                
                .setTitle('**Ip: redeexplore.com.br**')
                .addField('Jogadores online', response.onlinePlayers)
                .addField('Versão do servidor', response.version)
                .setColor('#191970')
                .setAuthor('RedeExplore', "https://images-ext-1.discordapp.net/external/MR8bSiU8ch1rlpg9hQdclu9XTpL7BlctTYMGjcOyBlw/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/720078236276490350/bf49c108121a0fbe3b351ea0f3a3444e.png")
                .setThumbnail(message.member.guild.iconURL({dynamic:true, format:"png",size:1024}))
                message.channel.send(Embed)
                });
        };
 