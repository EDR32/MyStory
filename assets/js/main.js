//  LOAD HEADER & FOOTER
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch("components/header.html").then(res => res.text()),
        fetch("components/footer.html").then(res => res.text())
    ])
    .then(([headerHTML, footerHTML]) => {
        document.getElementById("header").innerHTML = headerHTML;
        document.getElementById("footer").innerHTML = footerHTML;

    // AUTO YEAR UPDATE
    document.getElementById("year").textContent = new Date().getFullYear();

    // RUN MAIN SCRIPT
    initMainScripts();
    });
});

//  MAIN SCRIPT FUNCTION
function initMainScripts() {
    // MENU TOGGLE (MOBILE)
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    // TYPED TEXT EFFECT
    const typingEl = document.querySelector(".typing-text span");
    if (typingEl) {
        new Typed(".typing-text span", {
            strings: [
                "Web Developer",
                "Network Engineer",
                "Software Engineer",
                "Graphic Designer"
            ],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true
        });
    }

    // ACTIVE NAV LINK & SMOOTH SCROLL
    const navLinks = document.querySelectorAll("nav a[href^='#'], nav a[href*='#']");
    const sections = document.querySelectorAll("section[id]");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").split("#")[1];
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // offset untuk header
                    behavior: "smooth"
                });
            }

            // CHANGE ACTIVE LINK
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // CLOSE MENU (MOBILE)
            nav.classList.remove("active");
        });
    });

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY + 150;
        sections.forEach(sec => {
            let top = sec.offsetTop;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (scrollY > top && scrollY <= top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").includes(`#${id}`)) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // SCROLL REVEAL EFFECT
    const revealElements = document.querySelectorAll(
        ".section-title, .gallery .gallery-item, .gallery h2, " +
        ".skills .skill, .skills-quote, " +
        ".experience .timeline-item, .experience-quote, " +
        ".education .timeline-item"
    );

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const visible = 150;
            if (elementTop < windowHeight - visible) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // RUN FROM THE START

    // THEME TOGGLE
    const themeBtn = document.querySelector('.toggle-theme');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // HEADER SCROLL EFFECT
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}
