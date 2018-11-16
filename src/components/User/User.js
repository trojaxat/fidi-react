import React from 'react';
import './User.css'

const User = ({ username, entries, imageUrl }) => {
    const length = entries.length;
    return (
            <div className='sidebar'>
                <div className='title'> 
                    { username } Uploaded photos: {length} </div>
                <div className="div images">
                <ul className="uploaded images">
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src="http://placekitten.com/g/600/300" className="db w-100 br2 br--top" alt=""/>
                      <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">Cat</h1>
                          </div>
                    </div>
                    <img className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" src={entries[length-1]} width='200px' height='200px' alt=''/>
                    <img className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" src={entries[length-2]} width='200px' height='200px' alt=''/>
                    <img className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" src={entries[length-3]} width='200px' height='200px' alt=''/>
                    <img className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" src={entries[length-4]} width='200px' height='200px' alt=''/>
                    <img className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" src={entries[length-5]} width='200px' height='200px' alt=''/>
                </ul>
                </div>
            </div>
    );
}
 
export default User;