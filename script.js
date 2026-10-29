document.addEventListener('DOMContentLoaded', () => {

    // 1. Skill Filtering Logic
    const filterBtns = document.querySelectorAll('#skillFilterBadges button');
    const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Academic Impact Chart
    const impactChartCanvas = document.getElementById('impactChart');
    if (impactChartCanvas) {
        const ctx = impactChartCanvas.getContext('2d');
        
        // Gradient backgrounds
        const gradientPub = ctx.createLinearGradient(0, 0, 0, 300);
        gradientPub.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
        gradientPub.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        const gradientSub = ctx.createLinearGradient(0, 0, 0, 300);
        gradientSub.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
        gradientSub.addColorStop(1, 'rgba(245, 158, 11, 0.0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2022', '2023', '2024', '2025', '2026', '2027'],
                datasets: [
                    {
                        label: 'Publications',
                        data: [0, 0, 1, 2, 6, ],
                        borderColor: '#10b981',
                        backgroundColor: gradientPub,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#34d399',
                        pointRadius: 4
                    },
                    {
                        label: 'Submissions',
                        data: [0, 1, 2, 4, 8, ],
                        borderColor: '#f59e0b',
                        backgroundColor: gradientSub,
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointBackgroundColor: '#fbbf24',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        labels: { 
                            color: '#94a3b8', 
                            font: { family: 'Plus Jakarta Sans' },
                            usePointStyle: true,
                            boxWidth: 8
                        } 
                    }
                },
                scales: {
                    x: { 
                        ticks: { color: '#64748b' }, 
                        grid: { color: 'rgba(255, 255, 255, 0.05)' } 
                    },
                    y: { 
                        ticks: { color: '#64748b', stepSize: 1 }, 
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }
    

    // 3. Contact Form Event
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Thank you! Your inquiry has been sent directly to my email.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem sending your message. Please try again.');
                }
            } catch (error) {
                alert('Error connecting to the mail service. Please try again later.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Inquiry';
                }
            }
        });
    }

    // 4. Interactive Neural Canvas Network Background
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        const c = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        }));

        function animateCanvas() {
            c.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                c.beginPath();
                c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                c.fillStyle = 'rgba(99, 241, 135, 0.6)';
                c.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 130) {
                        c.beginPath();
                        c.moveTo(p.x, p.y);
                        c.lineTo(p2.x, p2.y);
                        c.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 130})`;
                        c.lineWidth = 0.5;
                        c.stroke();
                    }
                }
            });

            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

});

//connect API KEY
fetch('https://api.github.com/users/YOUR_AME/re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posGITHUB_USERN')
    .then(response => response.json())
    .then(data => console.log(data));