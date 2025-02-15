import React, { Component } from 'react'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { DateInput } from 'semantic-ui-calendar-react';
import { Icon } from 'semantic-ui-react';

const mapStatetoProps = (state) => {
    return {
        message: state.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeText: (event) => dispatch({ type: event.target.attributes.type.value, payload: event })
    }
}
var dateValue = ''

export class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            clearIcon: false,
            updated_date: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.caretOrderBy = this.caretOrderBy.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
        const fildName = event.target.name;
        const fildValue = event.target.value;
        this.props.onPropertyChange(fildName, fildValue);
        this.props.onChangeText(event)
        if (event.target.value === "") {
            document.getElementById("close_" + fildName).style.display = "none"
        }
        else {
            document.getElementById("close_" + fildName).style.display = "none"
            document.getElementById("search_" + fildName).style.display = "flex"
        }
    }

    drphandleChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
        const fildName = event.target.name;
        const fildValue = event.target.value;
        this.props.onPropertyChange(fildName, fildValue);
        this.props.onChangeText(event)
        this.props.onSearch();
    }

    dateChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
            const fildName = name;
            dateValue = value;
            this.props.onPropertyChange(fildName, dateValue);
            // this.props.onChangeText(event)
            this.props.onSearch();
        }
        else {
            const fildName = name;
            dateValue = value;
            this.props.onPropertyChange(fildName, dateValue);
            // this.props.onChangeText(event)
            this.props.onSearch();
        }

    }

    onSearchClick(event) {
        this.props.onSearch();
        var searchID = event.target.id;
        var clearID = searchID.replace('search_', '')
        document.getElementById("search_" + clearID).style.display = "none"
        document.getElementById("close_" + clearID).style.display = "flex"
        document.getElementById("close_" + clearID).classList.add("searched")

    }

    caretOrderBy(e) {
        dateValue = ""
        const caret_id = e.currentTarget.attributes.caret_id.value;
        this.props.onOrderBy(caret_id);
    }

    clearSearch = (e) => {
        this.setState({ clearIcon: false })
        this.props.onChangeText(e)
        var fn = (e.target.id).replace("close_", "")
        var fv = ""
        document.getElementById(fn).value = ""
        this.props.onPropertyChange(fn, fv);
        var clearID = e.target.id;
        var searchID = clearID.replace('close_', '')
        document.getElementById("search_" + searchID).style.display = "flex"
        document.getElementById("close_" + searchID).style.display = "none"
        document.getElementById("close_" + clearID).classList.remove("searched")
        this.onSearchClick()

    }

    render() {

        return (
            <>
                <span style={{ cursor: "pointer", fontSize: "14px", color: "#004a5d", marginLeft: "5px" }} caret_id={this.props.field_name} onClick={this.caretOrderBy}>{this.props.columnName}
                    <span style={{ float: "right", color: "black", fontSize: "smaller" }} className="caret_up_hide" id={this.props.field_name + "_caret"}>
                        <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
                    </span>
                </span>
                <div className="input-group search-field">
                    <label className="visually-hidden" for={this.props.field_name}></label>
                    <div className="ui icon input search_input">
                        {this.props.search_type !== "dropdown" ?
                            <>
                                {this.props.search_type === "datepicker" ?
                                    <>
                                        <DateInput type="textChanged" className='date_input prompt' id={this.props.field_name} name={this.props.field_name} value={dateValue} onChange={this.dateChange} style={{cursor:"pointer"}} placeholder="DD-MMM-YYYY" iconPosition="left" dateFormat="DD-MMM-YYYY" icon="calendar alternate" clearable clearIcon={<Icon name="remove" color="red" className='calender_icon' />} />
                                    </>
                                    :
                                    <>
                                        <input className="prompt" type="textChanged" id={this.props.field_name} placeholder={"Search"} aria-label="Search" name={this.props.field_name} value={this.state[this.props.field_name]} onChange={this.handleChange} />
                                        <i className="close icon" type="textRemove" id={"close_" + this.props.field_name} clearName={this.props.field_name} style={{ display: this.state.clearIcon === true ? "block" : "none", cursor: "pointer" }} onClick={this.clearSearch}></i>
                                        <i className="search icon" id={"search_" + this.props.field_name} onClick={this.onSearchClick}></i>
                                    </>
                                }

                            </>
                            :
                            <>
                                <select class="form-select" type="textChanged" placeholder={"Search"} aria-label="Search" id={this.props.field_name} name={this.props.field_name} value={this.state[this.props.field_name]} onChange={this.drphandleChange}>
                                    <option value='' selected>All / Selection from List</option>
                                    {this.props.field_name === "status" ?
                                        <>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </>
                                        :
                                        this.props.field_name === "is_parent" ?
                                            <>
                                                <option value="1">Parent</option>
                                                <option value="0">Child</option>
                                            </>
                                            :
                                            this.props.field_name === "invested" || this.props.field_name === "nifty_stock" ?
                                                <>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </>
                                                :
                                                ''
                                    }
                                </select>
                            </>

                        }
                    </div>
                </div>
            </>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SearchBox);
