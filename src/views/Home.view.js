import React, { Component } from 'react';

import Services from 'views/Service.view';
import Headline from 'views/Headline.view';
import HowItWorks from 'views/HowItWorks.view';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    scroll(e){
        e.preventDefault()
        document.querySelector('#HowItWorks').scrollIntoView({
            behavior:'smooth'
        })
    }
    render() {
        return (
            <div className="App home-content">
                <main>
                    <div className="position-relative">
                        <section className="app-header" style={{position:'relative', 'min-height':'80vh'}}>
                            <div className="hero-sec">
                            <div className="h-overlay"></div></div>
                            <div className="expand-btn" onClick={this.scroll}><ExpandMoreIcon>Filled</ExpandMoreIcon></div>
                            <Headline />
                        </section>
                       <HowItWorks />
                        <section name="ser" id="HowItWorks">
                            <Services className="services" />
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;

