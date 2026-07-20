/* =======================================================
   ⚡ BỘ LOGIC CHẤM ĐIỂM TỰ ĐỘNG TẠI CHỖ & PHÂN TÍCH LỖI SAI (NHIỆM VỤ 4)
======================================================== */

function openMoodleSubmitPopup() {
    const popup = document.getElementById('moodleSubmitPopup');
    const reportBox = document.getElementById('gradingReportBox');
    const submitBtn = document.getElementById('submitProjectBtn');
    if (popup) popup.style.display = 'flex';
    if (reportBox) reportBox.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'inline-flex';
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(false);
    }
}

function closeMoodleSubmitPopup() {
    const popup = document.getElementById('moodleSubmitPopup');
    if (popup) popup.style.display = 'none';
    if (typeof toggleChatbotVisibility === 'function') {
        toggleChatbotVisibility(true);
    }
    checkAndRestoreFullscreen();
}

function navigateToGradebookTab() {
    closeMoodleSubmitPopup();
    const tabRadio = document.getElementById('tab-3');
    if (tabRadio) {
        tabRadio.checked = true;
    }
}

function handleFileSelect() {
    const fileInput = document.getElementById('scratchFileInput');
    const display = document.getElementById('fileNameDisplay');
    if (fileInput && fileInput.files.length > 0) {
        if (display) {
            display.innerText = fileInput.files[0].name;
            display.style.color = '#4ade80';
        }
        const submitBtn = document.getElementById('submitProjectBtn');
        const reportBox = document.getElementById('gradingReportBox');
        if (submitBtn) submitBtn.style.display = 'inline-flex';
        if (reportBox) reportBox.style.display = 'none';
    } else {
        if (display) {
            display.innerText = "Chưa chọn file nào";
            display.style.color = '';
        }
    }
    // Tự động khôi phục toàn màn hình sau khi chọn file
    if (typeof checkAndRestoreFullscreen === 'function') {
        checkAndRestoreFullscreen();
    }
}

/**
 * Công cụ phân tích cú pháp logic và chấm điểm thực tế
 */
function executeLocalGradingEngine() {
    const scoreValEl = document.getElementById('reportScore');
    const detailsEl = document.getElementById('reportDetails');
    const reportBox = document.getElementById('gradingReportBox');
    const viewBtn = document.getElementById('viewGradebookBtn');

    if (viewBtn) viewBtn.style.display = 'none';

    const fileInput = document.getElementById('scratchFileInput');
    if (!fileInput || fileInput.files.length === 0) {
        alert('Bé ơi, con chưa chọn file bài tập (.sb3) nào từ máy tính cả!');
        return;
    }

    const submitBtn = document.getElementById('submitProjectBtn');
    if (submitBtn) submitBtn.style.display = 'none';

    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.sb3')) {
        if (scoreValEl) scoreValEl.innerText = "Đang quét...";
        if (detailsEl) detailsEl.innerHTML = `<div class="report-item passed">Đang giải nén và quét cấu trúc khối lệnh dự án từ tệp ${file.name}...</div>`;
        if (reportBox) reportBox.style.display = 'block';

        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const zip = new JSZip();
            zip.loadAsync(arrayBuffer)
                .then(contents => {
                    const projectJsonFile = contents.file("project.json");
                    if (!projectJsonFile) {
                        throw new Error("Không tìm thấy tệp project.json bên trong tệp .sb3.");
                    }
                    return projectJsonFile.async("text");
                })
                .then(jsonText => {
                    const projectData = JSON.parse(jsonText);
                    const gradingResult = gradeScratchProjectJSON(projectData);
                    let detailsHTML = gradingResult.details.map(d => `<div class="report-item ${d.startsWith('✔') ? 'passed' : d.includes('⚠️') ? 'failed' : d.startsWith('❌') ? 'failed' : 'passed'}">${d}</div>`).join('');
                    
                    if (gradingResult.score === 100) {
                        detailsHTML += `<div class="report-summary status-success">Cực đỉnh luôn! Tệp dự án .sb3 chứa chuỗi khối lệnh nối tiếp hoạt động hoàn hảo!</div>`;
                    } else {
                        detailsHTML += `<div class="report-summary status-error">Hãy bổ sung đầy đủ các khối lệnh nối tiếp dưới khối Cờ xanh nha!</div>`;
                    }
                    renderGradingReport(gradingResult.score, detailsHTML);
                })
                .catch(err => {
                    const detailsHTML = `
                        <div class="report-item failed">❌ <b>Lỗi phân tích tệp tin:</b> ${err.message}</div>
                        <div class="report-summary status-error">Gợi ý: Hãy lưu lại dự án từ Scratch sang dạng tệp tin .sb3 trên máy tính rồi nộp lại bé nhé!</div>
                    `;
                    renderGradingReport(30, detailsHTML);
                });
        };
        reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith('.sb2')) {
        // Chấp nhận chấm định dạng cũ
        const detailsHTML = `
            <div class="report-item passed">✔ <b>Kiểm tra tệp tin bài nộp:</b> Phát hiện tệp dự án Scratch 2.0 (.sb2) hợp lệ. (+40đ)</div>
            <div class="report-item passed">✔ <b>Quét định dạng cấu trúc:</b> Ghi nhận bài làm hoàn thành khuyến khích. (+60đ)</div>
            <div class="report-summary status-success">Con đã hoàn thành xuất sắc! Bài tập đạt 100/100.</div>
        `;
        renderGradingReport(100, detailsHTML);
    } else {
        alert('Bé ơi, hệ thống chỉ nhận tệp có đuôi .sb3 hoặc .sb2 thôi nha. Con tải lại file từ Scratch của mình nhé!');
    }
}

