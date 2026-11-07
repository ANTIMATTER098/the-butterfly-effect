let playerName = "";
let playerGender = "";

function startGame(gender) {
    playerName = document.getElementById("player-name").value.trim() || "Amico/a";
    playerGender = gender;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    showEp1Bivio();
}

function showText(text) {
    document.getElementById("text-area").innerHTML = text;
}

function setBackground(imageUrl) {
    document.getElementById("background-image").style.backgroundImage = imageUrl ? `url('${imageUrl}')` : 'none';
}

function setCharacter(imageUrl) {
    document.getElementById("character-image").style.backgroundImage = imageUrl ? `url('${imageUrl}')` : 'none';
}

function setChoices(choices) {
    const choicesArea = document.getElementById("choices-area");
    choicesArea.innerHTML = "";
    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.onclick = choice.action;
        choicesArea.appendChild(btn);
    });
}

// ==========================================
// EPISODIO 1: L'ABITO
// ==========================================
function showEp1Bivio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sei davanti allo specchio. Stasera hai un appuntamento con ${playerGender === 'uomo' ? 'Mia' : 'Noah'}.<br><br>Non sai bene cosa metterti.`);
    setChoices([
        { text: "A) Elegante", action: () => showEp1RamoElegante() },
        { text: "B) Casual", action: () => showEp1RamoCasual() }
    ]);
}

function showEp1RamoElegante() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    
    setBackground('bistrot-elegante.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al bistrot. ${partner} è già seduto/a al tavolo e ti sorride.<br><br>Ti presenti tirato a lucido. ${partner} ti vede e alza un sopracciglio.<br><br><strong>${partner}:</strong> «Wow. Ti sei messo/a in tiro per me?»<br><br>La serata parte rigida, quasi formale. Poi, tra una portata e l'altra, ${partner} si sporge.<br><br><strong>${partner}:</strong> «Posso dirti una cosa? Sono nervoso/a. Non lo dico mai.»<br><br>Qualcosa si scioglie. Ridete della tensione, e la serata decolla.`);
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("elegante") }
        ]);
    }, 100);
}

function showEp1RamoCasual() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    
    setBackground('diner-casual.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al diner. ${partner} è già seduto/a al tavolo e ti fa cenno di avvicinarti.<br><br>Ti presenti comodo, senza pretese. ${partner} ti squadra e scoppia a ridere.<br><br><strong>${partner}:</strong> «Tutto questo per me? Non dovevi.»<br><br><strong>Tu:</strong> «Sono un tipo semplice.»<br><br><strong>${partner}:</strong> «Mi piaci già.»<br><br>La serata è leggera, piena di battute. A un certo punto rovesci qualcosa e ${partner} ride talmente tanto da doversi asciugare gli occhi.`);
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("casual") }
        ]);
    }, 100);
}

function showEp1Finale(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let genderSuffix = playerGender === 'uomo' ? 'o' : 'a';
    
    setBackground('strada-notte.jpg'); 
    setCharacter(''); 

    if (tipo === "elegante") {
        showText(`Dopo cena, l'accompagni a casa. La serata finisce davanti al portone. Vi guardate un secondo di troppo.<br><br><strong>${partner}:</strong> «Ci vediamo presto, sì?»`);
    } else {
        showText(`Dopo cena, l'accompagni a casa. La serata finisce davanti al portone, ancora ridendo.<br><br><strong>${partner}:</strong> «Allora devi rimediare. Con un'altra serata.»<br><br>«Ci vediamo presto, sì?»`);
    }

    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Ti sei fidanzat${genderSuffix}!!</p>`);
        setChoices([
            { text: "Vai all'Episodio 2", action: () => showEp2Bivio() }
        ]);
    }, 3000);
}

// ==========================================
// EPISODIO 2: IL MESSAGGIO
// ==========================================
function showEp2Bivio() {
    setBackground(''); 
    setCharacter('');
    
    showText(`Sera. Sei sul divano, telefono in mano. Il tuo migliore amico (il BFF) ti ha scritto: "Tutto ok?".<br><br>Tu sai che è il momento di dirgli la verità: hai paura di restare da solo/a. Le dita esitano sulla tastiera.<br><br>Cosa gli scrivi?`);
    
    setChoices([
        { text: "A) Sincero e diretto", action: () => showEp2Diretto() },
        { text: "B) Leggero e scherzoso", action: () => showEp2Scherzoso() },
        { text: "C) Evasivo", action: () => showEp2Evasivo() }
    ]);
}

function showEp2Diretto() {
    showText(`<em>«Devo dirti una cosa. Ho paura di restare solo/a. È una cosa che mi porto dentro da un po'»</em><br><br>Il BFF risponde dopo pochi secondi.<br><br><strong>BFF:</strong> «Grazie per avermelo detto. Anch'io a volte ho paura di restare solo/a. Non me ne vergogno se non ti vergogni tu.»<br><br>Ti apri anche tu. Parlate fino a tarda notte. Per la prima volta la paura non è un peso da nascondere.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Hai superato le tue paure!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}

function showEp2Scherzoso() {
    showText(`<em>«Sai cosa mi serve? Un manuale: 'Come non finire solo/a — edizione illustrata'. Comunque sì, tutto ok. Più o meno»</em><br><br>Il BFF risponde con una risata scritta.<br><br><strong>BFF:</strong> «Ah, il manuale mi serve pure a me. Capitolo 1: 'Respira'. Capitolo 2: 'Chiamami quando ci pensi'. Capitolo 3: 'Non sei solo/a, scemo/a'.»<br><br>Ridete. E proprio scherzando, senza volerlo, toccate il punto. Capisci che non serve essere seri per dirsi le cose vere.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Ridere insieme vi ha reso più vicini!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}

function showEp2Evasivo() {
    showText(`<em>«Tutto ok. Dai, niente di che. Ci sentiamo domani?»</em><br><br>Il BFF risponde con un cuoricino, ma poi scrive:<br><br><strong>BFF:</strong> «Ok... però mi sembra che tu mi stia nascondendo qualcosa. Va bene, non insisto.»<br><br>Nei giorni seguenti ti sta più vicino. Ti scrive quando sei giù, si ferma a parlare anche quando non serve. E tu inizi a fare lo stesso con lui/lei, senza dirlo. La distanza non si chiude con le parole, ma con la presenza.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Esserci sempre, anche in silenzio!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}
