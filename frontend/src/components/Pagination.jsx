import React, { Component } from 'react'
import { Icon, Pagination } from 'semantic-ui-react'

export class PaginationList extends Component {
    constructor(props) {
        super(props);
        this.state = { defaultActivePage: 1 }
    };

    render() {
        return (
            <>
                <div className="row pagination_row">
                    <div className="col-lg-3 col-md-3 col-sm-3" style={{ paddingTop: "5px", color: "#004a5d" }}>
                        Show
                        <select className="btn btn-secondary dropdown-toggle page_dorpdown" name="perPage" id='perPage' value={this.props.perPageValue} onChange={this.props.onChange}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        Entries
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4"></div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                        <Pagination
                            defaultActivePage={this.props.currentPageValue}
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            totalPages={this.props.pageCountValue}
                            onPageChange={this.props.onPageChange}

                        />
                    </div>
                </div>

            </>
        )
    }
}

export default PaginationList