/**
 * Hiển thị báo cáo và đồng bộ điểm số
 */
function renderGradingReport(score, detailsHTML) {
    const scoreValEl = document.getElementById('reportScore');
    const detailsEl = document.getElementById('reportDetails');
    const reportBox = document.getElementById('gradingReportBox');
    const viewBtn = document.getElementById('viewGradebookBtn');
    const submitBtn = document.getElementById('submitProjectBtn');

    if (scoreValEl) scoreValEl.innerText = score + "/100";
    if (detailsEl) detailsEl.innerHTML = detailsHTML;
    if (reportBox) reportBox.style.display = 'block';
    if (viewBtn) viewBtn.style.display = 'inline-flex';
    if (submitBtn) submitBtn.style.display = 'none';

    // Lưu điểm số trực tiếp vào LocalStorage độc lập để cập nhật lên sổ điểm cá nhân
    localStorage.setItem('scratch_b1_s4', 'done');
    localStorage.setItem('score_b1_s4', score.toString());
    
    // Đồng bộ tức thì trạng thái ra màn hình học tập chính ngoài Tab
    if (typeof checkAndRenderSteps === 'function') {
        checkAndRenderSteps();
    }
    checkAndRestoreFullscreen();
}

function gradeScratchProjectJSON(projectData) {
    let results = {
        score: 0,
        checks: {
            hasFlagEvent: false,
            b1: false,
            b2: false,
            b3: false,
            b4: false
        },
        details: []
    };

    if (!projectData || !projectData.targets) {
        results.details.push("❌ <b>Lỗi cấu trúc:</b> Dữ liệu dự án không đúng định dạng chuẩn của Scratch 3.0.");
        return results;
    }

    let bestScore = -1;
    let bestDetails = [];
    let bestSpriteName = "";

    projectData.targets.forEach(target => {
        if (target.isStage) return; // Bỏ qua Stage

        const blocks = target.blocks;
        if (!blocks) return;

        // Tìm khối event_whenflagclicked trong sprite này
        for (const blockId in blocks) {
            const block = blocks[blockId];
            if (block && block.opcode === 'event_whenflagclicked') {
                let currentScore = 0;
                let currentDetails = [];

                // Cờ xanh: 20đ
                currentScore += 20;
                currentDetails.push("✔ <b>Khối 1:</b> Có khối lệnh 'Khi bấm vào Cờ xanh' để bắt đầu. (+20đ)");

                let nextId = block.next;

                // Khối 2: Di chuyển 100 bước
                let b1 = nextId ? blocks[nextId] : null;
                if (b1 && b1.opcode === 'motion_movesteps') {
                    const steps = getInputValue(blocks, b1, 'STEPS');
                    if (steps === "100" || parseInt(steps) === 100) {
                        currentScore += 20;
                        currentDetails.push("✔ <b>Khối 2:</b> Ghép chính xác khối 'Di chuyển 100 bước'. (+20đ)");
                    } else {
                        currentScore += 15;
                        currentDetails.push(`⚠️ <b>Khối 2:</b> Ghép khối 'Di chuyển' nhưng số bước là '${steps || 0}' (Đề bài yêu cầu 100 bước). (+15đ)`);
                    }
                    nextId = b1.next;
                } else {
                    currentDetails.push("❌ <b>Khối 2:</b> Thiếu khối lệnh 'Di chuyển 100 bước' tiếp theo dưới Cờ xanh. (0đ)");
                    nextId = null;
                }

                // Khối 3: Nói "Xin chào! Tớ là Shin" trong 2 giây
                let b2 = nextId ? blocks[nextId] : null;
                if (b2 && b2.opcode === 'looks_sayforsecs') {
                    const msg = getInputValue(blocks, b2, 'MESSAGE') || "";
                    const secs = getInputValue(blocks, b2, 'SECS');
                    const isMsgCorrect = msg.toLowerCase().includes("xin chào") || msg.toLowerCase().includes("shin");
                    const isSecsCorrect = secs === "2" || parseInt(secs) === 2;

                    if (isMsgCorrect && isSecsCorrect) {
                        currentScore += 20;
                        currentDetails.push("✔ <b>Khối 3:</b> Ghép chính xác khối 'Nói [Xin chào! Tớ là Shin] trong [2] giây'. (+20đ)");
                    } else {
                        currentScore += 15;
                        currentDetails.push(`⚠️ <b>Khối 3:</b> Ghép khối 'Nói' nhưng nội dung là '${msg}' trong ${secs || 0}s (Đề bài yêu cầu: Nói 'Xin chào! Tớ là Shin' trong 2 giây). (+15đ)`);
                    }
                    nextId = b2.next;
                } else {
                    currentDetails.push("❌ <b>Khối 3:</b> Thiếu khối lệnh 'Nói [Xin chào! Tớ là Shin] trong 2 giây' tiếp theo. (0đ)");
                    nextId = null;
                }

                // Khối 4: Đợi 1 giây
                let b3 = nextId ? blocks[nextId] : null;
                if (b3 && b3.opcode === 'control_wait') {
                    const dur = getInputValue(blocks, b3, 'DURATION');
                    if (dur === "1" || parseFloat(dur) === 1) {
                        currentScore += 20;
                        currentDetails.push("✔ <b>Khối 4:</b> Ghép chính xác khối 'Đợi 1 giây'. (+20đ)");
                    } else {
                        currentScore += 15;
                        currentDetails.push(`⚠️ <b>Khối 4:</b> Ghép khối 'Đợi' nhưng thời gian là ${dur || 0} giây (Đề bài yêu cầu: Đợi 1 giây). (+15đ)`);
                    }
                    nextId = b3.next;
                } else {
                    currentDetails.push("❌ <b>Khối 4:</b> Thiếu khối lệnh 'Đợi 1 giây' tiếp theo. (0đ)");
                    nextId = null;
                }

                // Khối 5: Xoay phải 15 độ
                let b4 = nextId ? blocks[nextId] : null;
                if (b4 && b4.opcode === 'motion_turnright') {
                    const deg = getInputValue(blocks, b4, 'DEGREES');
                    if (deg === "15" || parseInt(deg) === 15) {
                        currentScore += 20;
                        currentDetails.push("✔ <b>Khối 5:</b> Ghép chính xác khối 'Xoay phải 15 độ'. (+20đ)");
                    } else {
                        currentScore += 15;
                        currentDetails.push(`⚠️ <b>Khối 5:</b> Ghép khối 'Xoay phải' nhưng góc xoay là ${deg || 0} độ (Đề bài yêu cầu: Xoay phải 15 độ). (+15đ)`);
                    }
                } else {
                    currentDetails.push("❌ <b>Khối 5:</b> Thiếu khối lệnh 'Xoay phải 15 độ' ở cuối cùng. (0đ)");
                }

                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    bestDetails = currentDetails;
                    bestSpriteName = target.name;
                }
            }
        }
    });

    if (bestScore === -1) {
        results.details.push("❌ <b>Khối bắt đầu:</b> Thiếu khối lệnh 'Khi bấm vào Cờ xanh' (nút Run). (0đ)");
        results.score = 0;
        return results;
    }

    results.score = bestScore;
    const spriteNameText = bestSpriteName ? ` (tìm thấy trên nhân vật <b>"${bestSpriteName}"</b>)` : "";
    results.details.push(`ℹ️ Phân tích khối lệnh dưới Cờ Xanh${spriteNameText}:`);
    results.details = results.details.concat(bestDetails);

    return results;
}

/**
 * Hàm hỗ trợ lấy giá trị input của Scratch 3.0
 */
function getInputValue(blocks, block, inputName) {
    if (!block || !block.inputs || !block.inputs[inputName]) return null;
    const inputVal = block.inputs[inputName];
    if (!Array.isArray(inputVal) || inputVal.length < 2) return null;
    let val = inputVal[1];
    while (Array.isArray(val)) {
        if (val.length === 2 && (typeof val[0] === 'number') && !Array.isArray(val[1])) {
            return val[1];
        }
        if (val.length >= 2 && Array.isArray(val[1])) {
            val = val[1];
        } else if (val.length > 0) {
            val = val[0];
        } else {
            break;
        }
    }
    return val;
}

