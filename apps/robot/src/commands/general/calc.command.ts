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
import { Discord, Slash, SlashOption } from 'discordx';
import { evaluate } from 'mathjs';

@Discord()
export abstract class Calc {
  @Slash({
    // Slash Info
    name: 'calculate',
    description: 'I calculate your mathematic expression',
    dmPermission: true,

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'calcular',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Eu calculo sua expressão matemática',
    },
  })
  async Handle(
    @SlashOption({
      // Slash Option
      name: 'expression',
      description: 'The mathematical expression',
      type: ApplicationCommandOptionType.String,
      required: true,

      // Limiter
      maxLength: 1000,
      minLength: 3,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'expressão',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'A expressão matemática',
      },
    })
    expression: string,

    @SlashOption({
      // Slash Option
      name: 'scope',
      description: 'The scope of the mathematical expression',
      type: ApplicationCommandOptionType.String,
      required: false,

      // Limiter
      maxLength: 1000,
      minLength: 5,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'escopo',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O escopo da expressão matemática',
      },
    })
    scope: string,

    command: CommandInteraction,
  ) {
    await command.deferReply({
      ephemeral: false,
      fetchReply: true,
    });

    // Embed of the message
    const embed = new EmbedBuilder()
      .setTitle('Calculo')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    // Add the Expression
    embed.addFields({
      name: ':stopwatch: Sua expressão',
      value: codeBlock(expression),
    });

    // ???
    let result = '';
    const mScope: object = <object>JSON.parse(scope ?? '{}');

    try {
      result = String(evaluate(expression, mScope));
    } catch {
      const embed = new EmbedBuilder()
        .setTitle('Calculo')
        .setColor('Random')
        .setDescription('Expressão ou escopo invalida!')
        .setFooter({
          text: `Comando enviado por ${command.user.tag}`,
          iconURL: String(command.user.avatarURL()),
        })
        .setTimestamp();

      await command.editReply({
        content: `<@${command.user.id}>`,
        embeds: [embed],
      });

      return;
    }

    // Add the Result of expression
    embed.addFields({
      name: ':zap: Resultado da expressão',
      value: codeBlock(result),
    });

    // Return the embed
    await command.editReply({
      content: `<@${command.user.id}>`,
      embeds: [embed],
    });
  }
}
