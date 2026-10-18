/* =================================
   LOADING SCREEN
================================= */

window.addEventListener("load", function () {

    const loadingScreen =
        document.querySelector(".loading-screen");


    setTimeout(function () {

        loadingScreen.style.opacity = "0";

        loadingScreen.style.visibility = "hidden";

    }, 100);

});



/* =================================
   COUNTDOWN
================================= */

const weddingDate =
    new Date("November 14, 2026 14:30:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =================================
   NAVIGATION ACTIVE SECTION
================================= */

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll(
    "#home, #couple, #details, #rsvp"
);

let isNavClick = false;


/* =================================
   UPDATE ACTIVE NAVIGATION
================================= */

function updateActiveNavigation() {

    if (isNavClick) return;

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


/* =================================
   NAVIGATION CLICK
================================= */

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const targetId =
            link.getAttribute("href");

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) return;

        isNavClick = true;


        /* Immediately activate clicked link */

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");


        /* Direct smooth scroll */

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        /* Enable section detection again */

        setTimeout(() => {
            isNavClick = false;
        }, 1000);

    });

});


/* =================================
   SCROLL LISTENER
================================= */

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =================================
   INITIAL STATE
================================= */

updateActiveNavigation();


/* =========================================================
   WEDDING FLOWER BLOOM + RAIN — FREE-FLOWING VERSION
   =========================================================
   - Spreads across the FULL Home/hero section
   - Multiple inward entry points (top / left / right / burst)
   - Continuous curved drift (sway), not a straight fixed path
   - Gravity gradually takes over the motion
   - Every flower/petal gets its OWN independent path
   - No bounce, no return, no center pile-up, no single direction
   ========================================================= */
 
const excitedButton = document.getElementById("excitedButton");
 
const flowerImages = [
    "./F/1.png",
    "./F/2.png",
    "./F/3.png",
    "./F/4.png",
    "./F/5.png",
    "./F/6.png",
    "./F/7.png",
    "./F/8.png"
];
 
const petalImages = [
    "./F/P1.png",
    "./F/P2.png",
    "./F/P3.png",
    "./F/P4.png",
    "./F/P5.png",
    "./F/P6.png"
];
 
