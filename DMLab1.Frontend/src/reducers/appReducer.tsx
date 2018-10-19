import { AppAction } from '../actions/appActions';
import * as constants from '../constants/app';
import { IFacebookLoginCheck, IVenueInfo, IWeatherInfo } from '../types';

export interface IAppState {
    loginInfo: IFacebookLoginCheck;
    venueInfo: { [id: string]: IVenueInfo };
    weather: IWeatherInfo;
}

export const initialState: IAppState = {
    loginInfo: null,
    venueInfo: {},
    weather: null
}

export function AppReducer(state: IAppState, action: AppAction): IAppState {
    switch (action.type) {
        case constants.ON_LOGIN:
            return {
                ...state,
                loginInfo: action.payload
            }
        case constants.GET_DATA_RESPONSE:
            const data: { [id: string]: IVenueInfo } = {};
            action.payload.venues.forEach((item: IVenueInfo) => data[item.id] = {
                ...item,
                infoLoading: true,
            });

            return {
                ...state,
                venueInfo: data,
                weather: action.payload.weather
            }
        case constants.GET_VENUE_DATA_REQUEST:
            return {
                ...state
            }
        case constants.GET_VENUE_DATA_RESPONSE:
            return {
                ...state,
                venueInfo: {
                    ...state.venueInfo,
                    [action.payload.id]: {
                        ...state.venueInfo[action.payload.id],
                        ...action.payload,
                        infoLoading: false
                    }
                }
            };
    }

    return state;
}