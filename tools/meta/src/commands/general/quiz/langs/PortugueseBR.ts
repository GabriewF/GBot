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

// Portuguese, Brazilian - Português do Brasil
export const PortugueseBR: ILocale = {
  // Slash
  info: {
    name: 'questionário',
    description: 'Faça um Questionário!',
    dmPermission: true,
  },

  query: {
    // Query 01
    query01: {
      embeds: {
        // Question Embed
        questionEmbed: {
          title: 'Pergunta 01',
          description: 'Você gosta de pão com queijo?',
          color: 'Random',

          footer: {
            text: (tag: string) => `Comando enviado por: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },

      buttons: {
        // Yes Button
        yesButton: {
          label: 'Sim!',
          customId: 'Query01_Response01',
          style: ButtonStyle.Success,
        },

        // No Button
        noButton: {
          label: 'Não!',
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
          title: 'Pergunta 02',
          description: 'Você gosta de pão com ovo?',
          color: 'Random',

          footer: {
            text: (tag: string) => `Comando enviado por: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },

      buttons: {
        // Yes Button
        yesButton: {
          label: 'Sim!',
          customId: 'Query02_Response01',
          style: ButtonStyle.Success,
        },

        // No Button
        noButton: {
          label: 'Não!',
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
          title: 'Finalizado',
          description: 'Obrigado por Participar!',
          color: 'Random',

          // Footer
          footer: {
            text: (tag: string) => `Comando enviado por: ${tag}`,
            icon: (avatarURL: string) => avatarURL,
          },
        },
      },
    },
  },
};
