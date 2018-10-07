import { AppAction } from '../actions/appActions';
import * as constants from '../constants/app';
import { IFacebookLoginCheck } from '../types';

export interface IAppState {
    loginInfo: IFacebookLoginCheck;
}

export const initialState: IAppState = {
    loginInfo: null
}

export function AppReducer(state: IAppState, action: AppAction): IAppState {
    switch (action.type) {
        case constants.ON_LOGIN:
            return {
                ...state,
                loginInfo: action.payload
            }
    }

    return state;
}