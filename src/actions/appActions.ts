import * as constants from '../constants/app';
import { IFacebookLoginInfo } from '../types';

export interface IOnLoginAction {
	type: constants.ON_LOGIN;
	payload: IFacebookLoginInfo
}

export type AppAction = IOnLoginAction;

export function onLogin(accessToken: string, email: string, expiresIn: number, id: string, name: string,
	reauthorizeRequireIn: number, signedRequest: string, userID: string): IOnLoginAction {
	return {
		type: constants.ON_LOGIN,
		payload: {
			accessToken: accessToken,
			email,
			expiresIn,
			id,
			name,
			reauthorize_required_in: reauthorizeRequireIn,
			signedRequest,
			userID
		}
	}
}