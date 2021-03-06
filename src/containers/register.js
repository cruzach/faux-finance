import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            signInEmail: '',
            signInPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignin = () => {
        const pattern = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(this.state.name.length === 0 || this.state.signInEmail.length === 0 || this.state.signInPassword.length === 0){
            return alert('All input data is required.');
        }
        if(!pattern.test(this.state.signInEmail)){
            return alert('Please input a valid email address.');
        }

        fetch('https://rocky-everglades-18419.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    if(user === 'Unable to register.'){
                        alert('Incorrect register information.');
                    } else {
                        this.props.loadUser(user);
                        this.props.onRouteChange('portfolio','signin');
                    }
                }
            })
    }

    render(){
        return(
            <article className="br3 ba b--black-10 mv1 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input 
                                onChange={this.onNameChange} placeholder='Todd Packer' required
                                className="pa2 input-reset ba bg-transparent hover-bg-black w-100" type="name" name="name"  id="name" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange} placeholder='packer@dm.com' required
                                className="pa2 input-reset ba bg-transparent hover-bg-black w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange} required
                                className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                type="submit" 
                                onClick={this.onSubmitSignin}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                value="Register" />
                        </div>
                        
                    </div>
                </main>
            </ article>
        );
    }
}

export default Register;