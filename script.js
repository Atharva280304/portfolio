document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Navbar with Blur Effect ===
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === Mobile Menu Toggle ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle FontAwesome icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // === Typing Effect in Hero Section ===
    const typingText = document.querySelector('.typing-text');
    const words = ['Frontend Engineer', 'UI/UX Enthusiast', 'Web Developer', 'Bug Squasher'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        // Current word
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            // Add a character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal speed when typing
        }

        // Word logic tracking
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            isDeleting = true;
            typeSpeed = 2000; // Pause for 2 seconds
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to the next word
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Initiate Typing Effect
    setTimeout(type, 1000);

    // === Scroll Reveal Animations / Intersection Observer ===
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add the active class
            entry.target.classList.add('active');
            
            // Unobserve the element once animated
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // === Footer Year Updater ===
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // === Dynamic Certifications Loader ===
    const certGrid = document.getElementById('cert-grid');
    if (certGrid) {
        const certifications = [
            "My certifications/Bootstrap Infosys.pdf",
            "My certifications/Deloitte Data Analysis.pdf",
            "My certifications/GUVI AIML.jpeg",
            "My certifications/Html 5 Infosys.pdf",
            "My certifications/Infosys Angular.pdf",
            "My certifications/Internship.jpeg",
            "My certifications/Javascript Infosys.pdf",
            "My certifications/Techsaksham Fullstack.pdf",
            "My certifications/Techsaksham Internship.pdf",
            "My certifications/ybi Python.pdf"
        ];

        function formatCertTitle(filename) {
            let name = filename.split('/').pop(); // Remove folder paths
            name = name.replace(/\.[^/.]+$/, ""); // Remove extension
            name = name.replace(/-/g, " "); // Replace hyphens with space
            // Capitalize each word
            return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        certifications.forEach((filepath, index) => {
            const isPdf = filepath.toLowerCase().endsWith('.pdf');
            // If PDF, use a standard high-quality PDF icon placeholder
            const imgSrc = isPdf 
                ? "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" 
                : filepath;
            
            const title = formatCertTitle(filepath);
            const delay = index * 100; // Staggered transition delay per card

            const card = document.createElement('div');
            card.className = 'cert-card reveal-up';
            card.style.transitionDelay = `${delay}ms`;

            card.innerHTML = `
                <img src="${imgSrc}" alt="${title}" loading="lazy" style="${isPdf ? 'object-fit: contain; padding: 20px; background: #222;' : ''}">
                <h3>${title}</h3>
                <p>Verified Certificate</p>
                <a href="${filepath}" target="_blank">View Certificate</a>
            `;
            
            certGrid.appendChild(card);
            
            // Attach observer so scroll animations work seamlessly
            if (typeof revealObserver !== 'undefined') {
                revealObserver.observe(card);
            }
        });
    }
});
