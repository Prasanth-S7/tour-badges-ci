import { getAccessToken } from "../utils/cronHelpers";
import { getBadgeClassId } from "../utils/cronHelpers";

export const issueBadge = async (email: string, name: string, env: Env) => {
	const accessToken = await getAccessToken(env);
	const badgeClassId = await getBadgeClassId(accessToken, env);

	const badgeData = {
		recipient: {
			identity: email,
			hashed: true,
			type: 'email',
			plaintextIdentity: name,
		},
		issuedOn: new Date().toISOString(),
		notify: true,
		extensions: {
			'extensions:recipientProfile': {
				'@context': 'https://openbadgespec.org/extensions/recipientProfile/context.json',
				type: ['Extension', 'extensions:RecipientProfile'],
				name: name,
			},
		},
	};

	const response = await fetch(`${env.BADGR_API}/v2/badgeclasses/${badgeClassId}/assertions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(badgeData),
	});

    const data = await response.json();
    console.log(data)

	return data;
};