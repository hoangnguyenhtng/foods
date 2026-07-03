/* ============================================
   🍜 TỐI NAY ĂN GÌ? v2 - App Logic
   ============================================
   
   ĐỂ THAY ĐỔI DANH SÁCH MÓN ĂN:
   Sửa mảng MENU bên dưới.
   
   ĐỂ THAY ĐỔI EMAIL NHẬN THÔNG BÁO:
   Sửa biến YOUR_EMAIL bên dưới.
   ============================================ */

// ==============================
// 📧 CẤU HÌNH
// ==============================
const YOUR_EMAIL = "lintran2k3@gmail.com"; // ← Thay email của bạn!

// ==============================
// 🍕 DANH SÁCH MÓN ĂN & QUÁN
// ==============================
const MENU = [
    {
        name: "Cơm Tấm",
        emoji: "🍚",
        restaurants: [
            "Cơm Tấm Sài Gòn Nam Phương",
            "Cơm Tấm Sườn Đông Dương",
            "Cơm Tấm Sà Bì Chưởng",
            "Cơm Tấm Ngon Triều Khúc",
            "Hẻm Tấm - Cơm Tấm Sài Gòn",
            "Cơm Tấm Tư Mập"
        ]
    },
    {
        name: "Phở",
        emoji: "🍜",
        restaurants: [
            "Phở Bò Lâm",
            "Phở Bò Hồ Lợi",
            "Phở Vũ",
            "Phở Gà Nguyệt",
            "Phở Cường Hàng Muối",
            "Phở 10 Lý Quốc Sư",
            "Phở Bò Lý Béo",
            "Phở Bò Định 3"
        ]
    },
    {
        name: "Bún Chả",
        emoji: "🥢",
        restaurants: [
            "Bún Chả Que Tre",
            "Bún Chả Cô Nhung",
            "Bún Chả 22 Ngõ Huyện",
            "Bún Chả 27",
            "Bún Chả Sinh Từ",
            "Bún Chả Que Tre Bình Chung",
            "Bún Chả Hà Thành",
            "Bún Chả Đường Láng"
        ]
    },
    {
        name: "Gà Rán",
        emoji: "🍗",
        restaurants: [
            "Jollibee",
            "KFC",
            "Lotteria",
            "Popeyes",
            "Wally",
            "DA BANG Chicken",
            "Don Chicken",
            "Jang Chicken",
            "McDonald's",
            "Texas Chicken"
        ]
    },
    {
        name: "Ngan / Vịt",
        emoji: "🦆",
        restaurants: [
            "Ngan 65 Lý Nam Đế"
        ]
    },
    {
        name: "Bún Bò Huế",
        emoji: "🍲",
        restaurants: [
            "Bún Bò Huế O Xuân",
            "Bún Bò Huế Đông Ba",
            "Bún Bò Huế Quốc Việt",
            "Bún Bò Nam Bộ Bà Hồng"
        ]
    },
    {
        name: "Lẩu",
        emoji: "♨️",
        restaurants: [
            "Lẩu Phan",
            "Haidilao",
            "Manwah",
            "Lẩu Đồng",
            "Kichi Kichi"
        ]
    },
    {
        name: "Pizza",
        emoji: "🍕",
        restaurants: [
            "Pizza 4P's",
            "The Pizza Company",
            "Domino's Pizza",
            "Pizza Hut"
        ]
    },
    {
        name: "Sushi / Nhật",
        emoji: "🍣",
        restaurants: [
            "Tokyo Deli",
            "Sushi Kei",
            "Gyu-Kaku",
            "iSushi"
        ]
    },
    {
        name: "Bánh Mì",
        emoji: "🥖",
        restaurants: [
            "Bánh Mì Phượng",
            "Bánh Mì 25",
            "Bánh Mì Hội An",
            "Bánh Mì Doner Kebab"
        ]
    },
    {
        name: "BBQ Nướng",
        emoji: "🥩",
        restaurants: [
            "GoGi House",
            "King BBQ",
            "Seoul Garden",
            "Meat Plus"
        ]
    },
    {
        name: "Bún Riêu / Ốc",
        emoji: "🐌",
        restaurants: [
            "Bún Ốc Bà Ngoại",
            "Bún Riêu Cua Hàng Bạc",
            "Bún Riêu 11 Hàng Bài"
        ]
    }
];

