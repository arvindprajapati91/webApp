function PageSizeChange(event) {
    const page_size = event.target.value
    const caret_ele = document.getElementsByClassName('caret_up')
    if (caret_ele.length > 0) {
        caret_ele[0].classList.add("caret_up_hide");
        caret_ele[0].classList.remove("caret_up");
    }
    this.setState({
        perPage: event.target.value,
        selectedPage: 0,
        loading: this.state.loading = true,
        pageCount: this.state.pageCount = '',
        currentPage: this.state.currentPage = 0,
        order_by: this.state.order_by = '',
        orderByField: this.state.orderByField = '',

    });

    this.refreshList(page_size)

}
export default PageSizeChange