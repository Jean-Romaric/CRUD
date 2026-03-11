    const API = "http://localhost:3000/produits"


    //Crée Produit//
    async function addProduit() {

        let nom = document.getElementById("nom")
        let couleur = document.getElementById("couleur")

        let data = {
            nom: nom.value,
            couleur: couleur.value
        }

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) //donnée envoyée au serveur dans le body de la requette
        })
        couleur.value = "";
        nom.value = "";
        loadProduits()
    }

    //Afficher des Produits//
    async function loadProduits() {

        const res = await fetch(API)
        const produits = await res.json()

        //console.log(produits);

        const ul = document.getElementById("liste")
        ul.innerHTML = ""

        produits.forEach(p => {

            ul.innerHTML += `
            <li>
            ${p.nom} - ${p.couleur}
            <button onclick="deleteProduit(${p.id})">Supprimer</button>
            <button onclick="getOneProduit(${p.id})">Voir produit</button>
            </li>
            `

        })

    }

    //Afficher un Produit//
    async function getOneProduit(id) {
        const res = await fetch(API)
        const produits = await res.json()

        for(let i=0; i<produits.length; i++){
            if(produits[i].id == id){ //produits[i] correspond à un produit de la liste, on vérifie si son id correspond à celui passé en paramètre
            let maFenetre =   window.open('http://127.0.0.1:5500/frontend/produit.html', '_blank');
                maFenetre.onload = function() {
                // L'élément est maintenant disponible
                let monTitre = maFenetre.document.querySelector("h1");
                monTitre.textContent = `Produit: ${produits[i].nom} - Couleur: ${produits[i].couleur}`;
                monTitre.style.color = "green";
            };
            }
        }
    }


    //Supprimer un Produit//
    async function deleteProduit(id) {

        await fetch(API + "/" + id, {
            method: "DELETE"
        })

        loadProduits()

    }

    //Supprimer tout Produits//
    async function deleteAllProduits() {

        await fetch(API, {
            method: "DELETE"
        })
        loadProduits()

    }




loadProduits()