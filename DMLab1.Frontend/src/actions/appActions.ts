import { serviceEndpoint } from 'src/appData';
import * as constants from '../constants/app';
import { IFacebookLoginCheck, IVenueInfo } from '../types';

export interface IOnLoginAction {
	type: constants.ON_LOGIN;
	payload: IFacebookLoginCheck
}

export interface IOnGetDataAction {
	type: constants.ON_GET_DATA_RESPONSE;
	payload: IVenueInfo[];
}

export interface IOnGetVenueDataAction {
	type: constants.ON_GET_VENUE_DATA_RESPONSE;
	payload: IVenueInfo[];
}

export type AppAction = IOnLoginAction | IOnGetDataAction | IOnGetVenueDataAction;

export function onLogin(loginResponse: IFacebookLoginCheck): any {
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
				location: loginResponse.authResponse.location
			})
		}).then(response => response.json().then(data => {
			console.log(data);
			dispatch({
				type: constants.ON_GET_DATA_RESPONSE,
				payload: data
			})
		}));
	}
}

export function getVenueInfo(venueId: string) {
	return (dispatch: any) => {
		dispatch({
			type: constants.ON_GET_VENUE_DATA_REQUEST
		});

		fetch(`${serviceEndpoint}/api/app/venue/${venueId}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Accept': 'application/json; charset=utf-8'
			}
		}).then(response => response.json().then(data => {
			console.log(data);
			dispatch({
				type: constants.ON_GET_VENUE_DATA_RESPONSE,
				payload: data
			})
		}));
	}
}