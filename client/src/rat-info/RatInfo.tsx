import axios, { AxiosResponse } from 'axios';
import React from 'react';


interface Info{
    name?: string;
    width?: number;
    height?: number;
    nickname?: string;
}

interface InfoState {
    info: Info
}

interface InfoProps{
    name: string;
    onError?: any;
}

class RatInfo extends React.Component<InfoProps, InfoState> {
    _isMounted = false;
    state: InfoState = {
        info: {}
    };

    async componentDidUpdate(prevProps: InfoProps) {
        if(prevProps.name !== this.props.name){
            try {
                this._isMounted = true;
                const infoResponse : AxiosResponse<Info> = await axios
                .get<Info>(`http://localhost:7421/rat/${this.props.name}`);
                let info = infoResponse.data;
                if (this._isMounted) {
                    this.setState({info});
                }
            } catch (error: any) {
                if(error.response?.status === 404){
                    this.props.onError("Rat information does not exists");
                }else{
                    this.props.onError("Unable to get the rat details");
                }
                this.setState({info: {}});
                
                
            }

        }
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>                
                <div className="col-md-6">
                { (this.state.info.width && this.state.info.height) &&
                    <div className="card">
                        <div className="card-body">            
                            <ul className="list-group list-group-flush">
                                <li placeholder="width" className="list-group-item">Width: {this.state.info.width}</li>
                                <li placeholder="height" className="list-group-item">Height: {this.state.info.height}</li>
                                {
                                    (this.state.info.nickname) 
                                        ? <li placeholder="nickname" className="list-group-item">Nickname: {this.state.info.nickname}</li>
                                        : <li placeholder="nickname" className="list-group-item">Nickname: Uncool Rat with no Nickname</li>
                                }
                            </ul>                
                        </div>
                    </div>
                }
                </div>  
            </>
            
        );
    }
}

export default RatInfo;