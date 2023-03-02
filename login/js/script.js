let user = [
  {
    cpf: '12345678910',
    senha: 'coxinha123',
  },
];

const padraoCpf = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$/;

const loginButton = document.querySelector('.login-btn');

loginButton.addEventListener('click', (el) => {
  let cpf = document.getElementById('cpf').value;
  let password = document.getElementById('password').value;
  el.preventDefault();
  if (cpf === '' || password === '' || !padraoCpf.test(cpf)) {
    alert('Algum dos campos está inválido, preencha-os corretamente');
  } else if (cpf == '12345678910' && password == 'coxinha123') {
    window.location.href = '../logado/index.html';
  } else {
    alert('Cliente não encontrado, verifique os dados');
  }
});
