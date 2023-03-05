function check() {
	let storedName = localStorage.getItem('name');
	let titleDashboard = document.getElementById('titleDashboard');
	if (storedName) {
		document.getElementById(
			'login'
		).innerHTML = `<div style="text-align: center;"><p>Bem vindo</p> <p>${storedName.substr(0, 10)}</p></div>`;
		if (titleDashboard) {
			titleDashboard.innerHTML = `<h3>Bem vindo ${storedName}</h3>`;
		}
	} else {
		document.getElementById(
			'login'
		).innerHTML = `<button class ='login-btn-green'><a href="../../login/index.html">Entrar</a></button>`;
	}
}

check();
