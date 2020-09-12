function optionsExpand() {
    optionsButton = document.getElementById("optionsButton");
    optionsButton.addEventListener("click", function () {
        this.classList.toggle("active");
        optionsContent = this.nextElementSibling;

        if (optionsContent.style.display === "block") {
            optionsContent.style.display = "none";
            document.getElementById("sidebar").style.width = "80px";
            document.getElementsByClassName("mainContainer")[0].style.marginLeft = "80px";
        } else {
            optionsContent.style.display = "block";
            document.getElementById("sidebar").style.width = "200px";
            document.getElementsByClassName("mainContainer")[0].style.marginLeft = "200px";
        }
    });
}