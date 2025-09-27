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