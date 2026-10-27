// Initialize jQuery UI Accordion if present on page
$(function() {
    if ($("#accordion").length) {
        $("#accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
    }
});

// Function to display pop up message to say they joined
function subscribe() {
    alert("We at HavenRoots Welcome You");
}

function enquire() {
    alert("Welcome to the HavenRoots Team");
}

function join() {
    alert("You are now subscribed to our newsletter");
}

function message() {
    alert("We'll get back to you soon ;)");
}

// Function of button that sends the user back to the top of page
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    const btn = document.getElementById("backToTopBtn");
    if (btn) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
}

// Function of scroll back up when button is pressed.
function topFunction() {
    const scrollDuration = 600; 
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Global DOM Events
document.addEventListener("DOMContentLoaded", function() {
    // Hamburger Menu
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeBtn");

    if (hamburgerBtn && mobileMenu && closeBtn) {
        hamburgerBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    }

    // Custom Form Validation and AJAX submission handler with red inline messages
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("contactMessage");
    const resetBtn = document.getElementById("resetBtn");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            let isValid = true;

            // Clear prior error messages
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (phoneError) phoneError.textContent = "";
            if (messageError) messageError.textContent = "";

            // 1. Validate Full Name
            if (nameInput && !nameInput.value.trim()) {
                if (nameError) nameError.textContent = `You entered: "${nameInput.value}". This field is required. Please enter your full name.`;
                isValid = false;
            }

            // 2. Validate Email (Words before and after @ symbol)
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailInput && !emailInput.value.trim()) {
                if (emailError) emailError.textContent = `You entered: "${emailInput.value}". This field is required.`;
                isValid = false;
            } else if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                if (emailError) emailError.textContent = `You entered: "${emailInput.value}". Incorrect email format. Right way to type it: name@example.com (must include words before and after the @ symbol).`;
                isValid = false;
            }

            // 3. Validate South African Phone Number
            const saPhoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
            if (phoneInput && !phoneInput.value.trim()) {
                if (phoneError) phoneError.textContent = `You entered: "${phoneInput.value}". This field is required.`;
                isValid = false;
            } else if (phoneInput && !saPhoneRegex.test(phoneInput.value.trim().replace(/[\s-]/g, ''))) {
                if (phoneError) phoneError.textContent = `You entered: "${phoneInput.value}". Incorrect South African phone format. Right way to type it: +27117820122 or 0117820122.`;
                isValid = false;
            }

            // 4. Validate Reason for Contacting
            if (messageInput && !messageInput.value.trim()) {
                if (messageError) messageError.textContent = `You entered: "${messageInput.value}". This field is required. Please state your reason for contacting us.`;
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Submit via AJAX if validation passes
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert("We'll get back to you soon ;)");
                    contactForm.reset();
                    if (nameError) nameError.textContent = "";
                    if (emailError) emailError.textContent = "";
                    if (phoneError) phoneError.textContent = "";
                    if (messageError) messageError.textContent = "";
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form.");
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener("click", function() {
                if (nameError) nameError.textContent = "";
                if (emailError) emailError.textContent = "";
                if (phoneError) phoneError.textContent = "";
                if (messageError) messageError.textContent = "";
            });
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Automatically apply the animation class to main sections and quote blocks
    document.querySelectorAll('main section, .quote-block').forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    // Lightbox Gallery Setup
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    const captionText = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("lightboxClose");

    // Enable lightbox on any image with class 'lightbox-trigger' or inside '.Home-page'
    document.querySelectorAll(".Home-page img, .lightbox-trigger").forEach(img => {
        img.addEventListener("click", function() {
            if (modal && modalImg) {
                modal.classList.add("active");
                modalImg.src = this.src;
                captionText.innerText = this.alt || "HavenRoots Gallery View";
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});