import React from 'react';
import Tilt from 'react-tilt';
import MemePic from './putin.jpg';
import './Meme.css';

const Meme = () => {
    return (
            <div className='text br2'> <h4>{"Please click on the photo to load more memes."} </h4>
                <Tilt className='Tilt br2' options={{ max : 25 }} > 
                <div className='Tilt-inner'> 
                <img style={{margin:'5px'}} src={MemePic} alt=''/>
                    </div>
                </Tilt>
            </div>
    );
}

//                
export default Meme;