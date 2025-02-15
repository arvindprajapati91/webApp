function handlePageClick(e) {
    const pageValue = e.currentTarget.attributes[3].value
    const caret_ele = document.getElementsByClassName('caret_up')
    if (caret_ele.length > 0) {
        caret_ele[0].classList.add("caret_up_hide");
        caret_ele[0].classList.remove("caret_up");
    }
    this.setState({
        loading: true,
        order_by: "desc",
        orderByField: '',
        defaultActivePage: parseInt(pageValue)
    })
    var selectedPage = ""
    if (e.target.innerText === "") {
        selectedPage = parseInt(pageValue);
    }
    else {
        selectedPage = parseInt(e.target.innerText);
    }

    if (this.state.pageCount !== selectedPage) {
        this.setState({
            offset: selectedPage * this.state.perPage,
            defaultActivePage: parseInt(pageValue)
        })
    }
    else {
        this.setState({
            offset: this.state.pageCount,
            defaultActivePage: parseInt(pageValue)
        })
    }
    this.setState({
        currentPage: parseInt(selectedPage),
        defaultActivePage: parseInt(pageValue)
    }, () => {
        this.refreshList();
    });
};

export default handlePageClick