excitedButton.addEventListener("click", () => {
 
    const hero = document.querySelector(".hero");
    if (!hero) return;
 
    const heroRect = hero.getBoundingClientRect();
    const heroWidth = heroRect.width;
    const heroHeight = heroRect.height;
 
    /* ---------------------------------------------------
       CONFIG — tuned against the ACTUAL hero dimensions,
       not fixed pixel guesses
    --------------------------------------------------- */
 
    const isSmallScreen = heroWidth <= 700;
 
    const TOTAL_PARTICLES = isSmallScreen ? 500 : 340;// significantly higher quantity
    const SPAWN_SPREAD_MS = 3200;   // particles keep entering over this window
    const SPAWN_BATCH = 3;          // particles added per spawn tick
    const GRAVITY = 0.085;          // vertical acceleration once gravity kicks in
    const MAX_FALL_SPEED = 6.2;     // terminal velocity — keeps the fall smooth, not stopped
    const FADE_IN_MS = 350;
    const FADE_OUT_START = heroHeight * 0.8;
    const FADE_OUT_SPAN = heroHeight * 0.35;
 
    const particles = [];
 
    /* ---------------------------------------------------
       PARTICLE FACTORY
       Every flower/petal is spawned with its own entry
       point, direction, speed, sway, rotation and gravity
       timing — no two follow the same path.
    --------------------------------------------------- */
 
    function spawnParticle() {
 
        const isFlower = (particles.length % 5) < 4;
const imageArray = isFlower ? flowerImages : petalImages;
 
        const el = document.createElement("img");
        el.src = imageArray[Math.floor(Math.random() * imageArray.length)];
        el.alt = "";
        el.className = isFlower
            ? "petal-particle petal-particle--flower"
            : "petal-particle petal-particle--petal";
 
        if (isSmallScreen) {

    el.style.width = isFlower
        ? `${20 + Math.random() * 28}px`
        : `${10 + Math.random() * 18}px`;

} else {

    el.style.width = isFlower
        ? `${28 + Math.random() * 52}px`
        : `${14 + Math.random() * 30}px`;

}
 
        /*
        Pick an entry side so flowers/petals come in from
        DIFFERENT directions instead of one single burst point
        */
        const edgeRoll = Math.random();
        let x, y, vx, vy;
 
        // swayScale + custom gravity timing let TOP particles float
        // and sway instead of dropping straight down like a stone
        let swayScale = 1;
        let gravityDelay = 250 + Math.random() * 550;
        let gravityRamp = 1300 + Math.random() * 1100;
 
        if (edgeRoll < 0.34) {
            // TOP — floats in from above with a slow, swaying descent
            x = Math.random() * heroWidth;
            y = -60 - Math.random() * 90;
            vx = (Math.random() - 0.5) * 1.1;   // barely any base horizontal push —
            vy = 0.12 + Math.random() * 0.3;    // the sway below does the work instead
            swayScale = 2.0 + Math.random() * 1.0;
            gravityDelay = 450 + Math.random() * 700;   // hangs in the air a bit longer
            gravityRamp = 1900 + Math.random() * 1400;  // then eases down gently, not fast
 
        } else if (edgeRoll < 0.61) {
    // LEFT edge
    x = -50 - Math.random() * 70;
    y = Math.random() * heroHeight * 0.75;

    if (isSmallScreen) {
        vx = 1.3 + Math.random() * 8;
    } else {
        vx = 1.3 + Math.random() * 16;
    }

    vy = -0.7 + Math.random() * 1.6;

} else if (edgeRoll < 0.88) {
    // RIGHT edge
    x = heroWidth + 50 + Math.random() * 70;
    y = Math.random() * heroHeight * 0.75;

    if (isSmallScreen) {
        vx = -(1.3 + Math.random() * 8);
    } else {
        vx = -(1.3 + Math.random() * 16);
    }

    vy = -0.7 + Math.random() * 1.6;
 
        } else {
            // INNER BURST — radiates outward from inside the hero
            x = heroWidth * 0.2 + Math.random() * heroWidth * 0.6;
            y = heroHeight * 0.12 + Math.random() * heroHeight * 0.5;
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.1 + Math.random() * 2.1;
            vx = Math.cos(angle) * speed;
            vy = Math.sin(angle) * speed - 1.1;
        }
 
        particles.push({
            el,
            x, y, vx, vy,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6,
            swayAmplitude: (0.35 + Math.random() * 0.55) * swayScale,
            swayFrequency: 0.0015 + Math.random() * 0.0025,   // slow cycle = a gentle glide, not a zigzag
            swayPhase: Math.random() * Math.PI * 2,
            spawnTime: performance.now(),
            gravityDelay,   // brief free-floating moment first (longer for TOP)
            gravityRamp     // then gravity eases in (slower for TOP)
        });
 
        hero.appendChild(el);
    }
 
    /* ---------------------------------------------------
       SPAWN LOOP
       Particles enter gradually rather than all at once,
       so they never pile up together at a single moment.
    --------------------------------------------------- */
 
    let spawnedCount = 0;
    const ticksNeeded = Math.ceil(TOTAL_PARTICLES / SPAWN_BATCH);
    const spawnEvery = SPAWN_SPREAD_MS / ticksNeeded;
 
    const spawnTimer = setInterval(() => {
        for (let i = 0; i < SPAWN_BATCH && spawnedCount < TOTAL_PARTICLES; i++) {
            spawnParticle();
            spawnedCount++;
        }
        if (spawnedCount >= TOTAL_PARTICLES) {
            clearInterval(spawnTimer);
        }
    }, spawnEvery);
 
    /* ---------------------------------------------------
       ANIMATION LOOP
       Each particle follows its OWN curved path every
       frame. Gravity gradually takes over, motion is
       continuous, and nothing bounces, stops or returns.
    --------------------------------------------------- */
 
    let lastFrame = performance.now();
 
    function tick(now) {
 
        const dt = Math.min(now - lastFrame, 40);
        lastFrame = now;
        const step = dt / 16.7;
 
        for (let i = particles.length - 1; i >= 0; i--) {
 
            const p = particles[i];
            const age = now - p.spawnTime;
 
            // Gravity eases in over time instead of snapping on
            const rampProgress = Math.min(
                Math.max((age - p.gravityDelay) / p.gravityRamp, 0),
                1
            );
 
            // Continuous curved drift — always active, never a straight line
            const sway = Math.sin(age * p.swayFrequency + p.swayPhase) * p.swayAmplitude;
 
            p.vx *= 0.997; // gentle air resistance, no jerky motion
            p.vy += GRAVITY * rampProgress * step;
            p.vy = Math.min(p.vy, MAX_FALL_SPEED);
 
            p.x += (p.vx + sway) * step;
            p.y += p.vy * step;
            p.rotation += p.rotationSpeed * step;
 
            p.el.style.transform =
                `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
 
            // Fade in on arrival, fade out before leaving the section
            let opacity = 1;
            if (age < FADE_IN_MS) {
                opacity = age / FADE_IN_MS;
            } else if (p.y > FADE_OUT_START) {
                opacity = 1 - Math.min((p.y - FADE_OUT_START) / FADE_OUT_SPAN, 1);
            }
            p.el.style.opacity = opacity;
 
            // Remove once it has genuinely left the Home section —
            // no bounce back, no return trip, no lingering pile-up
            if (p.y > heroHeight + 100 || p.y < -500 || age > 16000) {
                p.el.remove();
                particles.splice(i, 1);
            }
        }
 
        if (particles.length > 0 || spawnedCount < TOTAL_PARTICLES) {
            requestAnimationFrame(tick);
        }
    }
 
    requestAnimationFrame(tick);
});



const weddingSongs = [

    "./Song/Bole Chudiyan.mp3",

    "./Song/Chaleya Jawan.mp3",

    "./Song/Din Shagna Da Phillauri.mp3",

    "./Song/Gallan Goodiyaan Dil Dhadakne Do.mp3",

    "./Song/Heeriye Happy Hardy And Heer.mp3",

    "./Song/Kesariya Brahmastra.mp3",

    "./Song/London Thumakda Queen.mp3",

    "./Song/Mehndi Hai Rachnewali Zubeidaa.mp3",

    "./Song/Mere Sohneya Kabir Singh.mp3",

    "./Song/Nachde Ne Saare.mp3",

    "./Song/Navrai Maajhi.mp3",

    "./Song/Ranjha Shershaah.mp3",

    "./Song/Ranjhana.mp3",

    "./Song/Samjhawan Humpty Sharma Ki Dulhania.mp3",

    "./Song/Tere Vaaste Zara Hatke Zara Bachke.mp3",

    "./Song/What Jhumka Rocky Aur Rani Ki Prem Kahaani.mp3"

];

/* =================================
   MUSIC PLAYER
================================= */

const musicButton =
    document.getElementById("musicToggle");

const musicNext =
    document.getElementById("musicNext");

const musicProgress =
    document.getElementById("musicProgress");

const musicCurrentTime =
    document.getElementById("musicCurrentTime");


let musicPlaying = false;

let currentSong = 0;

let musicAudio = null;


/* =================================
   CREATE MUSIC
================================= */

function createMusic() {

    if (musicAudio) return;

    musicAudio = new Audio(
        weddingSongs[currentSong]
    );


    /* When song finishes */

    musicAudio.addEventListener("ended", function () {

        playNextSong();

    });


    /* =================================
       UPDATE SONG TIMELINE
    ================================= */

    musicAudio.addEventListener("timeupdate", function () {

        if (!musicAudio.duration) return;


        /* Current time */

        const currentTime =
            musicAudio.currentTime;


        /* Total song duration */

        const duration =
            musicAudio.duration;


        /* Convert seconds to percentage */

        const progress =
            (currentTime / duration) * 100;


        /* Update progress bar */

        if (!isDraggingMusicProgress) {

    musicProgress.value =
        progress;

    musicProgress.style.setProperty(
        "--progress",
        progress + "%"
    );

}


        /* Update time text */

        musicCurrentTime.textContent =
            formatTime(currentTime);

    });


    /* =================================
       SONG LOADED
    ================================= */

    musicAudio.addEventListener("loadedmetadata", function () {

        musicProgress.value = 0;

        musicProgress.style.setProperty(
            "--progress",
            "0%"
        );

        musicCurrentTime.textContent =
            "00:00";

    });

}


/* =================================
   FORMAT TIME
================================= */

function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {
        return "00:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0")
        + ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =================================
   PLAY / PAUSE
================================= */

musicButton.addEventListener("click", function () {

    createMusic();


    if (!musicPlaying) {

        musicAudio.play();

        musicPlaying = true;

        musicButton.textContent = "❚❚";

        startMusicFlowers();


    } else {

        musicAudio.pause();

        musicPlaying = false;

        musicButton.textContent = "▶";

        stopMusicFlowers();

    }

});


/* =================================
   MUSIC TIMELINE
================================= */

let isDraggingMusicProgress = false;


/* Start dragging */

musicProgress.addEventListener("pointerdown", function () {

    isDraggingMusicProgress = true;

});


/* Move timeline */

musicProgress.addEventListener("input", function () {

    if (!musicAudio) return;

    if (!musicAudio.duration) return;


    const newTime =
        (this.value / 100) *
        musicAudio.duration;


    musicAudio.currentTime =
        newTime;


    musicProgress.style.setProperty(
        "--progress",
        this.value + "%"
    );


    musicCurrentTime.textContent =
        formatTime(newTime);

});


/* Stop dragging */

musicProgress.addEventListener("pointerup", function () {

    isDraggingMusicProgress = false;

});


/* =================================
   NEXT SONG
================================= */

musicNext.addEventListener("click", function () {

    createMusic();

    playNextSong();

});


/* =================================
   PLAY NEXT SONG
================================= */

function playNextSong() {

    currentSong++;


    if (currentSong >= weddingSongs.length) {

        currentSong = 0;

    }


    musicAudio.src =
        weddingSongs[currentSong];


    /* Reset timeline */

    musicProgress.value = 0;

    musicProgress.style.setProperty(
        "--progress",
        "0%"
    );


    musicCurrentTime.textContent =
        "00:00";


    /* Play new song */

    if (musicPlaying) {

        musicAudio.play();

    }

}


/* =================================
   MUSIC FLOWER TRIGGER
================================= */

let musicFlowerTimer = null;


/* Start flowers */

function startMusicFlowers() {

    if (musicFlowerTimer) return;


    musicFlowerTimer = setInterval(function () {

        if (musicPlaying) {

            excitedButton.click();

        }

    }, 2000);

}


/* Stop flowers */

function stopMusicFlowers() {

    if (musicFlowerTimer) {

        clearInterval(musicFlowerTimer);

        musicFlowerTimer = null;

    }

}

/* =========================================
   RSVP SYSTEM
   GOOGLE SHEETS + EMAIL
========================================= */

const RSVP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwpwKAmPhqvTdBz5HmDMQGPc4xLuuPdnH2wVKaJXgXG--jn84ELyFr4EnqLdt7-RByt/exec";


/* =========================================
   GUEST COUNTER
========================================= */

const guestMinus =
    document.getElementById("guestMinus");

const guestPlus =
    document.getElementById("guestPlus");

const guestCount =
    document.getElementById("guestCount");

let numberOfGuests = 1;


/* MINUS */

if (guestMinus) {

    guestMinus.addEventListener(
        "click",
        function () {

            if (numberOfGuests > 1) {

                numberOfGuests--;

                guestCount.textContent =
                    numberOfGuests;
            }

        }
    );

}


/* PLUS */

if (guestPlus) {

    guestPlus.addEventListener(
        "click",
        function () {

            if (numberOfGuests < 10) {

                numberOfGuests++;

                guestCount.textContent =
                    numberOfGuests;
            }

        }
    );

}


/* =========================================
   RSVP SUBMIT
========================================= */

const rsvpSubmit =
    document.querySelector(".rsvp-submit");


if (rsvpSubmit) {

    rsvpSubmit.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            /* ==============================
               GET FORM DATA
            ============================== */

            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();


            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            const selectedEvents =
                document.querySelectorAll(
                    'input[name="events"]:checked'
                );


            const guestMessage =
                document
                    .getElementById("guestMessage")
                    .value
                    .trim();


            /* ==============================
               VALIDATION
            ============================== */

            if (guestName === "") {

                alert(
                    "Please enter your name."
                );

                document
                    .getElementById("guestName")
                    .focus();

                return;
            }


            if (!attendance) {

                alert(
                    "Please let us know if you will celebrate with us."
                );

                return;
            }


            /* ==============================
               EVENT NAMES
            ============================== */

            const eventNames = [];


            selectedEvents.forEach(
                function (event) {

                    if (
                        event.value ===
                        "nikah"
                    ) {

                        eventNames.push(
                            "Nikah"
                        );
                    }


                    if (
                        event.value ===
                        "nikah-party"
                    ) {

                        eventNames.push(
                            "Nikah Party"
                        );
                    }


                    if (
                        event.value ===
                        "reception-walima"
                    ) {

                        eventNames.push(
                            "Reception · Walima"
                        );
                    }

                }
            );


            /* ==============================
               IF ATTENDING
               MUST SELECT EVENT
            ============================== */

            if (
                attendance.value === "yes" &&
                selectedEvents.length === 0
            ) {

                alert(
                    "Please select at least one celebration you will attend."
                );

                return;
            }


            /* ==============================
               ATTENDANCE TEXT
            ============================== */

            const attendanceText =
                attendance.value === "yes"
                    ? "Yes, with joy"
                    : "Regretfully, no";


            /* ==============================
               RSVP DATA
            ============================== */

            const rsvpData = {

                name:
                    guestName,

                attendance:
                    attendanceText,

                events:
                    eventNames,

                guests:
                    numberOfGuests,

                message:
                    guestMessage
            };


            console.log(
                "Sending RSVP:",
                rsvpData
            );


            /* ==============================
               BUTTON → SENDING
            ============================== */

            rsvpSubmit.disabled = true;

            rsvpSubmit.innerHTML =
                "<span>SENDING RSVP...</span>";


            try {

                /*
                    IMPORTANT:
                    no JSON Content-Type header.
                    This avoids Google's CORS
                    preflight problem.
                */

                await fetch(
                    RSVP_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        body:
                            JSON.stringify(
                                rsvpData
                            )
                    }
                );


                /* ==========================
                   SUCCESS
                ========================== */

                rsvpSubmit.innerHTML =
                    "<span>RSVP RECEIVED WITH LOVE</span><b>♥</b>";

                rsvpSubmit.style.background =
                    "#063c2c";

                rsvpSubmit.style.pointerEvents =
                    "none";


                /* SUCCESS MESSAGE */

                const existingMessage =
                    document.querySelector(
                        ".rsvp-success-message"
                    );


                if (!existingMessage) {

                    const successMessage =
                        document.createElement(
                            "p"
                        );

                    successMessage.className =
                        "rsvp-success-message";

                    successMessage.textContent =
                        "Thank you for being part of our beautiful celebration.";

                    successMessage.style.margin =
                        "18px 0 0";

                    successMessage.style.color =
                        "#063c2c";

                    successMessage.style.fontFamily =
                        '"Quillstone", sans-serif';

                    successMessage.style.fontSize =
                        "17px";

                    successMessage.style.textAlign =
                        "center";

                    successMessage.style.lineHeight =
                        "1.5";


                    rsvpSubmit.parentNode.appendChild(
                        successMessage
                    );

                }


                /* CLEAR FORM */

                document
                    .getElementById("guestName")
                    .value = "";

                document
                    .getElementById("guestMessage")
                    .value = "";


            } catch (error) {

                console.error(
                    "RSVP Error:",
                    error
                );


                alert(
                    "Something went wrong. Please try again."
                );


                rsvpSubmit.disabled =
                    false;

                rsvpSubmit.innerHTML =
                    "<span>CONFIRM MY RSVP</span><b>→</b>";

            }

        }
    );

}


/* =========================================
   WHATSAPP SHARE
========================================= */

const whatsappShare =
    document.getElementById(
        "whatsappShare"
    );


if (whatsappShare) {

    whatsappShare.addEventListener(
        "click",
        function () {

            const websiteUrl =
                window.location.href;


            const message =
    `\u{1F48D} *Saad & Firdous are getting married!* \u{2764}\u{FE0F}\n\n` +
    `Two hearts, two families, and one beautiful new beginning.\n\n` +
    `*14 November 2026* \u{2728}\n\n` +
    `Come celebrate our special day with us, witness the beginning of our forever, and be a part of these beautiful moments.\n\n` +
    `\u{1F48C} *Visit our wedding website, fill in your RSVP, and save the date.*\n\n` +
    `We can't wait to celebrate with you! \u{2764}\u{FE0F}\n\n` +
    `*Saad Sura & Firdous Madhiya*\n\n` +
    `${websiteUrl}`;


            const whatsappUrl =
                "https://wa.me/?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================
   ADD TO GOOGLE CALENDAR
========================================= */

const calendarButton =
    document.getElementById("calendarButton");

if (calendarButton) {

    calendarButton.addEventListener(
        "click",
        function () {

            const title =
                "Saad Sura & Firdous Madhiya — Wedding Celebration";

            const dates =
                "20261114T143000/20261115T230000";

            const location =
                "Majadar, Vadgam, Banaskantha, Gujarat";

            const details =
                "💍 Saad & Firdous are getting married!\n\n" +

                "Two hearts, two families, and one beautiful new beginning.\n\n" +

                "📅 14 November 2026\n\n" +

                "NIKAH\n" +
                "14 November 2026 · 2:30 PM\n" +
                "Jama Masjid, Majadar, Vadgam, Banaskantha, Gujarat\n\n" +

                "NIKAH PARTY\n" +
                "14 November 2026 · 8:00 PM\n" +
                "Surapura Vas, Majadar, Vadgam, Banaskantha, Gujarat\n\n" +

                "RECEPTION · WALIMA\n" +
                "15 November 2026 · 8:00 PM\n" +
                "Surapura Vas, Majadar, Vadgam, Banaskantha, Gujarat\n\n" +

                "Come celebrate our special day with us and be a part of these beautiful moments. ❤️";

            const calendarUrl =
                "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                "&text=" +
                encodeURIComponent(title) +
                "&dates=" +
                encodeURIComponent(dates) +
                "&details=" +
                encodeURIComponent(details) +
                "&location=" +
                encodeURIComponent(location);

            window.open(
                calendarUrl,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}