// =========================================
// PAGE 4 — LITTLE MEMORY
// =========================================

const musicQuestion =
    document.getElementById("musicQuestion");

const musicYes =
    document.getElementById("musicYes");

const musicControl =
    document.getElementById("musicControl");

const bgMusic =
    document.getElementById("bgMusic");

const memoryScene =
    document.getElementById("memoryScene");

const memoryHint =
    document.getElementById("memoryHint");

const photoOne =
    document.getElementById("photoOne");

const photoTwo =
    document.getElementById("photoTwo");

const bothOpened =
    document.getElementById("bothOpened");

const oopsMoment =
    document.getElementById("oopsMoment");

const finalMemory =
    document.getElementById("finalMemory");


// =========================================
// STATE
// =========================================

let firstOpened = false;
let secondOpened = false;
let musicPlaying = false;
let endingStarted = false;


// =========================================
// INITIAL STATE
// =========================================

memoryScene.classList.add("hidden-scene");

bothOpened.style.display = "none";
oopsMoment.style.display = "none";
finalMemory.style.display = "none";


// =========================================
// MUSIC
// =========================================

musicYes.addEventListener("click", () => {

    bgMusic.volume = 0.45;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicQuestion.classList.add("music-dismiss");

            setTimeout(() => {

                musicQuestion.style.display = "none";

                memoryScene.classList.remove(
                    "hidden-scene"
                );

            }, 700);

            musicControl.textContent = "♪";

        })
        .catch(() => {

            // If browser blocks playback,
            // still continue the experience.

            musicQuestion.classList.add(
                "music-dismiss"
            );

            setTimeout(() => {

                musicQuestion.style.display = "none";

                memoryScene.classList.remove(
                    "hidden-scene"
                );

            }, 700);

        });

});


// =========================================
// MUSIC CONTROL
// =========================================

musicControl.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play();

        musicPlaying = true;

        musicControl.textContent = "♪";

    } else {

        bgMusic.pause();

        musicPlaying = false;

        musicControl.textContent = "Ⅱ";

    }

});


// =========================================
// PHOTO 1
// =========================================

photoOne.addEventListener("click", () => {

    if (firstOpened) return;

    firstOpened = true;

    photoOne.classList.add("revealed");

    checkBothPhotos();

});


// =========================================
// PHOTO 2
// =========================================

photoTwo.addEventListener("click", () => {

    if (secondOpened) return;

    secondOpened = true;

    photoTwo.classList.add("revealed");

    checkBothPhotos();

});


// =========================================
// BOTH PHOTOS
// =========================================

function checkBothPhotos() {

    if (!firstOpened || !secondOpened) return;

    memoryHint.style.opacity = "0";

    setTimeout(() => {

        memoryHint.style.display = "none";

        bothOpened.style.display = "block";

        setTimeout(() => {

            bothOpened.classList.add(
                "show-both"
            );

        }, 50);

    }, 500);


    // Let her see both photos
    // for approximately 4 seconds.

    setTimeout(() => {

        startDisappearing();

    }, 4700);

}


// =========================================
// PHOTOS DISAPPEAR
// =========================================

function startDisappearing() {

    if (endingStarted) return;

    endingStarted = true;

    bothOpened.classList.remove(
        "show-both"
    );

    document.querySelector(".desk")
        .classList.add("photos-disappear");

    setTimeout(() => {

        document.querySelector(".desk")
            .style.opacity = "0";

    }, 900);


    setTimeout(() => {

        bothOpened.style.display = "none";

        showOops();

    }, 1300);

}


// =========================================
// OOPS
// =========================================

function showOops() {

    oopsMoment.style.display = "block";

    setTimeout(() => {

        oopsMoment.classList.add(
            "oops-visible"
        );

    }, 50);


    // After the emotional pause,
    // bring the memories back.

    setTimeout(() => {

        revealFinalMemory();

    }, 3900);

}


// =========================================
// FINAL MEMORY
// =========================================

function revealFinalMemory() {

    oopsMoment.classList.remove(
        "oops-visible"
    );

    oopsMoment.classList.add(
        "oops-fade"
    );


    setTimeout(() => {

        oopsMoment.style.display = "none";

        finalMemory.style.display = "block";

        setTimeout(() => {

            finalMemory.classList.add(
                "final-visible"
            );

        }, 100);

    }, 900);

}
