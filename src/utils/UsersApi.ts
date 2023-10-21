import { IRegisterFormData, ILoginFormData } from '../types/commonTypes';
import { API_URL } from './constants';

class UsersApi {
	private _baseUrl: string;
	private _headers: { [key: string]: string };

	constructor({
		baseUrl,
		headers,
	}: {
		baseUrl: string;
		headers: { [key: string]: string };
	}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	private async _handleResponse<T>(res: Response): Promise<T> {
		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}`);
		}
		return res.json();
	}

	async registerUser({
		telephone,
		email,
		firstName,
		lastName,
		password,
		role,
		is_agreement,
		confirm_code_send_method,
	}: IRegisterFormData): Promise<Response> {
		return fetch(`${this._baseUrl}/api/v1/auth/signup/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				telephone,
				email,
				first_name: firstName,
				last_name: lastName,
				role,
				password,
				is_agreement,
				confirm_code_send_method,
			}),
		}).then((res) => this._handleResponse<Response>(res));
	}

	async authorize({
		email,
		password,
	}: ILoginFormData): Promise<{ access: string; refresh: string }> {
		return fetch(`${this._baseUrl}/api/v1/login/jwt/create/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email,
				password,
			}),
		}).then((res) =>
			this._handleResponse<{ access: string; refresh: string }>(res)
		);
	}
}

const usersApi = new UsersApi({
	baseUrl: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default usersApi;
