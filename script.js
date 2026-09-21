document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       БОЛЬШОЕ СЕРДЦЕ
       ========================= */

    const bigHeart = document.querySelector(".big-heart");

    if (bigHeart) {

        const heartCount = 180;

        for (let i = 0; i < heartCount; i++) {

            const heart = document.createElement("div");

            heart.className = "mini-heart";
            heart.innerHTML = "♥";

            const t = Math.PI * 2 * i / heartCount;

            const x = 16 * Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t);

            const scale = 12;

            heart.style.left =
                `calc(50% + ${x * scale}px)`;

            heart.style.top =
                `calc(50% - ${y * scale}px)`;

            heart.style.animationDelay =
                `${Math.random() * 2}s`;

            bigHeart.appendChild(heart);
        }
    }


    /* =========================
       ФОТОГРАФИИ
       ========================= */

    const photoCards =
        document.querySelectorAll(".photo-card");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    let currentPhoto = 0;


    /* =========================
       ОТКРЫТИЕ
       ========================= */

    function openPhoto(index) {

        if (!photoCards.length) return;

        const card = photoCards[index];

        const image = card.querySelector("img");

        if (!image) return;

        currentPhoto = index;

        lightboxImage.src = image.src;

        lightboxCounter.textContent =
            `${currentPhoto + 1} / ${photoCards.length}`;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* =========================
       ЗАКРЫТИЕ
       ========================= */

    function closePhoto() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* =========================
       СЛЕДУЮЩЕЕ
       ========================= */

    function nextPhoto() {

        currentPhoto++;

        if (currentPhoto >= photoCards.length) {
            currentPhoto = 0;
        }

        openPhoto(currentPhoto);
    }


    /* =========================
       ПРЕДЫДУЩЕЕ
       ========================= */

    function previousPhoto() {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = photoCards.length - 1;
        }

        openPhoto(currentPhoto);
    }


    /* =========================
       КЛИК ПО ФОТО
       ========================= */

    photoCards.forEach(function (card, index) {

        card.addEventListener("click", function () {

            openPhoto(index);

        });

    });


    /* =========================
       КНОПКИ
       ========================= */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closePhoto
        );

    }

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            nextPhoto
        );

    }

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            previousPhoto
        );

    }


    /* =========================
       КЛИК ПО ФОНУ
       ========================= */

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closePhoto();
            }

        });

    }


    /* =========================
       КЛАВИАТУРА
       ========================= */

    document.addEventListener("keydown", function (event) {

        if (!lightbox ||
            !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closePhoto();
        }

        if (event.key === "ArrowRight") {
            nextPhoto();
        }

        if (event.key === "ArrowLeft") {
            previousPhoto();
        }

    });

});