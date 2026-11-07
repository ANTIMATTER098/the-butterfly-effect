let playerName = "";
let playerGender = "";
const TEMPO_ATTESA = 30000; // 30 secondi di attesa

function startGame(gender) {
    playerName = document.getElementById("player-name").value.trim() || "Amico/a";
    playerGender = gender;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("menu-screen").style.display = "block";
}

function startFromEpisode(numero) {
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    if (numero === 1) showEp1Bivio();
    else if (numero === 2) showEp2Bivio();
    else if (numero === 3) showEp3Inizio();
    else if (numero === 4) showEp4Inizio();
    else if (numero === 5) showEp5Inizio();
}

function tornaAlMenu() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("menu-screen").style.display = "block";
    document.getElementById("text-area").innerHTML = "";
    document.getElementById("choices-area").innerHTML = "";
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

// Nuova funzione per gestire il timer e le scelte
function setChoicesConAttesa(choices) {
    const choicesArea = document.getElementById("choices-area");
    choicesArea.innerHTML = `<p style="color: #ffb347; font-style: italic; font-size: 14px;">Attendi ${TEMPO_ATTESA / 1000} secondi per continuare...</p>`;
    
    setTimeout(() => {
        choicesArea.innerHTML = "";
        choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.innerText = choice.text;
            btn.onclick = choice.action;
            choicesArea.appendChild(btn);
        });
    }, TEMPO_ATTESA);
}

// Funzioni per gestire il genere delle parole
function getSuffix() { return playerGender === 'uomo' ? 'o' : 'a'; }
function getArticle() { return playerGender === 'uomo' ? 'un tipo' : 'una tipa'; }
function getStrano() { return playerGender === 'uomo' ? 'strano' : 'strana'; }
function getSolo() { return playerGender === 'uomo' ? 'solo' : 'sola'; }
function getAvvolto() { return playerGender === 'uomo' ? 'avvolto' : 'avvolta'; }

// ==========================================
// EPISODIO 1: L'ABITO
// ==========================================
function showEp1Bivio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sei davanti allo specchio. Stasera hai un appuntamento con ${playerGender === 'uomo' ? 'Mia' : 'Noah'}.<br><br>Lo stomaco ti fa un piccolo salto. Ti guardi, poi guardi i vestiti stesi sul letto. Non sai bene cosa metterti.`);
    setChoicesConAttesa([
        { text: "A) Elegante (vestito/camicia)", action: () => showEp1EleganteInizio() },
        { text: "B) Casual (jeans e maglietta)", action: () => showEp1CasualInizio() }
    ]);
}

function showEp1EleganteInizio() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    let partnerAggettivo = playerGender === 'uomo' ? 'nervosa' : 'nervoso';
    
    setBackground('bistrot-elegante.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al bistrot. L'aria è calda, le candele sul tavolo creano un'atmosfera intima. ${partner} è già seduto/a e ti sorride non appena ti vede.<br><br>Ti presenti tirato a lucido. ${partner} ti guarda da capo a piedi e alza un sopracciglio.<br><br><strong>${partner}:</strong> «Wow, ${playerName}. Ti sei mess${getSuffix()} in tiro per me?»<br><br><strong>Tu:</strong> «Volevo fare bella figura. Mi sembra il minimo.»<br><br>La serata parte un po' rigida, quasi formale. Siete entrambi molto composti. Poi, il cameriere vi porta il menù.<br><br>Sfogli il menù. Tutto sembra buonissimo, ma sei un po' teso/a.<br><br><strong>${partner}:</strong> «Allora, cosa prendi? Io mi butto sui tagliolini al tartufo. Tu?»`);
    
    setChoicesConAttesa([
        { text: "A) Ordini la stessa cosa (per fare colpo)", action: () => showEp1EleganteSceltaCibo('stessa', partnerAggettivo) },
        { text: "B) Ordini qualcosa di totalmente diverso", action: () => showEp1EleganteSceltaCibo('diverso', partnerAggettivo) }
    ]);
}

