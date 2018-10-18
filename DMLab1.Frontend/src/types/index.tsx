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
    location: string;
}

export enum IFacebookLoginStatus {
    connected = 'connected',
    notAuthorized = 'not_authorized'
}

export interface IVenueInfo {
    id: string;
    name: string;
    location: ILocationInfo;
    isSelected: boolean;
    infoLoading: boolean;
    photos: string[];
    tips: IVenueTip[];
    likes: number;

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