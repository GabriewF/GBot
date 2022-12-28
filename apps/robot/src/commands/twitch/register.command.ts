/*
 * This file is part of GBot, licensed under the MIT License.
 *
 *  Copyright 2022 (c) GabriewF
 *  Copyright 2022 (c) contributors
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { discordRepository, shortcutRepository } from '@gbot/database';
import { waitingRegistry } from '@gbot/helpers';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
  Guild,
  TextChannel,
} from 'discord.js';
import { ButtonComponent, Client, Discord, Slash, SlashGroup } from 'discordx';

let slashCommand: CommandInteraction;

@Discord()
export abstract class Register {
  @Slash({
    // Info of the slash command
    name: 'register',
    description: "Register's you on the database",

    // Name Localizations
    nameLocalizations: {
      'pt-BR': 'registrar',
    },

    // And descriptions
    descriptionLocalizations: {
      'pt-BR': 'Se registre no banco de dados',
    },
  })
  @SlashGroup('twitch')
  async Handle(command: CommandInteraction) {
    await command.deferReply({ ephemeral: true });

    slashCommand = command;

    const userId = BigInt(command.user.id);

    // Verify if the user is already registered
    const data = await discordRepository.findOneBy({ userId });

    // Return if the user is already registered
    if (data?.userId === userId) {
      // Embed
      const embed = new EmbedBuilder({
        // Info of the embed
        description: 'Você já está registrado, até mais!',
        color: 0xc30ce8,
      });

      // Return the embed
      await command.editReply({
        embeds: [embed],
      });

      return;
    }

    // Default embed
    const embed = new EmbedBuilder({
      // Info of the embed
      title: 'Registrar na Twitch',
      description: 'Clique em `Registre-se!` para se registrar...',
      color: 0xc30ce8,

      // Footer of the embed
      footer: {
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      },

      // Timestamp of the embed
      timestamp: Date.now(),
    });

    // Button
    const registerButton = new ButtonBuilder({
      // Style of the button
      style: ButtonStyle.Primary,

      // Label of the button
      label: 'Registre-se!',

      // ID of the button
      customId: 'registerButton',

      // Type of the button
      type: ComponentType.Button,
    });

    const buttonRow = new ActionRowBuilder<ButtonBuilder>({
      components: [registerButton],
      type: ComponentType.ActionRow,
    });

    await command.editReply({
      embeds: [embed],
      components: [buttonRow],
    });

    return;
  }

  // Button component
  @ButtonComponent({ id: 'registerButton' })
  async handler(interaction: ButtonInteraction, client: Client) {
    const userId = BigInt(interaction.user.id);
    let shortcutId = '';

    // Verify if the user is already on the database
    const shortcutExists = await shortcutRepository.findOneBy({ userId });

    if (shortcutExists) {
      // If yes get's the current shortcut from the database
      shortcutId = String(shortcutExists?.id);
    } else {
      // Get the Random ID
      const chars = '0123456ABCDEF';
      const shortcutLength = 8;

      for (let i = 0; i <= shortcutLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        shortcutId += chars.substring(randomNumber, randomNumber + 1);
      }

      // And create the shortcut on the db
      shortcutRepository.create({
        id: shortcutId,
        name: slashCommand.user.username,
        userId,
      });
    }

    // Embed of the message
    const embed = new EmbedBuilder({
      // Info of the embed
      title: 'Aqui está seu link de registro...',
      color: 0xc30ce8,

      // Footer of the embed
      footer: {
        text: `Comando enviado por ${slashCommand.user.username}#${slashCommand.user.discriminator}`,
        iconURL: String(slashCommand.user.avatarURL()),
      },

      // Timestamp of the embed
      timestamp: Date.now(),
    });

    const linkButton = new ButtonBuilder({
      // Style of the button
      style: ButtonStyle.Link,

      // URL of the Button
      url: `${process.env['SERVER_URL']}/oauth?id=${shortcutId}`,

      // Emoji of the button
      emoji: '🔗',

      // Label of the button
      label: 'OAuth2 da Twitch!',

      // Type of the button
      type: ComponentType.Button,
    });

    const buttonRow = new ActionRowBuilder<ButtonBuilder>({
      components: [linkButton],

      type: ComponentType.ActionRow,
    });

    // Reply interaction
    await interaction.update({ embeds: [embed], components: [buttonRow] });

    const interval: NodeJS.Timer = setInterval(async () => {
      const completedRegistry = waitingRegistry.has(userId);
      if (!completedRegistry) return;

      const embedRegistered = new EmbedBuilder({
        // Info of the embed
        title: 'Registrado!',
        description: 'Você foi registrado com sucesso!',
        color: 0x43f507,

        // Footer of the embed
        footer: {
          text: `Comando enviado por ${slashCommand.user.username}#${slashCommand.user.discriminator}`,
          iconURL: String(slashCommand.user.avatarURL()),
        },

        // Timestamp of the embed
        timestamp: Date.now(),
      });

      // Terminate command
      await interaction.editReply({
        embeds: [embedRegistered],
        components: [],
      });

      const panelGuild = <Guild>(
        client.guilds.cache.get(String(process.env['DISCORD_GUILD_ID']))
      );
      const logChannel = <TextChannel>(
        panelGuild.channels.cache.get(String(process.env['LOG_CHANNEL']))
      );

      const embedRegisterLog = new EmbedBuilder({
        // Info of the embed
        title: 'Usuário cadastrado!',
        description: `<@${userId}> se cadastrou no banco de dados!`,
        color: 0x43f507,

        // Thumbnail of the embed
        thumbnail: {
          url: String(slashCommand.user.avatarURL({ forceStatic: true })),
        },

        // Footer of the embed
        footer: {
          text: `Registro feito por ${slashCommand.user.username}#${slashCommand.user.discriminator}`,
          iconURL: String(interaction.user.avatarURL()),
        },

        // Timestamp of the embed
        timestamp: Date.now(),
      });

      // Log Channel
      await logChannel.send({
        embeds: [embedRegisterLog],
      });

      clearInterval(interval);

      return;
    }, 1000);
  }
}