// ==============================
// 🎨 WHEEL COLORS
// ==============================
const WHEEL_COLORS = [
    '#FF6B9D', '#7C5CFC', '#FFA751', '#34D399',
    '#F472B6', '#38BDF8', '#FBBF24', '#A78BFA',
    '#FB923C', '#4ADE80', '#E879F9', '#22D3EE',
    '#F87171', '#818CF8', '#FDBA74', '#6EE7B7'
];

// ==============================
// 🎮 APP STATE
// ==============================
let currentRole = 'em';
let currentCategory = null;   // Selected MENU item
let currentRestaurant = null; // Selected restaurant name
let disagreeCount = 0;
let wheelMode = null;         // 'category' | 'restaurant'
let wheelItems = [];          // Items currently on the wheel
let wheelAngle = 0;           // Current wheel rotation angle
let wheelSpinning = false;
let wheelAnimId = null;
let afterCategorySpinCallback = null; // callback after category spin

// ==============================
// 🚀 INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingEmojis();
    renderFoodGrid();
    resizeWheel();
    window.addEventListener('resize', resizeWheel);
});

// ==============================
// 📐 Responsive wheel canvas
// ==============================
function resizeWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const maxW = Math.min(340, window.innerWidth - 80);
    canvas.style.width = maxW + 'px';
    canvas.style.height = maxW + 'px';
}

// ==============================
// ✨ FLOATING EMOJIS
// ==============================
function createFloatingEmojis() {
    const c = document.getElementById('floatingEmojis');
    const emojis = ['🍜','🍕','🍣','🍔','🍰','💕','✨','🌙','⭐','🍩','🧁','🍦','🥟','🍲','🥖','🍗'];
    for (let i = 0; i < 22; i++) {
        const el = document.createElement('span');
        el.className = 'floating-emoji';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (15 + Math.random() * 20) + 's';
        el.style.animationDelay = (Math.random() * 15) + 's';
        el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        c.appendChild(el);
    }
}

// ==============================
// 🗣️ ROLE HELPERS
// ==============================
function getRoleText() {
    const isEm = currentRole === 'em';
    return {
        self: isEm ? 'Em' : 'Anh',
        other: isEm ? 'anh' : 'em',
        otherCap: isEm ? 'Anh' : 'Em',
        menuTitle: isEm ? 'Em muốn ăn gì nè? 😋' : 'Anh muốn ăn gì nè? 😋',
        menuSub: isEm ? 'Chọn một món hoặc để anh chọn cho em nhé!' : 'Chọn một món hoặc để em chọn cho anh nhé!',
        agreeBtn: isEm ? 'Em đồng ý!' : 'Anh đồng ý!',
        notify: isEm ? 'Anh đã nhận được thông báo rồi nhé! 💌' : 'Em đã nhận được thông báo rồi nhé! 💌',
    };
}

// ==============================
// 🔄 SCREEN NAVIGATION
// ==============================
function switchScreen(fromId, toId) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    from.classList.add('screen-exit');
    setTimeout(() => {
        from.classList.remove('active', 'screen-exit');
        to.classList.add('active');
    }, 280);
}

// ==============================
// 🏠 ROLE SELECT
// ==============================
function selectRole(role) {
    currentRole = role;
    const t = getRoleText();
    document.getElementById('menuTitle').textContent = t.menuTitle;
    document.getElementById('menuSubtitle').textContent = t.menuSub;
    switchScreen('screenWelcome', 'screenMenu');
}

