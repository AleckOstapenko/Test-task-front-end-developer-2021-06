import './app.sass';
import React, { Component } from 'react';
import Header from '../header/header';
import SectionAcquainted from '../sectionAcquainted/sectionAcquainted';
import SectionOurUsers from '../sectionOurUsers/sectionOurUsers';
import SectionRegister from '../sectionRegister/sectionRegister';
import Footer from '../footer/footer';

export default class App extends Component {
  state = {
    newUser: false,
    openMobileMenu: false
  }

  updateData = (value) => {
    this.setState({
      newUser: value
    })
  }

  updateOpenMenu = (value) => {
    this.setState({
      openMobileMenu: value
    })
  }

  componentDidUpdate(prevProps) {
    const body=document.getElementById("root");
    if (this.state.openMobileMenu) {
      body.classList.add("shadow")
    } else {
      body.classList.remove("shadow")
    }
  }

  render() {
    return (
      <>
        <Header updateOpenMenu={this.updateOpenMenu} openMobileMenu={this.state.openMobileMenu}/>
        <SectionAcquainted  openMobileMenu={this.state.openMobileMenu}/>
        <SectionOurUsers updateData={this.updateData} newUser={this.state.newUser}  openMobileMenu={this.state.openMobileMenu}/>
        <SectionRegister updateData={this.updateData}  openMobileMenu={this.state.openMobileMenu}/>
        <Footer />
      </>
    );
  }
}

