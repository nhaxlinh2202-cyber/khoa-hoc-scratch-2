/* ==========================================
       HỆ THỐNG TRẠM LÝ THUYẾT: KAHOOT (NHIỆM VỤ 3)
=========================================== */

function goToTheoryMission() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'flex';
    
    let iframe = document.getElementById('kahootIframe');
    if (!iframe) {
        const container = document.querySelector('.kahoot-container');
        if (container) {
            iframe = document.createElement('iframe');
            iframe.id = 'kahootIframe';
            iframe.scrolling = 'no';
            iframe.frameBorder = '0';
            iframe.marginHeight = '0';
            iframe.marginWidth = '0';
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('allow', 'autoplay');
            container.appendChild(iframe);
        }
    }
    
    if (iframe) iframe.src = "https://kahoot.it/challenge/06310845?embed=true";
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }
}

function closeLocalTheory() {
    const popup = document.getElementById('theoryLocalPopup');
    if (popup) popup.style.display = 'none';
    
    const iframe = document.getElementById('kahootIframe');
    if (iframe) {
        iframe.remove();
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
        iframe.remove();
    }
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    
    if (typeof showCustomAlert === 'function') {
        showCustomAlert("🎉 Siêu đỉnh luôn! Con đã vượt qua Đấu trường lý thuyết Kahoot rồi. Nhiệm vụ số 4 cuối cùng đã sẵn sàng!");
    }
    checkAndRestoreFullscreen();
}