// ==============================
// 🍽️ FOOD CATEGORY GRID
// ==============================
function renderFoodGrid() {
    const grid = document.getElementById('foodGrid');
    grid.innerHTML = '';
    MENU.forEach((cat, i) => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.onclick = () => openCategory(i);
        card.innerHTML = `
            <span class="food-card-emoji">${cat.emoji}</span>
            <div class="food-card-name">${cat.name}</div>
            <div class="food-card-count">${cat.restaurants.length} quán</div>
        `;
        grid.appendChild(card);
    });
}

// ==============================
// 🏪 RESTAURANT LIST
// ==============================
function openCategory(index) {
    currentCategory = MENU[index];
    renderRestaurantList();
    switchScreen('screenMenu', 'screenRestaurants');
}

function renderRestaurantList() {
    const cat = currentCategory;
    document.getElementById('restHeaderEmoji').textContent = cat.emoji;
    document.getElementById('restHeaderTitle').textContent = cat.name;

    const grid = document.getElementById('restaurantGrid');
    grid.innerHTML = '';

    cat.restaurants.forEach((name, i) => {
        const card = document.createElement('div');
        card.className = 'rest-card';
        card.onclick = (e) => {
            // Don't select if clicking action buttons
            if (e.target.closest('.rest-card-actions')) return;
            selectRestaurant(name);
        };
        card.innerHTML = `
            <div class="rest-card-num">${i + 1}</div>
            <div class="rest-card-info">
                <div class="rest-card-name">${name}</div>
            </div>
            <div class="rest-card-actions">
                <a href="${getMapUrl(name)}" target="_blank" rel="noopener" 
                   class="link-btn-small link-maps" title="Google Maps" onclick="event.stopPropagation()">📍</a>
                <a href="${getTiktokUrl(name)}" target="_blank" rel="noopener" 
                   class="link-btn-small link-tiktok-small" title="Review TikTok" onclick="event.stopPropagation()">🎬</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function goBackToMenu() {
    switchScreen('screenRestaurants', 'screenMenu');
    currentCategory = null;
}

// ==============================
// ✅ SELECT RESTAURANT → CONFIRM
// ==============================
function selectRestaurant(name) {
    currentRestaurant = name;
    showConfirmScreen('screenRestaurants');
}

function showConfirmScreen(fromScreenId) {
    const t = getRoleText();
    const fromScreen = fromScreenId || document.querySelector('.screen.active').id;

    document.getElementById('confirmEmoji').textContent = currentCategory.emoji;
    document.getElementById('confirmFoodName').textContent = currentCategory.name;
    document.getElementById('confirmRestName').textContent = currentRestaurant;
    document.getElementById('confirmMapLink').href = getMapUrl(currentRestaurant);
    document.getElementById('confirmTiktokLink').href = getTiktokUrl(currentRestaurant);
    document.getElementById('agreeText').textContent = t.agreeBtn;

    switchScreen(fromScreen, 'screenConfirm');
}

// ==============================
// 🔗 URL HELPERS
// ==============================
function getMapUrl(name) {
    return 'https://maps.google.com/?q=' + encodeURIComponent(name + ' Hà Nội');
}

function getTiktokUrl(name) {
    return 'https://www.tiktok.com/search?q=' + encodeURIComponent(name + ' review');
}

// ==============================
// 🎡 WHEEL OF FORTUNE - Canvas Drawing
// ==============================
function drawWheel(items, angle) {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(cx, cy) - 8;
    const n = items.length;
    const segAngle = (Math.PI * 2) / n;

    ctx.clearRect(0, 0, W, H);

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 107, 157, 0.3)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Draw segments
    items.forEach((item, i) => {
        const start = angle + i * segAngle;
        const end = start + segAngle;

        // Pie slice
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();

        // Segment border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + segAngle / 2);

        // Emoji
        const emojiSize = n <= 8 ? 20 : 16;
        const textSize = n <= 8 ? 13 : (n <= 12 ? 11 : 10);
        ctx.font = `${emojiSize}px serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji || '🍽️', 24, -1);

        // Name
        ctx.font = `bold ${textSize}px Quicksand, sans-serif`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';

        // Truncate name if too long
        let displayName = item.name;
        const maxTextWidth = radius - 70;
        while (ctx.measureText(displayName).width > maxTextWidth && displayName.length > 3) {
            displayName = displayName.slice(0, -1);
        }
        if (displayName !== item.name) displayName += '…';

        ctx.fillText(displayName, 24 + emojiSize + 4, 0);
        ctx.restore();
    });

    // Center circle
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    grad.addColorStop(0, '#2d1b4e');
    grad.addColorStop(1, '#1a1025');
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = var_primary();
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center emoji
    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎯', cx, cy);

    // Outer dots decoration
    for (let i = 0; i < n; i++) {
        const a = angle + i * segAngle;
        const dx = cx + Math.cos(a) * (radius - 2);
        const dy = cy + Math.sin(a) * (radius - 2);
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
    }
}

