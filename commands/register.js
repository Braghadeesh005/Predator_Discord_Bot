import { SlashCommandBuilder } from '@discordjs/builders'

const register = new SlashCommandBuilder() 

        .setName('register')
        .setDescription('Register to Continue')

export default register.toJSON()        