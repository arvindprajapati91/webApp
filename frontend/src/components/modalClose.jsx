function ModalClose() {
    document.getElementById("staticBackdrop").classList.remove("show")
    document.getElementById("staticBackdrop").style.display = "none"
    var elements = document.getElementsByClassName("modal-backdrop");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    document.body.classList.remove("modal-open")

}
export default ModalClose
