import React, { Component } from 'react';
import './sectionRegister.sass';
import Service from '../../services/service';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';

export default class SectionRegister extends Component {
        
    // eslint-disable-next-line no-control-regex
    emailPattern=/^(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    
    phonePattern=/^[+]{0,1}380([0-9]{9})/;
    
    webService = new Service();

    state = {
        positionList : [] ,
        error: false,
        loaded: true,
        name: "",
        email: "",
        phone: "",
        position: 1,
        photo: "",
        sendSuccessful : false,
        error409: false      
    }

    formValid = {
        name: true,
        email: true,
        phone: true
    }

    getPositionList = () => {
        this.webService.getPositions()
            .then(this.onPositionsLoaded);
    }

    onPositionsLoaded = ({positionList}) => {
        if (positionList != null) {
            this.setState({
                positionList,
                error: false,
                loaded: false
            })
        } else {
            this.setState({
                error: true,
                loaded: false
            })
        }
        
    }

    componentDidMount() {
        this.getPositionList();
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            sendSuccessful: false,
            error409: false
        })
        if (!this.validateForm()) {
            this.forceUpdate();
        } else { 
            const form = new FormData(document.forms.form);
            this.webService.sendResource(form)
                .then(json => {
                    if (json.status === 409) {
                        this.setState({
                            error409: true
                        })
                    } else {
                        this.setState({
                            sendSuccessful: true
                        })
                        this.props.updateData(true)
                    }
                })
        }
    }

    validateForm = () => {
        //Поскольку данные из формы попадают в state, данные для проверки будем брать из state
        const {name, email, phone} =this.state;
        //name - 2-60 символов
        this.formValid.name = name.length>=2;
        this.formValid.email = !!email.match(this.emailPattern);
        this.formValid.phone = !!phone.match(this.phonePattern);
        return this.formValid.name && this.formValid.email && this.formValid.phone;
    }

    errorClass = (val) => {
        return (val? "" : "input-error");
    }

    onInputChange = (e) => {
        if (e.target.name==='name') {
            this.setState({
                name: e.target.value
            }) 
        }
        if (e.target.name==='email') {
            this.setState({
                email: e.target.value
            }) 
        } 
        if (e.target.name==='phone') {
            this.setState({
                phone: e.target.value
            }) 
        } 
        if (e.target.name==='position_id') {
            this.setState({
                position: +e.target.value
            }) 
        } 
        if (e.target.name==='photo') {
            this.setState({
                photo: e.target.value
            })             
        }

    }

    onClick = (e) => {
        e.target.value="";
    }

    renderPositions = (arr) => {
               
        return arr.map((position) => {
            const {id,name} = position;
            let inputTag=<input type="radio" id={`position${id}`} name="position_id" value={id} />;
            if (id===1) {
                inputTag=<input type="radio" id={`position${id}`} name="position_id" value={id} defaultChecked/>;  
            }
            return (
                <div key={id}>
                    {inputTag}
                    <label htmlFor={`position${id}`}>{name}</label>
                </div>
            )
        })
    }
    
    render() {
        
        const {positionList,error,loaded,sendSuccessful,error409} = this.state;
        const {name, email, phone, photo} =this.state;
        let content='';
        let submitButton = <button type="submit" className="button button-register button-disable">Sign Up</button>;
        let modalWindow = "";
        
        if (error) {
            content = <ErrorMessage/>;
        } else if (loaded) {
            content = <Spinner/>;            
        } else {
            content = this.renderPositions(positionList);            
        }

        if (name!=="" && email!=="" && phone!=="" && photo!=="") {
            submitButton = <button type="submit" className="button button-register" onClick={this.onSubmit}>Sign up</button>;    
        }
        
        if (error409) {
            modalWindow = <Modal header="Error" text= "User with this phone or email already exist" buttonText="Close"/>;       
        } else if (sendSuccessful) {
            modalWindow = <Modal header="Congratulations" text= "You have successfully passed the registration " buttonText="Great"/>;                
        }
        
        return (
            <section className="#register-section">
                <div className="register">
                    <h1 className="register-h1">Register to get a work</h1>
                    <h2 className="register-h2">Your personal data is stored according to the Privacy Policy</h2>
                    <form name="form" onSubmit={this.onSubmit} onChange={this.onInputChange}>
                        <input type="text" placeholder="Your name" className={`input-name ${this.errorClass(this.formValid.name)}`} name="name"
                            maxLength="60" />
                        <input type="text" placeholder="Email" className={`input-email ${this.errorClass(this.formValid.email)}`} name="email"
                            maxLength="100" />
                        <input type="text" placeholder="Phone" className={`input-phone ${this.errorClass(this.formValid.phone)}`} name="phone"
                            maxLength="13" />

                        <p>Select your position</p>
                        {content}

                        <input type="file" accept=".jpg,.jpeg" placeholder="Upload your photo" className="input-photo" name="photo"
                            onClick={this.onClick} onChange={this.onInputChange} />
                        {submitButton}
                    </form>                    
                </div>
                {modalWindow}
            </section>
    )
}
} 

