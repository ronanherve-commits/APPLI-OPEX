console.log("app.js chargé");
// Références Firebase Auth
const auth = firebase.auth();

// Références aux éléments HTML
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");

// Fonction de connexion
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log("Connecté avec succès"))
    .catch(error => alert("Erreur de connexion : " + error.message));
}

// Fonction de déconnexion
function logout() {
  auth.signOut();
}

// Surveillance de l’état de connexion
auth.onAuthStateChanged(user => {
  if (user) {
    // Utilisateur connecté
    loginDiv.style.display = "none";
    appDiv.style.display = "block";
  } else {
    // Utilisateur non connecté
    loginDiv.style.display = "block";
    appDiv.style.display = "none";
  }
});
