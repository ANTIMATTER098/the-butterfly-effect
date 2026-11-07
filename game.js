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

// --- EPISODIO 1 ---
function showEp1Bivio() {
    showText(`Sei davanti allo specchio. Stasera hai un appuntamento con ${playerGender === 'uomo' ? 'Mia' : 'Noah'}.<br><br>Non sai bene cosa metterti.`);
    setChoices([
        { text: "A) Elegante", action: () => showEp1RamoElegante() },
        { text: "B) Casual", action: () => showEp1RamoCasual() }
    ]);
}

function showEp1RamoElegante() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    showText(`Ti presenti tirato a lucido. ${partner} ti vede e sorride, un sopracciglio alzato.<br><br><strong>${partner}:</strong> «Wow. Ti sei messo/a in tiro per me?»<br><br>La serata parte rigida, quasi formale. Poi, tra una portata e l'altra, ${partner} si sporge.<br><br><strong>${partner}:</strong> «Posso dirti una cosa? Sono nervoso/a. Non lo dico mai.»<br><br>Qualcosa si scioglie. Ridete della tensione, e la serata decolla.`);
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("elegante") }
        ]);
    }, 100);
}

function showEp1RamoCasual() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    showText(`Ti presenti comodo, senza pretese. ${partner} ti squadra e scoppia a ridere.<br><br><strong>${partner}:</strong> «Tutto questo per me? Non dovevi.»<br><br><strong>Tu:</strong> «Sono un tipo semplice.»<br><br><strong>${partner}:</strong> «Mi piaci già.»<br><br>La serata è leggera, piena di battute. A un certo punto rovesci qualcosa e ${partner} ride talmente tanto da doversi asciugare gli occhi.`);
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("casual") }
        ]);
    }, 100);
}

function showEp1Finale(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let genderSuffix = playerGender === 'uomo' ? 'o' : 'a';
    
    if (tipo === "elegante") {
        showText(`La serata finisce davanti a casa di ${partner}. Vi guardate un secondo di troppo.<br><br><strong>${partner}:</strong> «Ci vediamo presto, sì?»`);
    } else {
        showText(`La serata finisce davanti a casa di ${partner}, ancora ridendo.<br><br><strong>${partner}:</strong> «Allora devi rimediare. Con un'altra serata.»<br><br>«Ci vediamo presto, sì?»`);
    }

    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Ti sei fidanzat${genderSuffix}!!</p>`);
        setChoices([
            { text: "Rigioca", action: () => location.reload() }
        ]);
    }, 3000);
}