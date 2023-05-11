// 2022-2023 ITW PL22 
// Grupo 34 
// 0276 Beatriz Santos 
// 60290 João Martins
// 60253 Hugo Silva


"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                CONSTANTES */
/* ------------------------------------------------------------------------- */
/** Formulário que cria uma nova conta. */
const FORMS_NEW_ACCOUNT = "frmNovaConta";

/** Formulário que acede a uma conta existente. */
const FORMS_LOGIN = "frmLogin";

/** Identificador do botão para criar uma conta. */
const BOTAO_CRIAR_CONTA = "btnCreateAccount";

/** Identificador do botão para aceder a uma conta. */
const BOTAO_ENTRAR_CONTA = "btnLogin";

/* ------------------------------------------------------------------------- */

/** Campo do formulário de criar conta que contém o email do utilizador. */
const NEW_USERNAME = "username";

/** Campo do formulário de criar conta que contém o email do utilizador. */
const NEW_EMAIL = "email";

/** Campo do formulário de criar conta que contém a password do utilizador. */
const NEW_PASSWORD = "password";

/** Campo do formulário de criar conta que contém a idade do utilizador. */
const AGE = "age";

/** Campo do formulário de criar conta que contém o género do utilizador. */
const GENDER = "gender";

/* -------------------------------------------------------------------------- */

/** Campo do formulário de login que contém o email do utilizador. */
const LOGIN_USERNAME = "loginUsername";

/** Campo do formulário de login que contém a password do utilizador. */
const LOGIN_PASSWORD = "loginPassword";

/**-------------------------------------------------------------------------- */

/** Identificador do tempo de jogo, em minutos e segundos. */
const SPAN_TEMPO_JOGO = "spanTempoJogo";

/** Identificador do número de jogadas. */
const SPAN_JOGADAS = "spanJogadas";

/** Identificador da pontuação. */
const SPAN_PONTUACAO = "spanPontuacao";

/** Identificador da célula selecionada */
const SELECTED_CELL = "0-0";

/**-------------------------------------------------------------------------- */
/** Item de local storage que guarda o registo de contas. */
const ITEM_CONTAS = "contas";

/* ------------------------------------------------------------------------- */
/*                                                         VARIÁVEIS GLOBAIS */
/* ------------------------------------------------------------------------- */

let forms = null;

let form = null;

let contas = [];



/* ------------------------------------------------------------------------- */
/*                                                   CONSTRUTORES DE OBJETOS */
/* ------------------------------------------------------------------------- */

/** 
 * @param {string} username - Username do utilizador.
 * @param {string} email - Email do utilizador.
 * @param {string} password - Password da conta do utilizador.
 * @param {Number} age - Idade do utilizador.
 * @param {string} gender - Género do utilizador.
 */
function Conta(username, email, password, age, gender) {

  this.username = username;
  this.email = email;
  this.password = password;
  this.age = age;
  this.gender = gender;
}


/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */

function principal() {

  forms = document.forms[FORMS_NEW_ACCOUNT];
  form = document.forms[FORMS_LOGIN]

  carregaHistoricoContas();

  defineEventHandlersParaElementosHTML();
}

/* ------------------------------------------------------------------------- */
/*                                            REAÇÃO A EVENTOS DO UTILIZADOR */
/* ------------------------------------------------------------------------- */

function defineEventHandlersParaElementosHTML() {

  document.getElementById(BOTAO_CRIAR_CONTA).
    addEventListener("click", trataCriarConta);

  document.getElementById(BOTAO_ENTRAR_CONTA).
    addEventListener("click", trataAcederConta);
}

/* ------------------------------------------------------------------------- */

/**
 * Trata os dados de uma conta, provenientes do formulário HTML.
 */
function trataCriarConta() {

  let contaValida = forms.reportValidity();
  let conta = null;

  if (contaValida) {
    const username = forms.elements[NEW_USERNAME].value;
    const email = forms.elements[NEW_EMAIL].value;

    const contaExistente = contas.find(c => c.username === username || c.email === email);
    if (contaExistente) {
      alert("An account already exists with that email or username.");
      return false;
    } else {
    conta = new Conta(obtemDadosConta());
    gravaContaNoHistorico(conta); 

    window.location.href = "login.html";

    forms.reset();
    }
  }
}

function trataAcederConta() {
  const username = form.elements[LOGIN_USERNAME].value;
  const password = form.elements[LOGIN_PASSWORD].value;

  const accounts = JSON.parse(localStorage.getItem(ITEM_CONTAS)) || [];
  const account = accounts.find((acc) => acc.username === username && acc.password === password);

  if (!account) {
    alert("Wrong username or password. Try again!");
  }

  alert(`Welcome, ${account.username}!`);
  window.location.href = "play.html";
  form.reset();
}



/* ------------------------------------------------------------------------- */
/*                                           OBTENÇÃO DE DADOS DO FORMULÁRIO */
/* ------------------------------------------------------------------------- */

/**
 * @returns {Conta} Objeto com os dados da conta.
 */
function obtemDadosConta() {

  return new Conta(forms.elements[NEW_USERNAME].value, forms.elements[NEW_EMAIL].value, forms.elements[NEW_PASSWORD].value, forms.elements[AGE].value, forms.elements[GENDER].value);


}

/* ------------------------------------------------------------------------- */
/*                                         GESTÃO DO HISTÓRICO DE ENCOMENDAS */
/* ------------------------------------------------------------------------- */


function carregaHistoricoContas() {

  contas = JSON.parse(localStorage.getItem(ITEM_CONTAS)) || [];

}

/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */

/** 
 * @param {Conta} conta - Objeto com os dados da conta.
 */

function gravaContaNoHistorico(conta) {
  contas.push(conta);
  localStorage.setItem(ITEM_CONTAS, JSON.stringify(contas));
}


// LOGIN
// CONTAS COM O MESMO USERNAME OU EMAIL NÃO ESTÃO A SER FILTRADAS 


