const btnCreer = document.getElementById("btn-creer");
const btnRecup = document.getElementById("btn-recup");

const inputPrenom = document.getElementById("uti-prenom");
const inputNom = document.getElementById("uti-nom");
const inputCourriel = document.getElementById("uti-courriel");
const inputMdp = document.getElementById("uti-mdp");

const inputCleCourriel = document.getElementById("cle-courriel");
const inputCleMdp = document.getElementById("cle-mdp");
const inputGenererCle = document.getElementById("cle-gnr");

btnCreer.addEventListener("click", () => {
    const prenom = inputPrenom.value.trim();
    const nom = inputNom.value.trim();
    const courriel = inputCourriel.value.trim();
    const mdp = inputMdp.value.trim();

    if (!prenom || !nom || !courriel || !mdp) {
        alert("Tous les champs sont obligatoires pour créer un utilisateur.");
        return;
    }

    const url = "https://webexamenfinal-2352080.onrender.com/api/utilisateur";
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, nom, courriel, mot_de_passe: mdp })
    };

    btnCreer.disabled = true;
    btnCreer.textContent = "Création...";

    fetch(url, options)
        .then(res => {
            console.log("Réponse brute reçue :", res);
            return res.json();
        })
        .then(data => {
            console.log("Réponse JSON :", data);
            if (data.utilisateur) {
                alert("Utilisateur créé avec succès !");
                inputPrenom.value = "";
                inputNom.value = "";
                inputCourriel.value = "";
                inputMdp.value = "";
            } else {
                alert("Erreur lors de la création : " + (data.message || "Erreur inconnue"));
            }
        })
        .catch(err => {
            console.error("Erreur lors de la création utilisateur :", err);
            alert("Erreur réseau ou serveur.");
        })
        .finally(() => {
            btnCreer.disabled = false;
            btnCreer.textContent = "Créer";
        });
});

btnRecup.addEventListener("click", () => {
    const courriel = inputCleCourriel.value.trim();
    const mdp = inputCleMdp.value.trim();
    const genererNouvelleCle = inputGenererCle.checked;

    if (!courriel || !mdp) {
        alert("Courriel et mot de passe sont obligatoires pour récupérer une clé API.");
        return;
    }

    const url = "https://webexamenfinal-2352080.onrender.com/api/utilisateur/cle";

    btnRecup.disabled = true;
    btnRecup.textContent = genererNouvelleCle ? "Génération..." : "Récupération...";

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courriel, mot_de_passe: mdp, generer: genererNouvelleCle })
    })
    .then(res => res.json())
    .then(data => {
        if (data.cle_api) {
            alert((genererNouvelleCle ? "Nouvelle clé API générée : " : "Clé API existante : ") + data.cle_api);
        } else {
            alert("Erreur : " + (data.message || "Erreur inconnue"));
        }
    })
    .catch(err => {
        console.error("Erreur API :", err);
        alert("Erreur réseau ou serveur.");
    })
    .finally(() => {
        btnRecup.disabled = false;
        btnRecup.textContent = "Récuperer";
    });
});
