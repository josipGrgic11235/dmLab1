import * as React from 'react';
import { IVenueInfo } from '../../types/index';
import './venueInfo.scss';

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
                    <p>{data.name}</p>
                </div>
                {this.state.isExpanded &&
                    <div className="venue-info__body">
                        {data.infoLoading &&
                            <div className="venue-info__loading">
                                <p>Getting data...</p>
                            </div>
                        }

                        {!data.infoLoading &&
                            <div className="venue-info__data">
                                <p>{data.likeCount} likes</p>
                                <p>Address: {data.location.address}, {data.location.city}, {data.location.country}</p>
                                {data.tips.map((tip, index) =>
                                    <p key={index}>
                                        "{tip.text}"- {tip.user.name}
                                        <img src={tip.user.photoUrl} />
                                    </p>
                                )}
                                {data.photoUrls.map((url, index) => <img src={url} key={index} />)}
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