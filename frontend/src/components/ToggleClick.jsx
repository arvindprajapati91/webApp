function toggle_clickFun() {
    var svgs = document.querySelectorAll(".active")
    if (svgs.length > 0) {
        svgs.forEach(obj =>
            obj.classList.remove("active")
        );
    }

    // document.querySelectorAll("section.show").forEach(obj =>
    //   obj.classList.remove("show")
    // );
    var loader = document.querySelectorAll("#common_loader");
    loader.forEach(obj =>
        obj.classList.add('active')
    )
    var container = document.querySelector("#side_bar_accordion");
    var matches = container.querySelectorAll("ul.show");
    matches.forEach(obj =>
        obj.classList.remove("show")
    );

    if (document.body.classList.contains('sidebar-collapse')) {
        document.body.classList.remove('sidebar-collapse');
    }
    else {
        document.body.classList.add('sidebar-collapse');
    }
    if (window.innerWidth <= "767") {
        const ele = document.getElementById("side-nav-bar")
        if (ele.classList.contains("sidebar-transform")) {
            ele.classList.remove("sidebar-transform");
        }
        else {
            ele.classList.add("sidebar-transform");
        }
    }
}
export default toggle_clickFun;