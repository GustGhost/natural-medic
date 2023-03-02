const pesquisarCep = async () => {
	let cep = document.getElementById('cep').value;

	if (cep.trim() === '') {
		document.getElementById(
			'result'
		).innerHTML = `<h5 class='warning'>O campo Buscar CEP deve ser preenchido!</h5>`;
	} else {
		await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}
				return response.json();
			})
			.then(address => {
				if (!address.erro) {
					document.getElementById(
						'result'
					).innerHTML = `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Endereço da Clínica</h5>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Bairro:</b> ${address.bairro}</li>
              <li class="list-group-item"><b>Logradouro:</b> ${
								address.logradouro
							}</li>
               <li class="list-group-item"><b>Bairro:</b> ${address.bairro}</li>
           ${
							address.complemento
								? `<li class='list-group-item'>
                 <b>Complemento:</b> ${address.complemento}
                      </li>`
								: ''
						}
            <li class="list-group-item"><b>Localidade:</b> ${
							address.localidade
						}</li>
                 <li class="list-group-item"><b>UF:</b> ${address.uf}</li>
              </ul>
            </div>`;
				} else {
					document.getElementById(
						'result'
					).innerHTML = `<h5>Erro! CEP não encontrado</h5>`;
				}
			})
			.catch(error => {
				alert(`
        Erro! Tente novamente!
        ${error.status}
        ${error.message}`);
			});
	}
};

const clearInput = () => {
	document.getElementById('cep').value = '';
	document.getElementById('result').innerHTML = '';
};

// ----------------------- Usuários -----------------------
let userDiv = document.querySelector('#usuariosList');
const btnListPeople = document.querySelector('.listPeople');
const listaDeUsuario = document.querySelector('.listaDeUsuario');
let pessoas = [];

btnListPeople.addEventListener('click', () => {
	pessoas = [];
	listaDeUsuario.innerHTML = '';
	// Container da imagem
	let imageCont = document.createElement('div');
	let img = document.createElement('img');
	img.classList.add('personImage');
	let userImage = document.querySelector('.personImage');
	imageCont.appendChild(img);

	fetch('https://randomuser.me/api/?results=10')
		.then(response => {
			if (response.ok) return response.json();
			else {
				throw new Error('Não conseguimos ter acesso à imagem');
			}
		})
		.then(data => {
			data.results.map(item => {
				pessoas.push({
					nome: item.name,
					idade: item.dob.age,
					image: item.picture.medium,
				});
			});
			pessoas.forEach(pessoa => {
				console.log(pessoa);
				listaDeUsuario.innerHTML += `<li class ='liStyle'>
        <p>  Nome: ${pessoa.nome.first} ${pessoa.nome.last} Idade: ${pessoa.idade} </p>
        <img src = '${pessoa.image}'} alt ='foto'/>
        </li>`;
			});
		})
		.catch(error => {
			alert(error.message);
		});
});
