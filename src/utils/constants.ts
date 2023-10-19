export const availableKitchen = [
	'Азиатская',
	'Русская',
	'Европейская',
	'Мексиканская',
	'Итальянская',
	'Грузинская',
];

export const availableType = [
	'Бар',
	'Ресторан',
	'Кофейня',
	'Пиццерия',
	'Фаст-фуд',
	'Караоке',
	'Кондитерская',
];

export const availableService = [
	'Парковка',
	'Терасса',
	'Wi-Fi',
	'Детская комната',
];

export interface kitchen {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Kitchen {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Service {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Zone {
	id: number;
	zone: string;
	seats: number;
	available_seats: number;
}

export interface Type {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface WorkedDay {
	day: string;
	start: string;
	end: string;
	day_off: boolean;
	day_off_st?: string;
}

export interface Social {
	name: string;
}

export interface Image {
	name: string;
	image: string;
}

export interface Restaurant {
	id: number;
	owner: number;
	name: string;
	types: Type[];
	cities: string;
	address: string;
	kitchens: Kitchen[];
	services: Service[];
	zones: Zone[];
	average_check: string;
	poster: string;
	email: string;
	telephone: string;
	description: string;
	is_verified: boolean;
	worked: WorkedDay[];
	is_favorited: boolean;
	socials: Social[];
	images: Image[];
	rating: number;
}

export interface Review {
	id: number;
	username: string;
	rating: number;
	text: string;
}

export const featuresLang: Record<string, string> = {
	parking: 'Парковка',
	wifi: 'Wi-Fi',
	terrace: 'Терраса',
	kidsRoom: 'Детская комната',
};

export const zoneLang: Record<string, string> = {
	mainHall: 'Основной зал',
	terrace: 'Терраса',
	banquetHall: 'Банкетный зал',
};

export const getDayAbbreviation = (day: string) => {
	switch (day) {
		case 'понедельник':
			return 'Пн.';
		case 'вторник':
			return 'Вт.';
		case 'среда':
			return 'Ср.';
		case 'четверг':
			return 'Чт.';
		case 'пятница':
			return 'Пт.';
		case 'суббота':
			return 'Сб.';
		case 'воскресенье':
			return 'Вс.';
		default:
			return day;
	}
};

function replaceBackendUrl(data: any): any {
	const replaceUrl = (url: string) =>
		url.replace('backend:8000', '80.87.109.70');

	if (typeof data === 'string') {
		return replaceUrl(data);
	} else if (Array.isArray(data)) {
		return data.map((item) => replaceBackendUrl(item));
	} else if (typeof data === 'object' && data !== null) {
		const updatedData: Record<string, any> = {};
		for (const key in data) {
			updatedData[key] = replaceBackendUrl(data[key]);
		}
		return updatedData;
	}

	return data;
}

export const fetchRestaurantData = async (id: number) => {
	try {
		const response = await fetch(
			`http://80.87.109.70/api/v1/establishments/${id}`
		);
		const data = await response.json();

		const updatedData = replaceBackendUrl(data);

		return updatedData;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	return;
};

export const numOfPeople = [
	{
		value: 1,
		label: '1 человек',
	},
	{
		value: 2,
		label: '2 человека',
	},
	{
		value: 3,
		label: '3 человека',
	},
	{
		value: 4,
		label: '4 человека',
	},
	{
		value: 5,
		label: '5 человек',
	},
	{
		value: 6,
		label: '6 человек',
	},
];

export const zones = [
	{
		value: 1,
		label: 'Основной зал',
	},
	{
		value: 2,
		label: 'Центральный зал',
	},
	{
		value: 3,
		label: 'Барная стойка',
	},
	{
		value: 4,
		label: 'Зона на терассе',
	},
	{
		value: 5,
		label: 'Банкетный зал',
	},
];

export const formValues: any = {
	reminder_one_day: true,
	reminder_three_hours: true,
	reminder_half_on_hour: true,
};

export const inputs = [
	{
		label: 'Имя',
		id: 'first_name',
		type: 'text',
		required: true,
		maxLength: 30,
		errorMessage: 'Введите корректное имя фамилию',
	},
	{
		label: 'Моб. телефон',
		id: 'telephone',
		required: true,
		type: 'number',
		errorMessage: 'Введите корректный номер моб. телефона',
	},
	{
		label: 'Эл. почта',
		type: 'email',
		id: 'email',
		errorMessage: 'Введите корректный адрес эл. почты',
	},
	{
		label: 'Комментарий',
		type: 'text',
		id: 'comment',
		required: false,
		maxLength: 1500,
		errorMessage: 'Длина введённого текста превышает 1500 символов',
	},
];

const EMAIL_REGEX = '^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$';
const NAME_REGEX = '^[a-zA-Z\u0430-\u044f\u0410-\u042f]+$';
const PHONE_NUMBER_REGEX =
	'/^(+?d{1,4}[s-]?)?(()?(d{1,4})(?(2)))?[s-]?d{1,4}[s-]?d{1,9}$/';

const ERROR = 'Ошибка';
const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_409 = 409;

const EMAIL_ALREADY_REGISTERED_MESSAGE =
	'Пользователь с таким email уже существует.';
const INCORRECT_ADD_USER_DATA = 'Переданы некорректные данные при регистрации';
const REG_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';

export {
	EMAIL_REGEX,
	NAME_REGEX,
	ERROR,
	ERROR_400,
	ERROR_401,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
	PHONE_NUMBER_REGEX,
};
