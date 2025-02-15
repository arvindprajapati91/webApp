var dict = {};

function dictToURI(dict) {
    var str = [];
    for (var p in dict) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
    }
    return str.join("&");
}

function onChildComponentChange(fildName, fildValue) {
    for (var i in dict) {
        var fv = document.getElementById(i)
        if (fv !== null) {
            if (fv.value === "") {
                delete dict[i];
            }
        }
        else {
            delete dict[i];
        }

    }
    if (fildValue === "" || fildValue === '---select---') {
        delete dict[fildName];
        var url = dictToURI(dict)
        this.setState({
            searchParam: this.state.searchParam = url,
            pageCount: this.state.pageCount = '',
            currentPage: this.state.currentPage = 0
        });
        this.refreshList();
    }
    else {
        dict[fildName] = fildValue;
        var url = dictToURI(dict)
        this.setState({
            searchParam: this.state.searchParam = url,
            currentPage: this.state.currentPage = 0
        })
    }

}

export default onChildComponentChange