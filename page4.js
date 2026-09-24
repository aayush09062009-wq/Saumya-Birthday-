// =========================================
// PAGE 4 — MEMORY TABLE
// =========================================

// MUSIC
const bgMusic = document.getElementById("bgMusic");
const musicNote = document.getElementById("musicNote");
const musicButton = document.getElementById("musicButton");
const musicControl = document.getElementById("musicControl");

// MEMORY
const memoryIntro = document.getElementById("memoryIntro");
const memoryTable = document.getElementById("memoryTable");

const photoOne = document.getElementById("photoOne");
const photoTwo = document.getElementById("photoTwo");

const photoInstruction =
    document.getElementById("photoInstruction");

const smallMessage =
    document.getElementById("smallMessage");

// TRANSITION
const oopsMessage =
    document.getElementById("oopsMessage");

const finalMemoryNote =
    document.getElementById("finalMemoryNote");


// =========================================
// STATE
// =========================================

let musicStarted = false;

let firstPhotoRevealed = false;
let secondPhotoRevealed = false;

let sequenceStarted = false;


// =========================================
// INITIAL STATE
// =========================================

musicControl.style.display = "none";

oopsMessage.style.display = "none";

finalMemoryNote.style.display = "none";


// =========================================
// MUSIC — YES BUTTON
// =========================================

musicButton.addEventListener("click", async () => {

    try {

        await bgMusic.play();

        musicStarted = true;

        // Hide music question
        musicNote.style.opacity = "0";

        setTimeout(() => {

            musicNote.style.display = "none";

        }, 500);


        // Show music control
        musicControl.style.display = "flex";

        setTimeout(() => {

            musicControl.style.opacity = "1";

        }, 50);


        // Bring memory scene forward
        memoryIntro.classList.add("show");

        memoryTable.classList.add("ready");

    }

    catch (error) {

        console.log("Music could not start:", error);

    }

});


// =========================================
// MUSIC CONTROL
// =========================================

musicControl.addEventListener("click", async () => {

    if (bgMusic.paused) {

        await bgMusic.play();

        musicControl.textContent = "♪";

    }

    else {

        bgMusic.pause();

        musicControl.textContent = "Ⅱ";

    }

});


// =========================================
// PHOTO 1
// =========================================

photoOne.addEventListener("click", () => {

    if (!musicStarted || sequenceStarted) return;

    if (firstPhotoRevealed) return;

    firstPhotoRevealed = true;

    photoOne.classList.remove("hidden-photo");

    photoOne.classList.add("revealed");

    checkBothPhotos();

});


// =========================================
// PHOTO 2
// =========================================

photoTwo.addEventListener("click", () => {

    if (!musicStarted || sequenceStarted) return;

    if (secondPhotoRevealed) return;

    secondPhotoRevealed = true;

    photoTwo.classList.remove("hidden-photo");

    photoTwo.classList.add("revealed");

    checkBothPhotos();

});


// =========================================
// CHECK BOTH PHOTOS
// =========================================

function checkBothPhotos() {

    if (
        !firstPhotoRevealed ||
        !secondPhotoRevealed
    ) {

        return;

    }


    // Prevent clicking again
    sequenceStarted = true;


    // Hide instruction
    photoInstruction.style.opacity = "0";


    setTimeout(() => {

        photoInstruction.style.display = "none";

    }, 500);


    // Small message
    setTimeout(() => {

        smallMessage.classList.add("show");

    }, 600);


    // =====================================
    // WAIT 4 SECONDS
    // =====================================

    setTimeout(() => {

        smallMessage.classList.remove("show");

        memoryTable.classList.add("photos-leaving");

    }, 4600);


    // =====================================
    // OOPS MESSAGE
    // =====================================

    setTimeout(() => {

        memoryTable.style.display = "none";

        oopsMessage.style.display = "block";

        setTimeout(() => {

            oopsMessage.classList.add("show");

        }, 50);

    }, 5700);


    // =====================================
    // BRING PHOTOS BACK
    // =====================================

    setTimeout(() => {

        oopsMessage.classList.remove("show");

    }, 8200);


    setTimeout(() => {

        oopsMessage.style.display = "none";

        memoryTable.style.display = "block";

        memoryTable.classList.remove("photos-leaving");

        memoryTable.classList.add("photos-return");

    }, 9000);


    // =====================================
    // FINAL BIRTHDAY MESSAGE
    // =====================================

    setTimeout(() => {

        finalMemoryNote.style.display = "block";

        setTimeout(() => {

            finalMemoryNote.classList.add("show");

        }, 50);


        memoryTable.classList.add("final-fade");

    }, 10400);

}
