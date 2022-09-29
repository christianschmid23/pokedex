let currentPokemon;

async function loadPokemon() {
    let id = 1; //max 809
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded pokemon', currentPokemon)

    pokemonLite();
    renderPokemonCard();
    renderPokemonInfo();
}

function nameUppercaseFirstLetter() {
    let name = currentPokemon['name'];
    let nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('pokemonName').innerHTML = nameUppercase
}

function pokemonLite() {
    let overview = document.getElementById('pokemonOverview');
    overview.innerHTML = '';
    overview.innerHTML += renderPokemonLite();
}

function renderPokemonLite(id) {
    for (let i = 0; i < 4; i++) {
        id += 1
        return /*html*/`
        <div class="pokemonLite">
            <div>
                ${currentPokemon['name']}
                <div>
                    <div class="types" id="type1.1"></div>            
                    <div class="types" id="type2.1"></div>            
                </div>
            </div>
            <img id="pokemonImgLite" width="100px" height="100px">
        </div>
        `
    }
}

function renderPokemonInfo() {
    nameUppercaseFirstLetter();
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonImgLite').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonId').innerHTML = ('000' + currentPokemon['id']).substr(-3);
}

function renderPokemonCard() {
    document.getElementById('emptyCard').innerHTML = renderCard();
    typeOfPokemon();
}

function renderCard() {
    return     /*html*/`
    <div class="card">
    <div id="pokedex">
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
<!--        <img class="closeRight" onclick="close()" src="./img/close.png" positon="fixed" right="50px" width="30px" height="30px" alt=""> -->
    </div>
    <div class="infoContainer">
        <img id="pokemonImg" width="170px" height="170px">
        <div class="bar" onload="openSectionAbout()">
            <div id="about" onclick="openSectionAbout()" class="barChild">About</div>
            <div id="base" onclick="openSectionBase()" class="barChild">Base Stats</div>
<!--               <div id="evo" onclick="openSectionEvo()" class="barChild">Evolution</div>-->
            <div id="moves" onclick="openSectionMoves()" class="barChild">Moves</div>
            </div>
        </div>
        <div id="infoDisplay">
    </div>
</div>
`
}

function close() {
    document.getElementById('emptyCard').innerHTML = '';
}

function powerOff() { //if-abfrage zum ein und aus schalten
    let right = document.getElementById('emptyCard');
    right.innerHTML = '';
    if (document.getElementById('emptyCard').classList == 'd-black') {
        document.getElementById('emptyCard').classList.remove('d-black');
        document.getElementById('pokemonOverview').classList.remove('d-black')
    } else {
        document.getElementById('emptyCard').classList.add('d-black');
        document.getElementById('pokemonOverview').classList.add('d-black');
    }
}

function openSectionAbout() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionAbout();
    renderAbout();
};

function renderAbout() {
    //document.getElementById('species').innerHTML = currentPokemon[''];
    document.getElementById('height').innerHTML = currentPokemon['height'] * 10 + `&nbsp;` + 'cm';
    document.getElementById('weight').innerHTML = currentPokemon['weight'] + `&nbsp;` + 'kg';
    document.getElementById('abilities').innerHTML = currentPokemon['abilities']['0']['ability']['name'] + ',' + `&nbsp;` + currentPokemon['abilities']['1']['ability']['name'];
}

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

function openSectionBase() {
    renderStats();
    renderBars();
};

function renderStats() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionBase();
    document.getElementById('hp').innerHTML = currentPokemon['stats']['0']['base_stat'];
    document.getElementById('attack').innerHTML = currentPokemon['stats']['1']['base_stat'];
    document.getElementById('defense').innerHTML = currentPokemon['stats']['2']['base_stat'];
    document.getElementById('specialAttack').innerHTML = currentPokemon['stats']['3']['base_stat'];
    document.getElementById('specialDefense').innerHTML = currentPokemon['stats']['4']['base_stat'];
    document.getElementById('speed').innerHTML = currentPokemon['stats']['5']['base_stat'];
}

