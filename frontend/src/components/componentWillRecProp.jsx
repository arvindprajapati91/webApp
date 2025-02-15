import React from 'react'

function componentWillRecProp(StateDic) {
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
        select => (select.value = "")
    );
    const caret_ele = document.getElementsByClassName('caret_up')
    if (caret_ele.length > 0) {
        caret_ele[0].classList.add("caret_up_hide");
        caret_ele[0].classList.remove("caret_up");
    }
    this.setState(StateDic);
    this.setState({
        currentPage: this.state.currentPage = 0,
        searchParam: this.state.searchParam = "",
        orderByField: this.state.orderByField = "",
    })
    this.refreshList();
}

export default componentWillRecProp
