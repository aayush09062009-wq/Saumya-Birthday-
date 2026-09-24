// =========================================
// PAGE 4 — MEMORY TABLE
// =========================================


// =========================================
// ELEMENTS
// =========================================

const bgMusic =
    document.getElementById("bgMusic");

const musicNote =
    document.getElementById("musicNote");

const musicButton =
    document.getElementById("musicButton");

const musicControl =
    document.getElementById("musicControl");


const memoryIntro =
    document.getElementById("memoryIntro");

const memoryTable =
    document.getElementById("memoryTable");


const photoOne =
    document.getElementById("photoOne");

const photoTwo =
    document.getElementById("photoTwo");


const photoInstruction =
    document.getElementById("photoInstruction");

const smallMessage =
    document.getElementById("smallMessage");


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

// Music control hidden
musicControl.style.display = "none";

// Photos are NOT clickable
memoryTable.classList.remove("ready");

// Oops hidden
oopsMessage.style.display = "none";

// Final message hidden
finalMemoryNote.style.display = "none";


// =========================================
// MUSIC PROMPT
// =========================================

musicButton.addEventListener("click", async (event) => {

    // Stop this click from reaching anything behind it
    event.stopPropagation();

    if (musicStarted) return;


    try {

        await bgMusic.play();

        musicStarted = true;


        // Hide music notification
        musicNote.style.opacity = "0";
        musicNote.style.pointerEvents = "none";


        setTimeout(() => {

            musicNote.style.display = "none";

        }, 500);


        // Show music control
        musicControl.style.display = "flex";

        setTimeout(() => {

            musicControl.style.opacity = "1";

        }, 50);


        // Now allow photos to be clicked
        memoryTable.classList.add("ready");


        // Show intro
        memoryIntro.classList.add("show");

    }

    catch (error) {

        console.log(
            "Music could not start:",
            error
        );

    }

});


// =========================================
// MUSIC CONTROL
// =========================================

musicControl.addEventListener("click", async (event) => {

    event.stopPropagation();


    if (bgMusic.paused) {

        try {

            await bgMusic.play();

            musicControl.textContent = "♪";

        }

        catch (error) {

            console.log(
                "Music could not resume:",
                error
            );

        }

    }

    else {

        bgMusic.pause();

        musicControl.textContent = "Ⅱ";

    }

});


// =========================================
// PHOTO 1
// =========================================

photoOne.addEventListener("click", (event) => {

    event.stopPropagation();

    if (!musicStarted) return;

    if (sequenceStarted) return;

    if (firstPhotoRevealed) return;


    firstPhotoRevealed = true;


    photoOne.classList.remove(
        "hidden-photo"
    );

    photoOne.classList.add(
        "revealed"
    );


    checkBothPhotos();

});


// =========================================
// PHOTO 2
// =========================================

photoTwo.addEventListener("click", (event) => {

    event.stopPropagation();

    if (!musicStarted) return;

    if (sequenceStarted) return;

    if (secondPhotoRevealed) return;


    secondPhotoRevealed = true;


    photoTwo.classList.remove(
        "hidden-photo"
    );

    photoTwo.classList.add(
        "revealed"
    );


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


    sequenceStarted = true;


    // Hide instruction
    photoInstruction.style.opacity = "0";


    setTimeout(() => {

        photoInstruction.style.display =
            "none";

    }, 500);


    // Small message
    setTimeout(() => {

        smallMessage.classList.add("show");

    }, 600);


    // =====================================
    // PHOTOS DISAPPEAR
    // =====================================

    setTimeout(() => {

        smallMessage.classList.remove("show");

        memoryTable.classList.add(
            "photos-leaving"
        );

    }, 4600);


    // =====================================
    // OOPS
    // =====================================

    setTimeout(() => {

        memoryTable.style.display = "none";

        oopsMessage.style.display = "block";

        setTimeout(() => {

            oopsMessage.classList.add("show");

        }, 50);

    }, 5700);


    // =====================================
    // PHOTOS RETURN
    // =====================================

    setTimeout(() => {

        oopsMessage.classList.remove("show");

    }, 8200);


    setTimeout(() => {

        oopsMessage.style.display = "none";

        memoryTable.style.display = "block";

        memoryTable.classList.remove(
            "photos-leaving"
        );

        memoryTable.classList.add(
            "photos-return"
        );

    }, 9000);


    // =====================================
    // FINAL BIRTHDAY MESSAGE
    // =====================================

    setTimeout(() => {

        finalMemoryNote.style.display =
            "block";


        setTimeout(() => {

            finalMemoryNote.classList.add(
                "show"
            );

        }, 50);


        memoryTable.classList.add(
            "final-fade"
        );

    }, 10400);

}
