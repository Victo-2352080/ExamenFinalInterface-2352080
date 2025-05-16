
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

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
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

    const url = genererNouvelleCle ? "https://webexamenfinal-2352080.onrender.com/api/utilisateur/cle" : "https://webexamenfinal-2352080.onrender.com/api/utilisateur/cle";
    const method = genererNouvelleCle ? "POST" : "GET";

    let fetchOptions;

    if (method === "GET") {
        const params = new URLSearchParams({ courriel, mot_de_passe: mdp });
        fetchOptions = { method: "GET" };
        fetch(url + "?" + params.toString(), fetchOptions)
            .then(res => res.json())
            .then(data => {
                if (data.cle_api) {
                    alert("Votre clé API : " + data.cle_api);
                } else {
                    alert("Erreur : " + (data.message || "Impossible de récupérer la clé."));
                }
            })
            .catch(err => {
                console.error("Erreur récupération clé API :", err);
                alert("Erreur réseau ou serveur.");
            });
    } else {
        fetchOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courriel, mot_de_passe: mdp })
        };
        fetch(url, fetchOptions)
            .then(res => res.json())
            .then(data => {
                if (data.cle_api) {
                    alert("Nouvelle clé API générée : " + data.cle_api);
                } else {
                    alert("Erreur : " + (data.message || "Impossible de générer la clé."));
                }
            })
            .catch(err => {
                console.error("Erreur génération clé API :", err);
                alert("Erreur réseau ou serveur.");
            });
    }
});