function var_primary() { return '#ff6b9d'; }

// ==============================
// 🎡 WHEEL SPIN LOGIC
// ==============================
function setupWheel(items, mode, title) {
    wheelItems = items;
    wheelMode = mode;
    wheelAngle = 0;
    wheelSpinning = false;

    document.getElementById('wheelTitle').textContent = title;
    document.getElementById('btnSpin').disabled = false;
    document.getElementById('btnSpin').querySelector('span:last-child').textContent = 'QUAY!';

    drawWheel(wheelItems, wheelAngle);

    const fromScreen = document.querySelector('.screen.active').id;
    switchScreen(fromScreen, 'screenWheel');
}

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;

    const btn = document.getElementById('btnSpin');
    btn.disabled = true;
    btn.querySelector('span:last-child').textContent = 'Đang quay...';

    // Make pointer stop pulsing while spinning
    document.querySelector('.wheel-pointer').classList.add('spinning');

    const n = wheelItems.length;
    const segAngle = (Math.PI * 2) / n;

    // Pick a random winner
    const winnerIndex = Math.floor(Math.random() * n);

    // Calculate target angle so winner's center is at the pointer (top = -PI/2)
    // Segment i center angle = wheelAngle_final + i * segAngle + segAngle/2
    // We want this to equal -PI/2 (top) modulo 2PI
    const randomOffset = (Math.random() - 0.5) * segAngle * 0.6;
    const targetSegCenter = -Math.PI / 2 - winnerIndex * segAngle - segAngle / 2 + randomOffset;

    // Add many full rotations for excitement
    const fullSpins = Math.PI * 2 * (6 + Math.floor(Math.random() * 5)); // 6-10 full spins
    const targetAngle = targetSegCenter + fullSpins;

    const startAngle = wheelAngle;
    const totalSpin = targetAngle - startAngle;
    const duration = 4500; // ms
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out quartic for a smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);

        wheelAngle = startAngle + totalSpin * eased;
        drawWheel(wheelItems, wheelAngle);

        if (progress < 1) {
            wheelAnimId = requestAnimationFrame(animate);
        } else {
            // Spin complete!
            wheelSpinning = false;
            document.querySelector('.wheel-pointer').classList.remove('spinning');

            const winner = wheelItems[winnerIndex];

            // Short delay before showing result
            setTimeout(() => {
                handleWheelResult(winner);
            }, 600);
        }
    }

    wheelAnimId = requestAnimationFrame(animate);
}

function handleWheelResult(winner) {
    if (wheelMode === 'category') {
        // Winner is a category, now spin for restaurant
        currentCategory = winner;
        
        if (afterCategorySpinCallback) {
            afterCategorySpinCallback();
            afterCategorySpinCallback = null;
        } else {
            // Auto-proceed to restaurant wheel
            const restItems = winner.restaurants.map(name => ({ name, emoji: winner.emoji }));
            const t = getRoleText();
            setTimeout(() => {
                setupWheel(restItems, 'restaurant', `Chọn quán ${winner.name} cho ${t.self.toLowerCase()}...`);
            }, 300);
        }
    } else if (wheelMode === 'restaurant') {
        // Winner is a restaurant
        currentRestaurant = winner.name;
        showConfirmScreen('screenWheel');
    }
}

