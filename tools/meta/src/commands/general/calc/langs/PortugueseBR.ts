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

import { ApplicationCommandOptionType, codeBlock } from 'discord.js';
import { ILocale } from '../types/ILocale';

// Portuguese, Brazilian - Português do Brasil
export const PortugueseBR: ILocale = {
  info: {
    name: 'calcular',
    description: 'Eu calculo sua expressão matemática',
    dmPermission: true,
  },

  options: {
    expression: {
      name: 'expressão',
      description: 'Sua expressão matemática',
      type: ApplicationCommandOptionType.String,
      required: true,

      maxLength: 1000,
      minLength: 3,
    },

    scope: {
      name: 'escopo',
      description: 'O escopo da expressão matemática',
      type: ApplicationCommandOptionType.String,
      required: false,

      maxLength: 1000,
      minLength: 5,
    },
  },

  embeds: {
    successEmbed: {
      title: 'Cálculo',
      color: 'Random',

      footer: {
        text: (tag) => `Comando enviado por: ${tag}`,
        icon: (avatarURL) => avatarURL,
      },

      fields: [
        {
          name: ':stopwatch: Sua expressão matemática',
          value: (expression) => codeBlock(expression),
        },
        {
          name: ':zap: Resultado da expressão',
          value: (result) => codeBlock(result),
        },
      ],
    },

    failEmbed: {
      title: 'Cálculo',
      color: 'Random',
      description: 'Expressão ou escopo invalido!',

      footer: {
        text: (tag) => `Comando enviado por: ${tag}`,
        icon: (avatarURL) => avatarURL,
      },
    },
  },
};
