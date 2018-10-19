declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        FB: any
        fbAsyncInit(): void;
    }
}

export interface IFacebookLoginCheck {
    authResponse: IFacebookLoginInfo;
    status: IFacebookLoginStatus;
}

export interface IFacebookLoginInfo {
    accessToken: string;
    email: string;
    name: string;
    id: string;
    location: ILoginLocationInfo;
}

export interface ILoginLocationInfo {
    id: string;
    location: ILoginInnerLocationInfo;
}

export interface ILoginInnerLocationInfo {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

export enum IFacebookLoginStatus {
    connected = 'connected',
    notAuthorized = 'not_authorized'
}

export interface IVenueInfo {
    id: string;
    name: string;
    location: ILocationInfo;
    infoLoading: boolean;
    photoUrls: string[];
    tips: IVenueTip[];
    likeCount: number;
}

export interface IVenueTip {
    id: string;
    text: string;
    user: IUser;
}

export interface ILocationInfo {
    address: string;
    lat: number;
    lng: number;
    city: string;
    country: string;
}

export interface IUser {
    id: string;
    name: string;
    photoUrl: string;
}

export interface IGetDataResponse {
    venues: IVenueInfo[];
    weather: IWeatherInfo;
}

export interface IWeatherInfo {
    description: string;
    pressure: number;
    temperature: number;
}