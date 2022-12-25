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

export const getToken = async (code: string) => {
  const clientId = String(process.env['TWITCH_CLIENT_ID']);
  const clientSecret = String(process.env['TWITCH_CLIENT_SECRET']);
  const redirectUri = String(process.env['TWITCH_REDIRECT_URL']);
  const serverUri = String(process.env['SERVER_URL']);

  const authorizedCode = String(code);
  const grantType = 'authorization_code';

  const tokenParams = new URLSearchParams();

  tokenParams.append('client_id', clientId);
  tokenParams.append('client_secret', clientSecret);
  tokenParams.append('code', authorizedCode);
  tokenParams.append('grant_type', grantType);
  tokenParams.append('redirect_uri', `${serverUri}/${redirectUri}`);

  const token = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: tokenParams,
  });

  type TokenType = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  return <TokenType>await token.json();
};
