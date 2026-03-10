const API = "http://localhost:3000/produits"


//Crée Produit//
async function addProduit() {

    const nom = document.getElementById("nom").value
    const couleur = document.getElementById("couleur").value


    let data = {
        nom: nom,
        couleur: couleur
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) //donnée envoyée au serveur dans le body de la requette
    })
    console.log(JSON.stringify(data));
  //  console.log(data);

    loadProduits()

}


//Afficher Produits//
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
    //console.log(produits);
    
    produits.filter(ChekProduit);

    function ChekProduit(produit){
        console.log(id);
        console.log('  ');
        console.log(produit.id);
    }
}    







//Supprimer un Produit//
async function deleteProduit(id) {

    await fetch(API + "/" + id, {
        method: "DELETE"
    })

    loadProduits()

}





loadProduits()