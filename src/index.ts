/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {
	async fetch(request, env, ctx): Promise<Response> {

		let url = env.OLD_ACS_URL;

		const requestClone = request.clone();
		const formData = await request.formData();

		if (formData.get('RelayState')?.toString().startsWith('s/')) {
			console.log('Descope SAML request');
			url = env.NEW_ACS_URL
		}
		console.log('Redirecting to', url);
		return fetch(url, requestClone);
	}
} satisfies ExportedHandler<Env>;
