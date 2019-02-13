import React from 'react';
import './Comments.css';

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "SexyCat",
            Comments: [{"comment":"hell yeah","id":"cat","score":2}, {"comment":"i love cat","id":"cat", "score":5}, {"comment":"aww so cute","id":"cat","score":8}],
            commentsShowing: 0,
            commentScore: 0,
        }
    }

    onFindComments = (event) => {
        fetch('https://salty-oasis-94587.herokuapp.com/comments', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email : this.props.user.email,
                name : this.state.imageUrl
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log("hi");
        }).catch(err => console.log('Comments not found'))
    }
    
    commentChange = (x) => {
        this.setState({commentScore: this.state.commentScore + x});
    }
    
    showMoreComments = () => {
        this.setState({commentsShowing: this.state.commentsShowing + 5});
    }

//     <div className='plus' onClick={this.commentChange(1)}> + </div>
//     <div className='minus' onClick={this.commentChange(-1)}> - </div>
    render() {
        const commentsBar = [];
        
        for (var i = 0; i < this.state.Comments.length; i++) {
            commentsBar.push(<div className='comment' key={i}>
                            {this.state.Comments[i].comment} 
                             </div>);
        }
      
        return (
            <div className="Comments">
                <div className="pa4 black-80">
                    <h5>{this.state.name}</h5>
                        {commentsBar}
                </div>
            </div>
                );
        }
}

export default Comments;