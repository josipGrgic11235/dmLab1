import { serviceEndpoint } from 'src/appData';
import * as constants from '../constants/app';
import { IFacebookLoginCheck, IGetDataResponse, IVenueInfo } from '../types';

export interface IOnLoginAction {
	type: constants.ON_LOGIN;
	payload: IFacebookLoginCheck
}

export interface IGetDataAction {
	type: constants.GET_DATA_RESPONSE;
	payload: IGetDataResponse;
}

export interface IGetVenueDataActionResponse {
	type: constants.GET_VENUE_DATA_RESPONSE;
	payload: IVenueInfo;
}

export interface IGetVenueDataActionRequest {
	type: constants.GET_VENUE_DATA_REQUEST;
	payload: string;
}

export type AppAction = IOnLoginAction | IGetDataAction | IGetVenueDataActionResponse | IGetVenueDataActionRequest;

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
				location: loginResponse.authResponse.location.location
			})
		}).then(response => response.json().then(data => {
			console.log(data);
			dispatch({
				type: constants.GET_DATA_RESPONSE,
				payload: data
			})
		}));
	}
}

export function getVenueInfo(venueId: string) {
	return (dispatch: any) => {
		dispatch({
			type: constants.GET_VENUE_DATA_REQUEST,
			payload: venueId
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
				type: constants.GET_VENUE_DATA_RESPONSE,
				payload: data
			})
		}));
	}
}