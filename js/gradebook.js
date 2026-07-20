/* =======================================================
       KẾT XUẤT ĐỘNG SỔ ĐIỂM CÁ NHÂN TRẺ EM (PANEL 3)
========================================================== */

function renderGradebook() {
    const scoreVal = localStorage.getItem('score_b1_s4');
    const badge = document.getElementById('kidsStatusBadge');
    const displayNum = document.getElementById('kidsGradeDisplay');
    const msg = document.getElementById('kidsMotivationMsg');

    if (!badge || !displayNum || !msg) return;

    if (scoreVal !== null) {
        const score = parseInt(scoreVal);
        displayNum.innerText = score;
        
        if (score === 100) {
            badge.innerText = "Hoàn thành Xuất sắc!";
            badge.className = "kids-status-badge info-success";
            msg.innerHTML = "Tuyệt vời! Bé đã nạp đầy 100 tinh thể năng lượng tối đa, phi thuyền đã sẵn sàng nhảy vọt không gian sang bài học số 2!";
        } else {
            badge.innerText = "Đã nộp (Cần cải thiện)";
            badge.className = "kids-status-badge info-warning";
            msg.innerHTML = "Bé đã nộp bài thành công rồi! Đọc kỹ phần hướng dẫn gợi ý sửa lỗi sai ở mục nhiệm vụ 4, sửa lại một xíu là bé sẽ giành được điểm 100 tuyệt đối ngay thôi!";
        }
    } else {
        displayNum.innerText = "--";
        badge.innerText = "Đang chờ nộp bài";
        badge.className = "kids-status-badge info-waiting";
        msg.innerHTML = "Hãy hoàn thành nhiệm vụ 4 xuất sắc để nạp đầy 100 tinh thể năng lượng cho sổ vàng bảng điểm nhé!";
    }
}
