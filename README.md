# 🍜 Tối Nay Ăn Gì?

Website vui tươi giúp bạn và người yêu chọn món ăn cho bữa tối!

## ✨ Tính năng

- 🍽️ Danh sách món ăn với link Google Maps
- 🎰 Quay random khi "Không biết ăn gì"
- 💬 Hỏi xác nhận với 2 lựa chọn vui nhộn
- 📧 Gửi email thông báo khi đồng ý
- 🎉 Hiệu ứng confetti celebration
- 📱 Responsive - hoạt động tốt trên điện thoại

## 🚀 Deploy lên GitHub Pages

### Bước 1: Tạo GitHub Repository
1. Vào [github.com/new](https://github.com/new)
2. Đặt tên repo (ví dụ: `toi-nay-an-gi`)
3. Chọn **Public**
4. Click **Create repository**

### Bước 2: Push code lên
```bash
cd e:\Menu
git init
git add .
git commit -m "🍜 Tối nay ăn gì?"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/toi-nay-an-gi.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages
1. Vào **Settings** → **Pages**
2. Source: chọn **Deploy from a branch**
3. Branch: chọn **main** / **(root)**
4. Click **Save**
5. Chờ 1-2 phút, website sẽ live tại: `https://YOUR_USERNAME.github.io/toi-nay-an-gi/`

## ✏️ Tùy chỉnh

### Thay đổi danh sách món ăn
Mở file `app.js`, sửa mảng `FOODS`:

```javascript
const FOODS = [
    {
        name: "Tên món ăn",
        emoji: "🍜",
        location: "Tên quán",
        mapUrl: "https://maps.google.com/?q=Tên+Quán"
    },
    // ... thêm món khác
];
```

### Thay đổi email nhận thông báo
Mở file `app.js`, sửa dòng đầu tiên:

```javascript
const YOUR_EMAIL = "email-cua-ban@gmail.com";
```

## 📁 Cấu trúc

```
Menu/
├── index.html   ← Trang chính
├── style.css    ← Giao diện & animation
├── app.js       ← Logic ứng dụng & danh sách món ăn
└── README.md    ← File này
```
