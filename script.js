const flickersInTheAbyss = document.getElementById("FlickersInTheAbyss");  // Updated reference here
const saveEntry = document.getElementById("saveEntry");
const entriesList = document.getElementById("entries");
const imageUpload = document.getElementById("imageUpload");
const addImage = document.getElementById("addImage");

let attachedImage = null;

// Save Entry function
saveEntry.addEventListener("click", () => {
  const text = flickersInTheAbyss.value.trim();  // Updated reference here
  if (text || attachedImage) {
    const date = new Date().toLocaleString();
    const entry = { text, date, image: attachedImage };
    displayEntry(entry);
    saveEntryToLocalStorage(entry);
    flickersInTheAbyss.value = "";  // Updated reference here
    attachedImage = null;
  } else {
    alert("Please write something or attach an image!");
  }
});

// Display Entry function
function displayEntry(entry) {
  const li = document.createElement("li");
  li.innerHTML = `  
    <strong>${entry.date}</strong><br>
    <p>${entry.text}</p>
    ${entry.image ? `<img src="${entry.image}" alt="Diary Image">` : ""}
  `;
  entriesList.appendChild(li);
}

// Save entry to localStorage
function saveEntryToLocalStorage(entry) {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

// Load saved entries from localStorage
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.forEach(entry => displayEntry(entry));
}

// Image upload handler
addImage.addEventListener("click", () => {
  if (imageUpload.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      attachedImage = e.target.result;
      alert("Image attached successfully!");
    };
    reader.readAsDataURL(imageUpload.files[0]);
  } else {
    alert("No image selected.");
  }
});

// Theme toggle (if any)
const themeToggle = document.getElementById("themeToggle");
themeToggle && themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initial load of entries
window.onload = loadEntries;
