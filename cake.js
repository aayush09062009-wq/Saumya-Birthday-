// =========================================
// PAGE 3 — CAKE SWIPE INTERACTION
// =========================================

const cakeArea = document.getElementById("cakeArea");
const cake = document.getElementById("cake");
const knife = document.getElementById("knife");
const swipeText = document.getElementById("swipeText");
const cutMessage = document.getElementById("cutMessage");

let isSwiping = false;
let startX = 0;
let startY = 0;
let hasCut = false;


// START SWIPE
cakeArea.addEventListener("pointerdown", (event) => {

    if (hasCut) return;

    isSwiping = true;

    startX = event.clientX;
    startY = event.clientY;

    cakeArea.classList.add("swiping");

    cakeArea.setPointerCapture(event.pointerId);
});


// DURING SWIPE
cakeArea.addEventListener("pointermove", (event) => {

    if (!isSwiping || hasCut) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const distanceX = currentX - startX;
    const distanceY = Math.abs(currentY - startY);

    // Move knife with finger
    const knifeX = Math.max(
        15,
        Math.min(245, 15 + distanceX)
    );

    knife.style.left = knifeX + "px";

    // Slight knife movement
    knife.style.transform =
        "rotate(-25deg) translateX(0)";

    // Successful horizontal swipe
    if (distanceX > 120 && distanceY < 80) {

        cutCake();
    }
});


// END SWIPE
cakeArea.addEventListener("pointerup", () => {

    if (!hasCut) {

        isSwiping = false;

        cakeArea.classList.remove("swiping");

        knife.style.left = "15px";

        knife.style.transform =
            "rotate(-25deg) translateX(-30px)";
    }
});


// ALSO HANDLE POINTER CANCEL
cakeArea.addEventListener("pointercancel", () => {

    if (!hasCut) {

        isSwiping = false;

        cakeArea.classList.remove("swiping");
    }
});


// =========================================
// CUT THE CAKE
// =========================================

function cutCake() {

    if (hasCut) return;

    hasCut = true;
    isSwiping = false;

    cakeArea.classList.remove("swiping");

    // Add cut class
    cakeArea.classList.add("cut");

    // Hide instruction
    swipeText.style.opacity = "0";

    setTimeout(() => {
        swipeText.style.display = "none";
    }, 400);

    // Show message
    setTimeout(() => {

        cutMessage.style.display = "block";

    }, 700);

    // Small celebration
    createConfetti();
}


// =========================================
// SIMPLE CONFETTI
// =========================================

function createConfetti() {

    const symbols = ["✦", "✧", "♡", "•"];

    for (let i = 0; i < 18; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left =
            (35 + Math.random() * 30) + "%";

        piece.style.top =
            (35 + Math.random() * 10) + "%";

        piece.style.animationDelay =
            (Math.random() * 0.4) + "s";

        piece.style.setProperty(
            "--x",
            ((Math.random() - 0.5) * 220) + "px"
        );

        piece.style.setProperty(
            "--y",
            (100 + Math.random() * 160) + "px"
        );

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1800);
    }
    }
