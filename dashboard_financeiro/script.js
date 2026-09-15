const listaTransacoes = document.querySelector('#transacoes');
let transacoesIniciais = [];

function atualizarEntradas () {
const entradas = document.querySelector('#entradas');
const receitas = transacoesIniciais.filter(transacao => transacao.tipo === 'receita');
const totalEntradas = receitas.reduce((acumulador, transacao) => {
   return acumulador + transacao.valor;
}, 0);
entradas.textContent = formatarMoeda(totalEntradas);
return totalEntradas;
}

function atualizarDespesas () {
const saidas = document.querySelector('#saidas');
const despesas = transacoesIniciais.filter(transacao => transacao.tipo === 'despesa');
const totalDespesas = despesas.reduce ((acumulador, transacao) => {
   return acumulador + transacao.valor;
}, 0);
saidas.textContent = formatarMoeda(totalDespesas);
return totalDespesas;
}

function atualizarSaldo(){
const saldos = document.querySelector('#saldo');
const totalEntradas = atualizarEntradas();
const totalDespesas = atualizarDespesas();
const saldoLiquido = totalEntradas - totalDespesas;
saldos.textContent = formatarMoeda(saldoLiquido);
}

function formatarMoeda(valor) {
   return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
   });
}

const botaoTodas = document.querySelector('#todas');
botaoTodas.addEventListener('click', () => {
   renderizarTransacoes(transacoesIniciais);
});

const botaoReceitas = document.querySelector('#receitas');
botaoReceitas.addEventListener('click', () => {
   const receitas = transacoesIniciais.filter(transacao => transacao.tipo === 'receita');
   renderizarTransacoes(receitas);
});

const botaoDespesas = document.querySelector('#despesas');
botaoDespesas.addEventListener('click', () => {
   const despesas = transacoesIniciais.filter(transacao => transacao.tipo === 'despesa');
   renderizarTransacoes(despesas);
});

const descricao = document.querySelector('#descricao');
const tipo = document.querySelector('#tipo');
const valor = document.querySelector('#valor');
const formulario = document.querySelector('#form')
formulario.addEventListener('submit', (evento) => {
   evento.preventDefault();
   const nomeDescricao = descricao.value;
   const nomeTipo = tipo.value;
   const valorDigitado = valor.value;
   const valorNum = Number(valorDigitado);
   const maiorId = transacoesIniciais.length + 1;
   const novaTransacao = {
      id: maiorId,
      descricao: nomeDescricao,
      valor: valorNum,
      tipo: nomeTipo
   };
   transacoesIniciais.push(novaTransacao);
   renderizarTransacoes(transacoesIniciais);
   atualizarSaldo();
});

function renderizarTransacoes(transacoes){
   listaTransacoes.textContent = "";
   transacoes.map(transacao => {

   const item = document.createElement('tr');
   
   const celulaId = document.createElement('td');
   celulaId.textContent = transacao.id;
   item.appendChild(celulaId);

   const celulaDescricao = document.createElement('td');
   celulaDescricao.textContent = transacao.descricao;
   item.appendChild(celulaDescricao);

   const celulaClassificacao = document.createElement('td');
   celulaClassificacao.textContent = transacao.tipo;
   item.appendChild(celulaClassificacao);

   const celulaValor = document.createElement('td');
   celulaValor.textContent = formatarMoeda(transacao.valor);
   item.appendChild(celulaValor);

   const celulaAcao = document.createElement('td')

   const botaoExcluir = document.createElement('button')
   botaoExcluir.textContent = 'Excluir';
   botaoExcluir.dataset.id = transacao.id;

   celulaAcao.appendChild(botaoExcluir);
   item.appendChild(celulaAcao);

   botaoExcluir.addEventListener('click', (evento) => {
      console.log(evento.target.dataset.id) 
      const id = Number(evento.target.dataset.id);
      const transacoesAtualizadas = transacoesIniciais.filter(transacao => transacao.id !== id );
      transacoesIniciais = transacoesAtualizadas;
      renderizarTransacoes(transacoesAtualizadas);
      atualizarSaldo();
   })

   listaTransacoes.appendChild(item);
   

   console.log(item);

   return item;
});
}

renderizarTransacoes(transacoesIniciais);