// =========================================
// PAGE 3 — BIRTHDAY CAKE
// =========================================

const cakeArea = document.getElementById("cakeArea");
const cake = document.getElementById("cake");

const knife = document.getElementById("knife");

const blowText = document.getElementById("blowText");
const cutText = document.getElementById("cutText");

const cutMessage = document.getElementById("cutMessage");


// =========================================
// STATE
// =========================================

let candlesBlown = false;
let isSwiping = false;
let hasCut = false;

let startX = 0;
let startY = 0;


// =========================================
// INITIAL STATE
// =========================================

cutText.style.display = "none";
cutMessage.style.display = "none";


// =========================================
// STEP 1 — BLOW CANDLES
// =========================================

cake.addEventListener("click", () => {

    if (candlesBlown || hasCut) return;

    candlesBlown = true;

    // Turn off flames
    cake.classList.add("candles-blown");

    // Hide first instruction
    blowText.style.opacity = "0";

    setTimeout(() => {

        blowText.style.display = "none";

        // Show second instruction
        cutText.style.display = "block";

        setTimeout(() => {
            cutText.style.opacity = "1";
        }, 50);

    }, 500);

});


// =========================================
// STEP 2 — START SWIPE
// =========================================

cakeArea.addEventListener("pointerdown", (event) => {

    // Can't cut before candles are blown
    if (!candlesBlown || hasCut) return;

    isSwiping = true;

    startX = event.clientX;
    startY = event.clientY;

    cakeArea.classList.add("swiping");

    cakeArea.setPointerCapture(event.pointerId);

});


// =========================================
// DURING SWIPE
// =========================================

cakeArea.addEventListener("pointermove", (event) => {

    if (!isSwiping || !candlesBlown || hasCut) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const distanceX = currentX - startX;
    const distanceY = Math.abs(currentY - startY);


    // Move knife according to finger
    const knifeX = Math.max(
        10,
        Math.min(250, 15 + distanceX)
    );

    knife.style.left = knifeX + "px";

    knife.style.transform =
        "rotate(-25deg) translateX(0)";


    // Successful left → right swipe
    if (
        distanceX > 120 &&
        distanceY < 80
    ) {

        cutCake();

    }

});


// =========================================
// END SWIPE
// =========================================

cakeArea.addEventListener("pointerup", () => {

    if (!hasCut) {

        isSwiping = false;

        cakeArea.classList.remove("swiping");

        knife.style.left = "15px";

        knife.style.transform =
            "rotate(-25deg) translateX(-30px)";
    }

});


// =========================================
// POINTER CANCEL
// =========================================

cakeArea.addEventListener("pointercancel", () => {

    if (!hasCut) {

        isSwiping = false;

        cakeArea.classList.remove("swiping");

        knife.style.left = "15px";

        knife.style.transform =
            "rotate(-25deg) translateX(-30px)";
    }

});


// =========================================
// STEP 3 — CUT CAKE
// =========================================

function cutCake() {

    if (hasCut) return;

    hasCut = true;
    isSwiping = false;

    cakeArea.classList.remove("swiping");

    // Add cut animation
    cakeArea.classList.add("cut");

    // Hide cut instruction
    cutText.style.opacity = "0";

    setTimeout(() => {

        cutText.style.display = "none";

    }, 400);


    // Show final message
    setTimeout(() => {

        cutMessage.style.display = "block";

    }, 700);


    // Celebration
    createConfetti();

}


// =========================================
// CONFETTI
// =========================================

function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "♡",
        "✿",
        "•"
    ];


    for (let i = 0; i < 20; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        piece.style.left =
            (35 + Math.random() * 30) + "%";

        piece.style.top =
            (35 + Math.random() * 10) + "%";


        piece.style.animationDelay =
            (Math.random() * 0.3) + "s";


        piece.style.setProperty(
            "--x",
            ((Math.random() - 0.5) * 240) + "px"
        );


        piece.style.setProperty(
            "--y",
            (100 + Math.random() * 180) + "px"
        );


        document.body.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 1800);

    }

}
