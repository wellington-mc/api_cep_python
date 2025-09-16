document.getElementById('cep-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cepInput = document.getElementById('cep-input');
    const resultadoDiv = document.getElementById('resultado');
    const cep = cepInput.value.replace(/\D/g, ''); // Remove non-digits

    resultadoDiv.innerHTML = '';

    if (cep.length !== 8) {
        resultadoDiv.innerHTML = '<p class="erro">CEP inválido. Digite 8 números.</p>';
        return;
    }

    // Chamar a API
    fetch(`/consulta/${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ou CEP não encontrado.');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                resultadoDiv.innerHTML = `<p class="erro">CEP não encontrado.</p>`;
            } else {
                resultadoDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                    <p><strong>IBGE:</strong> ${data.ibge}</p>
                `;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = `<p class="erro">${error.message}</p>`;
        });
});
