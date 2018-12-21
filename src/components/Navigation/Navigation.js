import React from 'react';
import "./Navigation.css"

const Navigation = ({ onRouteChange, onInputChange, onButtonSubmit, isSignedIn, showPhotoMenu, onButtonSearch, onSearchChange }) => {
    //<a className="navLeft f5" id="water" href="http://localhost/Water-Project-1/waterlogged.html">{'Waterlogged Link'}</a>
    if (isSignedIn) {
         return (
            <nav className="bg-light">
                <div className="navbar tl">
                    <div className="links">
                    <ul>
                        <div className="navLinks pl0">
                            <p className="navLeft f4" id="fidi" onClick={() => onRouteChange('home')} >{'Dan and Fidi'}</p>
                        </div>

                        <div className="navLinks pl3">
                            <a className="navLeft f5" id="water" href="https://medium.com/@danaxiom/the-complete-steps-to-becoming-the-legend-you-always-thought-you-were-924f880e92d4">{'Medium Link'}</a>
                        </div>
                            
                        <div className="navLinks pl3">
                            <p className="navLeft f5" onClick={() => onRouteChange('signIn')}>{'Sign In'}</p>
                        </div>
                            
                        <div className="navLinks pl3">
                            <p className="navLeft f5" onClick={() => onRouteChange('signOut')}>{'Sign Out'}</p>
                        </div>

                        <div className="navLinks pl3">
                            <p className="buttonPhoto f5"> {'Photos ▼'} </p>
                            <div className="dropdown pl6 tl dib"> 
                            </div>
                        </div>
                    </ul>
                    </div>


                <div className="navLinks">
                    <div className="InputBoxes">
                    <div className='UploadBox tc pa2 br2 dib shadow-5'>
                        <input className='br2 pa2' placeholder={'Add photo link...'} type='text' onChange={onInputChange}/>
                        <button className='br2 grow link ph3 pv2 bg-light-purple' 
                            onClick={onButtonSubmit}> {'Upload'} </button>
                        </div>
                    <div className='SearchBox tc pa2 br2 dib shadow-5'>
                        <input className='br2 pa2' placeholder={'Search for photo...'} type='text' onChange={onSearchChange}/>
                        <button 
                            className='br2 grow link ph3 pv2 bg-light-blue' 
                            onClick={onButtonSearch}
                            id="submitHashtag"
                            > {'Search'} </button>
                        </div>
                        </div>
                    </div>

                </div>
            </nav>
            );
        } else {
            return (
            <nav className="bg-light">
                <div className="navbar tl">
                    <div className="links">
                    <ul>
                        <div className="navLinks pl0">
                            <p className="navLeft f4" id="fidi" onClick={() => onRouteChange('home')} >{'Dan and Fidi'}</p>
                        </div>

                        <div className="navLinks pl3">                         
                            <a className="navLeft f5" id="water" href="https://medium.com/@danaxiom/the-complete-steps-to-becoming-the-legend-you-always-thought-you-were-924f880e92d4">{'Medium Link'}</a>
                        </div>
                            
                        <div className="navLinks pl3">
                            <p className="navLeft f5" onClick={() => onRouteChange('signIn')} >{'Sign In'}</p>
                        </div>
                            
                        <div className="navLinks pl3">
                            <p className="navLeft f5" onClick={() => onRouteChange('register')} >{'Register'}</p>
                        </div>

                        <div className="navLinks pl3">
                            <p className="buttonPhoto f5"> {'Photos ▼'} </p>
                            <div className="dropdown pl6 tl dib">
                            </div>
                        </div>
                    </ul>
                    </div>


                <div className="navLinks">
                    <div className="InputBoxes">
                    <div className='UploadBox tc pa2 br2 dib shadow-5'>
                        <input className='br2 pa2' placeholder={'Upload photos...'} type='text' onChange={onInputChange}/>
                        <button 
                            className='br2 grow link ph3 pv2 bg-light-purple' 
                            onClick={onButtonSubmit}
                            id="submitLink"
                            > {'Upload'} </button>
                        </div>
                    <div className='SearchBox tc pa2 br2 dib shadow-5'>
                        <input className='br2 pa2' placeholder={'Search for photo...'} type='text' onChange={onSearchChange}/>
                        <button 
                            className='br2 grow link ph3 pv2 bg-light-blue' 
                            onClick={onButtonSearch}
                            id="submitHashtag"
                            > {'Search'} </button>
                        </div>
                        </div>
                    </div>

                </div>
            </nav>
         );   
    }
}
 
export default Navigation;