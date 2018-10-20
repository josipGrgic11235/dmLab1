import * as React from 'react';
import { IVenueInfo } from '../../types/index';
import './venueInfo.css';

export interface IVenueInfoProps {
    data: IVenueInfo;

    onClicked?(venueId: string): void;
}

export interface IVenueInfoState {
    isExpanded: boolean;
    requestSent: boolean;
}

export class VenueInfo extends React.Component<IVenueInfoProps, IVenueInfoState> {
    public constructor(props: IVenueInfoProps) {
        super(props);
        this.state = {
            isExpanded: false,
            requestSent: false,
        }

        this._onHeaderClicked = this._onHeaderClicked.bind(this);
    }

    public render() {
        const { data } = this.props;
        return (
            <div className="venue-info__container">
                <div className="venue-info__header" onClick={this._onHeaderClicked}>
                    <span>{data.name}</span>
                </div>
                {this.state.isExpanded &&
                    <div className="venue-info__body">
                        {data.infoLoading &&
                            <div className="venue-info__loading">
                                <span>Getting data...</span>
                            </div>
                        }

                        {!data.infoLoading &&
                            <div className="venue-info__data">
                                <div className="venue-info__left-content">
                                    <span>
                                        {Boolean(data.location.address) && data.location.address + ', '}
                                        {Boolean(data.location.city) && data.location.city + ', '}
                                        {Boolean(data.location.country) && data.location.country}
                                    </span>
                                    {data.tips.map((tip, index) =>
                                        <div className="tip__container" key={index}>
                                            <span className="tip__text">"{tip.text}"</span>
                                            <div className="tip__user">
                                                <img src={tip.user.photoUrl} className="tip__photo" />
                                                <span className="tip__username">{tip.user.name}</span>
                                            </div>

                                        </div>
                                    )}
                                    <span><b>{data.likeCount}</b> likes</span>
                                </div>
                                <div className="venue-info__right-content">
                                    {data.photoUrls.map((url, index) => <img src={url} key={index} className="venue-info__photo" />)}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }

    private _onHeaderClicked() {
        const newState: IVenueInfoState = {
            ...this.state,
            isExpanded: !this.state.isExpanded
        }
        if (!this.state.requestSent) {
            this.props.onClicked(this.props.data.id);
            newState.requestSent = true;
        }

        this.setState(newState);
    }
}