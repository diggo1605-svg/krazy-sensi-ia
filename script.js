// Configurações iniciais
const tituloApp = document.getElementById('tituloApp');
const admPanel = document.getElementById('admPanel');
const boxKey = document.getElementById('boxKey');
const loading = document.getElementById('loading');
let clickCount = 0;

// Função de desbloqueio ADM
tituloApp.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 7) {
        let senha = prompt("Digite a senha do ADM:");
        if(senha === "krazyadm071110") {
            admPanel.style.display = "block";
            alert("Painel ADM desbloqueado!");
        } else {
            alert("Senha incorreta!");
        }
        clickCount = 0;
    }
});

// Função de partículas
function criarParticulas(qt) {
    for(let i = 0; i < qt; i++) {
        let p = document.createElement('div');
        p.classList.add('particle');
        p.style.top = Math.random()*window.innerHeight+'px';
        p.style.left = Math.random()*window.innerWidth+'px';
        p.style.animationDuration = (3 + Math.random()*4) + 's';
        document.body.appendChild(p);
    }
}
criarParticulas(30);

// Função gerar Sensi
function gerarSensi(tipo="celular") {
    loading.style.display = "block";
    setTimeout(() => {
        let valor = Math.floor(Math.random()*200)+1;
        let dpi = Math.floor(960 - valor*4.5); // IA-style
        boxKey.innerHTML = `
            <div class="card">
                <h3>Sensi ${tipo.toUpperCase()} gerada</h3>
                <p>Valor: <b>${valor}</b></p>
                <p>DPI: <b>${dpi}</b></p>
            </div>
        `;
        loading.style.display = "none";

        // Brilho pulsante
        const card = boxKey.querySelector('.card');
        card.style.boxShadow = '0 0 50px #bb00ff, 0 0 90px #ff00ff';
        setTimeout(() => {
            card.style.boxShadow = '0 0 25px #8000ff, 0 0 50px #bb00ff';
        }, 600);
    }, 1200);
}

// Efeito botão clicado
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.filter = 'brightness(65%)';
        setTimeout(() => {
            btn.style.filter = 'brightness(100%)';
        }, 200);
    });
});

// Gerar Key
function gerarKey() {
    loading.style.display = "block";
    setTimeout(() => {
        const key = 'KS-'+Math.random().toString(36).substr(2,6).toUpperCase();
        boxKey.innerHTML = `
            <div class="card">
                <h3>Key gerada</h3>
                <p>Key: <b>${key}</b></p>
            </div>
        `;
        loading.style.display = "none";

        // Brilho pulsante
        const card = boxKey.querySelector('.card');
        card.style.boxShadow = '0 0 50px #bb00ff, 0 0 90px #ff00ff';
        setTimeout(() => {
            card.style.boxShadow = '0 0 25px #8000ff, 0 0 50px #bb00ff';
        }, 600);
    }, 1200);
}

// Função inicial
document.addEventListener('DOMContentLoaded', () => {
    loading.style.display = "none";
});
