/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ExecutionContext } from '@cloudflare/workers-types/experimental';
import { Bot, webhookCallback } from 'grammy';
import { resetWebhook, setupBot, getHandler } from './bot';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;

	TELEGRAM_TOKEN: string;

	HOST?: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		const token = env.TELEGRAM_TOKEN;
		setupBot(env);

		if (url.pathname.endsWith('bot' + token)) {
			return getHandler()(request);
		}

		const host = env.HOST || url.host;

		if (url.pathname.endsWith('resetWebhook' + token)) {
			return new Response(await resetWebhook(bot, `https://${host}/bot${token}`));
		}

		return new Response(`My host is ${host}; path is ${url.pathname}`);
	},
};
