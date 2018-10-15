import { serviceEndpoint } from 'src/appData';
import * as constants from '../constants/app';
import { IFacebookLoginCheck } from '../types';

export interface IOnLoginAction {
	type: constants.ON_LOGIN;
	payload: IFacebookLoginCheck
}

export type AppAction = IOnLoginAction;

export function onLogin(loginResponse: any): any {
	return (dispatch: any) => {
		dispatch({
			type: constants.ON_LOGIN,
			payload: loginResponse
		});
		console.log(loginResponse);
		fetch(`${serviceEndpoint}/api/app/login`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				name: loginResponse.authResponse.name,
				email: loginResponse.authResponse.email,
				accessToken: loginResponse.authResponse.accessToken,
				id: loginResponse.authResponse.id,
			})
		}).then(response => response.json().then(data => console.log(data)));
	}

}