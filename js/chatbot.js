/* ==========================================
       HỆ THỐNG KÉO THẢ CHATBOT SHIN
=========================================== */
document.addEventListener("DOMContentLoaded", function() {
    const botContainer = document.getElementById('chatbotContainer');
    const shinBtn = document.getElementById('shinBotBtn');
    const chatFrame = document.getElementById('aiChatFrame');
    const tooltip = document.getElementById('shinTooltip');
    const spaceWrapper = document.querySelector('.space-course-wrapper');

    if (!botContainer || !shinBtn || !chatFrame || !spaceWrapper) return;

    let isDragging = false;
    let hasDragged = false;
    let startX, startY, initialLeft, initialTop;

    function startDrag(e) {
        if (!e.target.closest('#shinBotBtn')) return;
        isDragging = true;
        hasDragged = false;
        let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        startX = clientX;
        startY = clientY;
        const rect = botContainer.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        botContainer.style.right = 'auto';
        botContainer.style.bottom = 'auto';
        botContainer.style.left = initialLeft + 'px';
        botContainer.style.top = initialTop + 'px';
        if (e.type.includes('mouse')) e.preventDefault();
    }

    function doDrag(e) {
        if (!isDragging) return;
        let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasDragged = true;
        }

        const rect = botContainer.getBoundingClientRect();

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const maxLeft = window.innerWidth - rect.width;
        const maxTop = window.innerHeight - rect.height;

        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop < 0) newTop = 0;
        if (newTop > maxTop) newTop = maxTop;

        botContainer.style.left = newLeft + 'px';
        botContainer.style.top = newTop + 'px';
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        const rect = botContainer.getBoundingClientRect();

        let pctLeft = (rect.left / window.innerWidth) * 100;
        let pctTop = (rect.top / window.innerHeight) * 100;

        const pctWidth = (rect.width / window.innerWidth) * 100;
        const pctHeight = (rect.height / window.innerHeight) * 100;

        if (pctLeft < 0) pctLeft = 0;
        if (pctLeft > 100 - pctWidth) pctLeft = 100 - pctWidth;
        if (pctTop < 0) pctTop = 0;
        if (pctTop > 100 - pctHeight) pctTop = 100 - pctHeight;

        botContainer.style.left = pctLeft + 'vw';
        botContainer.style.top = pctTop + 'vh';
        botContainer.style.right = 'auto';
        botContainer.style.bottom = 'auto';
    }

    botContainer.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);

    botContainer.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', endDrag);

    shinBtn.addEventListener('click', function(e) {
        if (hasDragged) {
            e.preventDefault(); 
            return;
        }

        if (chatFrame.style.display === 'none' || chatFrame.style.display === '') {
            chatFrame.style.display = 'block'; 
            if (tooltip) tooltip.style.display = 'none';
        } else {
            chatFrame.style.display = 'none';
        }
    });
});
