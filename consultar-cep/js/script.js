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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((address) => {
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
      .catch((error) => {
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
    .then((response) => {
      if (response.ok) return response.json();
      else {
        throw new Error('Não conseguimos ter acesso à imagem');
      }
    })
    .then((data) => {
      data.results.map((item) => {
        pessoas.push({
          nome: item.name,
          idade: item.dob.age,
          image: item.picture.medium,
        });
      });
      pessoas.forEach((pessoa) => {
        console.log(pessoa);
        listaDeUsuario.innerHTML += `<li class ='liStyle'>
        <p>  Nome: ${pessoa.nome.first} ${pessoa.nome.last} Idade: ${pessoa.idade} </p>
        <img src = '${pessoa.image}'} alt ='foto'/>
        </li>`;
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});

// actions form

let dados = [];
let ultimoIndiceExibido = 0;

const submit = document.getElementById('enviar');
submit.addEventListener('click', (e) => {
  e.preventDefault();

  let name = document.getElementById('nome').value;
  let age = document.getElementById('idade').value;
  let email = document.getElementById('email').value;
  let nameMedic = document.getElementById('nomeDoMedico').value;
  let comment = document.getElementById('comment').value;

  if (
    name === '' ||
    age === '' ||
    email === '' ||
    nameMedic === '' ||
    comment === ''
  ) {
    alert('algum campo precisa ser preenchido!');
  } else {
    dados.push({
      name: name,
      age: age,
      email: email,
      nameMedic: nameMedic,
      comment: comment,
    });
    console.log(dados);
    chamarComentarios();
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nomeDoMedico').value = '';
    document.getElementById('comment').value = '';
  }
});

const date = new Date();
let day = date.getDay();
let year = date.getFullYear();
const mesesAno = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];
let month = mesesAno[date.getMonth()];

const chamarComentarios = () => {
  for (let i = ultimoIndiceExibido; i < dados.length; i++) {
    let div = document.createElement('div');
    div.innerHTML = `<div class="card" style="width: 18rem;">                
		<div class="card-body">
      <ion-icon class="icon-profile" name="person-circle-outline" ></ion-icon>
      <div>
        <h5 class="card-title">${dados[i].name}</h5>
        <p class="card-date">${day}${month}, ${year} </p>
      </div>
		</div>
		<ul class="list-group list-group-flush">
		<li class="list-group-item">Idade: ${dados[i].age}</li>
		<li class="list-group-item">Email: ${dados[i].email}</li>
		<li class="list-group-item">Médico: ${dados[i].nameMedic}</li>
		<li class="list-group-item">Comentário: ${dados[i].comment}</li>
		</ul>
    <div class="div-icon" >
      <ion-icon  class="icon-like" name="thumbs-up-outline"></ion-icon>
      <ion-icon class="icon-deslike" name="thumbs-down-outline"></ion-icon>
      <ion-icon class="icon-love" name="heart-outline"></ion-icon>
    </div>              
		</div>
		</div> <hr/>`;
    comments.appendChild(div);
  }
  ultimoIndiceExibido = dados.length;
};
