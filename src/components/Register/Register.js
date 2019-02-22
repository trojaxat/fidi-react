import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            RegisterEmail: '',
            RegisterUsername: '',
            RegisterPassword: '',           
        }
    }
        
    onUsernameChange = (event) => {
        this.setState({RegisterUsername : event.target.value})    
    }
    
    onEmailChange = (event) => {
        this.setState({RegisterEmail : event.target.value})    
    }
    
    onPasswordChange = (event) => {
        this.setState({RegisterPassword : event.target.value})    
    }
    onSubmitRegister = (event) => {
        fetch('https://salty-oasis-94587.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.RegisterEmail,
                username : this.state.RegisterUsername,
                password: this.state.RegisterPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user[0] === this.state.RegisterEmail) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }       
        }).catch(err => {
            console.log('Register not successful');
        })
    }

    render() {
    return (
        <article className="br2 shadow-2 ma2 ba bw2 dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 bg-light-purple center">
        <div className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3 pa2">
                <label className="db fw6 lh-copy f6" htmlFor="user-name">Username</label>
                <input 
                    className="pa2 br2 input-reset ba bg-light-blue hover-bg-blue hover-white w-100" 
                    type="username" 
                    name="username"  
                    id="username"
                    onChange={this.onUsernameChange}
                />
              </div>
              <div className="mt3 pa2">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                    className="pa2 br2 input-reset ba bg-light-blue hover-bg-blue hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"
                    onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3 pa2">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                    className="b pa2 br2 input-reset ba bg-light-blue hover-bg-blue hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit" 
                value="Register"
                onClick={this.onSubmitRegister}
            />
        
            <div className="lh-copy mt3">
              <p 
                onClick={() => this.props.onRouteChange('signIn')}
                className="f6 hover-cadetblue black db pointer grow">
                Sign In
                </p>
            </div>
            </div>
          </div>
        </div>
        </article>
        );
    }
}

export default Register;