function showEp1EleganteSceltaCibo(tipo, partnerAggettivo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let colpitoSuffix = playerGender === 'uomo' ? 'a' : 'o';
    
    if (tipo === 'stessa') {
        showText(`<strong>Tu:</strong> «Credo che prenderò anch'io i tagliolini. Sembrano fantastici.»<br><br>${partner} sorride, colpit${colpitoSuffix}.<br><br><strong>${partner}:</strong> «Ottima scelta. Vedo che abbiamo gli stessi gusti.»<br><br>La cena scorre. Tra una portata e l'altra, la tensione inizia a sciogliersi. A un certo punto, ${partner} si sporge verso di te.<br><br><strong>${partner}:</strong> «Posso dirti una cosa? Sono ${partnerAggettivo}. Non lo dico mai, ma tu mi metti un po' in soggezione.»`);
    } else {
        showText(`<strong>Tu:</strong> «Io invece andrò di pizza. Ho una fame da lupi.»<br><br>${partner} scoppia a ridere, rompendo il ghiaccio.<br><br><strong>${partner}:</strong> «Pizza in un posto elegante? Rispetto assoluto.»<br><br>La tensione si scioglie di colpo. Ridete delle rispettive scelte. A un certo punto, ${partner} si sporge verso di te.<br><br><strong>${partner}:</strong> «Sai, all'inizio avevo una certa soggezione. Ma con te è impossibile essere formali.»`);
    }
    
    setChoicesConAttesa([
        { text: "Continua...", action: () => showEp1Finale("elegante") }
    ]);
}

function showEp1CasualInizio() {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    let partnerImg = playerGender === 'uomo' ? 'mia.jpg' : 'noah.jpg';
    
    setBackground('diner-casual.jpg'); 
    setCharacter(partnerImg); 
    
    showText(`Arrivi al diner. L'ambiente è rumoroso, le luci al neon colorano i tavoli. ${partner} è già seduto/a e ti fa cenno di avvicinarti.<br><br>Ti presenti comodo/a, senza pretese. ${partner} ti squadra e scoppia a ridere.<br><br><strong>${partner}:</strong> «Tutto questo per me, ${playerName}? Non dovevi.»<br><br><strong>Tu:</strong> «Sono ${getArticle()} che prende la vita tranquillamente.»<br><br><strong>${partner}:</strong> «Mi piaci già.»<br><br>La serata parte col piede giusto, molto leggera. Il cameriere vi porta dei bicchieri pieni di bibite ghiacciate.<br><br>Mentre parlate del più e del meno, gesticolando per raccontare un aneddoto, colpisci in pieno il tuo bicchiere. Il liquido si rovescia ovunque sul tavolo.<br><br>Silenzio. Poi ${partner} scoppia a ridere.`);
    
    setChoicesConAttesa([
        { text: `A) Ti scusi imbarazzat${getSuffix()}`, action: () => showEp1CasualSceltaFiguraccia('scusi') },
        { text: "B) Ci ridi su e rilanci", action: () => showEp1CasualSceltaFiguraccia('ridi') }
    ]);
}

function showEp1CasualSceltaFiguraccia(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    
    if (tipo === 'scusi') {
        showText(`<strong>Tu:</strong> «Oddio, scusa! Che figuraccia. Sono un disastro.»<br><br>Arrossisci vistosamente mentre cerchi di tamponare il disastro con dei tovaglioli.<br><br><strong>${partner}:</strong> «Ehi, respira. Non è successo niente.»<br><br>Ti guarda con occhi dolcissimi. Prende un tovagliolo e inizia ad aiutarti.<br><br><strong>${partner}:</strong> «Mi piaci perché sei spontane${getSuffix()}. Non devi fare la persona perfetta con me.»`);
    } else {
        showText(`<strong>Tu:</strong> «Ecco, questo è il mio talento segreto. Faccio danni.»<br><br>Prendi il bicchiere mezzo vuoto e lo alzi, come per fare un brindisi.<br><br><strong>Tu:</strong> «Alla mia goffaggine!»<br><br>${partner} ride talmente tanto da doversi asciugare una lacrima.<br><br><strong>${partner}:</strong> «Sei incredibile. Ok, devi rimediare a questo disastro. Con un'altra serata.»`);
    }
    
    setChoicesConAttesa([
        { text: "Continua...", action: () => showEp1Finale("casual") }
    ]);
}

