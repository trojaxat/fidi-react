import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { setSearchField } from '../Actions';
import ErrorBoundary from '../ErrorBoundary';
import Navigation from '../components/Navigation/Navigation';
import Meme from '../components/Images/Meme';
import Register from '../components/Register/Register';
import SignIn from '../components/SignIn/SignIn';
import User from '../components/User/User';

import 'tachyons';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            menu: false,
            input:'',
            imageUrl:'',
            route:'home',
            isSignedIn:true,
            user: {
                id: 0,
                username: '',
                email: '',
                entries: [],
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState( {user: {
            id: data.id,
            name: data.username,
            email: data.email,
            entries: data.entries,
            date: data.joined
        }})
    }
    
    componentDidMount() {
        fetch('http://localhost:3000')
        .then(response => response.json())
        .then(console.log)
    }
        
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
   onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        this.state.user.entries.push(this.state.input);
        return this.state.user.entries;
        } 
   
   // toggle attempt
   showPhotoMenu = () => {
       if (this.setState === true) {
         this.setState({isSignedIn:false}) 
       } else {
         this.setState({isSignedIn:true})  
       }
   }
   
   onRouteChange = (route) => {
       if (route === 'signOut') {
         this.setState({isSignedIn:false}) 
       } else if (route === 'home') {
         this.setState({isSignedIn:true})  
       }
       this.setState({route:route});
   }

  render() {
      const { menu, imageUrl, route, isSignedIn } = this.state;
      const { entries, username } = this.state.user;
    return (
      <div className="App">
        <Navigation 
            onInputChange={this.onInputChange} 
            onRouteChange={this.onRouteChange} 
            onButtonSubmit={this.onButtonSubmit}
            isSignedIn={isSignedIn}
            showPhotoMenu={menu}
        />
        { route === 'home'
        ?   <div>
            <ErrorBoundary>
            <User
                username={username} 
                entries={entries}
                imageUrl={imageUrl}
            />
            </ErrorBoundary>
            <Meme />
            </div>
        : (
        route === 'signIn'
            ? <SignIn  loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;