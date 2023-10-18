import {
	Container,
	Typography,
	Stack,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Box,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	IRegisterFormData,
	IRegisterFormUserProps,
} from '../../types/commonTypes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './RegisterFormUser.css';


const RegisterFormUser: React.FC<IRegisterFormUserProps> = ({
	onRegistration,
	requestErrorMessage,
}) => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isAgreement, setIsAgreement] = useState(false);

	const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData: IRegisterFormData = {
			firstName,
			lastName,
			telephone,
			email,
			password,
			confirmPassword,
			is_agreement: isAgreement,
			role: 'client',
			confirm_code_send_method: 'nothing',
		};
		console.log(userData);

		onRegistration(userData);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<>
			<Header />
			<Container fixed maxWidth="sm">
				<Typography
					variant="h1"
					component="h1"
					sx={{
						fontFamily: 'Ubuntu',
						fontSize: '26px',
						fontWeight: '400',
						lineHeight: '32px',
						letterSpacing: 'normal',
						ml: 0,
						marginTop: 3,
						mb: 1,
					}}
				>
					Регистрация
				</Typography>
				<Box component="form" onSubmit={handleRegistration}>
					<TextField
						margin="dense"
						name="name"
						variant="outlined"
						placeholder="Имя, Фамилия"
						type="text"
						id="name"
						required
						fullWidth
						onChange={(e) => {
							const fullName = e.target.value;
							const [firstName, ...lastNameArr] = fullName.split(' ');
							const lastName = lastNameArr.join(' ');
							setFirstName(firstName);
							setLastName(lastName);
						}}
						sx={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						margin="dense"
						variant="outlined"
						name="telephone"
						placeholder="Моб. телефон"
						type="text"
						id="phone"
						onChange={(e) => setPhone(e.target.value)}
						required
						fullWidth
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						margin="dense"
						variant="outlined"
						placeholder="Эл. почта"
						name="email"
						type="text"
						onChange={(e) => setEmail(e.target.value)}
						required
						fullWidth
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						margin="dense"
						variant="outlined"
						placeholder="Пароль"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						required
						fullWidth
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						margin="dense"
						variant="outlined"
						placeholder="Пароль повторно"
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						fullWidth
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isAgreement}
								onChange={(e) => setIsAgreement(e.target.checked)}
							/>
						}
						sx={{
							alignItems: 'center',
						}}
						label={
							<Typography
								sx={{
									maxWidth: '264px',
									fontSize: '12px',
									fontWeight: '400',
									lineHeight: '16px',
									mt: '2px',
									ml: '13px',
								}}
							>
								Соглашаюсь на обработку персональных данных
							</Typography>
						}
					/>
					<Stack direction="row" spacing={2} sx={{ ml: 2, mt: 3, mb: 3 }}>
						<Button
							onClick={handleGoBack}
							variant="outlined"
							sx={{
								borderRadius: '100px',
								borderColor: '#006C60',
								height: '40px',
								width: '156px',
							}}
						>
							<Typography
								sx={{
									color: '#05887B',
									fontSize: '14px',
									fontWeight: '500',
									lineHeight: '20px',
									textTransform: 'capitalize',
								}}
							>
								Отменить
							</Typography>
						</Button>
						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: '#05887B',
								borderRadius: '100px',
								height: '40px',
								width: '156px',
							}}
						>
							<Typography
								sx={{
									fontSize: '14px',
									fontWeight: '500',
									lineHeight: '20px',
									textTransform: 'capitalize',
									letterSpacing: '-0.6px',
								}}
							>
								Зарегистрироваться
							</Typography>
						</Button>
					</Stack>
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default RegisterFormUser;
