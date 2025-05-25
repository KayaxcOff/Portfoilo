// === Tema değiştirme ===
const temaButonu = document.querySelector("#temaDegistir");

// Sayfanın temasını kontrol et ve uygula
function temayiKontrolEt() {
    const kaydedilenTema = localStorage.getItem("theme");
    if (kaydedilenTema === "dark") {
        document.body.classList.add("dark-theme");
    }
}
temayiKontrolEt();

// Tema değiştirme fonksiyonu
if (temaButonu) {
    temaButonu.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// === Yukarı Git Butonu ===
function yukariGit() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Sayfa aşağı kayınca butonu göster
window.addEventListener("scroll", function () {
    var yukariButon = document.getElementById("yukariGit");
    if (yukariButon) {
        if (window.scrollY > 200) {
            yukariButon.classList.add("visible");
        } else {
            yukariButon.classList.remove("visible");
        }
    }
});

// === Mesaj Gönderme ===
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#mesaj form");
    if (form) {
        const button = form.querySelector("button[type='submit']");
        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // Sayfa yenilenmesini engelle

            button.disabled = true;
            button.textContent = "Gönderiliyor...";

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    form.innerHTML = "<p style='color:green;'>Teşekkürler! Mesajınız başarıyla gönderildi.</p>";
                } else {
                    form.innerHTML = "<p style='color:red;'>Bir hata oluştu. Lütfen tekrar deneyin.</p>";
                }
            } catch (error) {
                form.innerHTML = "<p style='color:red;'>Bağlantı hatası! Lütfen tekrar deneyin.</p>";
            }
        });
    }

    // === Minecraft Skin Viewer ===
    // Skin container'ı seç
    const container = document.getElementById("skin_container");
    if (container && window.skinview3d) {
        const viewer = new skinview3d.SkinViewer({
            canvas: document.createElement("canvas"),
            width: 300,
            height: 400,
            skin: "Skin_1.png", // Skin dosyanın yolunu buraya koy
        });

        container.appendChild(viewer.canvas);
        viewer.autoRotate = true; // Karakter otomatik dönecek

        const player = viewer.playerObject;
        const head = player.head;
        const body = player.body;

        // Fareye bakma için kafa hareketi (autoRotate açıkken)
        document.addEventListener("mousemove", function(event) {
            const canvas = viewer.canvas;
            const rect = canvas.getBoundingClientRect();

            // Canvas merkezi
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Fare ile canvas merkezi arasındaki fark
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            // Body'nin mevcut rotasyonunu hesaba kat
            const bodyYaw = body.rotation.y;

            // Yaw (sağ-sol) = fareye göre, body'sine göre düzelt
            const targetYaw = Math.atan2(dx, -rect.height / 2);
            head.rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetYaw - bodyYaw));

            // Pitch (yukarı-aşağı)
            const targetPitch = Math.atan2(dy, rect.height / 2);
            head.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, -targetPitch));
        });
    }
});
