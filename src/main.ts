import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div>
    <h1>Marmitop</h1>
  </div>
`
const frameTop = document.createElement('section');
frameTop.setAttribute("class","frame_top");

// const divTop = document.createElement('div');
// divTop.setAttribute("class","divTop");
// const divBottom = document.createElement('div');
// divTop.setAttribute("class","divBottom");

const divNom = document.createElement('div');
divNom.setAttribute("class","divNom");
const divImage = document.createElement('div');
divImage.setAttribute("class","divImage");
const divDuree = document.createElement('div');
divDuree.setAttribute("class","divDuree");
const divNote = document.createElement('div');
divNote.setAttribute("class","divNote");

const label_nom = document.createElement('label');
label_nom.setAttribute("id","label_nom");
label_nom.innerText="nom";

const nom = document.createElement('input');
nom.setAttribute("id","input");
nom.setAttribute("label", "text");
nom.setAttribute("placeholder", "placeholder");

const label_image = document.createElement('label');
label_image.setAttribute("id","label_image");
label_image.innerText="lien image";

const lien_image = document.createElement('input');
lien_image.setAttribute("id","input");
lien_image.setAttribute("label", "text");
lien_image.setAttribute("placeholder", "placeholder");

const label_duree = document.createElement('label');
label_duree.setAttribute("id","label_duree");
label_duree.innerText="durée en minutes";

const duree = document.createElement('input');
duree.setAttribute("id","input");
duree.setAttribute("label", "text");
duree.setAttribute("placeholder", "placeholder");

const label_note = document.createElement('label');
label_note.setAttribute("id","label_note");
label_note.innerText="note sur 5";

const note = document.createElement('input');
note.setAttribute("id","input");
note.setAttribute("label", "text");
note.setAttribute("placeholder", "placeholder");

const button_add = document.createElement('button');
button_add.setAttribute("id","button_add");
button_add.setAttribute("type","button");
button_add.innerText = "Ajouter";

const divRecettes = document.createElement('div');
divRecettes.setAttribute("class","div_recettes");
divRecettes.innerHTML = `
  <h2> Mes Recettes </h2>
  `;

app.appendChild(frameTop);
//frameTop.appendChild(divTop);
frameTop.appendChild(divNom);
divNom.appendChild(label_nom);
divNom.appendChild(nom);
frameTop.appendChild(divImage);
divImage.appendChild(label_image);
divImage.appendChild(lien_image);
//frameTop.appendChild(divBottom);
frameTop.appendChild(divDuree);
divDuree.appendChild(label_duree);
divDuree.appendChild(duree);
frameTop.appendChild(divNote);
divNote.appendChild(label_note);
divNote.appendChild(note);
frameTop.appendChild(button_add);
app.appendChild(divRecettes);

async function start(){
  const response = await fetch("http://localhost:3333/findAll");
  const data = await response.text()
  const recipes = JSON.parse(data)
  //console.log('recipes', recipes)
  return recipes;
}

const tabRecipes = await start();
console.log('tabRecipes',tabRecipes);

for(let i=0;i<tabRecipes.length;i++) {
const recDiv = document.createElement("div");
recDiv.setAttribute("class","rec_div");
app.appendChild(recDiv);
const recDiv_left = document.createElement("div");
recDiv_left.setAttribute("class","rec_div_left");
const recDiv_right = document.createElement("div");
recDiv_right.setAttribute("class","rec_div_right");
recDiv.appendChild(recDiv_left);
recDiv.appendChild(recDiv_right);
const nomDiv = document.createElement("div");
nomDiv.setAttribute("id","nom_div");
nomDiv.innerHTML = `
<h3>${tabRecipes[i].nom}</h3>
`;
recDiv_left.appendChild(nomDiv);

const noteDiv = document.createElement("div");
noteDiv.setAttribute("id","note_div");
noteDiv.innerText = `
Note : ${tabRecipes[i].note}/5
`;
recDiv_left.appendChild(noteDiv);

const dureeDiv = document.createElement("div");
dureeDiv.setAttribute("id","duree_div");
let minutes = tabRecipes[i].duree;
let heures = 0;
if (minutes>=60) {
  minutes=minutes%60;
  heures=Math.floor(minutes/60);
}
if (heures != 0) {
  dureeDiv.innerText = `
  Durée : ${heures} heures ${minutes} minutes
  `;
}
else {
  dureeDiv.innerText = `
  Durée : ${minutes} minutes
  `;
}

recDiv_left.appendChild(dureeDiv);

const imageDiv = document.createElement("div");
imageDiv.setAttribute("id","image_div");
imageDiv.innerText = `
Lien : ${tabRecipes[i].image}
`;
recDiv_right.appendChild(imageDiv);
}




// const resRecipes = await fetch("http://localhost:3333/findAll");
// const messageRecipes = await resRecipes.text();
// console.log(messageRecipes);

button_add.addEventListener('click', async() => {
  // input.value = ""
  console.log(nom.value)
  let nomModifie = nom.value.replaceAll(" ","%20").replaceAll(":","%3A").replaceAll("/","%2F");
  let imageModifie = lien_image.value.replaceAll(" ","%20").replaceAll(":","%3A").replaceAll("/","%2F").replaceAll("/","%2F");
  console.log(imageModifie);
  let dureeModifie = duree.value.replaceAll(" ","%20").replaceAll(":","%3A").replaceAll("/","%2F");
  let noteModifie = note.value.replaceAll(" ","%20").replaceAll(":","%3A").replaceAll("/","%2F");
  if(nom.value.length != 0) {
    const resNom = await fetch("http://localhost:3333/saveRecipe/" + nomModifie +"/"+imageModifie +"/"+dureeModifie+"/"+noteModifie, {method : "POST"});
    const messageNom = await resNom.text();
    console.log(messageNom);

    
  }
});


