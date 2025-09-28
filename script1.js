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


    // Configuración de Firebase 
  const firebaseConfig = {
    apiKey: "AIzaSyBkeFdC-fw2V61UPSHu0fQ52lQAxqSa9Uk",
    authDomain: "barco-25.firebaseapp.com",
    projectId: "barco-25",
    storageBucket: "barco-25.firebasestorage.app",
    messagingSenderId: "971934625615",
    appId: "1:971934625615"
  };

  // Inicializar Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const storage = firebase.storage();

  // Mostrar formulario login
  function showLoginForm() {
    document.getElementById("loginModal").style.display = "flex";
  }

  // Cerrar login
  function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
  }

  // Login en Firebase
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Acceso permitido ✅");
        closeLoginForm();
        document.getElementById("fileInput").click(); // abre selector de archivos
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  }

  // Subida de imagen
  function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = storage.ref('imagenes/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progreso: " + progress + "%");
      }, 
      error => {
        alert("Error al subir: " + error.message);
      }, 
      () => {
        alert("Imagen subida correctamente ✅");
      }
    );
  }