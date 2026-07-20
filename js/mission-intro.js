/* ==========================================
       HỆ THỐNG TRẠM KHỞI ĐỘNG (NHIỆM VỤ 1)
=========================================== */

function getEnergyElements() {
    return {
        fill: document.getElementById('energyFill'),
        percent: document.getElementById('energyPercent')
    };
}

function getOrCreateScratchIframe() {
    let iframe = document.getElementById('scratchGameIframe');
    if (!iframe) {
        const wrapper = document.querySelector('.scratch-iframe-wrapper');
        if (wrapper) {
            iframe = document.createElement('iframe');
            iframe.id = 'scratchGameIframe';
            iframe.setAttribute('allowfullscreen', 'true');
            wrapper.appendChild(iframe);
        }
    }
    return iframe;
}

function exitScratchMission() {
    stopAllWizardVoices();
    const bgM = document.getElementById('bgMusic');
    if (bgM) {
        bgM.pause();
        bgM.currentTime = 0;
    }
    const iframe = document.getElementById('scratchGameIframe');
    if (iframe) {
        iframe.remove();
    }
    const popup = document.getElementById('scratchLocalPopup');
    if (popup) {
        popup.style.display = 'none';
    }
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    checkAndRestoreFullscreen();
}

function goToScratchMission() {
    document.getElementById('scratchLocalPopup').style.display = 'flex';
    const iframe = getOrCreateScratchIframe();
    if (iframe) {
        iframe.src = "";
    }
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }

    const energy = getEnergyElements();
    if (energy.fill) {
        energy.fill.style.width = "15%";
        energy.fill.style.background = "linear-gradient(90deg, #ef4444, #f97316)";
    }
    if (energy.percent) {
        energy.percent.innerText = "15";
    }

    const btn = document.getElementById('actionBtn1');
    if (btn) {
        btn.innerHTML = "BẬT LOA VÀ NGHE";
        btn.className = "game-btn";
        btn.onclick = startIntro;
    }

    changeSubStep(1);
}

function startIntro() {
    const bgM = document.getElementById('bgMusic');
    const v1 = document.getElementById('voiceStep1');
    const btn = document.getElementById('actionBtn1');

    if (bgM) {
        bgM.volume = 0.15;
        bgM.play().catch(e => { console.log("Bỏ qua lỗi tự động phát nhạc nền"); });
    }

    const startGame = () => {
        if (v1) {
            v1.pause();
            v1.currentTime = 0;
            v1.onended = null;
        }
        const iframe = getOrCreateScratchIframe();
        if (iframe) {
            iframe.src = "https://turbowarp.org/1311797116/embed?autoplay=1";
        }
        changeSubStep(2);
    };

    if (v1) {
        v1.play().catch(e => console.log("Lỗi âm thanh thông báo:", e));
        
        btn.innerHTML = "BẮT ĐẦU CHƠI GAME";
        btn.className = "game-btn btn-green";
        btn.onclick = startGame;
 
        v1.onended = () => {
            btn.innerHTML = "BẮT ĐẦU CHƠI GAME";
            btn.className = "game-btn btn-green";
            btn.onclick = startGame;
        };
    } else {
        startGame();
    }
}

function finishGame() {
    const iframe = document.getElementById('scratchGameIframe');
    if (iframe) {
        iframe.remove();
    }
    
    const energy = getEnergyElements();
    if (energy.fill) {
        energy.fill.style.width = "100%";
        energy.fill.style.background = "linear-gradient(90deg, #22c55e, #4ade80)";
    }

    let count = 15;
    let timer = setInterval(() => {
        count++;
        if (energy.percent) {
            energy.percent.innerText = count;
        }
        if (count >= 100) clearInterval(timer);
    }, 15);

    setTimeout(() => changeSubStep(3), 1000);
}

function changeSubStep(n) {
    document.querySelectorAll('.wizard-container .wizard-step').forEach(s => s.style.display = 'none');
    const targetStep = document.getElementById('subStep' + n);
    if (targetStep) targetStep.style.display = 'flex';

    const v3 = document.getElementById('voiceStep3');
    const v4 = document.getElementById('voiceStep4');

    if (v3 && v4) {
        v3.pause();
        v3.currentTime = 0;
        v4.pause();
        v4.currentTime = 0;

        if (n === 3) v3.play().catch(e => {});
        if (n === 4) v4.play().catch(e => {});
    }
}

function sendToMotherShip() {
    stopAllWizardVoices();
    const bgM = document.getElementById('bgMusic');

    if (bgM) {
        bgM.pause();
        bgM.currentTime = 0;
    }

    localStorage.setItem('scratch_b1_s1', 'done');
    localStorage.setItem('score_b1_s1', '100'); 
    
    if (typeof checkAndRenderSteps === 'function') {
        checkAndRenderSteps();
    }
    
    document.getElementById('scratchLocalPopup').style.display = 'none';
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    checkAndRestoreFullscreen();
}

function stopAllWizardVoices() {
    const v1 = document.getElementById('voiceStep1');
    const v3 = document.getElementById('voiceStep3');
    const v4 = document.getElementById('voiceStep4');

    if (v1) { v1.pause(); v1.currentTime = 0; }
    if (v3) { v3.pause(); v3.currentTime = 0; }
    if (v4) { v4.pause(); v4.currentTime = 0; }
}
