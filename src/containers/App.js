import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { setSearchField } from '../Actions';
import ErrorBoundary from '../ErrorBoundary';
import Navigation from '../components/Navigation/Navigation';
import Meme from '../components/Images/Meme';
import Register from '../components/Register/Register';
import SignIn from '../components/SignIn/SignIn';
import Icons from '../components/Icons/Icons';
import Comments from '../components/Comments/Comments';

import 'tachyons';
import './App.css';

const initialState = {
            icons: [
                {link:'http://placekitten.com/g/600/300'},
                {link:'http://placekitten.com/408/287'},
                {link:'https://placebear.com/200/300'},
                {link:'https://placekitten.com/200/138'},
                {link:'https://placekitten.com/200/286'}
            ],
            iconsloaded: false,
            menu: false,
            input:'',
            search: '',
            imageUrl:'',
            id: 0,
            route:'signIn',
            isSignedIn:false,
            submitWithoutEmail: false,
            isMemeOn:true,
            commentScore: 0,
            comment:'',
            comments:[],
            user: {
                id: 0,
                username: '',
                email: '',
                entries: [],
                joined: '',
                uploadedPic: ''
            }
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            icons: [
                {link:'http://placekitten.com/g/600/300', id:"Some example photos"},
                {link:'http://placekitten.com/408/287', id:"Please upload or search for more"},
                {link:'https://placebear.com/200/300', id:"You can scroll to see your uploads"},
                {link:'https://placekitten.com/200/138', id:"By clicking on your photos, you can add comments and hashtags"},
                {link:'https://placekitten.com/200/286',}
            ],
            iconsloaded: false,
            menu: false,
            input:'http://placekitten.com/g/600/300',
            search: '',
            imageUrl:'',
            id: 0,
            route:'signIn',
            isSignedIn:false,
            submitWithoutEmail: false,
            isMemeOn:true,
            commentScore: 0,
            comment:'',
            comments:[],
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
            username: data.username,
            email: data.email,
            entries: data.entries,
            date: data.joined
        }})
        this.setState({submitWithoutEmail:true})
    }
    
    // change this to component mount, so it loads when its up, shows undefined when its slow
    loadPhotos = (links) => {
        this.setState({icons:links});
        this.setState({iconsloaded: true});
    }
    
    turnMemeOn = () => {
        this.setState({isMemeOn:true})
    }
    
    deleteImageUrl = () => {
        this.setState({imageUrl: ''})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
    onSearchChange = (event) => {
        this.setState({search: event.target.value});
    }
    
    showIconPhoto = (i) => {
        this.setState({isMemeOn:false});
        this.setState({imageUrl: i});
        this.getComments(i);
    }
    
    pushComments = (newComment) => {
        this.state.comments.push(newComment);
        this.setState({comments: this.state.comments})
    }
    
    getComments = (iconNumber) => {
        fetch('https://salty-oasis-94587.herokuapp.com/getImageByLink', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                link : iconNumber,
                email: this.state.user.email,
            })
        })
        .then(response => response.json())
        .then(id => {
            this.setState({id: id.id});
            fetch('https://salty-oasis-94587.herokuapp.com/getComments', {
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    link : iconNumber,
                    id: this.state.id,
                    })
                })
                .then(response => response.json())
                .then(comments => {
                    this.setState({comments:comments});
                    console.log("Comments found successfully");
                }).catch(err => {
                    console.log('Comments not found'); 
                })
            }).catch(err => {
                console.log('Id not found'); 
            })
        }
       
    onButtonSubmit = () => {
       if (this.state.user.email === '') {
        this.setState({isMemeOn:false});
       } else {
        this.setState({isMemeOn:false});
        this.state.input.trim();
        this.setState({imageUrl: this.state.input});
        const final = "Autoname" + (this.state.imageUrl.slice(0,20));
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
    }
      
   onButtonSearch = () => {
       fetch('https://salty-oasis-94587.herokuapp.com/getImage', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name : this.state.search,
                place : this.state.search,
                email: this.state.user.email,
            })
        })
        .then(response => response.json())
        .then(picture => {
            this.setState({isMemeOn:false});
            let pic = picture.link;
            this.setState({imageUrl: pic});
            console.log("Photo found successfully");
        }).catch(err => {
            console.log('Photo not found'); 
        })
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
      const { menu, imageUrl, route, isSignedIn, input, isMemeOn, submitWithoutEmail, icons, comments } = this.state;
      const { entries, username, email, uploadedPic, id } = this.state.user;
    return (
      <div className="App">
        <Navigation 
            onInputChange={this.onInputChange} 
            onRouteChange={this.onRouteChange} 
            onSearchChange={this.onSearchChange} 
            onButtonSearch={this.onButtonSearch} 
            onButtonSubmit={this.onButtonSubmit}
            isSignedIn={isSignedIn}
            showPhotoMenu={menu}
        />
        { route === 'home'
        ?   <main>
            <ErrorBoundary>
            <Icons
                loadPhotos={this.loadPhotos}
                username={username} 
                entries={entries}
                imageUrl={imageUrl}
                email={email}
                showIconPhoto={this.showIconPhoto}
                isMemeOn={isMemeOn}
                submitWithoutEmail={submitWithoutEmail}
                icons={icons}
            />
            <Meme
                turnMemeOn={this.turnMemeOn}
                deleteImageUrl={this.deleteImageUrl}
                isMemeOn={isMemeOn}
                uploadedPic={uploadedPic}
                imageUrl={imageUrl}
                input={input}
                email={email}
                submitWithoutEmail={submitWithoutEmail}
            />
            <Comments
                pushComments={this.pushComments}
                username={username} 
                imageUrl={imageUrl}
                email={email}
                id={id}
                isMemeOn={isMemeOn}
                comments={comments}
            />
            </ErrorBoundary>
            </main>
        : (
        route === 'signIn'
            ? <SignIn  
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
                loadPhotos={this.loadPhotos}
                email={email}
                />
            : <Register 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange}
                />
            )
        }
      </div>
    );
  }
}

export default App;