/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {Component} from 'react';
import './sectionOurUsers.sass';
import Service from '../../services/service';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import ReactTooltip from 'react-tooltip';

export default class SectionOurUsers extends Component {
    
    static cardsNumber = 9;    
    
    webService = new Service();
    
    state = {
        usersList : [],
        nextPage: "",
        pageNumber : 1,
        error: false,
        loaded: true,
        isNewUsers: this.props.newUser
    }

    onUsersLoaded = ({nextPage,page,usersList}) => {
        if (usersList != null) {
            this.setState({
                usersList,
                nextPage,
                page,
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
    
    updateUsers = (page, cardsOnPage=this.cardsNumber) => {
        this.webService.getUsers(page, cardsOnPage)
            .then(this.onUsersLoaded);
    }
    
    newPage = () => {
        const page = this.state.page+1;
        this.setState({
            page
        })
        this.updateUsers(page);
    }

    changeCardsNumber = () => {
        this.cardsNumber = 9;        
        const width = document.querySelector('body').clientWidth;
        if (width < 767) {
            this.cardsNumber=3;
        } else if (width < 1023) {
            this.cardsNumber=6;
        }              
    }

    componentDidMount() {
        this.changeCardsNumber();    
        this.updateUsers(this.state.page,this.cardsNumber);
        window.addEventListener('resize', this.changeCardsNumber);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.changeCardsNumber);
    }

    componentDidUpdate(prevProps) {
        if (this.props.newUser!==prevProps.newUser) {
            if (this.props.newUser) {
                this.props.updateData(false);               
                this.updateUsers(1,(this.cardsNumber===3?3:6));              
            }               
        }
    }
   
    renderUsers(arr) {
               
        return arr.map((user) => {
            const {id,name,email,phone,position,photo} = user;
            
            return (
                    <div className="card" key={id}>
                        <img className="card-photo" src={photo} alt="user photo" />
                        <h2 className="card-name" data-tip data-for={`name${id}`}>{name}</h2>
                        <ReactTooltip id={`name${id}`} place="bottom" className="tooltips" arrowColor='white' effect='solid'><span>{name}</span></ReactTooltip>
                        <p className="card-position" data-tip data-for={`position${id}`}>{position}</p>
                        <ReactTooltip id={`position${id}`} place="bottom" className="tooltips" arrowColor='white' effect='solid'><span>{position}</span></ReactTooltip>
                        <p className="card-email" data-tip data-for={`email${id}`}>{email}</p>
                        <ReactTooltip id={`email${id}`} place="bottom" className="tooltips" arrowColor='white' effect='solid'><span>{email}</span></ReactTooltip>
                        <p className="card-tel">{phone}</p>
                    </div>
            )
        })
    }
    
    render() {
            
        const {usersList,error,nextPage,loaded} = this.state;
        let content='';
        let buttonContent=<button className="button button-users button-disable">Show More</button>;
        if (error) {
            content = <ErrorMessage/>;
        } else if (loaded) {
            content = <Spinner/>;            
        } else {
            content = this.renderUsers(usersList);
            if (nextPage != null) {
                buttonContent=<button className="button button-users" onClick={this.newPage}>Show more</button>;    
            }
        }
                
        return (
            <section className={`users-section ${(this.props.openMobileMenu) ? "darker-span" : ""}`}>
                <div className="users">
                     <h1 className="users-h1">Our cheerful users</h1>
                     <h2 className="users-h2">The best specialists are shown below</h2>
                     <div className="users-cards">
                        {content}
                     </div>
                     {buttonContent}    
                 </div>
            </section>     
        )
    }
      
} 
