import React from 'react';
import './Comments.css';

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "SexyCat",
            comments: [{"comment":"hell yeah","id":"cat","score":2}, {"comment":"i love cat","id":"cat", "score":5}, {"comment":"aww so cute","id":"cat","score":8}],
            commentsShowing: 0,
            commentScore: 0,
            comment: '',
            id: '',
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
        }).catch(err => {
            console.log('Comments not found');
        })
    }
    
    onCommentSubmit = () => {
        fetch('https://salty-oasis-94587.herokuapp.com/getImageByLink', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                link : this.props.imageUrl,
                email: this.props.email,
            })
        })
        .then(response => response.json())
        .then(id => {
            this.setState({id: id.id});
            this.sendComment();
        }).catch(err => {
            console.log('Id not found'); 
        })
    }
    
    sendComment = () => {
            let toBeTrimmed = this.state.comment;
            let trimmedComment = toBeTrimmed.trim();
            fetch('https://salty-oasis-94587.herokuapp.com/addComment', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                comment: trimmedComment,
                link : this.props.imageUrl,
                email: this.props.email,
                id: this.state.id
                })
            })
            .then(response => response.json())
            .then(picture => {
            let newComment = {
                    comment: picture.comment,
                    id: picture.id,
                    score: 0
                }
            this.state.comments.push(newComment);
            this.setState({commentsShowing: this.state.comments.length});
                console.log("Comment added successfully");
            }).catch(err => {
                console.log('Comment not added'); 
            })
        }
    
    commentChange = (x) => {
        this.setState({commentScore: this.state.commentScore + x});
    }
    
    showMoreComments = () => {
        this.setState({commentsShowing: this.state.commentsShowing + 5});
    }
    
    onCommentChange = (event) => {
        this.setState({comment: event.target.value});
    }
    
//     <div className='plus' onClick={this.commentChange(1)}> + </div>
//     <div className='minus' onClick={this.commentChange(-1)}> - </div>
    render() {
        const commentsBar = [];
        
        for (var i = 0; i < this.state.comments.length; i++) {
            commentsBar.push(<div className='comment pa1 bb b--black-10' key={i}>
                            {this.state.comments[i].comment} 
                             </div>);
        }
        
      if (this.props.isMemeOn) {
        return (
                    <div className="Comments bg-light-purple br2 ma2 pa2">
                    Comments Section
                    </div>
                );
        } else {
            return (  
                <div className="Comments bg-light-purple br2 ma2 pa2">
                    {this.state.name}
                    <div className="CommentBox br2">
                        {commentsBar}         
                    </div>
                <input className='CommentInput br2 pa1' placeholder={'Add comment here...'} type='text' onChange={this.onCommentChange}/>
                    <button 
                        className='br2 grow link ph3 pv2 bg-light-blue' 
                        onClick={this.onCommentSubmit}
                        id="submitComment"
                    > {'Add Comment'} </button>
                </div>
                );

        }
    }
}

export default Comments;