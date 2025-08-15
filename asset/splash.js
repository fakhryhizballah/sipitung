// Initialize with splash screen
document.addEventListener('DOMContentLoaded', function () {
    currentQuestion = 0;
    showSplashScreen();
});

function showSplashScreen() {
    // Hide main content initially
    document.getElementById('splashScreen').style.display = 'flex';

    // Auto hide splash screen after 3 seconds
    setTimeout(() => {
        hideSplashScreen();
    }, 3000);

    // Also allow click to skip
    document.getElementById('splashScreen').addEventListener('click', hideSplashScreen);
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.style.animation = 'fadeOut 0.5s ease-out forwards';

    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 500);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
document.head.appendChild(style);