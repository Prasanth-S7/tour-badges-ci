export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { method } = request;
		switch (method) {
			case 'GET':
				return new Response('Server is Healthy!');
			default:
				return new Response('Method not allowed', { status: 405 });
		}
	},
	async scheduled(event, env, ctx): Promise<void> {
		console.log("scheduled worker ran")
	},
} satisfies ExportedHandler<Env>;