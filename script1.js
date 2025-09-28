let selectedYear = 2025; // valor inicial

function showPhotos() {
    document.getElementById("content").innerHTML = `
        <h2>Fotos del año ${selectedYear}</h2>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <img src="https://via.placeholder.com/150" alt="Foto 1">
          <img src="https://via.placeholder.com/150" alt="Foto 2">
          <img src="https://via.placeholder.com/150" alt="Foto 3">
        </div>
      `;
}

function showVideos() {
    document.getElementById("content").innerHTML = `
        <h2>Videos del año ${selectedYear}</h2>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <video width="320" height="240" controls>
            <source src="videos/video1.mp4" type="video/mp4">
            
          </video>
          <video width="320" height="240" controls>
            <source src="videos/video2.mp4" type="video/mp4">
           
          </video>
        </div>
      `;
}

function changeYear(year) {
    selectedYear = year;
    document.getElementById("yearSelected").textContent = year;
    document.querySelectorAll(".year-buttons button").forEach(btn => btn.classList.remove("active"));
    document.getElementById("btn" + year).classList.add("active");
}

// 🔑 Usuario y contraseña predeterminados (cámbialos aquí)
const USER_EMAIL = "info@elbarcoochentero.es";
const USER_PASS = "123456";

// Mostrar modal
function showLoginForm() {
    document.getElementById("loginModal").style.display = "flex";
}

// Cerrar modal
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Login con validación estricta
function login() {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (email === USER_EMAIL && pass === USER_PASS) {
        // Guardar sesión SOLO en sessionStorage
        sessionStorage.setItem("userRole", "uploader");

        // Mostrar botón de subir imagen
        document.getElementById("uploadBtn").style.display = "flex";
        document.getElementById("logoutBtn").style.display = "flex";
        document.getElementById("loginBtn").style.display = "none";

        // Cerrar modal
        closeLoginForm();

        alert("Bienvenido " + email);
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// Logout
function logout() {
    sessionStorage.removeItem("userRole");

    document.getElementById("uploadBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "flex";

    alert("Sesión cerrada correctamente");
}

// Abrir selector de archivo
function triggerFileInput() {
    document.getElementById("fileInput").click();
}

// Vista previa de la imagen subida
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "150px";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)";
            document.getElementById("gallery").appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

// Verificar sesión al cargar
window.onload = () => {
    if (sessionStorage.getItem("userRole") === "uploader") {
        document.getElementById("uploadBtn").style.display = "flex";
        document.getElementById("logoutBtn").style.display = "flex";
        document.getElementById("loginBtn").style.display = "none";
    }
};


