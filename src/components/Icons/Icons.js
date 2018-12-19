import React from 'react';
import './Icons.css'

class Icons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            icons: '',
            iconNumbers: [0,1,2,3,4],
            totalUploaded: '',
            uploaded1: '',
            uploaded2: '',
            uploaded3: '',
            uploaded4: '',
            uploaded5: '',
            name1: "Please register or sign in to add photos",
            name2: "Photo 1",
            name3: "Photo 2",
            name4: "Photo 3",
            name5: "Photo 4"
        }
    }
    
    changeIconValuesByX = (x) => {
            let newArray= this.state.iconNumbers;
            if ( x < 0 && newArray[0] < 1) {
               this.setState({ iconNumbers : [0,1,2,3,4]})
            } else {
            newArray[0] = newArray[0] + x;
            newArray[1] = newArray[1] + x;
            newArray[2] = newArray[2] + x;
            newArray[3] = newArray[3] + x;
            newArray[4] = newArray[4] + x;
            }
        }
    
    onClickNext = () => {
        this.changeIconValuesByX(5);
        // changing setSTate might not be necessary because it force updates
        fetch('https://salty-oasis-94587.herokuapp.com/loadUserIcons', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.email,
            })
        })
        .then(response => response.json())
        .then(links => {
            this.setState({totalUploaded: links.length});
            this.setState({uploaded1: links[this.state.iconNumbers[0]].link});
            this.setState({uploaded2: links[this.state.iconNumbers[1]].link});
            this.setState({uploaded3: links[this.state.iconNumbers[2]].link});
            this.setState({uploaded4: links[this.state.iconNumbers[3]].link});
            this.setState({uploaded5: links[this.state.iconNumbers[4]].link});
            this.setState({name1: links[this.state.iconNumbers[0]].place});
            this.setState({name2: links[this.state.iconNumbers[1]].place});
            this.setState({name3: links[this.state.iconNumbers[2]].place});
            this.setState({name4: links[this.state.iconNumbers[3]].place});
            this.setState({name5: links[this.state.iconNumbers[4]].place});
            }       
        )
    }
    
    onClickLast = () => {
        this.changeIconValuesByX(-5);
        fetch('https://salty-oasis-94587.herokuapp.com/loadUserIcons', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.state.email,
            })
        })
        .then(response => response.json())
        .then(links => {
            this.setState({totalUploaded: links.length});
            this.setState({uploaded1: links[this.state.iconNumbers[0]].link});
            this.setState({uploaded2: links[this.state.iconNumbers[1]].link});
            this.setState({uploaded3: links[this.state.iconNumbers[2]].link});
            this.setState({uploaded4: links[this.state.iconNumbers[3]].link});
            this.setState({uploaded5: links[this.state.iconNumbers[4]].link});
            this.setState({name1: links[this.state.iconNumbers[0]].place});
            this.setState({name2: links[this.state.iconNumbers[1]].place});
            this.setState({name3: links[this.state.iconNumbers[2]].place});
            this.setState({name4: links[this.state.iconNumbers[3]].place});
            this.setState({name5: links[this.state.iconNumbers[4]].place});
            }       
        )
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
    if (this.state.uploaded1 === '') {
    return (
            <div className='sidebar'>
                <div className='title'> 
                    {this.props.username} Uploaded photos: {this.state.totalUploaded} </div>
                    <div className="buttons">
                    <button 
                        type="button" 
                        className="btn black btn-primary btn-sm"
                        onClick={this.onClickLast}
                    > ❮ Previous </button>
                    <button 
                        type="button"   
                        className="btn black btn-primary btn-sm"
                        onClick={this.onClickNext}
                    > Next ❯ </button>
                    </div>
                <div className="div images">
                <ul className="uploaded images">
                </ul>
                </div>
            </div>
        );
    } else {
            return (
            <div className='sidebar'>
                <div className='title'> 
                {this.props.username} uploaded photos: {this.state.totalUploaded} </div>
                    <div className="buttons">
                    <button 
                        type="button" 
                        className="btn black btn-primary btn-sm"
                        onClick={this.onClickLast}
                    > ❮ Previous </button>
                    <button 
                        type="button"   
                        className="btn black btn-primary btn-sm"
                        onClick={this.onClickNext}
                    > Next ❯ </button>
                    </div>
                <div className="div images">
                <ul className="uploaded images">
                    
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
}

export default Icons;