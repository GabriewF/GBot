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

// English, US - English, US
export const EnglishUS: ILocale = {
  // Slash
  info: {
    name: 'xp_to_level',
    description: 'I give you the leveis of this XP points!',
    dmPermission: true,
  },

  options: {
    // XP Levels
    xpLevels: {
      name: 'xp_points',
      description: 'Your xp points',
      type: ApplicationCommandOptionType.Integer,
      required: true,

      maxValue: 1000000,
      minValue: 0,
    },
  },

  embeds: {
    // Success Embed
    successEmbed: {
      title: 'XP Points',
      color: 'Random',

      footer: {
        text: (tag: string) => `Command sent by: ${tag}`,
        icon: (avatar: string) => avatar,
      },

      fields: {
        xpPoints: {
          text: ':crossed_swords: XP Points',
          value: (xp: bigint) => codeBlock(String(xp)),
        },

        xpLevels: {
          text: ':shield: XP Levels',
          value: (levels: number) => codeBlock(String(levels)),
        },
      },
    },
  },
};
