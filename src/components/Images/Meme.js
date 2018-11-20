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
            memeError: Error
        }
    }
    
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
    return (
            <div className='text br2'> <h4>{"Please click on the photo to load more memes."} </h4>
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
            </div>
        );
    }
}

//                
export default Meme;