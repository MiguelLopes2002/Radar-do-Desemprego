let slideIndex = 1;
let autoSlideInterval;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    clearTimeout(autoSlideInterval);
    autoSlideInterval = setTimeout(() => plusSlides(1), 5000); // Mudar de slide a cada 5 segundos automaticamente
}

function resetAutoSlide() {
    clearTimeout(autoSlideInterval);
    autoSlideInterval = setTimeout(() => plusSlides(1), 5000);
}
