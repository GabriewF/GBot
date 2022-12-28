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

import { Locale } from 'discord.js';
import { VerifyName, NotEmpty, SlashGroupOptions } from 'discordx';

interface MinecraftInterface {
  // Slash - L31
  info: Omit<
    SlashGroupOptions<VerifyName<string>, NotEmpty<string>, VerifyName<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;
}

type MinecraftRecord = Record<Locale, MinecraftInterface>;

const MinecraftCommand: Partial<MinecraftRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L31
    info: {
      name: 'minecraft',
      description: 'Minecraft-related commands',
      dmPermission: true,
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L31
    info: {
      name: 'minecraft',
      description: 'Comandos relacionados ao Minecraft',
      dmPermission: true,
    },
  },
};

export const MinecraftLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(MinecraftCommand, locale)) {
    case true:
      return MinecraftCommand[locale] as MinecraftInterface;
    default:
      return MinecraftCommand[Locale.EnglishUS] as MinecraftInterface;
  }
};
