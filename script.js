// Initialize Lucide Icons
lucide.createIcons();

/**
 * Toggles the FAQ answers visibility and animates the icon
 * @param {number} id - The ID of the FAQ item to toggle
 */
function toggleFaq(id) {
    const ans = document.getElementById(`ans-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const circle = document.getElementById(`circle-${id}`);
    const isHidden = ans.classList.contains('hidden');
    
    // Close all other FAQs first (Accordion effect)
    document.querySelectorAll('[id^="ans-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="icon-"]').forEach(el => el.style.transform = 'rotate(0deg)');
    document.querySelectorAll('[id^="circle-"]').forEach(el => {
        el.classList.remove('bg-[#2D5A27]');
    });
    document.querySelectorAll('[id^="icon-"]').forEach(el => el.classList.remove('text-white'));

    // Open the clicked one if it was hidden
    if (isHidden) {
        ans.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)';
        circle.classList.add('bg-[#2D5A27]');
        icon.classList.add('text-white');
    }
}

/**
 * Intersection Observer for Scroll Reveal Animations
 */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/**
 * Navbar Scroll Effect
 * Shrinks the navbar padding when scrolling down
 */
window.onscroll = () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.remove('py-4'); 
        nav.classList.add('py-2');
    } else {
        nav.classList.add('py-4'); 
        nav.classList.remove('py-2');
    }
};
