import React from 'react';
import './Comments.css';

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "SexyCat",
            commentsShowing: 0,
            commentScore: 0,
            comments: [],
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
                    email: this.props.email,
                    comment: picture.comment,
                    id: picture.id,
                    score: 0
                }
                this.setState({comments: newComment});
                this.props.pushComments(newComment);
                console.log("Comment added successfully");
            }).catch(err => {
                console.log('Comment not added'); 
            })
        }
    
    commentChange = (x) => {
        this.setState({commentScore: this.state.commentScore + x});
    }
        
    commentsShowing = (x) => {
        this.setState({commentsShowing: this.state.commentsShowing + x});
    }
    
    commentsShowingUp = () => {
        if (this.state.commentsShowing + 10 >= this.props.comments.length){
            this.commentsShowing(0);
        } else {
            this.commentsShowing(10);
        }
    }
    commentsShowingDown = () => {
        if (this.state.commentsShowing <= 0){
            this.commentsShowing(0);
        } else {
            this.commentsShowing(-10);
        }
    }
    
    onCommentChange = (event) => {
        this.setState({comment: event.target.value});
    }
    
//     <div className='plus' onClick={this.commentChange(1)}> + </div>
//     <div className='minus' onClick={this.commentChange(-1)}> - </div>
    render() {
        const commentsBar = [];
        
        for (var i = 0; i < this.props.comments.length; i++) {
            commentsBar.push(<div className='comment pa1 bb b--black-10' key={i}>
                             {this.props.comments[i].email} : {this.props.comments[i].comment} 
                             </div>);
        }
    
        const commentsLimited = commentsBar.slice(this.state.commentsShowing, this.state.commentsShowing + 10);
        
      if (this.props.isMemeOn) {
        return (
                    <div className="Comments bg-light-purple br2 ma2 pa2">
                    Comments Section
                    </div>
                );
        } else {
            return (  
                <div className="Comments bg-light-purple br2 ma2 pa2"> 
                    <h5> {this.state.name} </h5>
                    <button 
                        type="button" 
                        className="btn black btn-primary btn-sm"
                        onClick={this.commentsShowingDown}
                    > {`❮ Previous`} </button>
                    
                    <button 
                        type="button"   
                        className="btn black btn-primary btn-sm"
                        onClick={this.commentsShowingUp}
                    > {` Next ❯`} </button>
                    <div className="CommentBox br2">
                        {commentsLimited}         
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