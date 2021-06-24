import React, { Component } from 'react';
import './modal.sass';

export default class App extends Component {

    state = {
        visible: true
    }    
    
    onClose = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        if (!this.state.visible) return null;
        
        return (
            <div className='modal'>
                <div className='modal-box'>
                    <div className='modal-text'>
                        <h2 className='modal-title'>{this.props.header}</h2>
                        <p className='modal-close'>{this.props.text} </p>
                        <button className="button button-modal" onClick={this.onClose}>{this.props.buttonText}</button>
                    </div>
                </div>
            </div>
      );
    }
  }