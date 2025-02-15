import React, { Component } from 'react'
import WelcomePage from "../images/welcome-page.jpg"

export class Home extends Component {

    wrapper_clickFun() {
        if (window.innerWidth <= "767") {
            const ele = document.getElementById("side-nav-bar")
            if (ele.classList.contains("sidebar-transform")) {
                ele.classList.remove("sidebar-transform");
            }
            else {
                ele.classList.add("sidebar-transform");
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper" onClick={this.wrapper_clickFun.bind(this)}>
                    <img src={WelcomePage} alt="welcome_page" data-tip data-for="welcome_page"></img>
                </div>
            </div>
        )
    }
}

export default Home
