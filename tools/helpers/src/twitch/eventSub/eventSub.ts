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

// Import the packages and methods
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import { apiClient } from '../api/apiClient';

// Instances the listener
let listener: EventSubListener;

// Event Sub Secret
const eventSubSecret = String(process.env['TWITCH_EVT_SECRET']);

// Runs if the environment is development
if (process.env['NODE_ENV']) {
  // Delete all subscriptions for security
  async () => await apiClient.eventSub.deleteAllSubscriptions();

  // Register the nGrok adapter
  const eventSubAdapter = new NgrokAdapter();

  // Event Sub Listener
  listener = new EventSubListener({
    apiClient: apiClient,
    adapter: eventSubAdapter,
    secret: eventSubSecret,
    strictHostCheck: true,
  });

  // Run if the environment is production
} else if (!process.env['NODE_ENV']) {
  // Delete all subscriptions for security
  async () => await apiClient.eventSub.deleteAllSubscriptions();

  // Register the nGrok adapter
  const eventSubAdapter = new ReverseProxyAdapter({
    hostName: 'insidersteam.com.br',
  });

  // Event Sub Listener
  listener = new EventSubListener({
    apiClient: apiClient,
    adapter: eventSubAdapter,
    secret: eventSubSecret,
    strictHostCheck: true,
  });
}

// Export the Listener
export { listener };