function renderBars() {
    generateHpBar();
    generateAttackBar();
    generateDefenseBar();
    generateSpecialAttackBar();
    generateSpecialDefenseBar();
    generateSpeedBar();
}

function generateHpBar() {
    let number = +document.getElementById('hp').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('hpBar').style.width = `${multipl}vw`;
    document.getElementById('hpBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('hpBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('hpBar').style.backgroundColor = 'green';
    }
};

function generateAttackBar() {
    let number = +document.getElementById('attack').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('attackBar').style.width = `${multipl}vw`;
    document.getElementById('attackBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('attackBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('attackBar').style.backgroundColor = 'green';
    }
};

function generateDefenseBar() {
    let number = +document.getElementById('defense').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('defenseBar').style.width = `${multipl}vw`;
    document.getElementById('defenseBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('defenseBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('defenseBar').style.backgroundColor = 'green';
    }
};

function generateSpecialAttackBar() {
    let number = +document.getElementById('specialAttack').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('specialAttackBar').style.width = `${multipl}vw`;
    document.getElementById('specialAttackBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('specialAttackBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('specialAttackBar').style.backgroundColor = 'green';
    }
};

function generateSpecialDefenseBar() {
    let number = +document.getElementById('specialDefense').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('specialDefenseBar').style.width = `${multipl}vw`;
    document.getElementById('specialDefenseBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('specialDefenseBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('specialDefenseBar').style.backgroundColor = 'green';
    }
};

function generateSpeedBar() {
    let number = +document.getElementById('speed').innerHTML;
    let multipl = number * 0.15;
    document.getElementById('speedBar').style.width = `${multipl}vw`;
    document.getElementById('speedBar').style.height = '5px';
    if (multipl < 8) {
        document.getElementById('speedBar').style.backgroundColor = 'red';
    } else {
        document.getElementById('speedBar').style.backgroundColor = 'green';
    }
};

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

/*function openSectionEvo() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionEvo();
    document.getElementById('species').innerHTML = currentPokemon[''];
    document.getElementById('height').innerHTML = currentPokemon['height'] * 10 + `&nbsp;` + 'cm';
    document.getElementById('weight').innerHTML = currentPokemon['weight'] + `&nbsp;` + 'kg';
    document.getElementById('abilities').innerHTML = currentPokemon['abilities']['0']['ability']['name'] + ',' + `&nbsp;` + currentPokemon['abilities']['1']['ability']['name'];
};

function contentSectionEvo() {
    return /*html`
    <table>
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
    </table>
    `
};*/


function openSectionMoves() {
    let infoDisplay = document.getElementById('infoDisplay');
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = contentSectionMoves();
    renderMoves();
};

function renderMoves() {
    document.getElementById('move1').innerHTML = currentPokemon['moves']['0']['move']['name'];
    document.getElementById('move2').innerHTML = currentPokemon['moves']['1']['move']['name'];
    document.getElementById('move3').innerHTML = currentPokemon['moves']['2']['move']['name'];
    document.getElementById('move4').innerHTML = currentPokemon['moves']['3']['move']['name'];
    document.getElementById('move5').innerHTML = currentPokemon['moves']['4']['move']['name'];
    document.getElementById('move6').innerHTML = currentPokemon['moves']['5']['move']['name'];
}

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

/*function barRight() {
    if (document.getElementById('tableAbout') === true) {
        openSectionBase();
    }

    if (document.getElementById('tableBase') === true) {
        openSectionMoves();
    }
    if (document.getElementById('tableMoves') === true) {
        openSectionAbout();
    }
}*/

function typeOfPokemon() {
    let types = currentPokemon['types'];
    if (currentPokemon['types'].length == 1) {
        document.getElementById('type2').classList.add('d-none');
        document.getElementById('type2.1').classList.add('d-none');
        document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
        document.getElementById('type1.1').innerHTML = currentPokemon['types']['0']['type']['name'];
    } else {
        document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
        document.getElementById('type1.1').innerHTML = currentPokemon['types']['0']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
        document.getElementById('type2.1').classList.remove('d-none');
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('type2.1').innerHTML = currentPokemon['types']['1']['type']['name'];
    }
};