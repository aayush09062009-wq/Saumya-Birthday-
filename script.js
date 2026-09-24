// =========================================
// PAGE 1 — OPEN BUTTON
// =========================================

const openButton = document.getElementById("openButton");


// Show the button after 4 seconds
setTimeout(() => {
    openButton.classList.add("show");
}, 4000);


// Go to Page 2
openButton.addEventListener("click", () => {

    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "page2.html";
    }, 800);

});
