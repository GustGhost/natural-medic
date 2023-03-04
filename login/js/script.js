let user = [
  {
    email: 'joao@gmail.com',
    senha: 'Coxinha123',
    nome: 'Joao',
  },
  {
    email: 'maria@gmail.com',
    senha: 'vemSerFeliz1',
    nome: 'Maria',
  },
  {
    email: 'carlos@gmail.com',
    senha: 'amoJs1',
    nome: 'Carlos',
  },
];

function validateEmail(value) {
  let re =
    /^([\w-]+(?:.[\w-]+))@((?:[\w-]+.)\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$/i;
  return re.test(value);
}

const loginButton = document.querySelector('.login-btn');

loginButton.addEventListener('click', (el) => {
  el.preventDefault();
  store();
});

function store() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let name = document.getElementById('name');
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  if (email.value.length == 0) {
    alert('Por favor coloque o e-mail');
  } else if (!validateEmail(email.value)) {
    alert('E-mail inválido');
  } else if (password.value.length == 0) {
    alert('Por favor coloque a senha');
  } else if (name.value.length == 0 || name.value.length < 3) {
    alert('Nome inválido');
  } else if (email.value.length == 0 && password.value.length == 0) {
    alert('Por favor coloque o e-mail e a senha');
  } else if (password.value.length > 20) {
    alert('Máximo de 20 caracteres na senha');
  } else if (!password.value.match(numbers)) {
    alert('Por favor adicione 1 número');
  } else if (!password.value.match(upperCaseLetters)) {
    alert('Por favor adicione 1 letra maiúscula');
  } else if (!password.value.match(lowerCaseLetters)) {
    alert('Por favor adicione 1 letra minúscula');
  } else if (validateEmail(email.value) && password.value.length > 0) {
    for (let i = 0; i < user.length; i++) {
      if (
        email.value == user[i].email &&
        password.value == user[i].senha &&
        name.value.toLowerCase() == user[i].nome.toLowerCase()
      ) {
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        alert('Logado!');
        window.location.href = '../../index.html';
        break;
      } else {
        alert('Nome, e-mail ou senha inexistentes');
        break;
      }
    }
  }
}
