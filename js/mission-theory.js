/* ==========================================
       HỆ THỐNG TRẠM LÝ THUYẾT: KAHOOT (NHIỆM VỤ 3)
=========================================== */

function goToTheoryMission() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'flex';
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }
}

function openKahootInNewTab() {
    window.open("https://kahoot.it/challenge/06310845", "_blank");
}

function closeLocalTheory() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'none';
    
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
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    
    if (typeof showCustomAlert === 'function') {
        showCustomAlert("🎉 Siêu đỉnh luôn! Con đã vượt qua Đấu trường lý thuyết Kahoot rồi. Nhiệm vụ số 4 cuối cùng đã sẵn sàng!");
    }
    checkAndRestoreFullscreen();
}
