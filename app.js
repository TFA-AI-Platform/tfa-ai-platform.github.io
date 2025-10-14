// Particle Background
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(21, 195, 90, ${particle.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(21, 195, 90, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background
new ParticleBackground();

// Hide loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
});

// Smooth scrolling + update URL hash for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Update the URL hash so the address bar reflects the section
                try {
                    history.pushState(null, '', `#${targetId}`);
                } catch (_) {
                    // Fallback if pushState is unavailable
                    window.location.hash = targetId;
                }
            }
        }
    });
});

// Digital score slider
const digitalSlider = document.getElementById('digital');
const digitalValue = document.getElementById('digitalValue');
if (digitalSlider && digitalValue) {
    digitalSlider.addEventListener('input', (e) => {
        digitalValue.textContent = e.target.value;
    });
}

// Animate score circle
function animateScore(score) {
    const progress = document.getElementById('scoreProgress');
    const value = document.getElementById('scoreValue');
    if (progress && value) {
        const percentage = ((score - 300) / 550) * 100;
        const circumference = 2 * Math.PI * 80;
        const offset = circumference - (circumference * percentage) / 100;

        progress.style.strokeDashoffset = offset;

        // Animate number
        let current = 300;
        const increment = (score - 300) / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                current = score;
                clearInterval(timer);
            }
            value.textContent = Math.round(current);
        }, 20);
    }
}

// Trigger score animation when in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateScore(720);
            observer.unobserve(entry.target);
        }
    });
});

const scoreSection = document.querySelector('.score-circle');
if (scoreSection) {
    observer.observe(scoreSection);
}

