import React from 'react';
import './Icons.css'

class Icons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            email: this.props.email,
            icons: '',
            iconNumbers: [0,1,2,3,4],
            totalUploaded: '',
        }
    }
    
    onItemClick = (item, e) => {  
//        console.log('e', e._targetInst.pendingProps.src);
        let clickedPhoto = e._targetInst.memoizedProps.src;
        this.props.showIconPhoto(clickedPhoto);
    }

    render() {

        let items = this.props.icons;
        let boundItemClick = this.onItemClick.bind(this, items);
        const iconsBar = this.props.icons.map((item, index) => {
            return (
              <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center"
                key={index} 
                >
                <img 
                    src={item.link} 
                    onClick={boundItemClick} 
                    className="db w-100 br2 br--top"
                    alt=""
                />
              <div className="bg-white pa2 ph3-ns pb3-ns">
                            <h1 
                                className="f5 f4-ns mv0" 
                                onClick={boundItemClick}
                            >
                                {item.place}
                                </h1>
                             {item.id} 
                                </div>
                             </div>
            )
          });
    
    if (this.state.uploaded1 === '') {
    return (
            <div className='Icons br2'>
               <h5> {this.props.username} </h5>
                    Uploaded photos: {this.props.icons.length}   
                <div className="div images">
                <ul className="uploaded images">
                 {iconsBar}
                </ul>
                </div>
            </div>
        );
    } else {
            return (
            <div className='Icons br2'>
                 <h5> {this.props.username} </h5>
                Uploaded photos {this.props.icons.length}
                <div className="div images">
                <ul className="uploaded images">
                    {iconsBar}
                </ul>
                </div>
            </div>
            );
        }
    }
}

export default Icons;