// ==============================
// 🎡 RANDOM TRIGGERS
// ==============================

// Random tất cả: spin category → spin restaurant
function startRandomAll() {
    afterCategorySpinCallback = null; // auto-spin restaurant after
    const items = MENU.map(cat => ({ ...cat }));
    const t = getRoleText();
    setupWheel(items, 'category', `Đang chọn món cho ${t.self.toLowerCase()}...`);
}

// Random quán within current category
function startRandomRestaurant() {
    const cat = currentCategory;
    const items = cat.restaurants.map(name => ({ name, emoji: cat.emoji }));
    const t = getRoleText();
    setupWheel(items, 'restaurant', `Chọn quán ${cat.name} cho ${t.self.toLowerCase()}...`);
}

// ==============================
// ✅ AGREE / DISAGREE
// ==============================
function handleAgree() {
    sendEmailNotification();
    showFinalScreen();
}

function handleDisagree() {
    disagreeCount++;

    // Shake card
    const card = document.querySelector('#screenConfirm .confirm-container');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);

    // Spin for restaurant again within same category
    setTimeout(() => {
        startRandomRestaurant();
    }, 700);
}

// ==============================
// 🎉 FINAL SCREEN
// ==============================
function showFinalScreen() {
    const t = getRoleText();
    document.getElementById('finalFoodName').textContent = currentCategory.name;
    document.getElementById('finalRestName').textContent = currentRestaurant;
    document.getElementById('finalMapLink').href = getMapUrl(currentRestaurant);
    document.getElementById('finalTiktokLink').href = getTiktokUrl(currentRestaurant);
    document.getElementById('finalNotify').textContent = t.notify;

    switchScreen('screenConfirm', 'screenFinal');
    launchConfetti();
}

function launchConfetti() {
    const c = document.getElementById('celebration');
    c.innerHTML = '';
    const colors = ['#ff6b9d','#ffa751','#7c5cfc','#34d399','#f472b6','#fbbf24','#a78bfa'];
    const shapes = ['■','●','▲','★','♥'];
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('span');
        el.className = 'confetti';
        el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        el.style.fontSize = (8 + Math.random() * 14) + 'px';
        el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        el.style.animationDelay = (Math.random() * 0.8) + 's';
        c.appendChild(el);
    }
}

// ==============================
// 📧 EMAIL NOTIFICATION
// ==============================
function sendEmailNotification() {
    const t = getRoleText();
    const food = currentCategory.name;
    const rest = currentRestaurant;

    const subject = encodeURIComponent(`🍽️ Tối nay ăn ${food} tại ${rest}!`);
    const body = encodeURIComponent(
        `${t.self} đã chọn món cho tối nay rồi nhé! 💕\n\n` +
        `🍽️ Món ăn: ${food}\n` +
        `🏪 Quán: ${rest}\n` +
        `📍 Google Maps: ${getMapUrl(rest)}\n` +
        `🎬 Review TikTok: ${getTiktokUrl(rest)}\n\n` +
        `${disagreeCount > 0 ? `(${t.self} đã từ chối ${disagreeCount} lần trước khi chọn quán này 😤)\n\n` : ''}` +
        `Hẹn ${t.other} tối nay nhé! 😘`
    );

    window.open(`mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`, '_blank');
}

// ==============================
// 🔄 RESTART
// ==============================
function restart() {
    currentRole = 'em';
    currentCategory = null;
    currentRestaurant = null;
    disagreeCount = 0;
    wheelMode = null;
    wheelItems = [];
    wheelSpinning = false;
    afterCategorySpinCallback = null;
    if (wheelAnimId) cancelAnimationFrame(wheelAnimId);

    switchScreen('screenFinal', 'screenWelcome');
}
