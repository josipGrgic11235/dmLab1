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
    expiresIn: number;
    id: string;
    name: string;
    reauthorize_required_in: number;
    signedRequest: string;
    userID: string;
}

export enum IFacebookLoginStatus {
    connected = 'connected',
    notAuthorized = 'not_authorized'
}