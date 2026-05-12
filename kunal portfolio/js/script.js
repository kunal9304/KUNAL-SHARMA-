// =============================================
//  script.js — Main JS for Kunal's Portfolio
// =============================================

// Register ScrollTrigger plugin
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// =============================================
//  SIDEBAR / HAMBURGER MENU
// =============================================
const menuBtn    = document.querySelector('.menu-btn');
const sidebar    = document.querySelector('.sidebar');
const navLinks   = document.querySelectorAll('.nav-links li');

// Create overlay element dynamically
const overlay = document.createElement('div');
overlay.classList.add('sidebar-overlay');
document.body.appendChild(overlay);

let isOpen = false;

function openSidebar() {
    isOpen = true;
    sidebar.classList.add('active');
    menuBtn.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate nav links in
    gsap.fromTo(navLinks,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, delay: 0.2, ease: 'power3.out', duration: 0.5 }
    );
}

function closeSidebar() {
    isOpen = false;
    sidebar.classList.remove('active');
    menuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    // Reset nav links
    gsap.set(navLinks, { opacity: 0, x: 20 });
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        isOpen ? closeSidebar() : openSidebar();
    });
}

// Close sidebar when clicking overlay
overlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav link is clicked
navLinks.forEach(li => {
    li.addEventListener('click', closeSidebar);
});

// =============================================
//  PAGE LOAD ANIMATIONS (GSAP)
// =============================================
window.addEventListener('load', () => {

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // 1. Navbar
    if (document.querySelector('.navbar')) {
        tl.from('.navbar', { y: -80, opacity: 0, duration: 1 });
    }

    // 2. Hero — Home Page
    if (document.querySelector('.reveal-text')) {
        gsap.set('.reveal-text', { opacity: 0, y: 70 });
        gsap.set('.reveal-subtext', { opacity: 0, y: 30 });
        gsap.set('.home-button', { opacity: 0, y: 20 });

        tl.to('.reveal-text',
            { opacity: 1, y: 0, duration: 1.2 }, '-=0.6');
        tl.to('.reveal-subtext',
            { opacity: 1, y: 0, duration: 1 }, '-=0.9');
        tl.to('.home-button',
            { opacity: 1, y: 0, duration: 0.8 }, '-=0.7');
        tl.from('.home-button .btn',
            { scale: 0.85, opacity: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 0.6 }, '-=0.5');
    }

    // 3. About Page entrance
    if (document.querySelector('.aboutme')) {
        tl.from('.aboutme h1',
            { x: -40, opacity: 0, duration: 1 }, '-=0.5');
        tl.from('.aboutme p',
            { x: -30, opacity: 0, duration: 0.9 }, '-=0.7');
        tl.from('.skills h2',
            { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');
    }

    // 4. Cyber Safety Page entrance
    if (document.querySelector('.cyber-intro')) {
        tl.from('.cyber-intro h1',
            { y: -30, opacity: 0, duration: 1 }, '-=0.5');
        tl.from('.cyber-intro p',
            { y: -20, opacity: 0, duration: 0.8 }, '-=0.7');
    }

    // 5. Contact Page entrance
    if (document.querySelector('.contact-main')) {
        tl.from('.contact-main h1',
            { y: -30, opacity: 0, duration: 1 }, '-=0.5');
        tl.from('.contact-form',
            { y: 30, opacity: 0, duration: 0.9 }, '-=0.7');
    }

    // 6. Scroll-triggered: Cards (About & Cyber)
    const cards = document.querySelectorAll('.cards, .safety-card');
    if (cards.length > 0) {
        // Set initial hidden state via GSAP (not CSS) so they're visible if JS fails
        gsap.set(cards, { opacity: 0, y: 50 });

        gsap.to(cards, {
            scrollTrigger: {
                trigger: cards[0],
                start: 'top 100%',   // fires as soon as first card enters viewport
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out'
        });
    }
});

// =============================================
//  CONTACT FORM — Submit handler
// =============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        btn.textContent = 'Sending…';
        btn.disabled = true;

        // Simulate a send (replace with real API call if needed)
        setTimeout(() => {
            btn.textContent = '✓ Sent!';
            btn.style.background = '#00C896';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1200);
    });
}