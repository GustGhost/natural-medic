let userList = [];
let errors = [];
fetch('https://dummyjson.com/users')
	.then(res => {
		if (res.ok) return res.json();
		else {
			throw new Error('Não foi possível pegar os dados na api');
		}
	})
	.then(objectUsers => objectUsers.users)
	.then(users =>
		users.map(user => {
			userList.push({
				nome: user.firstName,
				email: user.email,
				senha: user.password,
			});
		})
	);

function validateEmail(value) {
	let re =
		/^([\w-]+(?:.[\w-]+))@((?:[\w-]+.)\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$/i;
	return re.test(value);
}
console.log(userList);
const loginButton = document.querySelector('.login-btn');

loginButton.addEventListener('click', el => {
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
	} else if (!password.value.match(upperCaseLetters)) {
		alert('Por favor adicione 1 letra maiúscula');
	} else if (!password.value.match(lowerCaseLetters)) {
		alert('Por favor adicione 1 letra minúscula');
	} else if (validateEmail(email.value) && password.value.length > 0) {
		userList.forEach(user => {
			if (
				email.value == user.email &&
				password.value == user.senha &&
				name.value.toLowerCase() == user.nome.toLowerCase()
			) {
				localStorage.setItem('name', name.value);
				localStorage.setItem('email', email.value);
				localStorage.setItem('password', password.value);
				alert('Logado!');
				window.location.replace('../../dashboard/index.html');
			} else {
				errors.push('Error');
			}
		});

		if (errors.length > 0) {
			alert('Usuário não existente');
			throw new Error('Usuário não existente');
		}
	}
}
