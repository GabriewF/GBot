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
  ColorResolvable,
  Locale,
  resolveColor,
} from 'discord.js';
import {
  ApplicationCommandOptions,
  NotEmpty,
  SlashOptionStringOptions,
  VerifyName,
  VName,
} from 'discordx';

interface CalcInterface {
  // Slash - L33
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  // Content - L160
  content: (userId: string) => string;

  options: {
    // Expression Option - L52
    expression: Omit<
      SlashOptionStringOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;

    // Scope Option - L77
    scope: Omit<
      SlashOptionStringOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;
  };

  embeds: {
    // Success Embed - L110
    successEmbed: {
      title: string;
      color: ColorResolvable;
      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };

      fields: [
        {
          name: string;
          value: (expression: string) => string;
        },
        {
          name: string;
          value: (result: string) => string;
        },
      ];
    };

    // Fail Embed - L134
    failEmbed: {
      title: string;
      color: ColorResolvable;
      description: string;
      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };
    };
  };
}

type CalcRecord = Record<Locale, CalcInterface>;

const CalcCommand: Partial<CalcRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L33
    info: {
      name: 'calculate',
      description: 'I calculate your mathematic expression',
      dmPermission: true,
    },

    // Content - L82
    content: (userId: string) => `<@${userId}>`,

    options: {
      // Expression Option - L52
      expression: {
        name: 'expression',
        description: 'The mathematical expression',
        type: ApplicationCommandOptionType.String,
        required: true,

        maxLength: 1000,
        minLength: 3,
      },

      // Scope Option - L77
      scope: {
        name: 'scope',
        description: 'The scope of the mathematical expression',
        type: ApplicationCommandOptionType.String,
        required: false,

        maxLength: 1000,
        minLength: 5,
      },
    },

    embeds: {
      // Success Embed - L110
      successEmbed: {
        title: 'Calculation',
        color: resolveColor('Random'),
        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          {
            name: ':stopwatch: Your expression',
            value: (expression: string) => codeBlock(expression),
          },
          {
            name: ':zap: Result of the expression',
            value: (result: string) => codeBlock(result),
          },
        ],
      },

      // Fail Embed - L134
      failEmbed: {
        title: 'Calculation',
        color: 'Random',
        description: 'Invalid expression or scope!',

        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L33
    info: {
      name: 'calcular',
      description: 'Eu calculo suas expressões matemáticas',
      dmPermission: true,
    },

    // Content - L82
    content: (userId: string) => `<@${userId}>`,

    options: {
      // Expression Option - L52
      expression: {
        name: 'expressão',
        description: 'A expressão matemática',
        type: ApplicationCommandOptionType.String,
        required: true,

        maxLength: 1000,
        minLength: 3,
      },

      // Scope Option - L77
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
      // Success Embed - L110
      successEmbed: {
        title: 'Cálculo',
        color: resolveColor('Random'),
        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          {
            name: ':stopwatch: Sua expressão matemática',
            value: (expression: string) => codeBlock(expression),
          },
          {
            name: ':zap: Resultado da expressão',
            value: (result: string) => codeBlock(result),
          },
        ],
      },

      // Fail Embed - L134
      failEmbed: {
        title: 'Cálculo',
        color: 'Random',
        description: 'Expressão ou escopo invalida!',

        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },
      },
    },
  },
};

export const CalcLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(CalcCommand, locale)) {
    case true:
      return CalcCommand[locale] as CalcInterface;
    default:
      return CalcCommand[Locale.EnglishUS] as CalcInterface;
  }
};
