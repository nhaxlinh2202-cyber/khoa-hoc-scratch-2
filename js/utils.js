// Trạng thái theo dõi màn hình toàn màn hình chủ động của người dùng
window.isFullscreenActive = false;
window.fsTimeout = null;
window.isSelectingFile = false;
window.lastFullscreenElement = null;

// Lắng nghe sự kiện focus của cửa sổ để biết khi nào hộp thoại chọn tệp đóng lại
window.addEventListener('focus', () => {
    if (window.isSelectingFile) {
        setTimeout(() => {
            if (window.isFullscreenActive) {
                checkAndRestoreFullscreen();
            }
            window.isSelectingFile = false;
        }, 300);
    }
});

// Đánh dấu trạng thái đang mở hộp thoại chọn tệp khi click chọn file
document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'scratchFileInput' || (e.target.tagName === 'BUTTON' && e.target.textContent.includes('Chọn File')))) {
        window.isSelectingFile = true;
    }
});

/**
 * Kích hoạt chế độ toàn màn hình cho giao diện học tập
 */
function goFullScreen() {
    let element = document.querySelector(".space-course-wrapper");
    if (!element) return;
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msContentFullscreen();
    }
    
    window.isFullscreenActive = true;
    if (window.fsTimeout) {
        clearTimeout(window.fsTimeout);
        window.fsTimeout = null;
    }
}

/**
 * Bật/tắt chế độ toàn màn hình (toggle)
 */
function toggleFullScreen() {
    let element = document.querySelector(".space-course-wrapper");
    if (!element) return;

    const isFS = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

    if (!isFS) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msContentFullscreen();
        }
        window.isFullscreenActive = true;
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
        window.isFullscreenActive = false;
    }
}

function updateFullscreenButtonText(isFS) {
    // Không thay đổi nội dung vì đang dùng nút bấm dạng hình ảnh 3D bubble tĩnh
}

/**
 * Kiểm tra và phục hồi trạng thái toàn màn hình nếu bị văng ra ngoài ý muốn
 */
function checkAndRestoreFullscreen() {
    if (window.isFullscreenActive) {
        const isFS = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
        if (!isFS) {
            // Thực hiện phục hồi trong ngữ cảnh sự kiện click của người dùng
            let element = document.querySelector(".space-course-wrapper");
            if (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msContentFullscreen();
                }
            }
        }
    }
}

/**
 * Lắng nghe thay đổi trạng thái fullscreen của trình duyệt
 */
document.addEventListener("fullscreenchange", () => {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const currentFSEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    const spaceWrapper = document.querySelector(".space-course-wrapper");

    updateFullscreenButtonText(isFS);

    if (!isFS) {
        if (window.isSelectingFile) {
            // Không hủy trạng thái toàn màn hình khi đang chọn tệp
            return;
        }

        // Khôi phục toàn màn hình chính nếu phần tử vừa thoát là con của wrapper
        if (window.isFullscreenActive && window.lastFullscreenElement && window.lastFullscreenElement !== spaceWrapper && spaceWrapper && spaceWrapper.contains(window.lastFullscreenElement)) {
            console.log("Restoring main fullscreen after exiting child element fullscreen");
            setTimeout(() => {
                if (spaceWrapper) {
                    if (spaceWrapper.requestFullscreen) spaceWrapper.requestFullscreen().catch(e => {});
                    else if (spaceWrapper.mozRequestFullScreen) spaceWrapper.mozRequestFullScreen().catch(e => {});
                    else if (spaceWrapper.webkitRequestFullscreen) spaceWrapper.webkitRequestFullscreen().catch(e => {});
                    else if (spaceWrapper.msRequestFullscreen) spaceWrapper.msContentFullscreen().catch(e => {});
                }
            }, 150);
            return;
        }

        window.fsTimeout = setTimeout(() => {
            window.isFullscreenActive = false;
        }, 300);
    } else {
        if (window.fsTimeout) {
            clearTimeout(window.fsTimeout);
            window.fsTimeout = null;
        }
        if (currentFSEl) {
            window.lastFullscreenElement = currentFSEl;
        }
    }
});

// Safari và Chrome cũ
document.addEventListener("webkitfullscreenchange", () => {
    const isFS = !!(document.webkitFullscreenElement);
    const currentFSEl = document.webkitFullscreenElement;
    const spaceWrapper = document.querySelector(".space-course-wrapper");

    updateFullscreenButtonText(isFS);

    if (!isFS) {
        if (window.isSelectingFile) {
            return;
        }

        if (window.isFullscreenActive && window.lastFullscreenElement && window.lastFullscreenElement !== spaceWrapper && spaceWrapper && spaceWrapper.contains(window.lastFullscreenElement)) {
            setTimeout(() => {
                if (spaceWrapper) {
                    if (spaceWrapper.requestFullscreen) spaceWrapper.requestFullscreen().catch(e => {});
                    else if (spaceWrapper.webkitRequestFullscreen) spaceWrapper.webkitRequestFullscreen().catch(e => {});
                }
            }, 150);
            return;
        }

        window.fsTimeout = setTimeout(() => {
            window.isFullscreenActive = false;
        }, 300);
    } else {
        if (window.fsTimeout) {
            clearTimeout(window.fsTimeout);
            window.fsTimeout = null;
        }
        if (currentFSEl) {
            window.lastFullscreenElement = currentFSEl;
        }
    }
});

/**
 * Hiển thị hộp thoại thông báo tùy chỉnh (custom alert) dành cho trẻ em
 * @param {string} text - Nội dung thông điệp hiển thị
 */
function showCustomAlert(text) {
    const alertBox = document.getElementById('customMissionAlert');
    const alertText = document.getElementById('customAlertText');
    if (alertBox && alertText) {
        alertText.innerHTML = text;
        alertBox.style.display = 'flex';
    }
}

/**
 * Đóng hộp thoại thông báo tùy chỉnh và kiểm tra phục hồi fullscreen
 */
function closeCustomAlert() {
    const alertBox = document.getElementById('customMissionAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
    checkAndRestoreFullscreen();
}

/**
 * Ghi đè hàm alert mặc định của trình duyệt để tránh bị văng khỏi chế độ toàn màn hình
 */
window.alert = function(msg) {
    showCustomAlert(msg);
};

/**
 * Ẩn/Hiện chatbot Shin để tránh che khuất các nút bấm nhiệm vụ
 */
function toggleChatbotVisibility(isVisible) {
    const chatbot = document.getElementById('chatbotContainer');
    if (chatbot) {
        chatbot.style.display = isVisible ? 'block' : 'none';
    }
}

// Khôi phục toàn màn hình trong click tiếp theo của người dùng nếu trạng thái fullscreen đang hoạt động
document.addEventListener('click', () => {
    if (window.isFullscreenActive) {
        const isFS = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
        if (!isFS) {
            checkAndRestoreFullscreen();
        }
    }
});
