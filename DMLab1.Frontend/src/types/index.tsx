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