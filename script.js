document.getElementById('consultarBtn').addEventListener('click', consultarCEP);

function consultarCEP() {
    const cep = document.getElementById('cep').value.trim();
    const loading = document.getElementById('loading');
    const endereco = document.getElementById('endereco');

    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
        alert('Por favor, insira um CEP válido.');
        return;
    }

    loading.style.display = 'block';
    endereco.style.display = 'none';

    fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }

            document.getElementById('logradouro').innerText = data.logradouro;
            document.getElementById('bairro').innerText = data.bairro;
            document.getElementById('cidade').innerText = data.localidade;
            document.getElementById('estado').innerText = data.uf;

            loading.style.display = 'none';
            endereco.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
            loading.style.display = 'none';
        });
}