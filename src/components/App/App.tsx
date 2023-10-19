import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import BookingPage from '../BookingPage/BookingPage';
import { Restaurant } from '../../utils/constants';

function App() {
	const [allEstablishments, setAllEstablishments] = useState<Restaurant[]>([]);
	const [searchEstablishments, setSearchEstablishments] = useState<
		Restaurant[]
	>([]);
	const [query, setQuery] = useState('');

	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://80.87.109.70/api/v1/establishments`
				);
				const data = await response.json();

				const updatedData = data.results.map((item: Restaurant) => {
					const updatedPoster = item.poster.replace(
						'backend:8000',
						'80.87.109.70'
					);
					return {
						...item,
						poster: updatedPoster,
					};
				});
				setAllEstablishments(updatedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	function handleSearchEstablishments() {
		setIsSearching(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://80.87.109.70/api/v1/establishments/?search=${query}`
				);
				const data = await response.json();

				const updatedData = data.results.map((item: Restaurant) => {
					const updatedPoster = item.poster.replace(
						'backend:8000',
						'80.87.109.70'
					);
					return {
						...item,
						poster: updatedPoster,
					};
				});
				setSearchEstablishments(updatedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}

	const handleRestart = (value: boolean) => {
		setIsSearching(!value);
	};

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header handleRestart={handleRestart} />
							<SearchResults
								searchEstablishments={searchEstablishments}
								setAllEstablishments={setSearchEstablishments}
								onSubmit={handleSearchEstablishments}
								query={query}
								setQuery={setQuery}
								isSearching={isSearching}
							/>
							{!isSearching && (
								<>
									<Recomended
										establishments={allEstablishments}
										nearest={false}
										link="Все"
										title="Рекомендации"
									/>
									<Recomended
										establishments={allEstablishments}
										nearest
										link="На карте"
										title="Ближайшие"
									/>
								</>
							)}
							<Footer />
						</>
					}
				/>
				{allEstablishments.map((item: Restaurant) => (
					<Route
						key={item.id}
						path={`/establishment/${item.id}`}
						element={<RestaurantPage id={item.id} />}
					/>
				))}
				{allEstablishments.map((item: Restaurant) => (
					<Route
						key={item.id}
						path={`/booking/${item.id}`}
						element={<BookingPage id={item.id} />}
					/>
				))}
				<Route path="add-restaurant" element={<AddRestaurant />}></Route>
			</Routes>
			{/* import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
// import RegisterFormUser from '../RegisterFormUser/RegisterFormUser';
import usersApi from '../../utils/UsersApi';
import { IRegisterFormData } from '../../types/commonTypes';
import {
	ERROR_400,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
} from '../../utils/constants';

const App: React.FC = () => {
	const [regErrorMessage, setRegErrorMessage] = useState('');

	const handleRegistration: (data: IRegisterFormData) => void = ({
		telephone,
		email,
		firstName,
		lastName,
		role,
		password,
		confirmPassword,
		is_agreement,
		confirm_code_send_method,
	}) => {
		usersApi
			.registerUser({
				telephone,
				email,
				firstName,
				lastName,
				password,
				confirmPassword,
				role,
				is_agreement,
				confirm_code_send_method,
			})
			.then(() => {})
			.catch((err) => {
				console.log('register-error:', err);
				if (err === ERROR_409) {
					setRegErrorMessage(EMAIL_ALREADY_REGISTERED_MESSAGE);
				} else if (err === ERROR_400) {
					setRegErrorMessage(INCORRECT_ADD_USER_DATA);
				} else {
					setRegErrorMessage(REG_ERROR_MESSAGE);
				}
			});
	};

	return (
		<div className="App">
			<Header />
			{/* <RegisterFormUser
				onRegistration={handleRegistration}
				requestErrorMessage={regErrorMessage}
			/> */}
			{/* <SearchResults />
			<Recomended nearest={false} link="Все" title="Рекомендации" />
			<Recomended nearest link="На карте" title="Ближайшие" />
			<Footer /> */}
		</div>
	);
}

export default App;
