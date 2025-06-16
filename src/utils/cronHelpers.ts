import { User } from "../types/types";
import { AccessTokenResponse } from "../types/types";

export const getPendingUsers = async(env: Env): Promise<User []> => {
    const { results }  = await env.DB
    .prepare('SELECT * FROM users WHERE badge_received = ?')
    .bind(false)
    .all<User>();
    return results;
}

export const getAccessToken = async (env: Env) => {
	const response = await fetch(`${env.BADGR_API}/o/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			username: env.BADGR_USERNAME,
			password: env.BADGR_PASSWORD,
		}),
	});
	const data: AccessTokenResponse = await response.json();
    console.log(data)
	return data.access_token;
};

export const getBadgeClassId = async (accessToken: string, env: Env) => {
	const response = await fetch(`${env.BADGR_API}/v2/badgeclasses?include_archived=false`, { 
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const data:any = await response.json();
	return data?.result[0]?.entityId; 
};