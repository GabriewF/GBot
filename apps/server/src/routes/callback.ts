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

import { Get, Router } from '@discordx/koa';
import { shortcutRepository, userRepository } from '@gbot/database';
import type { RouterContext } from '@koa/router';

import {
  generateApiClient,
  generateAuthProvider,
  getToken,
  waitingRegistry,
} from '@gbot/helpers';

@Router()
export abstract class Callback {
  @Get('/callback')
  async Handler(ctx: RouterContext) {
    const code = ctx.URL.searchParams.get('code');
    const id = ctx.URL.searchParams.get('state');

    const paramsIsNull = (code && id) ?? true;

    if (paramsIsNull == true) {
      const resBody = JSON.stringify({
        status: 400,
        statusText: 'Bad Request',
        message: 'Need params: code and state',
      });

      ctx.status = 400;
      ctx.body = resBody;

      return;
    }

    // Get Token
    const token = await getToken(String(code));

    // Get Codes
    const accessToken: string = token.access_token;
    const refreshToken: string = token.refresh_token;

    const expiresIn: number = token.expires_in;
    const scope: Array<string> = ['user:read:email', 'user:edit'];

    // Authentication
    const authProvider = generateAuthProvider(
      accessToken,
      refreshToken,
      expiresIn,
      scope,
    );
    const apiClient = generateApiClient(authProvider.provider);

    // Get user
    const user = await apiClient.users.getMe(true);

    // Get Shortcut
    const shortcut = await shortcutRepository.findOneBy({
      userId: BigInt(String(id)),
    });

    // Create the user
    userRepository.create({
      // Create Email of the User
      email: String(user.email),

      // Create Twitch Object
      Twitch: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: BigInt(expiresIn),

        name: user.name,
        displayName: user.displayName,
        userId: BigInt(user.id),
      },

      // Create Discord Object
      Discord: {
        name: String(shortcut?.name),
        userId: <bigint>shortcut?.userId,
      },
    });

    waitingRegistry.set(<bigint>shortcut?.userId, true);

    // And delete shortcut
    await shortcut?.remove();

    // Terminate request
    ctx.redirect('/completed');
  }
}
