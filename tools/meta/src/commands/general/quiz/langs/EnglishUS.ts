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

import { ButtonStyle } from 'discord.js';
import { ILocale } from '../types/ILocale';

// English, US - English, US
export const EnglishUS: ILocale = {
  // Slash
  info: {
    name: 'quiz',
    description: 'Make an Quiz!',
    dmPermission: true,
  },

  query: {
    // Query 01
    query01: {
      embeds: {
        // Question Embed
        questionEmbed: {
          title: 'Question 01',
          description: 'Do you like bread with cheese?',
          color: 'Random',

          footer: {
            text: (tag: string) => `Command sent by: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },

      buttons: {
        // Yes Button
        yesButton: {
          label: 'Yes!',

          customId: 'Query01_Response01',
          style: ButtonStyle.Success,
        },

        // No Button
        noButton: {
          label: 'No!',
          customId: 'Query01_Response02',
          style: ButtonStyle.Danger,
        },
      },
    },

    // Query 02
    query02: {
      embeds: {
        // Question Embed
        questionEmbed: {
          title: 'Question 02',
          description: 'Do you like bread with egg?',
          color: 'Random',

          footer: {
            text: (tag: string) => `Command sent by: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },

      buttons: {
        // Yes Button
        yesButton: {
          label: 'Yes!',
          customId: 'Query02_Response01',
          style: ButtonStyle.Success,
        },

        // No Button
        noButton: {
          label: 'No!',
          customId: 'Query02_Response02',
          style: ButtonStyle.Danger,
        },
      },
    },

    // Finalize
    finalize: {
      embeds: {
        // Final Embed
        finalEmbed: {
          title: 'Finalized',
          description: 'Thanks for participating!',
          color: 'Random',

          // Footer
          footer: {
            text: (tag: string) => `Command sent by: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },
    },
  },
};
