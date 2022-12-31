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

import { ColorResolvable } from 'discord.js';
import {
  ApplicationCommandOptions,
  VerifyName,
  NotEmpty,
  SlashOptionStringOptions,
  VName,
} from 'discordx';

export interface ILocale {
  // Slash
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  options: {
    expression: Omit<
      SlashOptionStringOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;

    scope: Omit<
      SlashOptionStringOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;
  };

  embeds: {
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
