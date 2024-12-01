Graphe = {
    'A1':{'A2':20, 'A6':50, 'B1':6},
    'A2':{'A1':20, 'A3':60, 'A4':45},
    'A3':{'A2':60, 'B4':6},
    'A4':{'A2':60, 'A5':68},
    'A5':{'A4':68},
    'A6':{'A1':50, 'A8':20},
    'A7':{'A8':62},
    'A8':{'A6':20, 'A7':62},
    'B1':{'A1':6,  'B2':25, 'B3':50},
    'B2':{'B1':25, 'B4':45, 'B6':72},
    'B3':{'B1':50, 'B4':65, 'B5':50},
    'B4':{'A3':6,  'B2':45, 'B3':65, 'C2':6},
    'B5':{'B3':50, 'C3':6},
    'B6':{'A6':6,  'B2':72, 'B7':16, 'C5':6},
    'B7':{'B6':16, 'B8':51},
    'B8':{'B7':51, 'C6':6},
    'C1':{'C2':30, 'C7':55},
    'C2':{'B4':6,  'C1':30, 'C9':65, 'D2':6},
    'C3':{'B5':6,  'C9':43, 'D3':6},
    'C5':{'B6':6,  'C7':40, 'C10':13},
    'C6':{'B8':6,  'C10':48},
    'C7':{'C1':55, 'C5':40, 'C8':55},
    'C8':{'C7':55, 'C9':30},
    'C9':{'C2':65, 'C3':43, 'C8':30},
    'C10':{'C5':13, 'C6':48},
    'D1':{'D2':50, 'D3':50},
    'D2':{'C2':6,  'D1':50},
    'D3':{'C3':6,  'D1':50},
}

function mini(listeSommets, marque){

    var marquePlusPetite = 999;

    for (var s of listeSommets){
        //console.log(marque[s],listeSommets)
        if (marque[s] < marquePlusPetite){
            marquePlusPetite = marque[s];
            var sommetPlusPetit = s;
        }
    }
    return sommetPlusPetit
}
    
    
function dijkstra(graphe, depart, arrivee){

    var marque = {};

    for (sommet in graphe){

        marque[sommet] = 999;
        
    }
    marque[depart] = 0;
    
    var non_selectionnes = [];

    for (sommet in graphe){
        
        non_selectionnes.push(sommet);
        
    }
    var pere = {};
    pere[depart] = null;

    while (non_selectionnes.length > 0){

        var s = mini(non_selectionnes, marque);
        if (s == arrivee){break;}
        
        non_selectionnes.splice(non_selectionnes.indexOf(s),1);

        var VoisinsAVisiter = [];

        for(sommet in graphe[s]){

            if(non_selectionnes.indexOf(sommet) !== -1){

                VoisinsAVisiter.push(sommet);
            }
        }

        for (var sommet of VoisinsAVisiter){

            p = marque[s] + graphe[s][sommet];

            if (p < marque[sommet]){
                
                marque[sommet] = p;

                pere[sommet] = s;
            }
        }
    }
    return [marque, pere];
}
     
    
function CheminMin(graphe, depart, arrivee=null){
    
    var distanceETpere = dijkstra(graphe, depart, arrivee);
    var distance = distanceETpere[0];
    var pere = distanceETpere[1];
    if(arrivee != null){

        //console.log("La distance de " + depart + " à " + arrivee + " est de longueur " + distance[arrivee] + ".");
        var chemin = arrivee;
        var sommet = arrivee;
        while(pere[sommet] != null){
            chemin = pere[sommet] + ' ' + chemin;
            sommet = pere[sommet];
        }
        //console.log();
        //console.log("Le chemin de " + depart + " à " + arrivee + ": " + chemin + ".");
        return chemin.split(' ');

    }else{

        var listecle = [];
        console.log(Object.keys(distance))
        for(var keys of Object.keys(distance)){
            listecle.push(keys);
        }
        console.log("L'arbre couvrant de poid minimal pour ce graphe est:\n" + JSON.stringify(pere) + " de longueur " + distance[listecle[listecle.length-1]] + ".");
        
        for (var i ; i < listecle.length ; i++){
            chemin = listecle[i];
            sommet = listecle[i];
            while(pere[sommet] != null){
                chemin = pere[sommet] + chemin;
                sommet = pere[sommet];
            }
            console.log("Chemin de " + depart + " à " + listecle[i] + " : " + chemin,distance[listecle[i]] + " avec une longueur de {}");
        }
    }
}


NoeudToEnable = CheminMin(Graphe, 'A1','B5');