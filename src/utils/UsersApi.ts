import { IRegisterFormData, ILoginFormData } from '../types/commonTypes';
import { API_URL, UserData } from './constants';

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
			return Promise.reject(`Error: ${res.status}`);
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

	getUserInfo(): Promise<any> {
		return fetch(`${this._baseUrl}/api/v1/users/me/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		}).then((res) => this._handleResponse(res));
	}

	deleteBooking(id: string): Promise<any> {
		return fetch(`${this._baseUrl}/api/v1/reservations/${id}/`, {
			method: 'DELETE',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		});
	}

	getUserBookings(): Promise<any> {
		return fetch(`${this._baseUrl}/api/v1/reservations/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		}).then((res) => this._handleResponse(res));
	}

	sendReview(id: number, text: string, score: number): Promise<any> {
		return fetch(`${this._baseUrl}/api/v1/establishments/${id}/reviews/`, {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text, score }),
		}).then((res) => this._handleResponse(res));
	}
}

const usersApi = new UsersApi({
	baseUrl: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default usersApi;
