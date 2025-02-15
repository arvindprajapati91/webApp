function wrapper_clickFun() {
    if (window.innerWidth <= "767") {
        const ele = document.getElementById("side-nav-bar")
        if (ele.classList.contains("sidebar-transform")) {
            ele.classList.remove("sidebar-transform");
        }
        // else {
        //     ele.classList.add("sidebar-transform");
        // }
    }
}

export default wrapper_clickFun