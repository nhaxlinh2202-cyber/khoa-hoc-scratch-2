document.addEventListener("DOMContentLoaded", () => {
    checkAndRenderSteps();
});

/**
 * Hiển thị chi tiết danh sách nhiệm vụ của Bài học số 1
 */
function showMissionDetail() {
    document.getElementById('roadmapListView').style.display = 'none';
    document.getElementById('lessonStepsView').style.display = 'flex';
    checkAndRenderSteps();
}

/**
 * Ẩn chi tiết nhiệm vụ và quay về giao diện Bản Đồ Không Gian
 */
function hideMissionDetail() {
    document.getElementById('roadmapListView').style.display = 'block';
    document.getElementById('lessonStepsView').style.display = 'none';
}

/**
 * Kiểm tra trạng thái lưu trữ của từng nhiệm vụ và kết xuất lại giao diện cho các bước học tập
 * LỘ TRÌNH KHÓA HỌC TUẦN TỰ NGHIÊM NGẶT: 1 -> 2 -> 3 -> 4
 */
function checkAndRenderSteps() {
    let s1 = localStorage.getItem('scratch_b1_s1') === 'done';
    let s2 = localStorage.getItem('scratch_b1_s2') === 'done';
    let s3 = localStorage.getItem('scratch_b1_s3') === 'done';
    let s4 = localStorage.getItem('scratch_b1_s4') === 'done';

    updateCardUI(1, true, s1);
    updateCardUI(2, s1, s2);
    updateCardUI(3, s2, s3);
    updateCardUI(4, s3, s4);

    // Cập nhật Sổ điểm cá nhân trẻ em
    if (typeof renderGradebook === 'function') {
        renderGradebook();
    }
}

/**
 * Cập nhật định dạng giao diện cho từng thẻ chứa thẻ bài bước học tập cụ thể
 */
function updateCardUI(stepNum, isUnlocked, isCompleted) {
    const card = document.getElementById('stepCard' + stepNum);
    const btn = document.getElementById('stepBtn' + stepNum);
    if (!card || !btn) return;
    card.classList.remove('is-locked', 'is-completed');

    if (isCompleted) {
        card.classList.add('is-completed');
        btn.innerHTML = "Đã xong";
        btn.style.background = "#22c55e";
        btn.style.boxShadow = "0 3px 0 #16a34a";
        btn.disabled = false;
    } else if (!isUnlocked) {
        card.classList.add('is-locked');
        btn.innerHTML = "🔒 Khóa";
        btn.style.background = "#475569";
        btn.style.boxShadow = "none";
        btn.disabled = true;
    } else {
        btn.innerHTML = defaultBtnTexts[stepNum];
        btn.style.background = "";
        btn.style.boxShadow = "";
        btn.disabled = false;
    }
}

function expandPadlet() {
    const panel = document.querySelector('.panel-4');
    if (!panel) return;

    const isPanelFS = (document.fullscreenElement === panel || 
                       document.webkitFullscreenElement === panel || 
                       document.mozFullScreenElement === panel || 
                       document.msFullscreenElement === panel);

    if (!isPanelFS) {
        if (panel.requestFullscreen) {
            panel.requestFullscreen();
        } else if (panel.mozRequestFullScreen) {
            panel.mozRequestFullScreen();
        } else if (panel.webkitRequestFullscreen) {
            panel.webkitRequestFullscreen();
        } else if (panel.msRequestFullscreen) {
            panel.msContentFullscreen();
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

function expandChatbot() {
    const chatFrame = document.getElementById('aiChatFrame');
    if (!chatFrame) return;

    const isChatFS = (document.fullscreenElement === chatFrame || 
                      document.webkitFullscreenElement === chatFrame || 
                      document.mozFullScreenElement === chatFrame || 
                      document.msFullscreenElement === chatFrame);

    if (!isChatFS) {
        if (chatFrame.requestFullscreen) {
            chatFrame.requestFullscreen();
        } else if (chatFrame.mozRequestFullScreen) {
            chatFrame.mozRequestFullScreen();
        } else if (chatFrame.webkitRequestFullscreen) {
            chatFrame.webkitRequestFullscreen();
        } else if (chatFrame.msRequestFullscreen) {
            chatFrame.msContentFullscreen();
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

function updateExpandButtonsText() {
    // Cập nhật Padlet
    const panel = document.querySelector('.panel-4');
    const padletBtn = document.querySelector('.btn-expand-padlet');
    if (panel && padletBtn) {
        const isPanelFS = (document.fullscreenElement === panel || 
                           document.webkitFullscreenElement === panel || 
                           document.mozFullScreenElement === panel || 
                           document.msFullscreenElement === panel);
        padletBtn.innerHTML = isPanelFS ? "THU NHỎ" : "MỞ RỘNG";
    }

    // Cập nhật Chatbot
    const chatFrame = document.getElementById('aiChatFrame');
    const chatBtn = document.querySelector('.btn-expand-chat');
    if (chatFrame && chatBtn) {
        const isChatFS = (document.fullscreenElement === chatFrame || 
                          document.webkitFullscreenElement === chatFrame || 
                          document.mozFullScreenElement === chatFrame || 
                          document.msFullscreenElement === chatFrame);
        chatBtn.innerHTML = isChatFS ? "THU NHỎ" : "MỞ RỘNG";
    }
}

document.addEventListener("fullscreenchange", updateExpandButtonsText);
document.addEventListener("webkitfullscreenchange", updateExpandButtonsText);
