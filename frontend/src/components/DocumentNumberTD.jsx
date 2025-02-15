import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export class DocTd extends Component {
    render() {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                View/Edit
            </Tooltip>
        );
        return (
            <>
                <OverlayTrigger placement="right" delay={{ show: 100, hide: 400 }} overlay={renderTooltip}>
                    <Link to={this.props.to_link} className="doc_no" data-tip data-for="view_edit_tip">
                        {this.props.field_val}
                    </Link>
                </OverlayTrigger>
            </>
        )
    }
}

export default DocTd
