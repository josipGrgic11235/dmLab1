import * as React from 'react';
import './App.css';

// import ReactFacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { VenueInfo } from 'src/components/venueInfo/VenueInfo';
import * as appActions from '../../actions/appActions';
import logo from '../../logo.svg';
import { IAppState } from '../../reducers/appReducer';
import { IFacebookLoginCheck, IFacebookLoginStatus, IVenueInfo, IWeatherInfo } from '../../types';

export interface IAppProps {
	loginInfo: IFacebookLoginCheck;
	venueData: { [id: string]: IVenueInfo };
	weather: IWeatherInfo;

	onLogin?(response: IFacebookLoginCheck): void;
	getVenueData?(venueId: string): void;
}

function mapStateToProps(state: IAppState): Partial<IAppProps> {
	return {
		loginInfo: state.loginInfo,
		venueData: state.venueInfo,
		weather: state.weather
	};
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
	return {
		onLogin: (response: IFacebookLoginCheck) => dispatch(appActions.onLogin(response)),
		getVenueData: (venueId: string) => dispatch(appActions.getVenueInfo(venueId))
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
		const weather = this.props.weather;

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to the Venue Recommender 3000</h1>

					{!isLoggedIn && <button onClick={this._onLogin}>Login</button>}
					{isLoggedIn && <button onClick={this._onLogout}>Logout</button>}
				</header>

				{Boolean(weather) && <div className="app__weather-container">
					<h3>Today's weather</h3>
					<div className="weather-data">
						<span className="data">Temperature: <b>{weather.temperature} °C</b></span>
						<span className="data">Pressure: <b>{weather.pressure} Pa</b></span>
						<span className="data"><b>{weather.description}</b></span>
					</div>
					<hr />
				</div>}
				{this.props.venueData && Object.keys(this.props.venueData).length > 0 && <h3>Venues:</h3>}
				<div className="app__venue-list">
					{Object.keys(this.props.venueData).map((key, index) =>
						<VenueInfo
							data={this.props.venueData[key]}
							key={index}
							onClicked={this.props.getVenueData}
						/>
					)}
				</div>

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
			window.FB.api('/me?fields=id,name,birthday,location{location},email', (dataResponse: any) => {
				console.log(dataResponse);
				this.props.onLogin({
					status: response.status,
					authResponse: {
						accessToken: response.authResponse.accessToken,
						email: dataResponse.email,
						name: dataResponse.name,
						id: dataResponse.id,
						location: dataResponse.location
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
