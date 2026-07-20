/* ==========================================
       HỆ THỐNG VIDEO H5P (NHIỆM VỤ 2)
=========================================== */

function goToH5PSection(embedUrl) {
    const popup = document.getElementById('h5pLocalPopup');
    
    let iframe = document.getElementById('localH5pIframe');
    if (!iframe) {
        const container = document.querySelector('.h5p-iframe-container');
        if (container) {
            iframe = document.createElement('iframe');
            iframe.id = 'localH5pIframe';
            iframe.name = 'h5player';
            iframe.className = 'h5p-player-iframe';
            iframe.frameBorder = '0';
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('allow', 'autoplay; fullscreen');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            container.appendChild(iframe);
        }
    }

    if (iframe) iframe.src = embedUrl;
    if (popup) popup.style.display = 'flex';
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }

    let alreadyDone = localStorage.getItem('scratch_b1_s2') === 'done';
    if (!alreadyDone) {
        // Giả lập theo dõi xem bài giảng của học viên nhí trong 10 giây
        setTimeout(function() {
            const currentPopup = document.getElementById('h5pLocalPopup');
            if (currentPopup && currentPopup.style.display === 'flex') {
                localStorage.setItem('scratch_b1_s2', 'done');
                localStorage.setItem('score_b1_s2', '100');
                
                if (typeof checkAndRenderSteps === 'function') {
                    checkAndRenderSteps();
                }
                
                if (typeof showCustomAlert === 'function') {
                    showCustomAlert("🎉 Chúc mừng chiến binh vũ trụ! Con đã xem xong video bài giảng. Hãy tiếp tục khám phá trạm Lý Thuyết Kahoot nhé!");
                }
            }
        }, 10000);
    }
}

function closeH5PMission() {
    const popup = document.getElementById('h5pLocalPopup');
    if (popup) popup.style.display = 'none';
    
    const iframe = document.getElementById('localH5pIframe');
    if (iframe) {
        iframe.remove();
    }
    
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    checkAndRestoreFullscreen();
}

function finishH5PMission() {
    localStorage.setItem('scratch_b1_s2', 'done');
    localStorage.setItem('score_b1_s2', '100');
    if (typeof checkAndRenderSteps === 'function') {
        checkAndRenderSteps();
    }
    if (typeof showCustomAlert === 'function') {
        showCustomAlert("🎉 Chúc mừng chiến binh vũ trụ! Con đã xem xong video bài giảng. Hãy tiếp tục khám phá trạm Lý Thuyết Kahoot nhé!");
    }
    closeH5PMission();
}

function expandH5P() {
    const popup = document.getElementById('h5pLocalPopup');
    if (!popup) return;

    const isPopupFS = (document.fullscreenElement === popup || 
                       document.webkitFullscreenElement === popup || 
                       document.mozFullScreenElement === popup || 
                       document.msFullscreenElement === popup);

    if (!isPopupFS) {
        if (popup.requestFullscreen) {
            popup.requestFullscreen();
        } else if (popup.mozRequestFullScreen) {
            popup.mozRequestFullScreen();
        } else if (popup.webkitRequestFullscreen) {
            popup.webkitRequestFullscreen();
        } else if (popup.msRequestFullscreen) {
            popup.msContentFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function updateH5PExpandButtonText() {
    const popup = document.getElementById('h5pLocalPopup');
    const btn = document.querySelector('.expand-btn-space');
    const closeBtn = document.querySelector('.back-btn-space');
    if (!popup) return;
    
    const isPopupFS = (document.fullscreenElement === popup || 
                       document.webkitFullscreenElement === popup || 
                       document.mozFullScreenElement === popup || 
                       document.msFullscreenElement === popup);
                       
    if (isPopupFS) {
        if (btn) btn.innerHTML = "THU NHỎ";
        if (closeBtn) closeBtn.style.display = "none";
    } else {
        if (btn) btn.innerHTML = "MỞ RỘNG";
        if (closeBtn) closeBtn.style.display = "";
    }
}

document.addEventListener("fullscreenchange", updateH5PExpandButtonText);
document.addEventListener("webkitfullscreenchange", updateH5PExpandButtonText);
