import React from 'react';
import Tilt from 'react-tilt';
import MemePic from './putin.jpg';
import './Meme.css';
import Loading from './loading.gif';
import Error from './error.gif';

class Meme extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            memeHome : MemePic,
            memeLoading : Loading,
            memeError: Error,
            showMenu: true,
            name: '',
            place: '',
            uploadedPhoto: {
                id: '',
                email: '',
                link: '',
                place: '',
                name: '',
            }
        }
    this.showMenu = this.showMenu.bind(this);
    }
  
      showMenu(event) {
        event.preventDefault();

        this.setState({
          showMenu: true,
        });
      }
    
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    onPlaceChange = (event) => {
        this.setState({place: event.target.value});
    }
    
    onButtonDelete = () => {
        fetch('https://salty-oasis-94587.herokuapp.com/deleteImage', {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                link : this.props.imageUrl,
                email: this.props.email
            })
        })
        .then(picture => {
            console.log("Photo deleted successfully");
        }).catch(err => {
            console.log('Photo not updated'); 
        })
        this.setState({ showMenu: false});
        this.props.deleteImageUrl()
    }
    
    onButtonUpdate = () => {
       fetch('https://salty-oasis-94587.herokuapp.com/updateImage', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                link : this.props.imageUrl,
                email: this.props.email,
                name: this.state.name,
                place: this.state.place
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Photo updated successfully");
            this.setState( {uploadedPhoto: {
                link: data.link,
                email: data.email,
                name: data.name,
                place: data.place,
            }})
            console.log('uploadedPhoto', data);
        }).catch(err => {
            console.log('Photo not updated'); 
        })
    }
    
     
    // can be put to backend to hide API key etc
    async fetchMeme(){
        this.setState({memeHome:this.state.memeLoading}) 
        const randNumber15 = () =>  Math.floor(Math.random()*(15))+1;
        const a = randNumber15();
        try {
            const response = await fetch('http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&apiKey=d9337792-12be-4408-93ee-d92725f6223e');
            const data = await response.json();
            this.setState({memeHome:data.result[a].instanceImageUrl})
        } catch(error) {
            this.setState({memeHome:this.state.memeError})        

        }
        return this.state.memeHome;
    }

        render() {
        if (this.props.isMemeOn) {
            return (
                <div className='text br2'> 
                    <Tilt className='Tilt br2' options={{ max : 25 }} > 
                    <div className='Tilt-inner'> 
                    <img 
                        style={{margin:'5px'}} 
                        src={this.state.memeHome}
                        alt=''
                        onClick={() => this.fetchMeme()}
                    />
                        </div>
                    </Tilt>
                    <h4 className="text bg-light pa3 br2" id='memeText' onClick={() => this.fetchMeme()}>{"Click the image to add info or load more memes."} </h4>
                </div>
                );
        } else if (!this.props.submitWithoutEmail) {
            return (
                <div className="text br-4"> <h4 className="bg-dark red pa2 ph3 pb3 br2" id='memeText' onClick={this.props.turnMemeOn}>{"Please sign in to add photos"}
                    </h4>
                    </div>
                )
        } else {
            return (
                <div className='text br2'> 
                    <img
                        className='Uploaded'
                        style={{margin:'5px'}} 
                        src={this.props.imageUrl}
                        alt=''
                        onClick={this.showMenu}
                    />
                    <h4 id='memeText' onClick={this.props.turnMemeOn}>{"Please click here or the meme to load more."} </h4>
                    
                    <div className="bg-white pa2 ph3-ns pb3-ns">
                        <h1 className="f5 f4-ns mv0">{this.state.uploadedPhoto.name} {this.state.uploadedPhoto.place}</h1>
                        <h1 className="f5 f4-ns mv0">{this.state.uploadedPhoto.link}</h1>
                    </div> 
                {
                this.state.showMenu
                ? (
              <div className="menu">
                <input className='br2 pa2' placeholder={'Name'} type='text' onChange={this.onNameChange}/>
                <input className='br2 pa2' placeholder={'Hashtag'} type='text' onChange={this.onPlaceChange}/>
                    <button className='br2 grow link ph3 pv2 bg-light-purple' onClick={this.onButtonUpdate}> {'Update'} </button>
                    <button className='br2 grow link ph3 pv2 bg-light-blue' onClick={this.onButtonDelete}> {'Delete'} </button>
              </div>
            )
            : (
              null
            )
        }
                </div>            
            );
        }
    }
}

export default Meme;