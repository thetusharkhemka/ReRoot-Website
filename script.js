// ============================================
// Custom Cursor Implementation
// ============================================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation - Optimized
let rafId = null;
function animateFollower() {
    followerX += (mouseX - followerX) * 0.15; // Faster follow
    followerY += (mouseY - followerY) * 0.15;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    rafId = requestAnimationFrame(animateFollower);
}
if (window.innerWidth > 768) {
    animateFollower();
}

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .service-card, .cta-button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = 'var(--warm-gold)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
        cursorFollower.style.borderColor = 'rgba(244, 162, 97, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'var(--soft-teal)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(78, 205, 196, 0.3)';
    });
});

// Hide cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// ============================================
// Word-by-word Hero Text Animation
// ============================================

function animateHeroWords() {
    const words = document.querySelectorAll('.hero-subtitle .subtitle-word');
    const baseDelay = 1.5;
    const delayIncrement = 0.04;
    
    words.forEach((word, index) => {
        const delay = baseDelay + (index * delayIncrement);
        word.style.animationDelay = `${delay}s`;
    });
}

// ============================================
// Scroll-based Animations - Optimized
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .step-item, .trust-paragraph, .cta-title, .cta-subtitle, .cta-large, .cta-note, .goal-card'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ============================================
// Parallax Effects - Optimized with Throttle
// ============================================

let scrollY = 0;
let ticking = false;

function updateParallax() {
    scrollY = window.scrollY;
    
    // Hero background parallax - only if in view
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrollY < window.innerHeight) {
        const speed = 0.3;
        heroBackground.style.transform = `translateY(${scrollY * speed}px) translateZ(0)`;
    }
    
    // Floating elements parallax - only if hero is visible
    if (scrollY < window.innerHeight * 1.5) {
        const floatingElements = document.querySelectorAll('.float-circle');
        floatingElements.forEach((el, index) => {
            const speed = 0.2 + (index * 0.05);
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px) translateZ(0)`;
        });
    }
    
    // Trust section parallax
    const trustBackground = document.querySelector('.trust-background');
    if (trustBackground) {
        const trustSection = document.querySelector('.trust-section');
        const rect = trustSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.15;
            trustBackground.style.transform = `translateY(${(scrollY - rect.top) * speed}px) translateZ(0)`;
        }
    }
    
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxTick, { passive: true });
updateParallax();

// ============================================
// Service Card Interactions - Optimized
// ============================================

const serviceCards = document.querySelectorAll('.service-card');
let cardHoverActive = false;

serviceCards.forEach(card => {
    let rafId = null;
    
    card.addEventListener('mouseenter', () => {
        cardHoverActive = true;
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!cardHoverActive) return;
        
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25; // Reduced intensity for performance
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) translateZ(0)`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        cardHoverActive = false;
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) translateZ(0)';
    });
});

// Step animations are handled by CSS now

// ============================================
// Smooth Scroll for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(46, 168, 159, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(46, 168, 159, 0.05)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// ============================================
// Window Resize Handler
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            document.body.style.cursor = 'auto';
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        } else {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
            document.body.style.cursor = 'none';
            if (!rafId) {
                animateFollower();
            }
        }
        updateParallax();
    }, 150);
});

// ============================================
// Reduced Motion Support
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable cursor for reduced motion
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
    
    // Remove animations
    const style = document.createElement('style');
    style.textContent = `
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Initialize on Load
// ============================================

// ============================================
// Services Slider
// ============================================

let currentSlide = 0;
const sliderTrack = document.querySelector('.services-slider-track');
const sliderDots = document.querySelector('.slider-dots');
const serviceCardsSlider = document.querySelectorAll('.services-slider-track .service-card-wrapper');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');

if (sliderTrack && serviceCardsSlider.length > 0) {
    const totalSlides = serviceCardsSlider.length;
    let slidesToShow = 1;
    
    if (window.innerWidth > 1200) {
        slidesToShow = 3;
    } else if (window.innerWidth > 768) {
        slidesToShow = 2;
    } else {
        slidesToShow = 1;
    }
    
    // Create dots
    if (sliderDots) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    function updateSlider() {
        const cardWidth = serviceCardsSlider[0].offsetWidth + 32; // width + gap
        const translateX = -currentSlide * cardWidth;
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        if (sliderDots) {
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide >= totalSlides - slidesToShow;
    }
    
    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - slidesToShow));
        updateSlider();
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - slidesToShow) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate slides to show based on new width
            if (window.innerWidth > 1200) {
                slidesToShow = 3;
            } else if (window.innerWidth > 768) {
                slidesToShow = 2;
            } else {
                slidesToShow = 1;
            }
            updateSlider();
        }, 250);
    });
    
    // Initialize
    updateSlider();
}

window.addEventListener('load', () => {
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
        animateHeroWords();
    }, 100);
    
    // Update parallax
    updateParallax();
});

