let clickCount=0;
const titulo=document.getElementById("tituloApp");
const adm=document.getElementById("admPanel");
const senhaADM="krazyadm071110";

titulo.addEventListener("click",()=>{
    clickCount++;
    if(clickCount===7){
        const senha=prompt("Digite a senha ADM:");
        if(senha===senhaADM){ adm.style.display=(adm.style.display==="none")?"block":"none"; }
        else alert("Senha incorreta ❌");
        clickCount=0;
    }
});

// TABS
function abrirTab(tabId){
  document.querySelectorAll(".tabContent").forEach(c=>c.style.display="none");
  document.getElementById(tabId).style.display="block";
}

// GERAR KEY ADM
function gerarKey(){
  const diasInput = document.getElementById("dias").value.trim();
  const permanente = diasInput.toLowerCase() === "permanente";
  if(!permanente && (isNaN(diasInput) || diasInput<=0)){ alert("Digite número válido ou 'permanente'"); return;}
  const novaKey = "KZ-"+Math.random().toString(36).substring(2,10).toUpperCase();
  document.getElementById("keyGerada").innerText = novaKey;
  document.getElementById("boxKey").style.display="block";
}

// VALIDAR KEY
function validarKey(){
  const key=document.getElementById("inputKey").value.trim().toUpperCase();
  if(key.startsWith("KZ-")){ 
      document.getElementById("loginArea").style.display="none";
      document.getElementById("geradorArea").style.display="block";
      abrirTab("celular");
  } else { document.getElementById("status").innerText="Key inválida ❌"; }
}

// COPIAR KEY
function copiarKey(){
  const texto=document.getElementById("keyGerada").innerText;
  navigator.clipboard.writeText(texto);
  document.getElementById("copiadoMsg").innerText="Copiado ✅";
  setTimeout(()=>{ document.getElementById("copiadoMsg").innerText=""; },2000);
}

// GERAR SENSI
async function gerarSensi(tipo, arma=null){
  const resultado = tipo==="arma"? document.getElementById("resultadoArma") : document.getElementById("resultadoSensi");
  resultado.innerHTML = `<div id="loading">Processando IA <span id="dots">...</span></div>`;
  let dotCount=0;
  const dotInterval = setInterval(()=>{ dotCount=(dotCount+1)%4; document.getElementById("dots").innerText='.'.repeat(dotCount);},500);
  await new Promise(res=>setTimeout(res,2500));
  clearInterval(dotInterval);

  let geral=0,dpi=0;
  if(tipo==="celular"){
    const marca=document.getElementById("marca").value;
    const modelo=document.getElementById("modelo").value.trim();
    const potencia=document.getElementById("potencia").value;
    let minGeral,maxGeral;
    if(potencia==="baixa"){ minGeral=40; maxGeral=120;}
    if(potencia==="media"){ minGeral=80; maxGeral=160;}
    if(potencia==="alta"){ minGeral=120; maxGeral=200;}
    geral=Math.floor(minGeral + (Math.random()**1.5)*(maxGeral-minGeral));
    dpi=Math.floor(960-(geral/200)*560 + (Math.random()-0.5)*50);
    if(dpi>960)dpi=960; if(dpi<400)dpi=400;
    resultado.innerHTML=`Marca: ${marca}<br>Modelo: ${modelo}<br>Geral: ${geral}<br>DPI: ${dpi}`;
  } else if(tipo==="arma"){
    if(!arma) return;
    geral=Math.floor(100 + Math.random()*100);
    dpi=Math.floor(960-(geral/200)*560 + (Math.random()-0.5)*50);
    if(dpi>960)dpi=960; if(dpi<400)dpi=400;
    resultado.innerHTML=`Arma: ${arma}<br>Geral: ${geral}<br>DPI: ${dpi}`;
  }
}

// CALCULAR DPI
function calcularDPI(){
  const sensi=parseFloat(document.getElementById("sensiDPI").value);
  if(isNaN(sensi) || sensi<=0){ alert("Digite um valor válido"); return;}
  let dpi=Math.floor(960-(sensi/200)*560);
  if(dpi>960)dpi=960; if(dpi<400)dpi=400;
  document.getElementById("resultadoDPI").innerHTML=`DPI recomendada: ${dpi}`;
}

// CALCULAR CICLOS IPHONE
function calcularCiclos(){
  const dpi=parseFloat(document.getElementById("dpiIphone").value);
  const sensi=parseFloat(document.getElementById("sensiIphone").value);
  if(isNaN(dpi) || isNaN(sensi) || dpi<=0 || sensi<=0){ alert("Valores inválidos"); return;}
  const ciclos = Math.round((dpi/100)*(sensi/50));
  document.getElementById("resultadoCiclos").innerHTML=`Ciclos por segundo: ${ciclos}`;
}

// Expor funções
window.validarKey=validarKey;
window.gerarSensi=gerarSensi;
window.gerarKey=gerarKey;
window.copiarKey=copiarKey;
window.abrirTab=abrirTab;
window.calcularDPI=calcularDPI;
window.calcularCiclos=calcularCiclos;
