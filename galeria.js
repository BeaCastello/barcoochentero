let currentYear = 2025; 

  function changeYear(year) {
    currentYear = year;
    document.getElementById("yearSelected").textContent = year;

    // Ocultar todas las galerías
    document.querySelectorAll(".gallery").forEach(g => g.style.display = "none");

    // Galería del año seleccionado
    document.getElementById("gallery" + year).style.display = "grid";

    // Actualizar botones activos
    document.querySelectorAll(".year-buttons button").forEach(btn => btn.classList.remove("active"));
    document.getElementById("btn" + year).classList.add("active");
  }

  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      let element;
      if (file.type.startsWith("image/")) {
        element = document.createElement("img");
        element.src = e.target.result;
      } else if (file.type.startsWith("video/")) {
        element = document.createElement("video");
        element.src = e.target.result;
        element.controls = true;
      }
      element.style.width = "100%";
      element.style.height = "200px";
      element.style.objectFit = "cover";

      // Insertar en la galería del año seleccionado
      document.getElementById("gallery" + currentYear).appendChild(element);
    };
    reader.readAsDataURL(file);
  }