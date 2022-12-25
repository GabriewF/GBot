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

import {
  ApplicationCommandOptionType,
  codeBlock,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';

@Discord()
export abstract class RegionalDifficulty {
  @Slash({
    // Slash Info
    name: 'regional_difficulty',
    description: 'I give you the clamped regional difficulty!',
    dmPermission: true,

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'dificuldade_regional',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Retorno com a dificuldade local apertada',
    },
  })
  @SlashGroup('minecraft')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: 'regional_difficulty',
      description: 'Your regional difficulty',
      type: ApplicationCommandOptionType.Number,
      required: true,

      // Limiter
      maxValue: 6.75,
      minValue: 0.0,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'dificuldade_regional',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'Sua dificuldade regional',
      },
    })
    regionalDifficulty: number,

    command: CommandInteraction,
  ) {
    await command.deferReply({
      ephemeral: true,
    });

    // Embed of the message
    const embed = new EmbedBuilder()
      .setTitle('Dificuldade Regional')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    embed.addFields({
      name: ':crossed_swords: Dificuldade Regional',
      value: codeBlock(String(regionalDifficulty)),
    });

    let clampedRegionalDifficulty = (regionalDifficulty - 1.0) / 2.0;

    if (regionalDifficulty < 2.0) clampedRegionalDifficulty = 0.0;
    if (regionalDifficulty > 4.0) clampedRegionalDifficulty = 1.0;

    embed.addFields({
      name: ':shield: Dificuldade regional apertada',
      value: codeBlock(String(clampedRegionalDifficulty)),
    });

    // Ping Command
    await command.editReply({
      content: `<@${command.user.id}>`,
      embeds: [embed],
    });
  }
}
