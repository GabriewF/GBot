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

import { twitchRepository } from '@gbot/database';
import {
  AccessToken,
  RefreshConfig,
  RefreshingAuthProvider,
} from '@twurple/auth';

export const generateAuthProvider = (
  // API credentials
  AccessToken: string,
  RefreshToken: string | null,
  expiresIn: number,

  // Scope
  Scope: Array<string>,

  // Client credentials
  ClientId?: string,
  ClientSecret?: string,
) => {
  const scope = Scope;

  let accessToken = AccessToken;
  let refreshToken = RefreshToken;

  const clientId = ClientId ?? String(process.env['TWITCH_CLIENT_ID']);
  const clientSecret =
    ClientSecret ?? String(process.env['TWITCH_CLIENT_SECRET']);

  const refreshConfig: RefreshConfig = {
    clientId,
    clientSecret,

    onRefresh: async (token) => {
      const twitch = await twitchRepository.findOneBy({
        accessToken: AccessToken,
      });

      if (
        twitch?.accessToken === AccessToken &&
        twitch?.refreshToken === RefreshToken
      ) {
        twitch.accessToken = token.accessToken;
        twitch.refreshToken = <string>token.refreshToken;

        accessToken = token.accessToken;
        refreshToken = token.refreshToken;

        await twitchRepository.save(twitch);
      }
    },
  };

  const tokenData: AccessToken = {
    // Credentials
    accessToken,
    refreshToken,

    scope,

    // Generate expiry values
    expiresIn,
    obtainmentTimestamp: Date.now(),
  };

  return {
    accessToken,
    refreshToken,
    provider: new RefreshingAuthProvider(refreshConfig, tokenData),
  };
};
