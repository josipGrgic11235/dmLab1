import * as constants from '../constants/app';
import { IFacebookLoginCheck } from '../types';

export interface IOnLoginAction {
	type: constants.ON_LOGIN;
	payload: IFacebookLoginCheck
}

export type AppAction = IOnLoginAction;

export function onLogin(response: IFacebookLoginCheck): IOnLoginAction {
	return {
		type: constants.ON_LOGIN,
		payload: response
	}
}