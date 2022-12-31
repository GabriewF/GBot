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
  // Slash
  info: {
    name: 'dificuldade_regional',
    description: 'Eu lhe dou a dificuldade regional apertada!',
    dmPermission: true,
  },

  options: {
    // Regional Difficulty
    regionalDifficulty: {
      name: 'dificuldade_regional',
      description: 'Sua dificuldade regional',
      type: ApplicationCommandOptionType.Number,
      required: true,

      // Limiter
      maxValue: 6.75,
      minValue: 0.0,
    },
  },

  embeds: {
    // Success Embed
    successEmbed: {
      title: 'Dificuldade Regional',
      color: 'Random',

      footer: {
        text: (tag: string) => `Comando enviado por: ${tag}`,
        icon: (avatar: string) => avatar,
      },

      fields: {
        regionalDifficulty: {
          text: ':crossed_swords: Dificuldade Regional',
          value: (rd: string) => codeBlock(rd),
        },

        clampedRegionalDifficulty: {
          text: ':crossed_swords: Dificuldade regional apertada',
          value: (crd: string) => codeBlock(crd),
        },
      },
    },
  },
};
