import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { setSearchField } from '../Actions';
import ErrorBoundary from '../ErrorBoundary';
import Navigation from '../components/Navigation/Navigation';
import Meme from '../components/Images/Meme';
import Register from '../components/Register/Register';
import SignIn from '../components/SignIn/SignIn';
import Icons from '../components/Icons/Icons';

import 'tachyons';
import './App.css';

const initialState = {
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
                joined: '',
                uploadedPic: ''
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
        // check while logged in and add photo to icons
        this.state.input.trim();
        this.setState({imageUrl: this.state.input});
        const final = this.state.imageUrl.slice(30,50);
        fetch('https://salty-oasis-94587.herokuapp.com/addImage', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                link : this.state.input,
                email: this.state.user.email,
                place: final
            })
        })
        .then(picture => {
            console.log("Photo added successfully");
        }).catch(err => {
            console.log('Photo not added'); 
        })
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
         this.setState(initialState) 
       } else if (route === 'home') {
         this.setState({isSignedIn:true})  
       }
       this.setState({route:route});
   }

  render() {
      const { menu, imageUrl, route, isSignedIn } = this.state;
      const { entries, username, email, uploadedPic } = this.state.user;
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
            <Icons
                username={username} 
                entries={entries}
                imageUrl={imageUrl}
                email={email}
            />
            </ErrorBoundary>
            <Meme 
                uploadedPic={uploadedPic}
            />
            </div>
        : (
        route === 'signIn'
            ? <SignIn  loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;