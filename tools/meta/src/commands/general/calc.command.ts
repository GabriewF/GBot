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
  // Slash Command Information
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  options: {
    // Expression Option - L54
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

  strings: {
    // Content - L82
    content: (userId: string) => string;

    // Success Embed - L108
    successEmbed: {
      // Title - L109
      title: string;

      // Color - L110
      color: ColorResolvable;

      // Footer - L111
      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };

      fields: [
        // Field 01 - L118
        {
          name: string;
          value: (expression: string) => string;
        },

        // Field 02 - L149
        {
          name: string;
          value: (result: string) => string;
        },
      ];
    };

    // Fail Embed - L130
    failEmbed: {
      // Title - L131
      title: string;

      // Color - L132
      color: ColorResolvable;

      // Description - L133
      description: string;

      // Footer - L111
      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };
    };
  };
}

type CalcRecord = Record<Locale, CalcInterface>;

export const CalcCommand: Partial<CalcRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash Command Information
    info: {
      name: 'calculate',
      description: 'I calculate your mathematic expression',
      dmPermission: true,
    },

    options: {
      // Expression Option - L54
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

    strings: {
      // Content - L82
      content: (userId: string) => `<@${userId}>`,

      // Success Embed - L108
      successEmbed: {
        // Title - L109
        title: 'Calculation',

        // Color - L110
        color: resolveColor('Random'),

        // Footer - L111
        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          // Field 01 - L118
          {
            name: ':stopwatch: Your expression',
            value: (expression: string) => codeBlock(expression),
          },

          // Field 02 - L149
          {
            name: ':zap: Result of the expression',
            value: (result: string) => codeBlock(result),
          },
        ],
      },

      // Fail Embed - L130
      failEmbed: {
        // Title - L131
        title: 'Calculation',

        // Color - L132
        color: 'Random',

        // Description - L133
        description: 'Invalid expression or scope!',

        // Footer - L111
        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash Command Information
    info: {
      name: 'calcular',
      description: 'Eu calculo sua expressão matemática',
      dmPermission: true,
    },

    options: {
      // Expression Option - L54
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

    strings: {
      // Content - L82
      content: (userId: string) => `<@${userId}>`,

      // Main Embed - L108
      successEmbed: {
        // Title - L109
        title: 'Cálculo',

        // Color - L110
        color: resolveColor('Random'),

        // Footer - L111
        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          // Field 01 - L118
          {
            name: ':stopwatch: Sua expressão',
            value: (expression: string) => codeBlock(expression),
          },

          // Field 01 - L149
          {
            name: ':zap: Resultado da expressão',
            value: (result: string) => codeBlock(result),
          },
        ],
      },

      // Main Embed - L130
      failEmbed: {
        // Title - L131
        title: 'Cálculo',

        // Color - L132
        color: 'Random',

        // Description - L133
        description: 'Expressão ou escopo inválido!',

        // Footer - L111
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
