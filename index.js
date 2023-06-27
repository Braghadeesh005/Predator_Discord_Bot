import {config} from 'dotenv'
import { ActionRowBuilder, Client , GatewayIntentBits, Routes, TextInputStyle , ModalBuilder, TextInputBuilder, InteractionType, ButtonStyle, ButtonBuilder, ModalSubmitFields, ModalSubmitInteraction } from 'discord.js';
import { REST } from '@discordjs/rest'
import { SelectMenuBuilder, time } from '@discordjs/builders';
import {spawn} from 'child_process'

import about from './commands/about.js'
import github from './commands/github.js'
import linkedin from './commands/linkedin.js'
import predict from './commands/predict.js'
import register from './commands/register.js'


let users = []; 

config({path: './config.env' })

// Client instance to load the built-in functionalities
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}); 
 
//Credentials
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

//REST-API For Connecting Interface of Bot with the Program
const rest = new REST({ version: '10' }).setToken(TOKEN);

//on - event listener , ready - a event which executes when the bot logged in (When bot is ready)
client.on('ready', () => console.log(`${client.user.tag} has logged in! `))

client.on('interactionCreate', async (interaction) => {

    if(interaction.isChatInputCommand()) {

        if(interaction.commandName == 'register'){
        

            if(!(users.includes(interaction.user.tag))){
            const modal = new ModalBuilder()
                .setTitle('Register User Form')
                .setCustomId('register')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Enter Your Name')
                            .setCustomId('username')
                            .setStyle(TextInputStyle.Short)
                    ),
                );
                interaction.showModal(modal);
            }
            else{
                interaction.reply({ content : 'Sorry, You have registered already'})
            }
        }
        else if(users.includes(interaction.user.tag)){

             
        if(interaction.commandName == 'github'){
            interaction.reply({ 
                content : 'Wanna know how I was created! ',
                components: [
                    
                    new ActionRowBuilder().setComponents(
                       
                        new ButtonBuilder()
                            .setLabel('Github-Bot')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://github.com/Braghadeesh005/House_Price_Prediction_ML_Bot'),
                        new ButtonBuilder()
                            .setLabel('Github-ML')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://github.com/Braghadeesh005/House_Price_Prediction')
                    ),

                ]
            })
        }
        else if(interaction.commandName == 'linkedin'){
            interaction.reply({ 
                content : " Visit my master's Linked-In Page",
                components: [
                    
                    new ActionRowBuilder().setComponents(
                       
                        new ButtonBuilder()
                            .setLabel('Linkedin-Profile')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://www.linkedin.com/in/braghadeesh-r-a-06a18a246')
                        ),

                ]
            }) 
        }
        else if(interaction.commandName == 'about'){
            interaction.reply({
                content : `This is a ML integrated Discord Bot which uses advanced ML algorithms to make predictions and classifications.\nThis is built using Discord.js.\nVirtual Python Environment is integrated with Javascript for using ML models.\nThis bot was hosted in Pylex was 24/7 bot availabilty.\nAs of now, only one prediction model has been deployed.\n\nAbout House Price Prediction:\n       This house price prediction algorithm uses Linear Regression to predict using USA_Housing Dataset. For more info-See the Github Repository.`
            })
        }
        else if(interaction.commandName == 'predict'){
            const modal = new ModalBuilder()
                .setTitle('Predict an House Price using ML')
                .setCustomId('predict')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Average Area Income')
                            .setCustomId('a')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Average House Age')
                            .setCustomId('b')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('No of Rooms')
                            .setCustomId('c')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('No of Bedrooms')
                            .setCustomId('d')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('Area Population')
                            .setCustomId('e')
                            .setStyle(TextInputStyle.Short)
                    )
                    
                );
                interaction.showModal(modal);
           
        }
               
        } 
        else {
            interaction.reply({ content : 'Sorry, Register First'})
        }
}

    if(interaction.type === InteractionType.ModalSubmit){
         users.push(interaction.user.tag)   
         console.log(users);
        if(interaction.customId === 'register'){
            const username = interaction.fields.getTextInputValue('username')
            console.log(username);
            interaction.reply({
                content : `Hi ${username}! I am Predator. \nI'm a ML-based Bot🤖 \nMy first task is to predict the pricing of a house🚀\n Try these Slash Commands🎉\n    /predict - Predicts the Price of the House you are expecting\n    /about - To know about me\n    /github - To visit my Github page\n    /linkedin - To visit the linkedin page`
            })
       
        } 
        else if(interaction.customId === 'predict'){
            
            var a = interaction.fields.getTextInputValue('a')
            var b = interaction.fields.getTextInputValue('b')
            var c = interaction.fields.getTextInputValue('c')
            var d = interaction.fields.getTextInputValue('d')
            var e = interaction.fields.getTextInputValue('e')        
            a = parseFloat(a)
            b = parseFloat(b)
            c = parseFloat(c)
            d = parseFloat(d)
            e = parseFloat(e)
            const data1 = {
                a:a,
                b:b,
                c:c,
                d:d,
                e:e,
            }
            const py = spawn('python',['./index.py',JSON.stringify(data1)]);
            py.stdout.on('data',(data)=>{
                console.log(data.toString());
                interaction.reply({
                    content : `The Predicted Value is $${Math.floor(data.toString())} \n Note: The Predictions are based on the dataset`
                })  
            })
      
        }
    }


});

// Function to handle slash commands
async function main() {

    //Slash Commands
    const commands = [
        about,
        predict,
        register,
        linkedin,
        github
    ];    
    
    try 
    {
        console.log('Started refreshing application (/) commands.');
        //to connect the Server with the program with REST Api
        await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), 
        {
            body: commands,
        });

        //To login the Bot
        client.login(TOKEN);

    }
    catch (err)
    {
        console.log(err);
    }

}

//Function calling
main();