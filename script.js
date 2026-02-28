// Variáveis globais
const loginScreen = document.getElementById('loginScreen');
const mainScreen = document.getElementById('mainScreen');
const boxKey = document.getElementById('boxKey');
const loading = document.getElementById('loading');
const admPanel = document.getElementById('admPanel');
const sensisSalvas = document.getElementById('sensisSalvas');

let clickCount = 0;
let savedSensis = [];
const validKeys = ["KRAZY123","KRAZY456","KRAZY789"]; // exemplo

// Login por Key
function validarKey(){
    const key = document.getElementById('userKey').value;
    if(validKeys.includes(key)){
        loginScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    } else {
        alert("Key inválida!");
    }
}

// Painel ADM oculto
document.getElementById('tituloApp').addEventListener('click',()=>{
    clickCount++;
    if(clickCount >=7){
        let senha = prompt("Digite a senha ADM:");
        if(senha==="krazyadm071110") admPanel.style.display="block";
        clickCount=0;
    }
});

// Função para gerar Sensi
function gerarSensi(tipo){
    loading.style.display="block";
    setTimeout(()=>{
        let geral, redDot, scope2, scope4, awm;
        if(tipo==="celular"){
            let modo = document.getElementById('modoCelular').value;
            [geral, redDot, scope2, scope4, awm] = calcularSensiModo(modo);
            let marca = document.getElementById('marcaCelular').value;
            let modelo = document.getElementById('modeloCelular').value;
            boxKey.innerHTML = gerarCard(`Celular ${marca} ${modelo}`, modo, geral, redDot, scope2, scope4, awm);
        }
        if(tipo==="arma"){
            let modo = document.getElementById('modoArma').value;
            let arma = document.getElementById('tipoArma').value;
            [geral, redDot, scope2, scope4, awm] = calcularSensiArma(modo);
            boxKey.innerHTML = gerarCard(`Arma ${arma}`, modo, geral, redDot, scope2, scope4, awm);
        }
        if(tipo==="famoso"){
            let jogador = document.getElementById('jogadorFamoso').value;
            [geral, redDot, scope2, scope4, awm] = calcularSensiFamoso(jogador);
            boxKey.innerHTML = gerarCard(`Famoso ${jogador}`, "Inspirada", geral, redDot, scope2, scope4, awm);
        }
        // Adicionar botão de curtir
        let curtirBtn = document.createElement('button');
        curtirBtn.innerText="❤️ Curtir e Salvar";
        curtirBtn.onclick = ()=>{
            savedSensis.push(boxKey.innerHTML);
            atualizarSensisSalvas();
        };
        boxKey.appendChild(curtirBtn);
        loading.style.display="none";
    },1200);
}

// Função para calcular sensi por modo (celular)
function calcularSensiModo(modo){
    let geral;
    if(modo==="balanceada") geral= Math.floor(Math.random()*30)+130; // ≤160
    if(modo==="maisControle") geral= Math.floor(Math.random()*20)+100; // ≤120
    if(modo==="muitoRapida") geral= Math.floor(Math.random()*15)+185; // ≥185
    if(modo==="maisCapa") geral= Math.floor(Math.random()*20)+160; // ≤180
    return calcularScopes(geral);
}

// Função para calcular sensi por arma
function calcularSensiArma(modo){
    let geral;
    if(modo==="balanceado") geral= Math.floor(Math.random()*30)+130;
    if(modo==="controle") geral= Math.floor(Math.random()*20)+100;
    if(modo==="rapido") geral= Math.floor(Math.random()*15)+185;
    return calcularScopes(geral);
}

// Função para calcular Sensis de famosos
function calcularSensiFamoso(jogador){
    let presets = {
        "ApelaPato":[150,132,145,155,138],
        "Marechal":[160,140,150,160,145],
        "Two9":[155,135,145,155,140],
        "Nobru":[180,160,170,180,165],
        "Freitas":[140,125,135,145,130],
        "Cerol":[130,115,125,130,120],
        "Fantasma":[170,150,160,170,155],
        "White444":[160,140,150,160,145]
    };
    return presets[jogador] || [150,132,145,155,138];
}

// Calcular scopes baseado na geral
function calcularScopes(geral){
    let redDot = Math.round(geral*0.88);
    let scope2 = Math.round(geral*0.97);
    let scope4 = Math.round(geral*1.03);
    let awm = Math.round(geral*0.92);
    return [geral, redDot, scope2, scope4, awm];
}

// Gerar card futurista
function gerarCard(nome, modo, geral, redDot, scope2, scope4, awm){
    return `<div class="card">
        <h3>${nome} - ${modo}</h3>
        <p>Geral: <b>${geral}</b></p>
        <p>Red Dot: <b>${redDot}</b></p>
        <p>2x: <b>${scope2}</b></p>
        <p>4x: <b>${scope4}</b></p>
        <p>AWM/Olhadinha: <b>${awm}</b></p>
    </div>`;
}

// Atualizar aba Sensis salvas
function atualizarSensisSalvas(){
    sensisSalvas.innerHTML = savedSensis.join("");
}

// Gerar Key aleatória (ADM)
function gerarKey(){
    let key = "KRAZY"+Math.floor(Math.random()*900+100);
    alert("Key gerada: "+key);
    validKeys.push(key);
}