// Calculate TFA Scoring Demo
function calculateScore() {
    const income = parseInt(document.getElementById('income')?.value) || 0;
    const employment = parseInt(document.getElementById('employment')?.value) || 0;
    const loans = parseInt(document.getElementById('loans')?.value) || 0;
    const digital = parseInt(document.getElementById('digital')?.value) || 0;

    // Enhanced scoring algorithm
    let baseScore = 500;

    // Income factor (more granular)
    if (income >= 100000000) baseScore += 150;
    else if (income >= 50000000) baseScore += 120;
    else if (income >= 30000000) baseScore += 90;
    else if (income >= 20000000) baseScore += 60;
    else if (income >= 10000000) baseScore += 30;
    else baseScore += Math.floor(income / 1000000);

    // Employment factor
    baseScore += Math.min(employment * 20, 100);

    // Loan factor (penalize multiple loans)
    if (loans === 0) baseScore += 50;
    else if (loans === 1) baseScore += 20;
    else if (loans === 2) baseScore -= 10;
    else baseScore -= loans * 25;

    // Digital activity factor
    baseScore += Math.floor(digital * 1.5);

    // Ensure score is within range
    baseScore = Math.max(300, Math.min(850, baseScore));

    // Update results with animation
    const resultScore = document.getElementById('resultScore');
    if (resultScore) resultScore.textContent = Math.round(baseScore);

    // Detect language from document lang attribute or current page
    const isJapanese = document.documentElement.lang === 'ja' || 
                      window.location.pathname.includes('-jp.html');

    // Risk level with color coding (Japanese or English)
    let risk, eligibility;
    let riskColor = '#ef4444';
    let eligibilityColor = '#ef4444';

    if (isJapanese) {
        // Japanese translations
        risk = '高い';
        eligibility = '条件不足';

        if (baseScore >= 750) {
            risk = '非常に低い';
            riskColor = '#10b981';
        } else if (baseScore >= 700) {
            risk = '低い';
            riskColor = '#3b82f6';
        } else if (baseScore >= 600) {
            risk = '普通';
            riskColor = '#f59e0b';
        }

        if (baseScore >= 650) {
            eligibility = '条件満たし';
            eligibilityColor = '#10b981';
        } else if (baseScore >= 550) {
            eligibility = '条件付き検討';
            eligibilityColor = '#f59e0b';
        }
    } else {
        // English translations
        risk = 'High';
        eligibility = 'Not Eligible';

        if (baseScore >= 750) {
            risk = 'Very Low';
            riskColor = '#10b981';
        } else if (baseScore >= 700) {
            risk = 'Low';
            riskColor = '#3b82f6';
        } else if (baseScore >= 600) {
            risk = 'Medium';
            riskColor = '#f59e0b';
        }

        if (baseScore >= 650) {
            eligibility = 'Eligible';
            eligibilityColor = '#10b981';
        } else if (baseScore >= 550) {
            eligibility = 'Conditional Review';
            eligibilityColor = '#f59e0b';
        }
    }

    const riskElement = document.getElementById('resultRisk');
    if (riskElement) {
        riskElement.textContent = risk;
        riskElement.style.color = riskColor;
    }

    const eligibilityElement = document.getElementById('resultEligibility');
    if (eligibilityElement) {
        eligibilityElement.textContent = eligibility;
        eligibilityElement.style.color = eligibilityColor;
    }

    // Interest rate (Japanese or English)
    let rate;
    if (isJapanese) {
        rate = '18-20%/年';
        if (baseScore >= 750) rate = '8-10%/年';
        else if (baseScore >= 700) rate = '10-12%/年';
        else if (baseScore >= 650) rate = '12-15%/年';
        else if (baseScore >= 600) rate = '15-18%/年';
    } else {
        rate = '18-20%/year';
        if (baseScore >= 750) rate = '8-10%/year';
        else if (baseScore >= 700) rate = '10-12%/year';
        else if (baseScore >= 650) rate = '12-15%/year';
        else if (baseScore >= 600) rate = '15-18%/year';
    }
    const resultRate = document.getElementById('resultRate');
    if (resultRate) resultRate.textContent = rate;

    // Credit limit
    let limit = 'N/A';
    if (baseScore >= 550) {
        const baseLimit = Math.floor(income * 5);
        const scoreMultiplier = (baseScore - 300) / 550;
        const creditLimit = Math.floor(baseLimit * scoreMultiplier);
        limit = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(creditLimit);
    }
    const resultLimit = document.getElementById('resultLimit');
    if (resultLimit) resultLimit.textContent = limit;

    // Add animation to results
    document.querySelectorAll('.result-card').forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s`;
        }, 10);
    });
}

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // Match links that reference the section via fragment-only or full path + fragment
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href$="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection observer for fade-in animations
const fadeElements = document.querySelectorAll('.stat-card, .service-card, .use-case-card, .arch-layer');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Dropdown functionality (desktop + mobile collapse)
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    function setDropdown(open) {
        if (!dropdown) return;
        // Support both legacy `.active` and new `.open` states
        dropdown.classList.toggle('open', !!open);
        dropdown.classList.toggle('active', !!open);
        if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (dropdown && dropdownToggle && dropdownMenu) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open') || dropdown.classList.contains('active');
            setDropdown(!isOpen);
        });

        // Close dropdown when clicking outside (but ignore hero CTA clicks)
        document.addEventListener('click', function (e) {
            const clickedInsideDropdown = e.target.closest('.dropdown');
            if (!clickedInsideDropdown) {
                setDropdown(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setDropdown(false);
        });

        // Close dropdown when clicking on dropdown links
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function () {
                setDropdown(false);
            });
        });

        // Bind hero CTA button to open Products dropdown
        const heroProductBtn = document.querySelector('.hero-cta .cta-button[href="#"]');
        if (heroProductBtn) {
            heroProductBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof e.stopImmediatePropagation === 'function') {
                    e.stopImmediatePropagation();
                }
                setDropdown(true);
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    const toggleBtn = document.querySelector('.nav-toggle-btn');
    const links = document.querySelectorAll('.nav-links a');
    const dropdownToggleLink = document.querySelector('.dropdown .dropdown-toggle');
    const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu .dropdown-link');

    function closeMenu() {
        if (nav) nav.classList.remove('is-open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const opened = nav?.classList.toggle('is-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
        });
    }

    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            const inDropdown = a.closest('.dropdown');
            const isDropdownToggle = a.classList.contains('dropdown-toggle');
            const isDropdownItem = a.classList.contains('dropdown-link');
            // Do NOT close the drawer when toggling the Products dropdown
            if (inDropdown && isDropdownToggle) {
                // Let the dedicated dropdown handler manage open/close
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            // Close drawer when selecting a regular nav item or dropdown item
            if (!inDropdown || isDropdownItem) {
                closeMenu();
            }
        });
    });

    // Ensure selecting any dropdown item also closes the drawer
    dropdownMenuLinks.forEach(function (item) {
        item.addEventListener('click', function () {
            closeMenu();
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (e) {
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !navContainer.contains(e.target)) {
            closeMenu();
        }
    });
});