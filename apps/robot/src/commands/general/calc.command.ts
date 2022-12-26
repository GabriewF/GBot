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
  Locale,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { evaluate } from 'mathjs';
import { CalcLang } from '@gbot/meta';

@Discord()
export abstract class Calc {
  @Slash({
    // Slash Info
    name: CalcLang().info.name,
    description: CalcLang().info.description,
    dmPermission: CalcLang().info.dmPermission,

    // Name Localization
    nameLocalizations: {
      'pt-BR': CalcLang(Locale.PortugueseBR).info.name,
      'en-US': CalcLang(Locale.EnglishUS).info.name,
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': CalcLang(Locale.PortugueseBR).info.description,
      'en-US': CalcLang(Locale.EnglishUS).info.description,
    },
  })
  async Handle(
    @SlashOption({
      // Slash Option
      name: CalcLang().options.expression.name,
      description: CalcLang().options.expression.description,
      type: CalcLang().options.expression.type,
      required: CalcLang().options.expression.required,

      // Limiter
      maxLength: CalcLang().options.expression.maxLength,
      minLength: CalcLang().options.expression.minLength,

      // Name Localization
      nameLocalizations: {
        'pt-BR': CalcLang(Locale.PortugueseBR).options.expression.name,
        'en-US': CalcLang(Locale.EnglishUS).options.expression.name,
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': CalcLang(Locale.PortugueseBR).options.expression.description,
        'en-US': CalcLang(Locale.EnglishUS).options.expression.description,
      },
    })
    expression: string,

    @SlashOption({
      // Slash Option
      name: CalcLang().options.scope.name,
      description: CalcLang().options.scope.description,
      type: CalcLang().options.scope.type,
      required: CalcLang().options.scope.required,

      // Limiter
      maxLength: CalcLang().options.scope.maxLength,
      minLength: CalcLang().options.scope.minLength,

      // Name Localization
      nameLocalizations: {
        'pt-BR': CalcLang(Locale.PortugueseBR).options.scope.name,
        'en-US': CalcLang(Locale.EnglishUS).options.scope.name,
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': CalcLang(Locale.PortugueseBR).options.scope.description,
        'en-US': CalcLang(Locale.EnglishUS).options.scope.description,
      },
    })
    scope: string,

    command: CommandInteraction,
  ) {
    const loc = CalcLang(command.locale);

    await command.deferReply({
      ephemeral: false,
      fetchReply: true,
    });

    const successEmbedLoc = loc.strings.successEmbed;

    // Embed of the message
    const successEmbed = new EmbedBuilder()
      .setTitle(successEmbedLoc.title as string)
      .setColor(successEmbedLoc.color)
      .setFooter({
        text: successEmbedLoc.footer.text(command.user.tag),
        iconURL: successEmbedLoc.footer.icon(String(command.user.avatarURL())),
      })
      .setTimestamp();

    // Add the Expression
    successEmbed.addFields({
      name: successEmbedLoc.fields[0].name,
      value: successEmbedLoc.fields[0].value(expression),
    });

    // ???
    let result = '';
    const mScope: object = JSON.parse(scope ?? '{}');

    try {
      result = String(evaluate(expression, mScope));
    } catch {
      const failEmbedLoc = loc.strings.failEmbed;

      const failEmbed = new EmbedBuilder()
        .setTitle(failEmbedLoc.title)
        .setColor(failEmbedLoc.color)
        .setDescription(failEmbedLoc.description)
        .setFooter({
          text: failEmbedLoc.footer.text(command.user.tag),
          iconURL: failEmbedLoc.footer.icon(String(command.user.avatarURL())),
        })
        .setTimestamp();

      await command.followUp({
        content: loc.strings.content(command.user.id),
        embeds: [failEmbed],
      });

      return;
    }

    // Add the Result of expression
    successEmbed.addFields({
      name: successEmbedLoc.fields[1].name,
      value: successEmbedLoc.fields[1].value(result),
    });

    // Return the embed
    await command.editReply({
      content: loc.strings.content(command.user.id),
      embeds: [successEmbed],
    });

    return;
  }
}
