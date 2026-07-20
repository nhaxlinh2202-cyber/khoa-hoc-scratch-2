/* =======================================================
       KẾT XUẤT ĐỘNG SỔ ĐIỂM CÁ NHÂN TRẺ EM (PANEL 3)
========================================================== */

const lessonsData = [
    { id: 1, name: "Bài 1: Các câu lệnh cơ bản trong Scratch (Phần 1)", storageKey: "score_b1_s4" },
    { id: 2, name: "Bài 2: Các câu lệnh cơ bản trong Scratch (Phần 2)", storageKey: "score_b2_s4" },
    { id: 3, name: "Bài 3: Thiết kế nhân vật", storageKey: "score_b3_s4" },
    { id: 4, name: "Bài 4: Vòng lặp trong Scratch", storageKey: "score_b4_s4" },
    { id: 5, name: "Bài 5: Điều kiện và Cảm biến", storageKey: "score_b5_s4" },
    { id: 6, name: "Bài 6: Tạo âm thanh vui nhộn", storageKey: "score_b6_s4" },
    { id: 7, name: "Bài 7: Dự án trò chơi đầu tiên", storageKey: "score_b7_s4" }
];

function renderGradebook() {
    let completedCount = 0;
    let scoreSum = 0;

    // Các thành phần DOM thống kê
    const progressEl = document.getElementById('gradebookProgress');
    const progressFillEl = document.getElementById('gradebookProgressFill');
    const averageEl = document.getElementById('gradebookAverage');
    const rankEl = document.getElementById('gradebookRank');
    const listEl = document.getElementById('gradebookLessonsList');
    const msgEl = document.getElementById('kidsMotivationMsg');

    if (!listEl) return;

    let listHtml = "";

    // Lặp qua từng bài học để lấy điểm số và render HTML
    lessonsData.forEach(lesson => {
        const scoreVal = localStorage.getItem(lesson.storageKey);
        
        if (scoreVal !== null) {
            const score = parseInt(scoreVal);
            completedCount++;
            scoreSum += score;

            // Xác định huy chương tương ứng
            let medal = "🥉";
            if (score === 100) medal = "🥇";
            else if (score >= 80) medal = "🥈";

            listHtml += `
                <div class="grade-lesson-card">
                    <div class="grade-lesson-left">
                        <span class="grade-lesson-index">BÀI ${lesson.id}</span>
                        <span class="grade-lesson-name" title="${lesson.name}">${lesson.name}</span>
                    </div>
                    <div class="grade-lesson-right">
                        <span class="grade-lesson-score">${score}/100</span>
                        <span class="grade-lesson-medal">${medal}</span>
                    </div>
                </div>
            `;
        } else {
            listHtml += `
                <div class="grade-lesson-card" style="opacity: 0.6;">
                    <div class="grade-lesson-left">
                        <span class="grade-lesson-index">BÀI ${lesson.id}</span>
                        <span class="grade-lesson-name" title="${lesson.name}">${lesson.name}</span>
                    </div>
                    <div class="grade-lesson-right">
                        <span class="grade-lesson-score" style="color: #94a3b8;">--/100</span>
                        <span class="grade-lesson-medal">🔒</span>
                    </div>
                </div>
            `;
        }
    });

    // Chèn HTML danh sách
    listEl.innerHTML = listHtml;

    // Tính toán tiến trình
    const progressPercent = Math.round((completedCount / lessonsData.length) * 100);
    if (progressEl) progressEl.innerText = `${progressPercent}%`;
    if (progressFillEl) progressFillEl.style.width = `${progressPercent}%`;

    // Tính toán điểm trung bình
    let averageScore = "--";
    if (completedCount > 0) {
        averageScore = Math.round(scoreSum / completedCount);
    }
    if (averageEl) averageEl.innerText = averageScore;

    // Xác định danh hiệu phi hành gia
    let rankName = "Tập Sự Vũ Trụ";
    if (completedCount === 1) rankName = "Phi Hành Gia Tập Sự";
    else if (completedCount === 2) rankName = "Chiến Binh Code Nhí";
    else if (completedCount >= 3 && completedCount <= 4) rankName = "Kỹ Sư Không Gian";
    else if (completedCount >= 5 && completedCount <= 6) rankName = "Thuyền Trưởng";
    else if (completedCount === 7) rankName = "Đại Sứ Tinh Vân";
    if (rankEl) rankEl.innerText = rankName;

    // Cập nhật thông điệp truyền cảm hứng động (dựa trên bài 1)
    if (msgEl) {
        const scoreB1 = localStorage.getItem("score_b1_s4");
        if (scoreB1 !== null) {
            const score = parseInt(scoreB1);
            if (score === 100) {
                msgEl.innerHTML = "Tuyệt vời! Bé đã nạp đầy 100 tinh thể năng lượng tối đa ở Bài 1, phi thuyền đã sẵn sàng nhảy vọt không gian sang bài học số 2!";
            } else {
                msgEl.innerHTML = "Bé đã nộp bài thành công rồi! Đọc kỹ phần hướng dẫn gợi ý sửa lỗi sai ở mục nhiệm vụ 4, sửa lại một xíu là bé sẽ giành được điểm 100 tuyệt đối ngay thôi!";
            }
        } else {
            msgEl.innerHTML = "Hãy hoàn thành nhiệm vụ 4 của bài học hiện tại xuất sắc để nạp đầy 100 tinh thể năng lượng cho sổ vàng bảng điểm nhé!";
        }
    }
}
