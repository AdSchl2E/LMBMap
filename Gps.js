const Voisin = require('./voisinage.json')
const depart = 222
const arrivé = 305
const liste = []
const Noeud = []
function Localiser () {
  for (const Salles in Voisin) {
    const Noeud = Voisin[Salles].nom
    const Droite = Voisin[Salles].voisins.droite
    const Gauche = Voisin[Salles].voisins.gauche
    const Haut = Voisin[Salles].voisins.haut
    const Bas = Voisin[Salles].voisins.bas
    liste.push([Noeud, Droite, Gauche, Haut, Bas])
  }
  return liste
}
function Trouver (SalleRecherche) {
  for (const chemins in liste) {
    for (lieu = 1; lieu < 4; lieu++) {
      for (numero in liste[chemins][lieu]) {
        const Salle = liste[chemins][lieu][numero]
        if (Salle === SalleRecherche) {
          return liste[chemins][0]
        }
      }
    }
  }
}

function Gps (Depart, Arrive) {
  const liste = Localiser()
  const SalleDeDepart = Trouver(Depart)
  const SalleDarrive = Trouver(Arrive)
  Noeud.push([Depart, SalleDeDepart], [Arrive, SalleDarrive])
  return Noeud
}

console.log(Gps(depart,arrivé))
