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

function getSuffix() { return playerGender === 'uomo' ? 'o' : 'a'; }
function getArticle() { return playerGender === 'uomo' ? 'un tipo' : 'una tipa'; }

// ==========================================
// EPISODIO 1: L'ABITO
// ==========================================
function showEp1Bivio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sei davanti allo specchio. Stasera hai un appuntamento con ${playerGender === 'uomo' ? 'Mia' : 'Noah'}.<br><br>Lo stomaco ti fa un piccolo salto. Ti guardi, poi guardi i vestiti stesi sul letto. Non sai bene cosa metterti.`);
    setChoices([
        { text: "A) Elegante (vestito/camicia)", action: () => showEp1EleganteInizio() },
        { text: "B) Casual (jeans e maglietta)", action: () => showEp1CasualInizio() }
    ]);
}

// --- RAMO ELEGANTE ---
function showEp1EleganteInizio() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    
    setBackground('bistrot-elegante.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al bistrot. L'aria è calda, le candele sul tavolo creano un'atmosfera intima. ${partner} è già seduto/a e ti sorride non appena ti vede.<br><br>Ti presenti tirato a lucido. ${partner} ti guarda da capo a piedi e alza un sopracciglio.<br><br><strong>${partner}:</strong> «Wow, ${playerName}. Ti sei mess${getSuffix()} in tiro per me?»<br><br><strong>Tu:</strong> «Volevo fare bella figura. Mi sembra il minimo.»<br><br>La serata parte un po' rigida, quasi formale. Siete entrambi molto composti. Poi, il cameriere vi porta il menù.`);
    
    setTimeout(() => {
        showText(`Sfogli il menù. Tutto sembra buonissimo, ma sei un po' teso/a.<br><br><strong>${partner}:</strong> «Allora, cosa prendi? Io mi butto sui tagliolini al tartufo. Tu?»`);
        setChoices([
            { text: "A) Ordini la stessa cosa (per fare colpo)", action: () => showEp1EleganteSceltaCibo('stessa') },
            { text: "B) Ordini qualcosa di totalmente diverso", action: () => showEp1EleganteSceltaCibo('diverso') }
        ]);
    }, 100);
}

function showEp1EleganteSceltaCibo(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerAggettivo = playerGender === 'uomo' ? 'nervosa' : 'nervoso';
    
    if (tipo === 'stessa') {
        showText(`<strong>Tu:</strong> «Credo che prenderò anch'io i tagliolini. Sembrano fantastici.»<br><br>${partner} sorride, colpito/a.<br><br><strong>${partner}:</strong> «Ottima scelta. Vedo che abbiamo gli stessi gusti.»<br><br>La cena scorre. Tra una portata e l'altra, la tensione inizia a sciogliersi. A un certo punto, ${partner} si sporge verso di te.<br><br><strong>${partner}:</strong> «Posso dirti una cosa? Sono ${partnerAggettivo}. Non lo dico mai, ma tu mi metti un po' in soggezione.»`);
    } else {
        showText(`<strong>Tu:</strong> «Io invece andrò di pizza. Ho una fame da lupi.»<br><br>${partner} scoppia a ridere, rompendo il ghiaccio.<br><br><strong>${partner}:</strong> «Pizza in un posto elegante? Rispetto assoluto.»<br><br>La tensione si scioglie di colpo. Ridete delle rispettive scelte. A un certo punto, ${partner} si sporge verso di te.<br><br><strong>${partner}:</strong> «Sai, ero ${partnerAggettivo}. Ma con te è impossibile esserlo.»`);
    }
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("elegante") }
        ]);
    }, 100);
}

// --- RAMO CASUAL ---
function showEp1CasualInizio() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    
    setBackground('diner-casual.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al diner. L'ambiente è rumoroso, le luci al neon colorano i tavoli. ${partner} è già seduto/a e ti fa cenno di avvicinarti.<br><br>Ti presenti comodo/a, senza pretese. ${partner} ti squadra e scoppia a ridere.<br><br><strong>${partner}:</strong> «Tutto questo per me, ${playerName}? Non dovevi.»<br><br><strong>Tu:</strong> «Sono ${getArticle()} che prende la vita tranquillamente.»<br><br><strong>${partner}:</strong> «Mi piaci già.»<br><br>La serata parte col piede giusto, molto leggera. Il cameriere vi porta dei bicchieri pieni di bibite ghiacciate.`);
    
    setTimeout(() => {
        showText(`Mentre parlate del più e del meno, gesticolando per raccontare un aneddoto, colpisci in pieno il tuo bicchiere. Il liquido si rovescia ovunque sul tavolo.<br><br>Silenzio. Poi ${partner} scoppia a ridere.`);
        setChoices([
            { text: "A) Ti scusi imbarazzat${getSuffix()}", action: () => showEp1CasualSceltaFiguraccia('scusi') },
            { text: "B) Ci ridi su e rilanci", action: () => showEp1CasualSceltaFiguraccia('ridi') }
        ]);
    }, 100);
}

function showEp1CasualSceltaFiguraccia(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    
    if (tipo === 'scusi') {
        showText(`<strong>Tu:</strong> «Oddio, scusa! Che figuraccia. Sono un disastro.»<br><br>Arrossisci vistosamente mentre cerchi di tamponare il disastro con dei tovaglioli.<br><br><strong>${partner}:</strong> «Ehi, respira. Non è successo niente.»<br><br>Ti guarda con occhi dolcissimi. Prende un tovagliolo e inizia ad aiutarti.<br><br><strong>${partner}:</strong> «Mi piaci perché sei spontane${getSuffix()}. Non devi fare la persona perfetta con me.»`);
    } else {
        showText(`<strong>Tu:</strong> «Ecco, questo è il mio talento segreto. Faccio danni.»<br><br>Prendi il bicchiere mezzo vuoto e lo alzi, come per fare un brindisi.<br><br><strong>Tu:</strong> «Alla mia goffaggine!»<br><br>${partner} ride talmente tanto da doversi asciugare una lacrima.<br><br><strong>${partner}:</strong> «Sei incredibile. Ok, devi rimediare a questo disastro. Con un'altra serata.»`);
    }
    
    setTimeout(() => {
        setChoices([
            { text: "Continua...", action: () => showEp1Finale("casual") }
        ]);
    }, 100);
}

