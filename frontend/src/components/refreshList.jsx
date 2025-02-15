import apiError from "./apiError";

async function refreshListPage(listAPI, page_size) {
    this.setState({
        loading: true,
        data_list: ""
    });
    var page_num = ""
    if (page_size > this.state.perPage) {
        page_num = `&page=${this.state.currentPage + 1}`
    }
    else {
        if (this.state.currentPage > 0) {
            page_num = `&page=${this.state.currentPage}`
        }
        else {
            page_num = ''
        };
    };
    // alert(this.state.offset)
    var urlAPI = ""
    if (this.state.orderByField !== "") {
        urlAPI = `${listAPI}?order_field=${this.state.orderByField}&order_by=${this.state.order_by}&${this.state.searchParam}`
    }
    else if (this.state.searchParam === "") {
        urlAPI = `${listAPI}?page_size=${page_size}${page_num}`
    }
    else {
        if (this.state.currentPage + 1 > 1) {
            urlAPI = `${listAPI}?${this.state.searchParam}${page_num}`
        }
        else {
            urlAPI = `${listAPI}?${this.state.searchParam}&page_size=${page_size}`
        }

    };
    try {
        await fetch(`${urlAPI}&org=${this.state.navOrgName}`)
            .then(async (res) => res.json())
            .then((data) => {
                if (this.state.paginationDisplay === false) {
                    if (data.count > this.state.perPage) {
                        this.setState({
                            paginationDisplay: this.state.paginationDisplay = true,
                            currentPage: this.state.currentPage
                        });
                    };
                };
                if (this.state.pageCount !== this.state.currentPage) {
                    let cp = ''
                    if(this.state.currentPage === 0){
                        cp = this.state.currentPage+1
                    }
                    else{
                        cp = this.state.currentPage
                    }
                    this.setState({
                        pageCount: this.state.pageCount = Math.ceil(data.count / data.results.length),
                        currentPage: cp
                    });
                }
                else {
                    if (page_size > this.state.perPage) {
                        this.setState({
                            pageCount: this.state.pageCount = Math.ceil(data.count / data.results.length),
                            currentPage: this.state.currentPage
                        });
                    }
                    else {
                        this.setState({
                            pageCount: this.state.pageCount = this.state.pageCount,
                        });
                    };
                };

                this.setState({
                    data_list: this.state.data_list = data.results,
                    loading: this.state.loading = false,
                    dataCount: this.dataCount = data.count,
                });
            })
    } catch (e) {
        let error = e.message;
        apiError.call(this, error)
    }

}

export default refreshListPage;
