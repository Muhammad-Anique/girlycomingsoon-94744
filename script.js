'use strict';

/**
 * GirlyComingSoon - Main Script
 * Handles Countdown Timer, Email Validation, and Heart Confetti
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const LAUNCH_DATE = new Date();
    LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 14); // Set launch to 14 days from now

    // --- DOM Elements ---
    const countdownEls = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    const waitlistForm = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    const waitlistCard = document.getElementById('waitlist-card');
    const successState = document.getElementById('success-state');
    const resetBtn = document.getElementById('reset-form');
    const confettiContainer = document.getElementById('confetti-container');

    // --- 1. Countdown Timer Logic ---
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = LAUNCH_DATE - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            Object.values(countdownEls).forEach(el => el.textContent = '00');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEls.days.textContent = String(days).padStart(2, '0');
        countdownEls.hours.textContent = String(hours).padStart(2, '0');
        countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
        countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- 2. Form Validation & Lead Capture ---
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValue = emailInput.value.trim();

        if (validateEmail(emailValue)) {
            // Success Logic
            errorMessage.classList.add('hidden');
            
            // Simulate saving to database/localStorage
            const subscribers = JSON.parse(localStorage.getItem('girly_subscribers') || '[]');
            subscribers.push({ email: emailValue, date: new Date().toISOString() });
            localStorage.setItem('girly_subscribers', JSON.stringify(subscribers));

            // UI Transition
            waitlistCard.classList.add('hidden');
            successState.classList.remove('hidden');
            
            // Trigger Magic
            spawnHeartConfetti();
        } else {
            // Error Logic
            errorMessage.classList.remove('hidden');
            emailInput.focus();
        }
    });

    resetBtn.addEventListener('click', () => {
        successState.classList.add('hidden');
        waitlistCard.classList.remove('hidden');
        waitlistForm.reset();
    });

    // --- 3. Heart Confetti Enhancement (P2) ---
    function spawnHeartConfetti() {
        const heartIcons = ['💖', '💗', '💓', '✨', '🌸'];
        const count = 50;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-confetti';
            heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            // Randomize positioning and animation
            const startX = Math.random() * 100; // 0 to 100vw
            const delay = Math.random() * 3;
            const duration = 2 + Math.random() * 3;
            const size = 15 + Math.random() * 20;

            heart.style.left = `${startX}vw`;
            heart.style.top = `-5vh`;
            heart.style.fontSize = `${size}px`;
            heart.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            heart.style.opacity = 0.5 + Math.random();

            confettiContainer.appendChild(heart);

            // Cleanup DOM
            setTimeout(() => {
                heart.remove();
            }, (delay + duration) * 1000);
        }
    }

    // --- 4. Smooth Interaction & Hover Logging ---
    // Log for debugging (simulating analytics)
    console.log("GirlyComingSoon: Script initialized. Ready for launch! ✨");
});