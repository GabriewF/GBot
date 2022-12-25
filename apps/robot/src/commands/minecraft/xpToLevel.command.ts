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
export abstract class XpToLevel {
  @Slash({
    // Slash Info
    name: 'xp_to_level',
    description: 'I give you the leveis of this XP points!',
    dmPermission: true,

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'xp_para_leveis',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Eu lhe dou os leveis desses pontos de XP',
    },
  })
  @SlashGroup('minecraft')
  async Handle(
    @SlashOption({
      // Slash Option
      name: 'xp_points',
      description: 'Your xp points',
      type: ApplicationCommandOptionType.Integer,
      required: true,

      // Limiter
      maxValue: 1000000,
      minValue: 0,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'pontos_de_xp',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'Seus pontos de XP',
      },
    })
    xpPoints: bigint,

    command: CommandInteraction,
  ) {
    await command.deferReply({
      ephemeral: true,
    });

    // Embed of the message
    const embed = new EmbedBuilder()
      .setTitle('Pontos de XP')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    embed.addFields({
      name: ':crossed_swords: Pontos de XP',
      value: codeBlock(String(xpPoints)),
    });

    let points = Number(xpPoints);
    let levels = 0;

    while (points >= 0) {
      if (levels < 16) points -= 2 * levels + 7;
      else if (levels < 31) points -= 5 * levels - 38;
      else points -= 9 * levels - 158;
      levels++;
    }

    levels = levels - 1;

    embed.addFields({
      name: ':shield: Leveis de XP',
      value: codeBlock(String(levels)),
    });

    // Ping Command
    await command.editReply({
      content: `<@${command.user.id}>`,
      embeds: [embed],
    });
  }
}
