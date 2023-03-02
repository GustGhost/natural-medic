const pesquisarCep = async () => {
  let cep = document.getElementById('cep').value;

  if (cep.trim() === '') {
    document.getElementById(
      'result'
    ).innerHTML = `<h5>O campo Buscar CEP deve ser preenchido</h5>`;
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
