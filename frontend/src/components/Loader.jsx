import React, { Component } from 'react'

export class Loader extends Component {
    render() {
        return (

            <div className={"ui active dimmer " + this.props.class_name} style={{ display: this.props.load === true ? 'block' : 'none' }} id="common_loader">
                <div class="ui text loader">Loading...</div>
            </div>

        )
    }
}

export default Loader
