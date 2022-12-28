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
import { XTLLang } from '@gbot/meta';

@Discord()
export abstract class XpToLevel {
  @Slash({
    // Slash Info
    name: XTLLang().info.name,
    description: XTLLang().info.description,
    dmPermission: XTLLang().info.dmPermission,

    // Name Localization
    nameLocalizations: {
      'pt-BR': XTLLang(Locale.PortugueseBR).info.name,
      'en-US': XTLLang(Locale.EnglishUS).info.name,
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': XTLLang(Locale.PortugueseBR).info.description,
      'en-US': XTLLang(Locale.EnglishUS).info.description,
    },
  })
  @SlashGroup('minecraft')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: XTLLang().options.xpLevels.name,
      description: XTLLang().options.xpLevels.description,
      type: XTLLang().options.xpLevels.type,
      required: XTLLang().options.xpLevels.required,

      // Limiter
      maxValue: XTLLang().options.xpLevels.maxValue,
      minValue: XTLLang().options.xpLevels.minValue,

      // Name Localization
      nameLocalizations: {
        'pt-BR': XTLLang(Locale.PortugueseBR).options.xpLevels.name,
        'en-US': XTLLang(Locale.EnglishUS).options.xpLevels.name,
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': XTLLang(Locale.PortugueseBR).options.xpLevels.description,
        'en-US': XTLLang(Locale.EnglishUS).options.xpLevels.description,
      },
    })
    xpPoints: bigint,

    command: CommandInteraction,
  ) {
    await command.deferReply({ ephemeral: true });

    const loc = XTLLang(command.locale);
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
      name: successEmbedLoc.fields.xpPoints.text,
      value: successEmbedLoc.fields.xpPoints.value(xpPoints),
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

    successEmbed.addFields({
      name: successEmbedLoc.fields.xpLevels.text,
      value: successEmbedLoc.fields.xpLevels.value(levels),
    });

    // Ping Command
    await command.editReply({
      content: loc.content(command.user.id),
      embeds: [successEmbed],
    });

    return;
  }
}
