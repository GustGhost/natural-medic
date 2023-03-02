let user = [
	{
		cpf: 12345678910,
		senha: 'coxinha123',
	},
];

const padraoCpf = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$/;
let cpf = document.querySelector('#cpf').value;
let password = document.querySelector('#password').value;
const loginButton = document.querySelector('.login-btn');
// Verificar o cpf
// if (!padraoCpf.test(cpf)) throw new Error('CPF inválido');

loginButton.addEventListener('click', el => {
	el.preventDefault();

	if (cpf === '' || password === '' || !padraoCpf.test(cpf)) {
		console.log('Algum dos campos está inválido, preencha-os corretamente');
	} else {
		console.log('login feito com sucesso');
	}
});
