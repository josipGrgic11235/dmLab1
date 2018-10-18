import * as React from 'react';
import './App.css';

// import ReactFacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
import logo from '../../logo.svg';
import { IAppState } from '../../reducers/appReducer';
import { IFacebookLoginCheck, IFacebookLoginStatus } from '../../types';

export interface IAppProps {
	loginInfo: IFacebookLoginCheck;

	onLogin?(response: IFacebookLoginCheck): void;
}

function mapStateToProps(state: IAppState): Partial<IAppProps> {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
	return {
		onLogin: (response: IFacebookLoginCheck) => dispatch(appActions.onLogin(response))
	};
}

class App extends React.Component<IAppProps, any> {

	public constructor(props: IAppProps) {
		super(props);

		this._onLogin = this._onLogin.bind(this);
		this._onLogout = this._onLogout.bind(this);
		this._onLoggedIn = this._onLoggedIn.bind(this);
		this.initializeSDK = this.initializeSDK.bind(this);
		this.loadSDK = this.loadSDK.bind(this);
		this.checkLoginState = this.checkLoginState.bind(this);
	}

	public componentDidMount() {
		window.fbAsyncInit = this.initializeSDK;
		this.loadSDK(document, 'script', 'facebook-jssdk');
	}

	public render() {
		const isLoggedIn = Boolean(this.props.loginInfo)
			&& this.props.loginInfo.status === IFacebookLoginStatus.connected;

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
        		</p>
				{!isLoggedIn && <button onClick={this._onLogin}>Login</button>}
				{isLoggedIn && <button onClick={this._onLogout}>Logout</button>}
			</div>
		);
	}

	private initializeSDK() {
		window.FB.init({
			appId: '499728103868577',
			cookie: true,  // enable cookies to allow the server to access the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.1' // use version 2.1
		});

		window.FB.getLoginStatus(this._onLoggedIn)
	}

	private loadSDK(document: Document, script: string, id: string) {
		const fjs = document.getElementsByTagName(script)[0];;
		let js = document.getElementsByTagName(script)[0];
		if (document.getElementById(id)) {
			return;
		}
		js = document.createElement(script); js.id = id;
		(js as any).src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}

	private _onLoggedIn(response: any) {
		console.log(response);
		if (response.status === 'connected') {
			window.FB.api('/me?fields=id,name,birthday,location,email', (dataResponse: any) => {
				console.log(dataResponse);
				this.props.onLogin({
					status: response.status,
					authResponse: {
						accessToken: response.authResponse.accessToken,
						email: dataResponse.email,
						name: dataResponse.name,
						id: dataResponse.id,
						location: dataResponse.location.name
					}
				})
			});
		}
	}

	private _onLogin() {
		window.FB.login(this.checkLoginState, { scope: 'public_profile,email' });
	}

	private _onLogout() {
		window.FB.logout(this.checkLoginState);
	}

	private checkLoginState() {
		window.FB.getLoginStatus(this._onLoggedIn);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
