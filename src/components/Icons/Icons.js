import React from 'react';
import './Icons.css'

class Icons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: '',
            uploaded1: 'https://preview.ibb.co/hpG6J0/cambodia.jpg',
            uploaded2: 'https://preview.ibb.co/hzJxQf/fun.jpg',
            uploaded3: 'https://preview.ibb.co/hpG6J0/cambodia.jpg',
            uploaded4: 'https://preview.ibb.co/hpG6J0/cambodia.jpg',
            uploaded5: 'https://preview.ibb.co/hzJxQf/fun.jpg',
            name1: "cambodia.jpg",
            name2: "fun.jpg",
            name3: "cambodia.jpg",
            name4: "cambodia.jpg",
            name5: "cambodia.jpg"
        }
    }
    
    onClickNext = () => {
        fetch('https://salty-oasis-94587.herokuapp.com/loadUserIcons', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.signInEmail,
            })
        })
        .then(response => response.json())
        .then(links => {
                this.setState({icons: links});
            }       
        )
    }
    onClickLast = () => {
        return console.log('email',  this);
    }
    
    onChangeIcons = () => {
        fetch('https://salty-oasis-94587.herokuapp.com/addImage', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.email,
                id: this.state.id
            })
        })
        .then(response => {
            console.log(response.json())
        })      
    }

    render() {
    return (
            <div className='sidebar'>
                <div className='title'> 
                    Name Uploaded photos: Amount </div>
                    <div className="buttons">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={this.onClickLast}
                    > ❮ Previous </button>
                    <button 
                        type="button"   
                        className="btn btn-primary btn-sm"
                        onClick={this.onClickNext}
                    > Next ❯ </button>
                    </div>
                <div className="div images">
                <ul className="uploaded images">
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src="http://placekitten.com/g/600/300" className="db w-100 br2 br--top" alt=""/>
                      <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">Cat</h1>
                          </div>
                    </div>
        
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src={this.state.uploaded1} className="db w-100 br2 br--top" alt=""/>
                          <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">{this.state.name1}</h1>
                          </div>
                    </div>
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src={this.state.uploaded2} className="db w-100 br2 br--top" alt=""/>
                          <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">{this.state.name2}</h1>
                          </div>
                    </div>
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src={this.state.uploaded3} className="db w-100 br2 br--top" alt=""/>
                          <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">{this.state.name3}</h1>
                          </div>
                    </div>
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src={this.state.uploaded4} className="db w-100 br2 br--top" alt=""/>
                          <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">{this.state.name4}</h1>
                          </div>
                    </div>
                    <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                      <img src={this.state.uploaded5} className="db w-100 br2 br--top" alt=""/>
                          <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 className="f5 f4-ns mv0">{this.state.name5}</h1>
                          </div>
                </div>
                </ul>
                </div>
            </div>
        );
    }
}

export default Icons;