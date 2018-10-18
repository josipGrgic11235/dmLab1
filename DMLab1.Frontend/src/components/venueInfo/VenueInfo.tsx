import * as React from 'react';
import { IVenueInfo } from '../../types/index';

export interface IVenueInfoProps {
    data: IVenueInfo;
    isLoadingData: boolean;

    onClicked?(venueId: string): void;
}

export interface IVenueInfoState {
    isExpanded: boolean;
}

export class VenueInfo extends React.Component<IVenueInfoProps, IVenueInfoState> {
    public constructor(props: IVenueInfoProps) {
        super(props);
        this.state = {
            isExpanded: false
        }

        this._onHeaderClicked = this._onHeaderClicked.bind(this);
    }

    public render() {
        return (
            <div className="venue-info-container">
                <p onClick={this._onHeaderClicked}>{this.props.data.name}</p>
            </div>
        );
    }

    private _onHeaderClicked() {
        this.props.onClicked(this.props.data.id);
    }
}