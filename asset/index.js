let currentQuestion = 0;
let totalQuestions = 5;
let assessmentData = {};
let totalScore = 0;

function startAssessment() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('assessmentScreen').classList.remove('hidden');
    showQuestion(1);
    updateProgress();
}

function showQuestion(questionNum) {
    // Hide all questions
    document.querySelectorAll('.assessment-question').forEach(q => {
        q.classList.add('hidden');
    });

    // Show current question
    document.getElementById(`question${questionNum}`).classList.remove('hidden');

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (questionNum === 1) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (questionNum === totalQuestions) {
        nextBtn.textContent = 'Lihat Hasil';
    } else {
        nextBtn.textContent = 'Selanjutnya';
    }

    // Show next button only if current question is answered
    const questionKey = getQuestionKey(questionNum);
    if (assessmentData[questionKey] !== undefined) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.add('hidden');
    }
}

function getQuestionKey(questionNum) {
    const keys = ['dyspnea', 'chest_pain', 'heart_rate', 'swelling', 'other_symptoms'];
    return keys[questionNum - 1];
}

function selectSymptom(element, symptom, score) {
    // Remove selection from other options
    element.parentNode.querySelectorAll('.symptom-card').forEach(card => {
        card.classList.remove('selected');
        card.classList.add('border-gray-200');
    });

    // Select current option
    element.classList.add('selected');
    element.classList.remove('border-gray-200');

    // Store assessment data
    assessmentData[symptom] = score;

    // Show next button
    document.getElementById('nextBtn').classList.remove('hidden');

    // Auto advance after short delay for better UX
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            nextQuestion();
        } else {
            showResults();
        }
    }, 800);
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProgress();
    }
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = currentQuestion + '/' + totalQuestions;
}

function calculateTotalScore() {
    totalScore = 0;
    for (let key in assessmentData) {
        totalScore += assessmentData[key];
    }
    return totalScore;
}

function getRiskLevel(score) {
    if (score <= 3) return 'low';
    if (score <= 8) return 'medium';
    return 'high';
}

function showResults() {
    document.getElementById('assessmentScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');

    const score = calculateTotalScore();
    const riskLevel = getRiskLevel(score);

    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const resultDescription = document.getElementById('resultDescription');
    const recommendations = document.getElementById('recommendations');

    // Update progress to 100%
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('progressText').textContent = '5/5';

    scoreDisplay.textContent = score;

    if (riskLevel === 'low') {
        resultIcon.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-low';
        resultTitle.textContent = 'Risiko Rendah';
        resultDescription.innerHTML = `
                    <p class="text-sm">Berdasarkan assessment ini, kondisi jantung Anda menunjukkan risiko yang rendah. Gejala yang Anda alami masih dalam batas normal atau minimal.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">✓</span>
                        <span>Pertahankan gaya hidup sehat dengan olahraga teratur</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">✓</span>
                        <span>Konsumsi makanan bergizi seimbang, batasi garam dan lemak</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">✓</span>
                        <span>Rutin check-up kesehatan setahun sekali</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">✓</span>
                        <span>Hindari merokok dan konsumsi alkohol berlebihan</span>
                    </li>
                `;
    } else if (riskLevel === 'medium') {
        resultIcon.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-medium';
        resultTitle.textContent = 'Risiko Sedang';
        resultDescription.innerHTML = `
                    <p class="text-sm">Assessment menunjukkan beberapa gejala yang perlu mendapat perhatian. Kondisi ini memerlukan monitoring lebih ketat dan kemungkinan evaluasi medis.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-yellow-500 mr-2">⚠</span>
                        <span>Konsultasikan dengan dokter dalam 1-2 minggu</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-500 mr-2">⚠</span>
                        <span>Monitor gejala harian dan catat perubahan</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-500 mr-2">⚠</span>
                        <span>Kurangi aktivitas berat yang memicu gejala</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-500 mr-2">⚠</span>
                        <span>Pertimbangkan pemeriksaan EKG dan echocardiografi</span>
                    </li>
                `;
    } else {
        resultIcon.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-high';
        resultTitle.textContent = 'Risiko Tinggi';
        resultDescription.innerHTML = `
                    <p class="text-sm"><strong>Perhatian:</strong> Gejala yang Anda alami menunjukkan risiko tinggi dan memerlukan evaluasi medis segera. Jangan tunda untuk berkonsultasi dengan dokter.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">⚠</span>
                        <span><strong>Segera konsultasi dengan dokter spesialis jantung</strong></span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">⚠</span>
                        <span>Hindari aktivitas berat sampai mendapat clearance medis</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">⚠</span>
                        <span>Siapkan daftar obat dan riwayat medis untuk konsultasi</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">⚠</span>
                        <span>Jika gejala memburuk, segera ke unit gawat darurat</span>
                    </li>
                `;
    }
}

function resetAssessment() {
    currentQuestion = 0;
    assessmentData = {};
    totalScore = 0;

    // Reset all selections
    document.querySelectorAll('.symptom-card').forEach(card => {
        card.classList.remove('selected');
        card.classList.add('border-gray-200');
    });

    // Show welcome screen
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');

    // Reset progress
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0/5';
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    currentQuestion = 0;
});