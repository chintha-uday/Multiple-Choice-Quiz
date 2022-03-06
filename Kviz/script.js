
/// Pitanja - objekti

let pitanje1 = {
    Tekst: "Would you mind ________ a window?",
    Odgovori: ["to open", "opening", "to open/opening", "opened"],
    Tacan: 1
}

let pitanje2 = {
    Tekst: "My father hates ________ a tie to work.",
    Odgovori: ["wears", "to wear/wearing", "wore", "wearing", "weared"],
    Tacan: 3
}

let pitanje3 = {
    Tekst: "She switched the radio ________ and went outside.",
    Odgovori: ["off", "on", "out", "at"],
    Tacan: 0
}

let pitanje4 = {
    Tekst: "He _____ arrive on time.",
    Odgovori: ["is", "are", "will"],
    Tacan: 2
}

let pitanje5 = {
    Tekst: "We will _____ what your father says.",
    Odgovori: ["seeing", "saw", "seen", "see"],
    Tacan: 3
}

let pitanje6 = {
    Tekst: "The window _____ closed.",
    Odgovori: ["are", "being", "to be", "is", "did"],
    Tacan: 3
}

let pitanje7 = {
    Tekst: "They _____ all day long.",
    Odgovori: ["works", "work", "working", "to work"],
    Tacan: 1
}

let pitanje8 = {
    Tekst: "He went _____ of the house.",
    Odgovori: ["into", "out", "on", "at", "off"],
    Tacan: 1
}

let pitanje9 = {
    Tekst: "Satellites orbit _____ the earth.",
    Odgovori: ["around", "between", "away", "inside"],
    Tacan: 0
}

let pitanje10 = {
    Tekst: "He is _____ lunch tomorrow.",
    Odgovori: ["brushing", "looking", "dusting", "cooking"],
    Tacan: 3
}

////////////////////////////////////////////////////////////////

let pitanja = [pitanje1, pitanje2, pitanje3, pitanje4, pitanje5, pitanje6, pitanje7, pitanje8, pitanje9, pitanje10];
let kvizSadrzaj = document.getElementById("kviz");
let rezultatiDiv = document.getElementById("rezultati");
let brojPitanja = 5;
let odgNaPitanja;
let pitanjeFieldset;
let forma;
let nizDatihPitanja = [];

////////////////////////////////////////////////////////////////

function izmesajNiz(niz) {
    let novaPozicija, temp;
    for(let i = niz.length - 1; i > 0; i--) {
        novaPozicija = Math.floor(Math.random() * (i + 1));
        temp = niz[i];
        niz[i] = niz[novaPozicija];
        niz[novaPozicija] = temp;
    }
    return niz;
}


izmesajNiz(pitanja);

////////////////////////////////////////////////////////////////


function napraviKviz() {
	kvizSadrzaj.innerHTML = '<form id="forma">';
	forma = document.getElementById("forma");
    
    for(let i = 0; i < pitanja.length; i++) {
		if(i < brojPitanja) {
			nizDatihPitanja[i] = pitanja[i]
			odgNaPitanja = pitanja[i].Odgovori;
			
			forma.innerHTML += `<fieldset id="pitanje${i}">`;
			pitanjeFieldset = document.getElementById(`pitanje${i}`);
			
			for(let j = 0; j < odgNaPitanja.length; j++) {
				if(j == 0) {
					pitanjeFieldset.innerHTML += `<legend>${i + 1}. ${pitanja[i].Tekst}</legend>`;
					pitanjeFieldset.innerHTML += `<input type="radio" name="odgovori${i}" id="odgovor${j}" checked> ${odgNaPitanja[j]}<br>`;
				} 
                else {
					pitanjeFieldset.innerHTML += `<input type="radio" name="odgovori${i}" id="odgovor${j}"> ${odgNaPitanja[j]}<br>`;
				}
			}
			forma.innerHTML += `</fieldset>`;
		}
    }
    kvizSadrzaj.innerHTML += '</form>';
}

napraviKviz(pitanja);

////////////////////////////////////////////////////////////////

function resetujKviz() {
	rezultatiDiv.innerHTML = "";
	izmesajNiz(pitanja);
	napraviKviz(pitanja);
}

////////////////////////////////////////////////////////////////

function posaljiOdgovore() {
	rezultatiDiv.innerHTML = "";
	
	for(let i = 0; i < brojPitanja; i++) {
		
		trenutniFieldset = document.getElementById(`pitanje${i}`);
		fieldsetInputi = trenutniFieldset.querySelectorAll("input");
		
		for(let j = 0; j < fieldsetInputi.length; j++) {
            fieldsetInputi[j].disabled = true;
			if(fieldsetInputi[j].checked) {
				if(j == nizDatihPitanja[i].Tacan) {
					rezultatiDiv.innerHTML += `<p style="color: green;">Pitanje ${i+1}. ste tacno odgovorili.</p>`;
				} 
                else {
					rezultatiDiv.innerHTML += `<p style="color: red;">Pitanje ${i+1}. ste netacno odgovorili.</p>`;
				}
			}
		}
	}
}

////////////////////////////////////////////////////////////////

document.getElementById("novaPitanja").addEventListener("click", resetujKviz);
document.getElementById("submit").addEventListener("click", posaljiOdgovore);