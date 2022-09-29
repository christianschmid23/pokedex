let currentPokemon;
let counter = 0;

async function loadPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(`Loaded pokemon with ID${id}`, currentPokemon);
    pokemonLite(id);
    //renderPokemon();
    backgroundColor();
}

function loadAllPokemon() {
    document.getElementById('pokemonOverview').innerHTML = '';
    for (let id = 1; id <= 809; id++) {
        loadPokemon(id);
    }
}

function nameUppercaseFirstLetter() {
    let name = currentPokemon['name'];
    let nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('pokemonName').innerHTML = nameUppercase
}

function nameUppercaseFirstLetterLite(id) {
    let name = currentPokemon['name'];
    let nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById(`name${id}`).innerHTML = nameUppercase
}

function pokemonLite(id) {
    let overview = document.getElementById('pokemonOverview');
    overview.innerHTML += renderPokemonLite(id);
    renderPokemonImgLite(id);
    nameUppercaseFirstLetterLite(id);
    typeOfPokemonLite(id);
    backgroundColorLite(id);
}

function renderPokemonLite(id) {
    return /*html*/`
        <div onclick="renderPokemon()" class="pokemonLite" id='pokemon${id}'>
            <div class="cardLeft">
                <div id="name${id}">${currentPokemon['name']}</div>
                <div>
                    <div class="types" id="type1.${id}"></div>            
                    <div class="types" id="type2.${id}"></div>            
                </div>
            </div>
            <img id="Lite${id}" width="100px" height="100px">
        </div>
        `
}

function renderPokemonImgLite(id) {
    document.getElementById(`Lite${id}`).src = currentPokemon['sprites']['other']['home']['front_default'];
}

function renderPokemon() {
    renderPokemonCard();
    renderPokemonInfo();
}

function renderPokemonInfo() {
    nameUppercaseFirstLetter();
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonId').innerHTML = ('000' + currentPokemon['id']).substr(-3);
}

function renderPokemonCard(id) {
    document.getElementById('emptyCard').innerHTML = renderCard();
    typeOfPokemon(id);
    backgroundColor();
}

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
<!--        <img class="closeRight" onclick="close()" src="./img/close.png" positon="fixed" right="50px" width="30px" height="30px" alt=""> -->
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

function close() {
    document.getElementById('emptyCard').innerHTML = '';
}

function powerOff() {
    let right = document.getElementById('emptyCard');
    let left = document.getElementById('pokemonOverview');
    right.innerHTML = '';
    left.innerHTML = '';
    if (counter == 1) {
        right.classList.remove('d-black');
        left.classList.remove('d-black');
        counter = 0;
        loadAllPokemon();
    } else {
        right.classList.add('d-black');
        left.classList.add('d-black');
        counter = 1;
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
    let multipl = number * 0.11;
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
    let multipl = number * 0.11;
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
    let multipl = number * 0.11;
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
    let multipl = number * 0.11;
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
    let multipl = number * 0.11;
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
    let multipl = number * 0.11;
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
    if (types.length == 1) {
        document.getElementById('type2').classList.add('d-none');
        document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
    } else {
        document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
    }
};

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

function backgroundColor() {
    if (document.getElementById(`type1`).innerHTML == 'grass') {
        document.getElementById('pokedex').classList.add('b-grass');
    }
    if (document.getElementById(`type1`).innerHTML == 'water') {
        document.getElementById('pokedex').classList.add('b-water');
    }
    if (document.getElementById(`type1`).innerHTML == 'fire') {
        document.getElementById('pokedex').classList.add('b-fire');
    }
    if (document.getElementById(`type1`).innerHTML == 'bug') {
        document.getElementById('pokedex').classList.add('b-bug');
    }
    if (document.getElementById(`type1`).innerHTML == 'normal') {
        document.getElementById('pokedex').classList.add('b-normal');
    }
    if (document.getElementById(`type1`).innerHTML == 'poisen') {
        document.getElementById('pokedex').classList.add('b-poisen');
    }
    if (document.getElementById(`type1`).innerHTML == 'electric') {
        document.getElementById('pokedex').classList.add('b-electric');
    }
    if (document.getElementById(`type1`).innerHTML == 'ground') {
        document.getElementById('pokedex').classList.add('b-ground');
    }
    if (document.getElementById(`type1`).innerHTML == 'fairy') {
        document.getElementById('pokedex').classList.add('b-fairy');
    }
    if (document.getElementById(`type1`).innerHTML == 'fighting') {
        document.getElementById('pokedex').classList.add('b-fighting');
    }
    if (document.getElementById(`type1`).innerHTML == 'psychic') {
        document.getElementById('pokedex').classList.add('b-psychic');
    }
    if (document.getElementById(`type1`).innerHTML == 'rock') {
        document.getElementById('pokedex').classList.add('b-rock');
    }
    if (document.getElementById(`type1`).innerHTML == 'ghost') {
        document.getElementById('pokedex').classList.add('b-ghost');
    }
    if (document.getElementById(`type1`).innerHTML == 'ice') {
        document.getElementById('pokedex').classList.add('b-ice');
    }
    if (document.getElementById(`type1`).innerHTML == 'dragon') {
        document.getElementById('pokedex').classList.add('b-dragon');
    }
    if (document.getElementById(`type1`).innerHTML == 'dark') {
        document.getElementById('pokedex').classList.add('b-dark');
    }
    if (document.getElementById(`type1`).innerHTML == 'steel') {
        document.getElementById('pokedex').classList.add('b-steel');
    }
}

function backgroundColorLite(id) {
    if (document.getElementById(`type1.${id}`).innerHTML == 'grass') {
        document.getElementById(`pokemon${id}`).classList.add('b-grass');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'water') {
        document.getElementById(`pokemon${id}`).classList.add('b-water');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'fire') {
        document.getElementById(`pokemon${id}`).classList.add('b-fire');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'bug') {
        document.getElementById(`pokemon${id}`).classList.add('b-bug');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'normal') {
        document.getElementById(`pokemon${id}`).classList.add('b-normal');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'poisen') {
        document.getElementById(`pokemon${id}`).classList.add('b-poisen');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'electric') {
        document.getElementById(`pokemon${id}`).classList.add('b-electric');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'ground') {
        document.getElementById(`pokemon${id}`).classList.add('b-ground');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'fairy') {
        document.getElementById(`pokemon${id}`).classList.add('b-fairy');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'fighting') {
        document.getElementById(`pokemon${id}`).classList.add('b-fighting');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'psychic') {
        document.getElementById(`pokemon${id}`).classList.add('b-psychic');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'rock') {
        document.getElementById(`pokemon${id}`).classList.add('b-rock');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'ghost') {
        document.getElementById(`pokemon${id}`).classList.add('b-ghost');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'ice') {
        document.getElementById(`pokemon${id}`).classList.add('b-ice');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'dragon') {
        document.getElementById(`pokemon${id}`).classList.add('b-dragon');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'dark') {
        document.getElementById(`pokemon${id}`).classList.add('b-dark');
    }
    if (document.getElementById(`type1.${id}`).innerHTML == 'steel') {
        document.getElementById(`pokemon${id}`).classList.add('b-steel');
    }
}