function showEp1Finale(tipo) {
    let partner = playerGender === 'uomo' ? 'Mia' : 'Noah';
    
    setBackground('strada-notte.jpg'); 
    setCharacter(''); 

    if (tipo === "elegante") {
        showText(`Dopo cena, uscite dal bistrot. L'aria fredda della sera vi fa venire voglia di stare vicini. L'accompagni a casa.<br><br>La serata finisce davanti al portone. Vi guardate un secondo di troppo. Nessuno dei due vuole andare via.<br><br><strong>${partner}:</strong> «Ci vediamo presto, sì?»<br><br><strong>Tu:</strong> «Assolutamente sì.»<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Ti sei fidanzat${getSuffix()}!!</p>`);
    } else {
        showText(`Dopo cena, uscite dal diner ancora ridendo. L'accompagni a casa.<br><br>La serata finisce davanti al portone. Siete ancora a ridere per la figuraccia del bicchiere.<br><br><strong>${partner}:</strong> «Allora devi rimediare. Con un'altra serata.»<br><br><strong>Tu:</strong> «Affare fatto. Ci vediamo presto, sì?»<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Ti sei fidanzat${getSuffix()}!!</p>`);
    }

    setChoicesConAttesa([
        { text: "Torna al menu principale", action: () => tornaAlMenu() } // Torna al menu, non all'episodio 2!
    ]);
}

// ==========================================
// EPISODIO 2: IL MESSAGGIO
// ==========================================
function showEp2Bivio() {
    setBackground(''); 
    setCharacter('');
    
    showText(`Sono passate un paio di settimane. Sera. Sei sul divano, ${getAvvolto()} in una coperta. Il telefono vibra: è il tuo BFF.<br><br>Il messaggio dice: <em>"Ehi, ${playerName}. Tutto ok? È da un po' che non ti fai sentire. Ti vedo un po' ${getStrano()} ultimamente."</em><br><br>Ha ragione. Ultimamente hai una paura che ti attanaglia lo stomaco: la paura di restare ${getSolo()}. Le dita esitano sulla tastiera.<br><br>Cosa gli scrivi?`);
    
    setChoicesConAttesa([
        { text: "A) Sincero e diretto", action: () => showEp2Diretto() },
        { text: "B) Leggero e scherzoso", action: () => showEp2Scherzoso() },
        { text: "C) Evasivo", action: () => showEp2Evasivo() }
    ]);
}

