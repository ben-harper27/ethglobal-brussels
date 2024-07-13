import {API_BASE} from "@/lib/api/common";

export async function createUserIfNotExist(data, jwt) {
	try {
		const response = await fetch(`${API_BASE}/v1/user/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-d-jwt": jwt
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			const r = await response.json();
			console.log(r);
			return r;
		}
		return {user: {}};
	} catch (e) {
		console.error(e);
		return {user: {}};
	}
}
