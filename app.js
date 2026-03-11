const express = require("express")
const cors = require("cors")
const db = require("./config/db")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true })) //permet d'envoyer des données dans le body de la requette en utilisant le format x-www-form-urlencoded, qui est un format de données couramment utilisé pour envoyer des données de formulaire. L'option extended: true permet de parser les données imbriquées, ce qui signifie que vous pouvez envoyer des objets et des tableaux dans le body de la requette.
app.use(express.json())
app.use(express.static("public"))


//le backend reçoit les données du frontend dans le body de la requette
// il faut donc utiliser express.json() pour les parser et les rendre accessibles dans req.body .
//parser veut dire transformer les données d'un format à un autre, ici de JSON à un objet JavaScript utilisable dans notre code.

/* CREATE */
app.post("/produits", (req,res)=>{

    const nom = req.body.nom;
    const couleur = req.body.couleur;
    //const {nom, couleur} = req.body
    //console.log(nom, couleur);
    //console.log(req);
    //console.log(req.body);

    const sql = "INSERT INTO produits (nom,couleur) VALUES (?,?)"

    db.query(sql,[nom,couleur],(err,result)=>{
        if(err) throw err
      //   console.log(result);
      //res.redirect("http://127.0.0.1:5500/frontend/test.html")
        res.status(200).json({message:"Produit ajouté", id:result.insertId}) //result.insertId contient l'id du produit ajouté
    })
})

/* READ */
app.get("/produits",(req,res)=>{
    db.query("SELECT * FROM produits",(err,result)=>{
        if(err) throw err
        //console.log(result);
        res.json(result)
    })
})

/* UPDATE */
app.put("/produits/:id",(req,res)=>{
    const {nom,couleur} = req.body
    const id = req.params.id

    const sql = "UPDATE produits SET nom=?, couleur=? WHERE id=?"

    db.query(sql,[nom,couleur,id],(err,result)=>{
        if(err) throw err
        res.send("Produit modifié")
    })
})

/* get one produit */
app.get("/produits/:id",(req,res)=>{
    const id = req.params.id

    db.query("SELECT * FROM produits WHERE id=?",[id],(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})

/* DELETE */
app.delete("/produits/:id",(req,res)=>{
    const id = req.params.id
    // côté frontend : /produits/3
    // côté backend : id = 3, Il stocke cette valeur dans : req.params


    console.log(req.params);
    console.log(id);
    db.query("DELETE FROM produits WHERE id=?",[id],(err,result)=>{
        if(err) throw err
        res.send("Produit supprimé")
    })
})

/* DELETE ALL*/
app.delete("/produits",(req,res)=>{
    db.query("DELETE FROM produits",(err,result)=>{
        if(err) throw err
        res.send("Tous les produits ont été supprimés")
    })});




app.listen(3000,()=>{
    console.log("Serveur lancé sur port 3000")
})