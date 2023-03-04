function check() {
	let storedName = localStorage.getItem('name');
	console.log(storedName);

	if (storedName) {
		document.getElementById(
			'login'
		).innerHTML = `<p>Bem vindo</p> <p>${storedName}</p>`;
	} else {
		document.getElementById(
			'login'
		).innerHTML = `<button class ='login-btn-green'><a href="../login/index.html">Entrar</a></button>`;
	}
}

check();
