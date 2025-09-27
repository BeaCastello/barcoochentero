// Configuración de Firebase (reemplaza con tus datos)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase (versión compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Referencias DOM
const gallery = document.getElementById("gallery");
const yearsList = document.getElementById("years");
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const uploadSection = document.getElementById("uploadSection");

let currentYear = null;

// 📌 Mostrar años
function loadYears() {
  db.collection("años").orderBy("year", "desc").onSnapshot(snapshot => {
    yearsList.innerHTML = "";
    snapshot.forEach(doc => {
      const year = doc.data().year;
      const li = document.createElement("li");
      li.textContent = year;
      li.classList.add("year-item");
      li.onclick = () => loadImages(year);
      yearsList.appendChild(li);
    });
  });
}

// 📌 Cargar imágenes de un año
function loadImages(year) {
  currentYear = year;
  gallery.innerHTML = "";
  db.collection("imagenes").where("year","==",year).onSnapshot(snapshot => {
    gallery.innerHTML = "";
    if (snapshot.empty) {
      gallery.innerHTML = `<p>No hay imágenes para ${year}</p>`;
    }
    snapshot.forEach(doc => {
      const data = doc.data();
      const img = document.createElement("img");
      img.src = data.url;
      img.classList.add("gallery-img");
      img.onclick = () => deleteImage(doc.id, data.path);
      gallery.appendChild(img);
    });
  });
}

// 📌 Subir imagen
document.getElementById("uploadBtn").onclick = async () => {
  const file = document.getElementById("fileInput").files[0];
  const year = document.getElementById("yearInput").value;
  if (!file || !year) return alert("Falta archivo o año");

  const path = `imagenes/${year}/${file.name}`;
  const storageRef = storage.ref(path);

  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();

  // Guardar imagen
  await db.collection("imagenes").add({
    url,
    path,
    year: parseInt(year)
  });

  // 📌 Asegurar que el año exista en la colección de años
  const yearDoc = db.collection("años").doc(year);
  const yearData = await yearDoc.get();
  if (!yearData.exists) {
    await yearDoc.set({ year: parseInt(year) });
  }

  loadImages(year);
};

// 📌 Eliminar imagen
async function deleteImage(id, path) {
  if (confirm("¿Eliminar esta imagen?")) {
    await storage.ref(path).delete();
    await db.collection("imagenes").doc(id).delete();
    loadImages(currentYear);
  }
}

// 📌 Login
loginBtn.onclick = () => loginModal.style.display = "flex";
document.getElementById("signInBtn").onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => loginModal.style.display = "none")
    .catch(err => alert(err.message));
};

logoutBtn.onclick = () => auth.signOut();

// 📌 Estado de sesión
auth.onAuthStateChanged(user => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    uploadSection.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    uploadSection.style.display = "none";
  }
});

// Inicial
loadYears();