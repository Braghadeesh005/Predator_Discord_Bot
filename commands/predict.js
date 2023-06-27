import { SlashCommandBuilder } from "@discordjs/builders";

const predict = new SlashCommandBuilder()
    .setName('predict')
    .setDescription('Predict a house price')
    
export default predict.toJSON();    