import React from 'react';
import axios from 'axios';

class DeleteForm extends React.Component {
    constructor(props) {
        super(props);
        const defaultStatus = {
            visible: false,
            text: '',
        };
        this.state = {
            email: '',
            placeholder: 'Email address',
            loading: false,
            statusOne: defaultStatus,
            statusTwo: defaultStatus,
            statusThree: defaultStatus,
            progressSuccessful: true
        };
        this.defaultState = this.state;
    }

    handleChange = event => {
        this.setState({email: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            name: 'random',
            email: this.state.email
        };
        (async () => {
            await this.handleStage(this.stageOne(user), 'One');
            if (this.state.progressSuccessful) await this.handleStage(this.stageTwo(), 'Two');
            if (this.state.progressSuccessful) await this.handleStage(this.stageThree(), 'Three');
            this.setState({loading: false})
        })();
    };

    handleStage = async (stage, statusNumber) => {
        try {
            console.log(await stage);
            this.setState({[`status${statusNumber}`] : {
                visible: true,
                text: <div className={'stage text-success clearfix'}>
                        <span className={'stage__text'}>Stage {statusNumber}</span>
                        <span className={'success-icon'}/>
                    </div>,
            }})
        } catch (e) {
            console.log(e);
            this.setState({[`status${statusNumber}`] : {
                visible: true,
                text: <div className={'stage text-danger clearfix'}>
                        <span className={'stage__text'}>Stage {statusNumber}</span>
                        <span className={'danger-icon'}/>
                    </div>,
            }, progressSuccessful: false})
        }
    };

    handleReset = () => {
        this.setState(this.defaultState);
    };

    stageOne = async (user) => {
        this.setState({loading: true});
        return await axios.post(`https://jsonplaceholder.typicode.com/users`, { user });
    };

    stageTwo = async () => {
        this.setState({loading: true});
        return await axios.get(`http://slowwly.robertomurray.co.uk/delay/3400/url/https://jsonplaceholder.typicode.com/users2`);
    };

    stageThree = async () => {
        this.setState({loading: true});
        return await axios.get(`http://slowwly.robertomurray.co.uk/delay/1400/url/https://jsonplaceholder.typicode.com/users`);
    };

    render() {
        return (
            <div className={'form-container'}>
                <div className={'header clearfix'}>
                    <h3 className={'mb-4 header__title'}>Delete User</h3>
                    {this.state.email ?
                        <span className={'header__reset-button text-secondary mt-2'} onClick={this.handleReset}>Reset</span>
                    : ''}
                </div>
                <form onSubmit={this.handleSubmit} className={'form form-inline'}>
                    <div className={'form-group'}>
                        <input type={'email'} className={'form-control mr-3'}
                               placeholder={this.state.placeholder}
                               value={this.state.email}
                               name={'email'}
                               onChange={this.handleChange}
                        />
                    </div>
                    <input disabled={!this.state.email}
                           type="submit" value="Submit" className={'btn btn-primary'} />
                </form>
                <div className={'footer clearfix'}>
                    {this.state.loading ? <div className={'loader'} /> : ''}
                    <div className={'footer__stage-container'}>
                        {this.state.statusOne.visible ? this.state.statusOne.text : ''}
                        {this.state.statusTwo.visible ? this.state.statusTwo.text : ''}
                        {this.state.statusThree.visible ? this.state.statusThree.text : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteForm;