let currentPokemon;
let counter = 0;
let Pokemon;
let loadStart = 1;
let loadEnd = 20;
let bars = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed']


//ersten Pokemon werden geladen
function loadFewPokemon() {
    document.getElementById('pokemonOverview').addEventListener('scroll', loadMorePokemon); //Daten werden aus Datenbank gelesen
    for (let id = loadStart; id <= loadEnd; id++) {
        loadPokemon(id);
    }
    loadStart += 20;
    loadEnd += 20;
}


//nächsten Pokemon werden geladen
function loadMorePokemon() {
    if (document.getElementById('pokemonOverview').scrollTop > document.getElementById('pokemonOverview').scrollHeight - 700) { //Abfrage Höhe Scrollbar und Abfrage Höhe Scrollmöglichkeit
        for (let id = loadStart; id <= loadEnd; id++) {
            loadPokemon(id);
        }
        loadStart += 20;
        loadEnd += 20;
        } 
}


//Infos für Pokemonübersicht werden geladen
async function loadPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemonLite(id);
}


//Infos für Pokemonkarte werden geladen
async function loadOnePokemon(id) {
    let number = parseInt(id.replace(/\D/g, ""))
    let url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    let response = await fetch(url);
    Pokemon = await response.json();

    if (window.innerWidth < 1200) {
        document.getElementById('pokedexOverview').classList.add('d-none')
        document.getElementById('pokedexOverviewChild').classList.add('d-block')        
    }
    renderPokemon(number);
}


//Erster Buchstabe wird zum Grossbuchsten für Pokemonkarte
function nameUppercaseFirstLetter() {
    let name = Pokemon['name'];
    let nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('pokemonName').innerHTML = nameUppercase
}


//Erster Buchstabe wird zum Grossbuchsten für Pokemonübersicht
function nameUppercaseFirstLetterLite(id) {
    let name = currentPokemon['name'];
    let nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById(`name${id}`).innerHTML = nameUppercase
}


//Daten für Pokemonübersicht werden gerendert
function pokemonLite(id) {
    let overview = document.getElementById('pokemonOverview');
    overview.innerHTML += renderPokemonLite(id);
    renderPokemonImgLite(id);
    nameUppercaseFirstLetterLite(id);
    typeOfPokemonLite(id);
    backgroundColorLite(id);
    
}


//kleine Karte für Pokemonübersicht wird gerendert
function renderPokemonLite(id) {
    return /*html*/`
        <div onclick="loadOnePokemon(id)" class="pokemonLite" id='pokemon${id}'>
            <div class="cardLeft">
                <div id="name${id}">${currentPokemon['name']}</div>
                <div>
                    <div class="types" id="type1.${id}"></div>            
                    <div class="types" id="type2.${id}"></div>            
                </div>
            </div>
            <div class="columnCenter">
                <div class="flex justifyCenter">
                    # &nbsp;
                    <div id="pokemonIdLite${id}"></div>
                </div>
            <img id="Lite${id}" width="100px" height="100px">
            </div>
        </div>
        `
}


//Bild und ID für Pokemonübersicht werden gerendert
function renderPokemonImgLite(id) {
    document.getElementById(`Lite${id}`).src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById(`pokemonIdLite${id}`).innerHTML = ('000' + currentPokemon['id']).substr(-3);
}


//Infos für einzelnes Pokemon werden gerendert
function renderPokemon(number) {
    renderPokemonCard(number);
    renderPokemonInfo(number);
}


//Bild und ID für einzelnes Pokemon werden gerendert
function renderPokemonInfo(number) {
    nameUppercaseFirstLetter(number);
    document.getElementById('pokemonImg').src = Pokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonId').innerHTML = ('000' + Pokemon['id']).substr(-3);
}


//Pokemonkarte für einzelnes Pokemon wird vorbereitet
function renderPokemonCard(number) {
    document.getElementById('emptyCard').innerHTML = renderCard();
    document.getElementById('emptyCard').classList.add('height0');
    typeOfPokemon(number);
    backgroundColor(number);
    openSectionAbout();
}


//Karte für einzelnes Pokemon wird gerendert
function renderCard() {
    return     /*html*/`
    <div class="card">
    <div id="pokedex" class="pokedex">
        <div class="width100">
            <div class="pokedexChild">
                <h2 id="pokemonName"></h2>
                <div class="flex">
                    # &nbsp;
                    <div id="pokemonId"></div>
                </div>
            </div>
            <div>
                <div class="types" id="type1"></div>            
                <div class="types" id="type2"></div>            
            </div>
        </div>
        <img class="closeRight" onclick="clearRightSide()" src="./img/close.png" positon="fixed" right="50px" width="30px" height="30px" alt=""> 
    </div>
    <div class="infoContainer">
        <img id="pokemonImg" class="pokemonImg" width="170px" height="170px">
        <div class="bar" onload="openSectionAbout()">
            <div id="about" onclick="openSectionAbout()" class="barChild">About</div>
            <div id="base" onclick="openSectionBase()" class="barChild">Base Stats</div>
<!--               <div id="evo" onclick="openSectionEvo()" class="barChild">Evolution</div>-->
            <div id="moves" onclick="openSectionMoves()" class="barChild">Moves</div>
            </div>
        </div>
        <div id="infoDisplay" class="infoDisplay">
    </div>
</div>
`
}


//rechte Seite wird nach schliessen wieder geleert
function clearRightSide() {
    if (window.innerWidth < 1200) {
        document.getElementById('pokedexOverview').classList.remove('d-none')
        document.getElementById('pokedexOverviewChild').classList.remove('d-block')        
    }
    document.getElementById('emptyCard').innerHTML = '';
    document.getElementById('emptyCard').classList.remove('height0');
}


//Pokedex wird abgeschaltet
function powerOff() {
    let right = document.getElementById('emptyCard');
    let left = document.getElementById('pokemonOverview');
    right.classList.remove('height0');
    right.innerHTML = '';
    left.innerHTML = '';
    ifPowerOff(left, right);
}


//Logik hinter Abschaltung
function ifPowerOff(left, right) {
    if (counter == 1) {
        right.classList.remove('d-black');
        left.classList.remove('d-black');
        left.classList.remove('powerOff');
        left.classList.add('powerOn');
        counter = 0;
        loadFewPokemon();
    } else {
        right.classList.add('d-black');
        left.classList.add('d-black');
        left.classList.remove('powerOn');
        left.classList.add('powerOff');
        loadStart = 1;
        loadEnd = 20;
        counter = 1;
    }
}


//fügt die Informationen des About-Reiters zusammen
function openSectionAbout() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionAbout();
    renderAbout();
    removeClasslist('base', 'moves', 'about');
};


//zeigt an, auf welchem Reiter man sich befindet
function removeClasslist(one, two, three) {
    document.getElementById(`${one}`).classList.remove('underline');
    document.getElementById(`${two}`).classList.remove('underline');
    document.getElementById(`${three}`).classList.add('underline');
}


//holt die Informationen für den Reiter About
function renderAbout() {
    //document.getElementById('species').innerHTML = Pokemon[''];
    document.getElementById('height').innerHTML = Pokemon['height'] * 10 + `&nbsp;` + 'cm';
    document.getElementById('weight').innerHTML = Pokemon['weight'] + `&nbsp;` + 'kg';
    document.getElementById('abilities').innerHTML = Pokemon['abilities']['0']['ability']['name'] + ',' +  "<br>" + Pokemon['abilities']['1']['ability']['name'];
}


//rendert die Tabelle vom About des Pokemons
function contentSectionAbout() {
    return /*html*/`
    <table id="tableAbout">
<!--        <tr>
            <td class="properties">Species</td>
            <td id="species"></td>
        </tr> -->
        <tr>
            <td class="properties">Height</td>
            <td id="height"></td>
        </tr>
        <tr>
            <td class="properties">Weight</td>
            <td id="weight"></td>
        </tr>
        <tr>
            <td class="properties">Abilities</td>
            <td id="abilities"></td>
        </tr>
    </table>
    `
};


//fügt die Informationen für die Stats zusammen
function openSectionBase() {
    renderStats();
    generateBar();
    removeClasslist('about', 'moves', 'base');
};


//holt die Informationen für die Stats
function renderStats() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionBase();
    document.getElementById('hp').innerHTML = Pokemon['stats']['0']['base_stat'];
    document.getElementById('attack').innerHTML = Pokemon['stats']['1']['base_stat'];
    document.getElementById('defense').innerHTML = Pokemon['stats']['2']['base_stat'];
    document.getElementById('specialAttack').innerHTML = Pokemon['stats']['3']['base_stat'];
    document.getElementById('specialDefense').innerHTML = Pokemon['stats']['4']['base_stat'];
    document.getElementById('speed').innerHTML = Pokemon['stats']['5']['base_stat'];
}


//Generiert die Stats als Balken und in Farbe
function generateBar() {
    for (let i = 0; i < bars.length; i++) {
        let bar = bars[i];
        let number = +document.getElementById(`${bar}`).innerHTML;
        let multipl = number * 0.11;
        document.getElementById(`${bar}Bar`).style.width = `${multipl}vw`;
        document.getElementById(`${bar}Bar`).style.height = '5px';
        if (multipl < 8) {
            document.getElementById(`${bar}Bar`).style.backgroundColor = 'red';
        } else {
            document.getElementById(`${bar}Bar`).style.backgroundColor = 'green';
        }
    }
};


//Generiert das Aussehen des Reiters Base Stats
function contentSectionBase() {
    return /*html*/`
    <table id="tableBase">
        <tr>
            <td class="properties">HP</td>
            <td id="hp"></td>
            <td><div class="statBar"><div id="hpBar"></div></div></td>
        </tr>
        <tr>
            <td class="properties">Attack</td>
            <td id="attack"></td>
            <td><div class="statBar"><div id="attackBar"></div></div></td>
        </tr>
        <tr>
            <td class="properties">Defense</td>
            <td id="defense"></td>
            <td><div class="statBar"><div id="defenseBar"></div></div></td>
        </tr>
        <tr>
            <td class="properties">Special-Attack</td>
            <td id="specialAttack"></td>
            <td><div class="statBar"><div id="specialAttackBar"></div></div></td>
        </tr>
        <tr>
            <td class="properties">Special-Defense</td>
            <td id="specialDefense"></td>
            <td><div class="statBar"><div id="specialDefenseBar"></div></div></td>
        </tr>
        <tr>
            <td class="properties">Speed</td>
            <td id="speed"></td>
            <td><div class="statBar"><div id="speedBar"></div></div></td>
        </tr>
    </table>
    `
};


//rendert den Attacken-Reiter
function openSectionMoves() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionMoves();
    renderMoves();
    removeClasslist('about', 'base', 'moves');
};


//holt die Informationen für die Tablle der Attacken
function renderMoves() {
    document.getElementById('move1').innerHTML = Pokemon['moves']['0']['move']['name'];
    document.getElementById('move2').innerHTML = Pokemon['moves']['1']['move']['name'];
    document.getElementById('move3').innerHTML = Pokemon['moves']['2']['move']['name'];
    document.getElementById('move4').innerHTML = Pokemon['moves']['3']['move']['name'];
    document.getElementById('move5').innerHTML = Pokemon['moves']['4']['move']['name'];
    document.getElementById('move6').innerHTML = Pokemon['moves']['5']['move']['name'];
}


//generiert die Tabelle für die Attacken
function contentSectionMoves() {
    return /*html*/`
    <table id="tableMoves">
        <tr>
            <td class="properties">Move 1:</td>
            <td id="move1"></td>
        </tr>
        <tr>
            <td class="properties">Move 2:</td>
            <td id="move2"></td>
        </tr>
        <tr>
            <td class="properties">Move 3:</td>
            <td id="move3"></td>
        </tr>
        <tr>
            <td class="properties">Move 4:</td>
            <td id="move4"></td>
        </tr>
        <tr>
            <td class="properties">Move 5:</td>
            <td id="move5"></td>
        </tr>
        <tr>
            <td class="properties">Move 6:</td>
            <td id="move6"></td>
        </tr>
    </table>
    `
};


//rendert den Typ des Pokemon auf der Pokemonübersicht
function typeOfPokemon() {
    let types = Pokemon['types'];
    if (types.length == 1) {
        document.getElementById('type2').classList.add('d-none');
        document.getElementById('type1').innerHTML = Pokemon['types']['0']['type']['name'];
    } else {
        document.getElementById('type1').innerHTML = Pokemon['types']['0']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
        document.getElementById('type2').innerHTML = Pokemon['types']['1']['type']['name'];
    }
};


//rendert den Typ des Pokemon auf der Detailansicht
function typeOfPokemonLite(id) {
    let types = currentPokemon['types'];
    if (types.length == 1) {
        document.getElementById(`type2.${id}`).classList.add('d-none');
        document.getElementById(`type1.${id}`).innerHTML = currentPokemon['types']['0']['type']['name'];
    } else {
        document.getElementById(`type1.${id}`).innerHTML = currentPokemon['types']['0']['type']['name'];
        document.getElementById(`type2.${id}`).classList.remove('d-none');
        document.getElementById(`type2.${id}`).innerHTML = currentPokemon['types']['1']['type']['name'];
    }
};


//generiert die Hintergrundfarbe der Pokemonkarte
function backgroundColor() {
    document.getElementById('pokedex').classList.add(document.getElementById('type1').innerHTML);
}


//generiert die Hintergrundfarbe der kleinen Pokemonkarten
function backgroundColorLite(id) {
    document.getElementById(`pokemon${id}`).classList.add(document.getElementById(`type1.${id}`).innerHTML);
}
