function orderByFetch(caret_id) {
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
        select => (select.value = "")
    );
    Array.from(document.getElementsByClassName("searched")).forEach(
        function (element, index, array) {
            var close_ele_id = element.id
            var search_ele_id = close_ele_id.replace("close_", "search_");
            document.getElementById(close_ele_id).style.display = "none"
            document.getElementById(search_ele_id).style.display = "flex"
        }
    );

    if (this.state.order_by === "desc") {
        this.setState({
            order_by: this.state.order_by = "asc",
            loading: true
        });
    }
    else {
        this.setState({
            order_by: this.state.order_by = "desc",
            loading: true
        });
    }
    this.setState({
        orderByField: this.state.orderByField = caret_id,
        currentPage: this.state.currentPage = 0,
        offset: this.state.offset = 0,
        searchParam: this.state.searchParam = ""
    });

    this.refreshList();

    const caret_ele = document.getElementsByClassName('caret_up')
    if (caret_ele.length > 0) {
        caret_ele[0].classList.add("caret_up_hide");
        caret_ele[0].classList.remove("caret_up");
    }

    const ele = document.getElementById(caret_id + "_caret")
    if (ele.classList.contains("caret_up_hide") && this.state.order_by === "asc") {
        ele.classList.add("order_by_caret_down");
        ele.classList.add("caret_up");
        ele.classList.remove("caret_up_hide");
    }
    else {
        ele.classList.add("caret_up");
        ele.classList.remove("caret_up_hide");
        ele.classList.remove("order_by_caret_down");
    }

}

export default orderByFetch;
