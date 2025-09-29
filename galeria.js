<!-- Sidebar izquierda -->
<div class="sidebar" style="background:#f0f0f0; padding:20px; width:250px;">
  <img src="imagenes/iconoLogo.png" style="max-width:100px;">
  <h2>Barcoochentero</h2>
  <p style="margin-bottom: 25px;">Año seleccionado: <span id="yearSelected">2025</span></p>

  <div class="year-buttons">
    <button onclick="changeYear(2022)" id="btn2022">2022</button>
    <button onclick="changeYear(2023)" id="btn2023">2023</button>
    <button onclick="changeYear(2024)" id="btn2024">2024</button>
    <button onclick="changeYear(2025)" id="btn2025" class="active">2025</button>
  </div>

  <button onclick="showPhotos()">📷 Foto</button>
  <button onclick="showVideos()">🎬 Videos</button>

  <!-- Botón subir (oculto hasta login correcto) -->
  <button id="uploadBtn" onclick="triggerFileInput()" style="margin-top:20px; display:none;">⬆️ Subir</button>

  <!-- Input oculto -->
  <input type="file" id="fileInput" style="display:none" onchange="handleFile(event)">
</div>

<!-- Columna derecha: galería -->
<section class="content" id="content" style="flex-grow:1; padding:20px;">
  <h3 id="galleryTitle">Seleccione año y categoría</h3>
  <div id="gallery" style="flex:1; overflow-y:auto; display:grid; grid-template-columns: repeat(4,1fr); gap:20px; margin-top:20px;"></div>
</section>

<!-- Modal de login -->
<div id="loginModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; 
  background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index: 2;">
  <div style="background:white; padding:20px; border-radius:10px; width:300px; text-align:center;">
    <h3>Acceso requerido</h3>
    <input type="email" id="email" placeholder="Usuario (email)" style="width:90%; margin:10px 0; padding:5px;">
    <input type="password" id="password" placeholder="Contraseña" style="width:90%; margin:10px 0; padding:5px;">
    <br>
    <button onclick="login()" style="padding:8px 15px; margin-top:10px;">Ingresar</button>
    <button onclick="closeLoginForm()" style="padding:8px 15px; margin-top:10px;">Cancelar</button>
  </div>
</div>

<script>
  let selectedYear = 2025;
  let selectedCategory = null; // "photos" o "videos"

  // Estructura de datos: archivos por año y categoría
  const mediaByYear = {
    2022: { photos: [], videos: [] },
    2023: { photos: [], videos: [] },
    2024: { photos: [], videos: [] },
    2025: { photos: [], videos: [] },
  };

  function changeYear(year) {
    selectedYear = year;
    document.getElementById("yearSelected").textContent = year;
    renderGallery();
  }

  function showPhotos() {
    selectedCategory = "photos";
    document.getElementById("galleryTitle").textContent = `Fotos del año ${selectedYear}`;
    renderGallery();
  }

  function showVideos() {
    selectedCategory = "videos";
    document.getElementById("galleryTitle").textContent = `Videos del año ${selectedYear}`;
    renderGallery();
  }

  function renderGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    if (!selectedCategory) {
      gallery.innerHTML = "<p>Seleccione categoría (Foto o Video)</p>";
      return;
    }

    mediaByYear[selectedYear][selectedCategory].forEach(fileData => {
      if (selectedCategory === "photos") {
        const img = document.createElement("img");
        img.src = fileData;
        img.style.width = "100%";
        img.style.height = "200px";
        img.style.objectFit = "cover";
        img.setAttribute("download", "imagen.jpg");
        gallery.appendChild(img);
      } else {
        const video = document.createElement("video");
        video.src = fileData;
        video.controls = true;
        video.style.width = "100%";
        video.style.height = "200px";
        gallery.appendChild(video);
      }
    });
  }

  // Subir archivo
  function triggerFileInput() {
    if (!selectedCategory) {
      alert("Primero selecciona Foto o Video.");
      return;
    }
    const fileInput = document.getElementById("fileInput");
    fileInput.accept = selectedCategory === "photos" ? "image/*" : "video/*";
    fileInput.click();
  }

  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      mediaByYear[selectedYear][selectedCategory].push(e.target.result);
      renderGallery();
    };
    reader.readAsDataURL(file);
  }

  // === LOGIN (básico con credenciales predeterminadas) ===
  const VALID_EMAIL = "admin@correo.com";
  const VALID_PASSWORD = "1234";

  function showLoginForm() {
    document.getElementById("loginModal").style.display = "flex";
  }

  function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
  }

  function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (email === VALID_EMAIL && pass === VALID_PASSWORD) {
      alert("¡Login exitoso!");
      localStorage.setItem("loggedIn", "true");
      document.getElementById("uploadBtn").style.display = "block";
      closeLoginForm();
    } else {
      alert("Credenciales incorrectas");
    }
  }

  function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("uploadBtn").style.display = "none";
  }

  // Mantener estado de login al recargar
  window.onload = () => {
    if (localStorage.getItem("loggedIn") === "true") {
      document.getElementById("uploadBtn").style.display = "block";
    }
  };
</script>
