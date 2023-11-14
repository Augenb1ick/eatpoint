import { API_URL } from './constants';
import { RestaurantData } from '../types/addRestaurantTypes';
import { ReservationFormValues } from '../types/ReservationFormValues';

class MainApi {
	private _baseUrl: string;
	private _headers: Record<string, string>;
	constructor(options: { baseUrl: string; headers: Record<string, string> }) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_sendFetchRequest(path: string, settings: RequestInit) {
		return fetch(`${this._baseUrl}${path}`, settings).then((res) => {
			if (!res.ok) {
				return Promise.reject(`Error: ${res.status}`);
			}
			return res.json();
		});
	}

	getEstablishments(pageSize: number) {
		return this._sendFetchRequest(
			`/api/v1/establishments/?page_size=${pageSize}`,
			{
				headers: this._headers,
			}
		);
	}

	getEstablissmentData(id: number) {
		return this._sendFetchRequest(`/api/v1/establishments/${id}`, {
			headers: this._headers,
		});
	}

	getEstablishmentsBySearchQuery(query: string, pageSize: number) {
		return this._sendFetchRequest(
			`/api/v1/establishments/?page_size=${pageSize}&search=${query}`,
			{ headers: this._headers }
		);
	}

	getAllMyEstablishments() {
		return this._sendFetchRequest(`/api/v1/business/establishments/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		});
	}

	createEstablishment(data: RestaurantData) {
		return this._sendFetchRequest(`/api/v1/business/establishments/`, {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	getEstablishmentsReviews(id: number) {
		return this._sendFetchRequest(`/api/v1/establishments/${id}/reviews/`, {
			headers: this._headers,
		});
	}

	bookEstablishment = (
		id: number,
		formData: ReservationFormValues,
		isLoggedIn: boolean
	) => {
		const headers = isLoggedIn
			? {
					authorization: 'Bearer ' + localStorage.getItem('access-token'),
					'Content-Type': 'application/json',
			  }
			: ({
					'Content-Type': 'application/json',
			  } as Record<string, string>);

		return this._sendFetchRequest(
			`/api/v1/establishments/${id}/reservations/`,
			{
				method: 'POST',
				headers,
				body: JSON.stringify(formData),
			}
		);
	};

	getAllCities() {
		return this._sendFetchRequest(`/api/v1/cities/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}

export const mainApi = new MainApi({
	baseUrl: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
