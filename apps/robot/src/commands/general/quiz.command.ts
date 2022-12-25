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

import { response } from '@gbot/helpers';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { ButtonComponent, Discord, Slash } from 'discordx';

@Discord()
export abstract class Quiz {
  @Slash({
    name: 'quiz',
    description: 'Make an Quiz!',
    dmPermission: true,

    nameLocalizations: {
      'pt-BR': 'questionário',
    },

    descriptionLocalizations: {
      'pt-BR': 'Faça um questionário!',
    },
  })
  async Handle(command: CommandInteraction) {
    await command.deferReply({
      ephemeral: true,
      fetchReply: true,
    });

    const embed = new EmbedBuilder()
      .setTitle('Pergunta 01')
      .setDescription('Você gosta de Pão com queijo?')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    const yesButton = new ButtonBuilder()
      .setLabel('Sim!')
      .setCustomId('Query01_Response01')
      .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
      .setLabel('Não!')
      .setCustomId('Query01_Response02')
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await command.editReply({
      embeds: [embed],
      components: [buttonRow],
    });
  }

  // First Question
  @ButtonComponent({ id: 'Query01_Response01' })
  async Query01_Response01(interaction: ButtonInteraction) {
    response.set('Query01', true);

    const embed = new EmbedBuilder()
      .setTitle('Pergunta 02')
      .setDescription('Você gosta de Pão com ovo?')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      })
      .setTimestamp();

    const yesButton = new ButtonBuilder()
      .setLabel('Sim!')
      .setCustomId('Query02_Response01')
      .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
      .setLabel('Não!')
      .setCustomId('Query02_Response02')
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await interaction.update({
      embeds: [embed],
      components: [buttonRow],
    });
  }

  @ButtonComponent({ id: 'Query01_Response02' })
  async Query01_Response02(interaction: ButtonInteraction) {
    response.set('Query01', false);

    const embed = new EmbedBuilder()
      .setTitle('Pergunta 02')
      .setDescription('Você gosta de Pão com ovo?')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      })
      .setTimestamp();

    const yesButton = new ButtonBuilder()
      .setLabel('Sim!')
      .setCustomId('Query02_Response01')
      .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
      .setLabel('Não!')
      .setCustomId('Query02_Response02')
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await interaction.update({
      embeds: [embed],
      components: [buttonRow],
    });
  }

  // Second Question
  @ButtonComponent({ id: 'Query02_Response01' })
  async Query02_Response01(interaction: ButtonInteraction) {
    response.set('Question02', true);
    this.Finalize(interaction);
  }

  @ButtonComponent({ id: 'Query02_Response02' })
  async Query02_Response02(interaction: ButtonInteraction) {
    response.set('Question02', false);
    this.Finalize(interaction);
  }

  @ButtonComponent({ id: 'Finalize' })
  async Finalize(interaction: ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Terminado!')
      .setDescription('Obrigado por participar!')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      })
      .setTimestamp();

    await interaction.update({
      embeds: [embed],
      components: [],
    });
  }
}
