//Initial Data
let square = {
    a1: '', a2:'', a3:'',
    b1: '', b2:'', b3:'',
    c1: '', c2:'', c3:'',
};

let player ='';
let warning ='';
let playing = false;

let playerXWins = 0;
let playerOWins = 0;
const maxWins = 5; 
const scoreFinal = document.querySelector('.finalResult');

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

document.querySelector('.reset-score').addEventListener('click', resetScore);

//Functions
function playerMove(){
    let moveSound= document.getElementById('move-sound');
    moveSound.play();
}

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
        playerMove();
    }
}

function reset(){
    warning ='';

    let random = Math.floor(Math.random()*2);
    player = (random === 0) ? 'x' : 'o';

    for(let i in square){
        square [i] ='';
    }
    playing = true;

    scoreFinal.innerHTML= '';

    playerMove();
    renderSquare();
    renderInfo();
}

function renderSquare(){
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player; // Mostra quem é a vez
    document.querySelector('.resultado').innerHTML = warning; // Mostra o resultado atual
    document.querySelector('.x-wins').innerHTML = `Vitórias X: ${playerXWins}`; // Mostra vitórias do X
    document.querySelector('.o-wins').innerHTML = `Vitórias O: ${playerOWins}`; // Mostra vitórias do O
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playerXWins++;
        playing = false;
        confettiEffect();  // Lançar confetes
        displayWinningMessage(warning);
        if(playerXWins === maxWins){
            scoreFinal.innerHTML = `O jogador "O" é o campeão com 5 vitórias!`;
            renderScore();
            playWinSound();
        }
    } else if(checkWinnerFor('o')){warning = 'O "o" venceu';
        playerOWins++;
        playing = false;
        confettiEffect();  // Lançar confetes
        displayWinningMessage(warning);
        if(playerOWins === maxWins){
            scoreFinal.innerHTML = `O jogador "O" é o campeão com 5 vitórias!`; // Declara o campeão
            renderScore();
            playWinSound();
        }
    } else if (isFull()){
        warning = 'Deu empate';
        playing = false;
    }
    renderScore();
}


function renderScore(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
    document.querySelector('.x-wins').innerHTML = `Vitórias X <br> ${playerXWins}`;
    document.querySelector('.o-wins').innerHTML = `Vitórias O <br> ${playerOWins}`;
}

function displayWinningMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('winning-message');
    messageDiv.innerHTML = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function resetSound(){
    let resetClick = document.getElementById('reset-sound');
    resetClick.play();
}

function resetScore(){
    warning ='';

     // Resetar o tabuleiro
     for (let i in square) {
        square[i] = ''; // Limpar cada item do tabuleiro
    }

    // Resetar o placar
    playerXWins = 0;
    playerOWins = 0;

    //Efeito sonoro
    resetSound();

    // Atualizar a interface
    scoreFinal.innerHTML= '';
    renderSquare();
    renderInfo();   
}

// Função para lançar confetes
function confettiEffect(){
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b2,c3',
        'a2,b2,c3',
        'a3,b3,c3',

        'a1,b2,c3',
        'a2,b2,c2',
        'a3,b2,c1',
        'a1,b1,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(','); //a1 a2 a3
        let hasWon = pArray.every(option=>square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}

function playWinSound() {
    let winSound = document.getElementById('win-sound');
    winSound.play();
}