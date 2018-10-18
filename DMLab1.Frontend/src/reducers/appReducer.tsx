import { AppAction } from '../actions/appActions';
import * as constants from '../constants/app';
import { IFacebookLoginCheck, IVenueInfo } from '../types';

export interface IAppState {
    loginInfo: IFacebookLoginCheck;
    venueInfo: IVenueInfo[];
}

export const initialState: IAppState = {
    loginInfo: null,
    venueInfo: []
}

export function AppReducer(state: IAppState, action: AppAction): IAppState {
    switch (action.type) {
        case constants.ON_LOGIN:
            return {
                ...state,
                loginInfo: action.payload
            }
        case constants.ON_GET_DATA_RESPONSE:
            return {
                ...state,
                venueInfo: action.payload
            }
        case constants.ON_GET_VENUE_DATA_RESPONSE:
            return {
                ...state
            };
    }

    return state;
}