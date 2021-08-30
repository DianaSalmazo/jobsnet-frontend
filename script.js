//Validação CEP

'use strict';

const limparFormulario = (endereco) => {
  document.getElementById('endereco').value = "";
  document.getElementById('bairro').value = "";
  document.getElementById('cidade').value = "";
  document.getElementById('estado').value = "";
    
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
    
}
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')){
      alert("CEP inválido")
    } else {
      preencherFormulario(endereco);
    }    
  } else {
      alert("CEP inválido")
  }   
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);


//Validação CPF 

function validaCPF(cpf) {
var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
        
  if (cpf.length < 11) {
    return false;
  }
        
  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
    break;
    }
  }
        
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
        
  for (i = 10; i > 1; i--) {
    soma += numeros.charAt(10 - i) * i;
  }
        
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        
  if (resultado != digitos.charAt(0)) {
    return false;
  }
        
  numeros = cpf.substring(0, 10);
  soma = 0;
  
  for (i = 11; i > 1; i--) {
    soma += numeros.charAt(11 - i) * i;
  }
        
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }
    return true;
  } else {
    return false;
  }
  }
        
  function validacao() {
  console.log('Iniciando validação CPF');
  document.getElementById('success').style.display = 'none';
  document.getElementById('error').style.display = 'none';
       
  const limparCPF = (cpf_digitado) => document.getElementById('cpf_digitado').value = ""

  var cpf = document.getElementById('cpf_digitado').value;
        
  if (validaCPF(cpf)) {
  document.getElementById('success').style.display = 'block';
  } else {
    document.getElementById('error').style.display = 'block';
    alert ("CPF inválido");
    limparCPF();
    cpf_digitado.focus();
  }
  console.log('Finalizando validação CPF');
  }
  
  document.getElementById('cpf_digitado')
        .addEventListener('focusout', validacao);



/*Função Validar*/

function validar() {
  
  let nome = document.getElementById("nomeCompleto");
    if (nome.value == "") {
    alert ("Nome não informado");
    nome.focus();
    }
  
  let nascimento = document.getElementById("nascimento");
    if (nascimento.value =="") {
      alert ("Data de nascimento não informada");
      nascimento.focus();
    }

  let cpf_digitado = document.getElementById("cpf_digitado");
    if (cpf_digitado.value == "") {
      alert ("CPF não informado");
      cpf_digitado.focus();
    }


  let cep = document.getElementById("cep");
    if (cep.value == "") {
      alert("CEP não informado");
      cep.focus();
    };  
    
  let profissao = document.getElementById("profissao");
    if (profissao.value == "") {
            alert ("Profissão não informada");
            profissao.focus();
   }

  let celular = document.getElementById("celular");
    if (celular.value == "") {
    alert ("Celular não informado");
    celular.focus();
  }

  let email = document.getElementById("email");
  if (email.value =="") {
    alert ("E-mail não informado");
    email.focus();
  }
      
}


//Tentativa, se der errado apagar a partir daqui!

const Formulario = () => {
  let form = {
    nomeCompleto: document.getElementById('nomeCompleto').value,
    cargoPretendido: document.getElementById('cargoPretendido').value,
    nascimento: document.getElementById('nascimento').value,
    estadoCivil: document.getElementById('estadoCivil').value,
    sexo: document.getElementById('sexo').value,
    profissao: document.getElementById('profissao').value,
    cep: document.getElementById('cep').value,
    endereco: document.getElementById('endereco').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    tel: document.getElementById('tel').value,
    celular: document.getElementById('celular').value,
    email: document.getElementById('email').value,
    identidade: document.getElementById('identidade').value,
    cpf_digitado: document.getElementById('cpf_digitado').value,
    possuiVeiculo: document.getElementById('possuiVeiculo').value,
    habilitacao: document.getElementById('habilitacao').value,
  };
  console.log(form);
    return form
}


const criarCandidato = async(Candidate) => {
  const requisicao = await fetch('https://jobsnet--backend.herokuapp.com/register', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(Formulario())
  });
  if(requisicao.status === 200) {
      alert('Cadastro concluído!');
  }
  else if (requisicao.status === 500){
      alert('Dados já cadastrados..');
  }
  else {
       alert('Seu cadastro não foi realizado');
   }
   location.reload();
}