function showEp2Diretto() {
    showText(`Scrivi: <em>«Devo dirti una cosa. Ho paura di restare ${getSolo()}. È una cosa che mi porto dentro da un po' e non so come gestirla.»</em><br><br>Premi invio e trattieni il respiro. Il BFF risponde dopo pochi secondi.<br><br><strong>BFF:</strong> «Grazie per avermelo detto, ${playerName}. E sai una cosa? Anch'io a volte ho paura di restare ${getSolo()}. Non me ne vergogno se non ti vergogni tu.»<br><br>Ti apri anche tu. Parlate fino a tarda notte. Per la prima volta la paura non è un peso da nascondere, ma qualcosa che potete portare in due.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Hai superato le tue paure!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp2Scherzoso() {
    showText(`Scrivi: <em>«Sai cosa mi serve? Un manuale: 'Come non finire ${getSolo()} — edizione illustrata'. Comunque sì, tutto ok. Più o meno.»</em><br><br>Il BFF risponde con una risata scritta.<br><br><strong>BFF:</strong> «Ah, il manuale mi serve pure a me. Capitolo 1: 'Respira'. Capitolo 2: 'Chiamami quando ci pensi'. Capitolo 3: 'Non sei ${getSolo()}, scemo/a'.»<br><br>Ridete. E proprio scherzando, senza volerlo, toccate il punto. Capisci che non serve essere seri per dirsi le cose vere.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Ridere insieme vi ha reso più vicini!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp2Evasivo() {
    showText(`Scrivi: <em>«Tutto ok. Dai, niente di che. Ci sentiamo domani?»</em><br><br>Il BFF risponde con un cuoricino, ma poi scrive:<br><br><strong>BFF:</strong> «Ok... però mi sembra che tu mi stia nascondendo qualcosa. Va bene, non insisto. Ma se hai bisogno, io ci sono.»<br><br>Nei giorni seguenti ti sta più vicino. Ti scrive quando sei giù, si ferma a parlare anche quando non serve. E tu inizi a fare lo stesso con lui/lei, senza dirlo. La distanza non si chiude con le parole, ma con la presenza.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Esserci sempre, anche in silenzio!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

// ==========================================
// EPISODIO 3: IL MEZZO PERSO
// ==========================================
function showEp3Inizio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sei fuori dalla fermata dell'autobus. L'autobus ti passa davanti e non si ferma. "Ultima corsa", dice il cartello luminoso.<br><br>La giornata era già lunga. Ti guardi intorno, cercando una soluzione per tornare a casa.`);
    
    setChoicesConAttesa([
        { text: "A) Aspetti il prossimo (se mai arriverà)", action: () => showEp3Aspetta() },
        { text: "B) Te ne torni a piedi", action: () => showEp3Piedi() },
        { text: "C) Prendi una scorciatoia che non conosci", action: () => showEp3Scorciatoia() }
    ]);
}

function showEp3Aspetta() {
    setBackground('diner-casual.jpg');
    showText(`Ti siedi sulla panchina. Il tempo passa lento. Non hai niente da fare, per una volta, e allora guardi.<br><br>La città che di solito attraversi di corsa: una signora che innaffia i fiori, un gatto che ti fissa, le luci che si accendono una a una. Ti accorgi che non guardavi niente da mesi.<br><br>Alla fine un passaggio arriva. Saluti il gatto.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">A volte fermarsi è la corsa giusta!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp3Piedi() {
    setBackground('strada-notte.jpg');
    showText(`Cammini. Le scarpe non sono da camminata lunga, ma resistono. Passi davanti a un posto che conosci bene — la scuola, il parco dove andavi da piccolo/a, il bar di un'amica.<br><br>Ti fermi un secondo. I ricordi arrivano senza chiedere permesso, e per una volta non fanno male.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">La strada di casa sa sempre dove portarti!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp3Scorciatoia() {
    setBackground('strada-notte.jpg');
    showText(`Giri in una via che non hai mai preso. Sbagli, torni indietro, sbagli di nuovo. Ma in mezzo agli errori trovi una piazzetta minuscola che non sapevi esistesse, con una panchina e un albero.<br><br>Ti ci siedi cinque minuti. Riparti. Arrivi a casa più tardi del previsto, ma con la sensazione di aver trovato un pezzetto di città tutto tuo.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Perdersi un po' fa trovare qualcosa!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

// ==========================================
// EPISODIO 4: LA TELEFONATA
// ==========================================
function showEp4Inizio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sera. Sei in camera tua, luci basse. Il telefono vibra sul comodino: numero sconosciuto.<br><br>Non è la prima volta che squilla, ma stavolta resti a guardarlo. Chi può essere a quest'ora?`);
    
    setChoicesConAttesa([
        { text: "A) Rispondi", action: () => showEp4Rispondi() },
        { text: "B) Non rispondi", action: () => showEp4NonRispondi() }
    ]);
}

function showEp4Rispondi() {
    showText(`<strong>Voce:</strong> «Pronto? Scusa se chiamo così, senza preavviso. Sono... non so se ti ricordi di me. Ti avevo prestato un libro, anni fa. Non me l'hai mai restituito.»<br><br>Ridi. Te lo ricordi eccome. Quella voce ti riporta a un periodo che credevi archiviato.<br><br><strong>Voce:</strong> «Lo sto rileggendo. E mi sono accorta che... certe cose le ho capite solo ora. Volevo dirtelo. Tutto qui.»<br><br>Non serve altro. Vi salutate con la promessa di risentirvi — e stavolta non è una frase di circostanza.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Certe voci tornano al momento giusto!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp4NonRispondi() {
    showText(`Lasci squillare. Poi, poco dopo, arriva un messaggio: <em>"Ciao, scusa il disturbo. Sono io, quella del libro che non mi hai mai restituito. Niente di importante, volevo solo dirti che lo sto rileggendo e mi è tornato in mente un periodo bello. Buona serata."</em><br><br>Resti a fissare lo schermo. Quella frase minima ti tiene sveglio/a.<br><br>Il giorno dopo, sei tu a scrivere: <em>"Il libro ce l'ho ancora. Possiamo prendere un caffè e te lo restituisco."</em><br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">A volte basta un messaggio per riaprire una porta!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

// ==========================================
// EPISODIO 5: L'OGGETTO DIMENTICATO
// ==========================================
function showEp5Inizio() {
    setBackground(''); 
    setCharacter('');
    showText(`Sei già per strada, a metà del tragitto, quando ti accorgi che l'abbonamento dei mezzi è rimasto a casa. Devi attraversare tutta la città. Senza abbonamento sono guai — o forse no. Il prossimo mezzo sta arrivando.`);
    
    setChoicesConAttesa([
        { text: "A) Torni indietro a prenderlo", action: () => showEp5TornaIndietro() },
        { text: "B) Vai avanti lo stesso", action: () => showEp5VaiAvanti() },
        { text: "C) Chiedi aiuto a qualcuno", action: () => showEp5ChiediAiuto() }
    ]);
}

function showEp5TornaIndietro() {
    setBackground('diner-casual.jpg');
    showText(`Torni sui tuoi passi, sbuffando. Riapri la porta, cerchi, trovi l'abbonamento sotto un libro. Mentre sei lì, però, noti il disordine della tua stanza e ti ci fermi un secondo: quante cose hai lasciato in sospeso?<br><br>Prendi l'abbonamento, ma anche un biglietto che non aprivi da mesi. Lo leggi sul tram. Ti scalda.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">A volte tornare indietro serve a trovare altro!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp5VaiAvanti() {
    setBackground('strada-notte.jpg');
    showText(`Decidi di rischiare. Sale il controllore? No. La città scorre, e tu ti godi il viaggio con la leggerezza di chi l'ha scampata.<br><br>Arrivi a destinazione con un pensiero in testa: "Non è poi così grave, a volte le cose si sistemano da sole." E per una volta ci credi davvero.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">A volte fidarsi del mondo funziona!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}

function showEp5ChiediAiuto() {
    setBackground('diner-casual.jpg');
    showText(`Ti avvicini a una persona alla fermata: «Scusa, ho dimenticato l'abbonamento. Sai mica come fare?»<br><br>Quella persona sorride, ti spiega un trucco, ti regala un biglietto di scorta. «Succede a tutti», dice. Ti sembra una piccola cosa, ma ti accompagna per tutto il giorno.<br><br><h2 style="color: #4caf50; text-align: center;">Good Ending!</h2><p style="text-align: center;">Un piccolo aiuto fa un grande viaggio!!</p>`);
    
    setChoicesConAttesa([{ text: "Torna al menu principale", action: () => tornaAlMenu() }]);
}
