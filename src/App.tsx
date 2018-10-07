import * as React from 'react';
import './App.css';

// import ReactFacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import * as appActions from '../src/actions/appActions';
import logo from './logo.svg';
import { IAppState } from './reducers/appReducer';
import { IFacebookLoginCheck, IFacebookLoginInfo, IFacebookLoginStatus } from './types';

export interface IAppProps {
	loginInfo: IFacebookLoginInfo;

	onLogin?(accessToken: string, email: string, expiresIn: number, id: string, name: string,
		reauthorizeRequireIn: number, signedRequest: string, userID: string): void;
}

function mapStateToProps(state: IAppState): Partial<IAppProps> {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
	return {
		onLogin: (accessToken: string, email: string, expiresIn: number, id: string, name: string,
			reauthorizeRequireIn: number, signedRequest: string, userID: string) =>
			dispatch(appActions.onLogin(accessToken, email, expiresIn, id, name, reauthorizeRequireIn, signedRequest, userID))
	};
}

class App extends React.Component<IAppProps, any> {

	public constructor(props: IAppProps) {
		super(props);

		this._onLogin = this._onLogin.bind(this);
		this.testAPI = this.testAPI.bind(this);
		this.initializeSDK = this.initializeSDK.bind(this);
		this.loadSDK = this.loadSDK.bind(this);
		this.statusChangeCallback = this.statusChangeCallback.bind(this);
		this.checkLoginState = this.checkLoginState.bind(this);
	}

	public componentDidMount() {
		window.fbAsyncInit = this.initializeSDK;
		this.loadSDK(document, 'script', 'facebook-jssdk');
	}

	public render() {
		console.log(window);
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
        		</p>
				<button onClick={this._onLogin}>Login</button>
				<button onClick={this._onLogout}>Logout</button>
				<div id="status" />
			</div>
		);
	}

	private initializeSDK() {
		window.FB.init({
			appId: '499728103868577',
			cookie: true,  // enable cookies to allow the server to access
			// the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.1' // use version 2.1
		});

		// Now that we've initialized the JavaScript SDK, we call
		// FB.getLoginStatus().  This function gets the state of the
		// person visiting this page and can return one of three states to
		// the callback you provide.  They can be:
		//
		// 1. Logged into your app ('connected')
		// 2. Logged into Facebook, but not your app ('not_authorized')
		// 3. Not logged into Facebook and can't tell if they are logged into
		//    your app or not.
		//
		// These three cases are handled in the callback function.
		window.FB.getLoginStatus(this.statusChangeCallback)
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

	private _onLogin(response: any) {
		window.FB.login(this.checkLoginState)
		/*console.log(window);
		console.log('_callback');
		console.log(response);
		this.props.onLogin(response.accessToken, response.email, response.expiresIn,
			response.id, response.name, response.reauthorizeRequireIn, response.signedRequest, response.userID);*/
	}

	private _onLogout() {
		window.FB.logout();
	}

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	private testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		window.FB.api('/me', (response: any) => {
			console.log('Successful login for: ' + response.name);
			document.getElementById('status').innerHTML =
				'Thanks for logging in, ' + response.name + '!';
		});
	}

	// This is called with the results from from FB.getLoginStatus().
	private statusChangeCallback(response: IFacebookLoginCheck) {
		console.log('statusChangeCallback');
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === IFacebookLoginStatus.connected) {
			// Logged into your app and Facebook.
			this.testAPI();
		} else if (response.status === IFacebookLoginStatus.notAuthorized) {
			// The person is logged into Facebook, but not your app.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into this app.';
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			document.getElementById('status').innerHTML = 'Please log ' +
				'into Facebook.';
		}
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	private checkLoginState() {
		window.FB.getLoginStatus(this.statusChangeCallback);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
