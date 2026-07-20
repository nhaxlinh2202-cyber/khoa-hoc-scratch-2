/* ==========================================
       HỆ THỐNG TRẠM LÝ THUYẾT: QUIZ (NHIỆM VỤ 3)
=========================================== */

function goToTheoryMission() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'flex';
    
    const iframe = document.getElementById('kahootIframe');
    if (iframe) {
        iframe.src = "https://wayground.com/embed/quiz/6a5dad25202a05be4b1258b3";
    }
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }
}

function closeLocalTheory() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'none';
    
    const iframe = document.getElementById('kahootIframe');
    if (iframe) {
        iframe.src = "";
    }
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    checkAndRestoreFullscreen();
}

function finishAllTheory() {
    localStorage.setItem('scratch_b1_s3', 'done');
    localStorage.setItem('score_b1_s3', '100');
    
    if (typeof checkAndRenderSteps === 'function') {
        checkAndRenderSteps();
    }
    
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'none';
    
    const iframe = document.getElementById('kahootIframe');
    if (iframe) {
        iframe.src = "";
    }
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    
    if (typeof showCustomAlert === 'function') {
        showCustomAlert("🎉 Siêu đỉnh luôn! Con đã vượt qua Đấu trường lý thuyết rồi. Nhiệm vụ số 4 cuối cùng đã sẵn sàng!");
    }
    checkAndRestoreFullscreen();
}
