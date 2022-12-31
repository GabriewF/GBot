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

import { CommandInteraction, EmbedBuilder, Locale } from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { RDifficultyLang } from '@gbot/meta';

@Discord()
export abstract class RegionalDifficulty {
  @Slash({
    // Slash Info
    name: RDifficultyLang().info.name,
    description: RDifficultyLang().info.description,
    dmPermission: RDifficultyLang().info.dmPermission,

    // Name Localization
    nameLocalizations: {
      'pt-BR': RDifficultyLang(Locale.PortugueseBR).info.name,
      'en-US': RDifficultyLang(Locale.EnglishUS).info.name,
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': RDifficultyLang(Locale.PortugueseBR).info.description,
      'en-US': RDifficultyLang(Locale.EnglishUS).info.description,
    },
  })
  @SlashGroup('minecraft')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: RDifficultyLang().options.regionalDifficulty.name,
      description: RDifficultyLang().options.regionalDifficulty.description,
      type: RDifficultyLang().options.regionalDifficulty.type,
      required: RDifficultyLang().options.regionalDifficulty.required,

      // Limiters
      maxValue: RDifficultyLang().options.regionalDifficulty.maxValue,
      minValue: RDifficultyLang().options.regionalDifficulty.minValue,

      // Name Localization
      nameLocalizations: {
        'pt-BR': RDifficultyLang(Locale.PortugueseBR).options.regionalDifficulty
          .name,
        'en-US': RDifficultyLang(Locale.EnglishUS).options.regionalDifficulty
          .name,
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': RDifficultyLang(Locale.PortugueseBR).options.regionalDifficulty
          .description,
        'en-US': RDifficultyLang(Locale.EnglishUS).options.regionalDifficulty
          .description,
      },
    })
    regionalDifficulty: number,

    command: CommandInteraction,
  ) {
    await command.deferReply({ ephemeral: true });

    const loc = RDifficultyLang(command.locale);
    const successEmbedLoc = loc.embeds.successEmbed;

    // Embed of the message
    const successEmbed = new EmbedBuilder()
      .setTitle(successEmbedLoc.title)
      .setColor(successEmbedLoc.color)
      .setFooter({
        text: successEmbedLoc.footer.text(command.user.tag),
        iconURL: successEmbedLoc.footer.icon(String(command.user.avatarURL())),
      })
      .setTimestamp();

    successEmbed.addFields({
      name: successEmbedLoc.fields.regionalDifficulty.text,
      value: successEmbedLoc.fields.regionalDifficulty.value(
        String(regionalDifficulty),
      ),
    });

    let clampedRegionalDifficulty = (regionalDifficulty - 1.0) / 2.0;

    if (regionalDifficulty < 2.0) clampedRegionalDifficulty = 0.0;
    if (regionalDifficulty > 4.0) clampedRegionalDifficulty = 1.0;

    successEmbed.addFields({
      name: successEmbedLoc.fields.clampedRegionalDifficulty.text,
      value: successEmbedLoc.fields.clampedRegionalDifficulty.value(
        String(clampedRegionalDifficulty),
      ),
    });

    // Ping Command
    await command.editReply({
      embeds: [successEmbed],
    });

    return;
  }
}
