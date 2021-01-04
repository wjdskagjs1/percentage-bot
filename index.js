const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const article = fs.readFileSync("README.md").toString();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const {content, channel, author} = msg;

    if(channel.name !== '확률-봇-채널' || author.bot ){
        return;
    }
    if(content.includes('도움말')){
        channel.send("\`\`\`"+article+"\`\`\`");
        return;
    }

    const value = getRandomInt(0, 100);
    let res = '';

    if(content.endsWith('확률은?')){
        res += content.replace('?', '');
        res += ' '
        res += `${value}% 입니다.`;
    }else{
        res += '그 확률은';
        res += ' ';
        res += `${value}% 입니다.`;
    }
    channel.send(res);
    
});

client.login(process.env.TOKEN);