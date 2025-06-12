import { userEnroll } from "./routes/user.enroll";
import { createResponse } from "./utils/response";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { method } = request;
		switch (method) {
			case 'GET':
				return createResponse({
					success: true,
					message: 'Server is Healthy!'
				}, 200);
			case 'POST':
				return await userEnroll(request, env);
			case 'OPTIONS':
				return createResponse({
					success: true
				}, 204)
			default:
				return createResponse({
					success: false,
					error: 'Method not allowed'
				}, 405);
		}
	},
	async scheduled(event, env, ctx): Promise<void> {
		console.log("scheduled worker ran")
	},
} satisfies ExportedHandler<Env>;