// --- FINALE COMUNE EPISODIO 1 ---
function showEp1Finale(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    
    setBackground('strada-notte.jpg'); 
    setCharacter(''); 

    if (tipo === "elegante") {
        showText(`Dopo cena, uscite dal bistrot. L'aria fredda della sera vi fa venire voglia di stare vicini. L'accompagni a casa.<br><br>La serata finisce davanti al portone. Vi guardate un secondo di troppo. Nessuno dei due vuole andare via.<br><br><strong>${partner}:</strong> «Ci vediamo presto, sì?»<br><br><strong>Tu:</strong> «Assolutamente sì.»`);
    } else {
        showText(`Dopo cena, uscite dal diner ancora ridendo. L'accompagni a casa.<br><br>La serata finisce davanti al portone. Siete ancora a ridere per la figuraccia del bicchiere.<br><br><strong>${partner}:</strong> «Allora devi rimediare. Con un'altra serata.»<br><br><strong>Tu:</strong> «Affare fatto. Ci vediamo presto, sì?»`);
    }

    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Ti sei fidanzat${getSuffix()}!!</p>`);
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
    
    showText(`Sono passate un paio di settimane. Sera. Sei sul divano, avvolto/a in una coperta. Il telefono vibra: è il tuo migliore amico (il BFF).<br><br>Il messaggio dice: <em>"Ehi, ${playerName}. Tutto ok? È da un po' che non ti fai sentire. Ti vedo un po' strano/a ultimamente."</em><br><br>Ha ragione. Ultimamente hai una paura che ti attanaglia lo stomaco: la paura di restare da solo/a. Le dita esitano sulla tastiera.<br><br>Cosa gli scrivi?`);
    
    setChoices([
        { text: "A) Sincero e diretto", action: () => showEp2Diretto() },
        { text: "B) Leggero e scherzoso", action: () => showEp2Scherzoso() },
        { text: "C) Evasivo", action: () => showEp2Evasivo() }
    ]);
}

function showEp2Diretto() {
    showText(`Scrivi: <em>«Devo dirti una cosa. Ho paura di restare solo/a. È una cosa che mi porto dentro da un po' e non so come gestirla.»</em><br><br>Premi invio e trattieni il respiro. Il BFF risponde dopo pochi secondi.<br><br><strong>BFF:</strong> «Grazie per avermelo detto, ${playerName}. E sai una cosa? Anch'io a volte ho paura di restare solo/a. Non me ne vergogno se non ti vergogni tu.»<br><br>Ti apri anche tu. Parlate fino a tarda notte. Per la prima volta la paura non è un peso da nascondere, ma qualcosa che potete portare in due.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Hai superato le tue paure!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}

function showEp2Scherzoso() {
    showText(`Scrivi: <em>«Sai cosa mi serve? Un manuale: 'Come non finire solo/a — edizione illustrata'. Comunque sì, tutto ok. Più o meno.»</em><br><br>Il BFF risponde con una risata scritta.<br><br><strong>BFF:</strong> «Ah, il manuale mi serve pure a me. Capitolo 1: 'Respira'. Capitolo 2: 'Chiamami quando ci pensi'. Capitolo 3: 'Non sei solo/a, scemo/a'.»<br><br>Ridete. E proprio scherzando, senza volerlo, toccate il punto. Capisci che non serve essere seri per dirsi le cose vere.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Ridere insieme vi ha reso più vicini!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}

function showEp2Evasivo() {
    showText(`Scrivi: <em>«Tutto ok. Dai, niente di che. Ci sentiamo domani?»</em><br><br>Il BFF risponde con un cuoricino, ma poi scrive:<br><br><strong>BFF:</strong> «Ok... però mi sembra che tu mi stia nascondendo qualcosa. Va bene, non insisto. Ma se hai bisogno, io ci sono.»<br><br>Nei giorni seguenti ti sta più vicino. Ti scrive quando sei giù, si ferma a parlare anche quando non serve. E tu inizi a fare lo stesso con lui/lei, senza dirlo. La distanza non si chiude con le parole, ma con la presenza.`);
    
    setTimeout(() => {
        showText(`<h2 style="color: #4caf50;">Good Ending!</h2><p>Esserci sempre, anche in silenzio!!</p>`);
        setChoices([
            { text: "Prossimo Episodio (WIP)", action: () => alert("L'Episodio 3 arriverà presto!") }
        ]);
    }, 4000);
}
