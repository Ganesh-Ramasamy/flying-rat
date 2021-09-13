import axios from 'axios';
import React from 'react';
import Select from 'react-select';
import { OptionType } from '../types/option.type';
import './Filter.scss';

interface FilterState {
   rats: OptionType[];
}

interface FilterProps{
    onRatSelected?: any;
    onError?: any;
}

class Filter extends React.Component<FilterProps, FilterState> {
    _isMounted = false;
    state: Readonly<FilterState> = {
        rats: []
    };

    async componentDidMount() {
        try {
            this._isMounted = true;
            let response = await axios.get<string[]>("http://localhost:7421/rat-names");
            const rats = response.data.map<OptionType>( e => ({value: e, label: e}));
            if (this._isMounted) {
                this.setState({ rats });
            }
        } catch (error) {
            this.props.onError("Unable to get the rat names");
        }

        
    }

    change = (event: any): void => {
        this.props.onRatSelected(event.value);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
            <div className="col-md-6">
                <div className="card" >
                    <div className="card-body">
                        <Select  onChange={this.change.bind(this)}
                            defaultValue={{ label: "No Rat", value: 'No Rat' }}
                            options={this.state.rats}
                        />
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Filter;