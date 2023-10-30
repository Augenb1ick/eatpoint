import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { numOfPeople } from '../../utils/constants';

export const selectTheme = (theme: any) =>
	createTheme({
		...theme,
		components: {
			MuiList: {
				styleOverrides: {
					root: {
						backgroundColor: '#FCF8EA',
						maxHeight: '336px',
					},
				},
			},
		},
	});

export default function SelectTextFields() {
	return (
		<ThemeProvider theme={selectTheme}>
			<TextField
				id="outlined-select-currency"
				select
				name="number_guests"
				defaultValue="2"
				sx={{
					backgroundColor: '#FCF8EA',
					width: 328,
					margin: 'auto',
					borderRadius: '8px',
				}}
			>
				{numOfPeople.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
						sx={{
							backgroundColor: '#FCF8EA',
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		</ThemeProvider>
	);
}
