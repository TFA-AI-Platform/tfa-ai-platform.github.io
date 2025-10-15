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

// Initialize particle background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        new ParticleBackground();
        initLazyLoading();
    });
} else {
    // DOM is already ready
    new ParticleBackground();
    initLazyLoading();
}

// Lazy loading for images - improves initial page load
function initLazyLoading() {
    // Use native lazy loading for images
    const images = document.querySelectorAll('img[src*="/assets/img/"]');
    images.forEach(img => {
        // Skip images that are above the fold or critical
        const rect = img.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight;
        const isCritical = img.closest('.navbar') || img.classList.contains('navbar-logo');
        
        if (!isAboveFold && !isCritical && !img.loading) {
            img.loading = 'lazy';
        }
    });
}

// Ant Design inspired slider functionality
class AntSlider {
    constructor(element, options = {}) {
        this.element = element;
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.value = options.value || 75;
        this.step = options.step || 1;

        this.rail = element.querySelector('.ant-slider-rail');
        this.track = element.querySelector('.ant-slider-track');
        this.handle = element.querySelector('.ant-slider-handle');

        this.isDragging = false;
        this.init();
    }

    init() {
        this.updateSlider(this.value);
        this.bindEvents();
    }

    bindEvents() {
        this.handle.addEventListener('mousedown', this.startDrag.bind(this));
        this.rail.addEventListener('click', this.handleRailClick.bind(this));
        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));

        // Touch events for mobile
        this.handle.addEventListener('touchstart', this.startDrag.bind(this));
        this.rail.addEventListener('touchstart', this.handleRailClick.bind(this));
        document.addEventListener('touchmove', this.onDrag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));
    }

    startDrag(e) {
        e.preventDefault();
        this.isDragging = true;
        this.handle.style.cursor = 'grabbing';
    }

    endDrag(e) {
        if (this.isDragging) {
            this.isDragging = false;
            this.handle.style.cursor = 'grab';
        }
    }

    onDrag(e) {
        if (!this.isDragging) return;

        const rect = this.rail.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);

        if (clientX) {
            const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const newValue = Math.round(this.min + percentage * (this.max - this.min));
            this.setValue(newValue);
        }
    }

    handleRailClick(e) {
        if (this.isDragging) return;

        const rect = this.rail.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);

        if (clientX) {
            const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const newValue = Math.round(this.min + percentage * (this.max - this.min));
            this.setValue(newValue);
        }
    }

    setValue(value) {
        this.value = Math.max(this.min, Math.min(this.max, value));
        this.updateSlider(this.value);

        // Trigger custom event
        const event = new CustomEvent('sliderChange', {
            detail: { value: this.value }
        });
        this.element.dispatchEvent(event);
    }

    updateSlider(value) {
        const percentage = ((value - this.min) / (this.max - this.min)) * 100;

        this.track.style.width = `${percentage}%`;
        this.handle.style.left = `${percentage}%`;
    }
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function () {
    const sliderElement = document.getElementById('antSlider');
    if (sliderElement) {
        const slider = new AntSlider(sliderElement, {
            min: 0,
            max: 100,
            value: 75
        });

        // Listen for slider changes
        sliderElement.addEventListener('sliderChange', function (e) {
            const value = e.detail.value;
            document.getElementById('digitalValue').textContent = value;
        });
    }
});

// Calculate TFA Scoring Demo
function calculateScore() {
    const income = parseInt(document.getElementById('income')?.value) || 0;
    const employment = parseInt(document.getElementById('employment')?.value) || 0;
    const loans = parseInt(document.getElementById('loans')?.value) || 0;
    const digital = parseInt(document.getElementById('digitalValue')?.textContent) || 0;

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
            riskColor = '#4CAF50';
        } else if (baseScore >= 700) {
            risk = '低い';
            riskColor = '#3b82f6';
        } else if (baseScore >= 600) {
            risk = '普通';
            riskColor = '#f59e0b';
        }

        if (baseScore >= 650) {
            eligibility = '条件満たし';
            eligibilityColor = '#4CAF50';
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
            riskColor = '#4CAF50';
        } else if (baseScore >= 700) {
            risk = 'Low';
            riskColor = '#3b82f6';
        } else if (baseScore >= 600) {
            risk = 'Medium';
            riskColor = '#f59e0b';
        }

        if (baseScore >= 650) {
            eligibility = 'Eligible';
            eligibilityColor = '#4CAF50';
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

    // Add fade-in effect to results
    document.querySelectorAll('.result-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate__animated', 'animate__fadeInUp');
        }, index * 100);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/assets/js/service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg.scope))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}