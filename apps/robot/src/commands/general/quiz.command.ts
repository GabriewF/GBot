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
  CommandInteraction,
  EmbedBuilder,
  Locale,
} from 'discord.js';
import { ButtonComponent, Discord, Slash } from 'discordx';
import { QuizLang } from '@gbot/meta';

@Discord()
export abstract class Quiz {
  @Slash({
    name: QuizLang().info.name,
    description: QuizLang().info.description,
    dmPermission: QuizLang().info.dmPermission,

    nameLocalizations: {
      'pt-BR': QuizLang(Locale.PortugueseBR).info.name,
      'en-US': QuizLang(Locale.EnglishUS).info.name,
    },

    descriptionLocalizations: {
      'pt-BR': QuizLang(Locale.PortugueseBR).info.description,
      'en-US': QuizLang(Locale.EnglishUS).info.description,
    },
  })
  async Handle(command: CommandInteraction) {
    await command.deferReply({ ephemeral: true });

    const loc = QuizLang(command.locale).query.query01;
    const questionEmbedLoc = loc.embeds.questionEmbed;

    const questionEmbed = new EmbedBuilder()
      .setTitle(questionEmbedLoc.title)
      .setDescription(questionEmbedLoc.description)
      .setColor(questionEmbedLoc.color)
      .setFooter({
        text: questionEmbedLoc.footer.text(command.user.tag),
        iconURL: questionEmbedLoc.footer.icon(String(command.user.avatarURL())),
      })
      .setTimestamp();

    const yesButtonLoc = loc.buttons.yesButton;

    const yesButton = new ButtonBuilder()
      .setLabel(yesButtonLoc.label)
      .setCustomId(yesButtonLoc.customId)
      .setStyle(yesButtonLoc.style);

    const noButtonLoc = loc.buttons.noButton;

    const noButton = new ButtonBuilder()
      .setLabel(noButtonLoc.label)
      .setCustomId(noButtonLoc.customId)
      .setStyle(noButtonLoc.style);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await command.editReply({
      embeds: [questionEmbed],
      components: [buttonRow],
    });

    return;
  }

  // First Question
  @ButtonComponent({ id: 'Query01_Response01' })
  async Query01_Response01(interaction: ButtonInteraction) {
    response.set('Query01', true);
    await interaction.deferUpdate();

    const loc = QuizLang(interaction.locale).query.query02;
    const questionEmbedLoc = loc.embeds.questionEmbed;

    const questionEmbed = new EmbedBuilder()
      .setTitle(questionEmbedLoc.title)
      .setDescription(questionEmbedLoc.description)
      .setColor(questionEmbedLoc.color)
      .setFooter({
        text: questionEmbedLoc.footer.text(interaction.user.tag),
        iconURL: questionEmbedLoc.footer.icon(
          String(interaction.user.avatarURL()),
        ),
      })
      .setTimestamp();

    const yesButtonLoc = loc.buttons.yesButton;

    const yesButton = new ButtonBuilder()
      .setLabel(yesButtonLoc.label)
      .setCustomId(yesButtonLoc.customId)
      .setStyle(yesButtonLoc.style);

    const noButtonLoc = loc.buttons.noButton;

    const noButton = new ButtonBuilder()
      .setLabel(noButtonLoc.label)
      .setCustomId(noButtonLoc.customId)
      .setStyle(noButtonLoc.style);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await interaction.editReply({
      embeds: [questionEmbed],
      components: [buttonRow],
    });

    return;
  }

  @ButtonComponent({ id: 'Query01_Response02' })
  async Query01_Response02(interaction: ButtonInteraction) {
    response.set('Query01', false);
    await interaction.deferUpdate();

    const loc = QuizLang(interaction.locale).query.query02;
    const questionEmbedLoc = loc.embeds.questionEmbed;

    const questionEmbed = new EmbedBuilder()
      .setTitle(questionEmbedLoc.title)
      .setDescription(questionEmbedLoc.description)
      .setColor(questionEmbedLoc.color)
      .setFooter({
        text: questionEmbedLoc.footer.text(interaction.user.tag),
        iconURL: questionEmbedLoc.footer.icon(
          String(interaction.user.avatarURL()),
        ),
      })
      .setTimestamp();

    const yesButtonLoc = loc.buttons.yesButton;

    const yesButton = new ButtonBuilder()
      .setLabel(yesButtonLoc.label)
      .setCustomId(yesButtonLoc.customId)
      .setStyle(yesButtonLoc.style);

    const noButtonLoc = loc.buttons.noButton;

    const noButton = new ButtonBuilder()
      .setLabel(noButtonLoc.label)
      .setCustomId(noButtonLoc.customId)
      .setStyle(noButtonLoc.style);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      yesButton,
      noButton,
    );

    await interaction.editReply({
      embeds: [questionEmbed],
      components: [buttonRow],
    });

    return;
  }

  // Second Question
  @ButtonComponent({ id: 'Query02_Response01' })
  async Query02_Response01(interaction: ButtonInteraction) {
    response.set('Question02', true);
    await this.Finalize(interaction);

    return;
  }

  @ButtonComponent({ id: 'Query02_Response02' })
  async Query02_Response02(interaction: ButtonInteraction) {
    response.set('Question02', false);
    await this.Finalize(interaction);

    return;
  }

  @ButtonComponent({ id: 'Finalize' })
  async Finalize(interaction: ButtonInteraction) {
    await interaction.deferUpdate();

    const loc = QuizLang(interaction.locale).query.finalize;
    const finalEmbedLoc = loc.embeds.finalEmbed;

    const finalEmbed = new EmbedBuilder()
      .setTitle(finalEmbedLoc.title)
      .setDescription(finalEmbedLoc.description)
      .setColor(finalEmbedLoc.color)
      .setFooter({
        text: finalEmbedLoc.footer.text(interaction.user.tag),
        iconURL: finalEmbedLoc.footer.icon(
          String(interaction.user.avatarURL()),
        ),
      })
      .setTimestamp();

    await interaction.editReply({
      embeds: [finalEmbed],
      components: [],
    });

    return;
  }
}
