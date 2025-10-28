let currentQuestion2 = 0;
let totalQuestions2 = 5;
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

    if (questionNum === totalQuestions2) {
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
        if (currentQuestion2 < totalQuestions2) {
            nextQuestion2();
        } else {
            resultsAssessmentScreen();
        }
    }, 800);
}

function nextQuestion2() {
    if (currentQuestion2 < totalQuestions2) {
        currentQuestion2++;
        showQuestion(currentQuestion2);
        updateProgress();
    } else {
        resultsAssessmentScreen();
    }
}

function previousQuestion2() {
    if (currentQuestion2 > 1) {
        currentQuestion2--;
        showQuestion(currentQuestion2);
        updateProgress();
    }
}

function updateProgress() {
    const progress = (currentQuestion2 / totalQuestions2) * 100;
    document.getElementById('progressBarAssessment').style.width = progress + '%';
    document.getElementById('progressText').textContent = currentQuestion2 + '/' + totalQuestions2;
}
function calculateTotalScore() {
    totalScore = 0;
    for (let key in assessmentData) {
        totalScore += assessmentData[key];
    }
    return totalScore;
}

function getRiskLevelAssessment(score) {
    if (score <= 0) return 'none';
    if (score <= 5) return 'low';
    if (score <= 10) return 'medium';
    return 'high';
}

function resultsAssessmentScreen() {
    document.getElementById('assessmentScreen').classList.add('hidden');
    document.getElementById('resultsAssessmentScreen').classList.remove('hidden');
    const scoreAssessment = calculateTotalScore();
    if (scoreAssessment > 15) {
        scoreAssessment = 15
    }
    const riskLevelAssessment = getRiskLevelAssessment(scoreAssessment);
    console.log('Risk Level Assessment:', riskLevelAssessment);
    console.log('Risk Level Assessment:', scoreAssessment);

    const resultIconAssessment = document.getElementById('resultIconAssessment');
    const resultTitleAssessment = document.getElementById('resultTitleAssessment');
    const scoreDisplayAssessment = document.getElementById('scoreDisplayAssessment');
    const resultDescriptionAssessment = document.getElementById('resultDescriptionAssessment');
    const recommendations = document.getElementById('recommendationsAssessment');

    // Update progress to 100%
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('progressText').textContent = '5/5';

    scoreDisplayAssessment.textContent = scoreAssessment;
    if (riskLevelAssessment === 'none') {
        resultIconAssessment.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-low';
        resultTitleAssessment.textContent = 'Risiko RINGAN';
        resultDescriptionAssessment.innerHTML = `
                    <p class="text-sm">Berdasarkan assessment ini, kondisi jantung Anda menunjukkan <strong>risiko ringan</strong>. Gejala yang Anda alami masih dalam kategori ringan dan dapat dikelola dengan baik.</p>
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
                        <span>Rutin check-up kesehatan sesuai jadwal dokter</span>
                    </li>
                `;
    } else if (riskLevelAssessment === 'low') {
        resultIconAssessment.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-low';
        resultTitleAssessment.textContent = 'Risiko RINGAN';
        resultDescriptionAssessment.innerHTML = `
                    <p class="text-sm">Berdasarkan assessment ini, kondisi jantung Anda menunjukkan <strong>risiko ringan</strong>. Gejala yang Anda alami masih dalam kategori ringan dan dapat dikelola dengan baik.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">📋</span>
                        <span><strong>Jika mengganggu, bisa ke poli rawat jalan/sesuai jadwal kontrol</strong></span>
                    </li>
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
                        <span>Rutin check-up kesehatan sesuai jadwal dokter</span>
                    </li>
                `;
    } else if (riskLevelAssessment === 'medium') {
        resultIconAssessment.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-medium';
        resultTitleAssessment.textContent = 'Risiko SEDANG';
        resultDescriptionAssessment.innerHTML = `
                    <p class="text-sm">Assessment menunjukkan <strong>risiko sedang</strong> yang memerlukan perhatian medis. Beberapa gejala yang Anda alami perlu dievaluasi lebih lanjut oleh dokter.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-yellow-600 mr-2">🏥</span>
                        <span><strong>Rawat Jalan - Segera konsultasi ke dokter</strong></span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-600 mr-2">📝</span>
                        <span>Catat dan monitor gejala yang dialami setiap hari</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-600 mr-2">⚠</span>
                        <span>Batasi aktivitas yang memicu atau memperburuk gejala</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-yellow-600 mr-2">🔍</span>
                        <span>Siapkan untuk pemeriksaan lanjutan (EKG, Echo, Lab)</span>
                    </li>
                `;
    } else {
        resultIconAssessment.className = 'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 risk-high';
        resultTitleAssessment.textContent = 'Risiko BERAT';
        resultDescriptionAssessment.innerHTML = `
                    <p class="text-sm"><strong>PERHATIAN:</strong> Assessment menunjukkan <strong>risiko berat</strong>. Gejala yang Anda alami memerlukan evaluasi dan penanganan medis segera di unit gawat darurat.</p>
                `;
        recommendations.innerHTML = `
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">🚨</span>
                        <span><strong>IGD - SEGERA ke Unit Gawat Darurat</strong></span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">🚫</span>
                        <span>HINDARI aktivitas fisik sampai mendapat penanganan medis</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">📱</span>
                        <span>Siapkan kontak darurat dan informasi medis penting</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-red-500 mr-2">⚡</span>
                        <span>Jika gejala memburuk, SEGERA hubungi 112 atau ke IGD terdekat</span>
                    </li>
                `;
    }
}

function resetAssessment() {
    currentQuestion2 = 0;
    assessmentData = {};
    totalScore = 0;

    // Reset all selections
    document.querySelectorAll('.symptom-card').forEach(card => {
        card.classList.remove('selected');
        card.classList.add('border-gray-200');
    });

    // Show welcome screen
    document.getElementById('resultsAssessmentScreen').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');

    // Reset progress
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0/5';
}
