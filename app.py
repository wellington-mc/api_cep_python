from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consulta/<string:cep>', methods=['GET'])
def consulta_cep(cep):
    """
    Consulta um CEP no serviço ViaCEP e retorna os dados do endereço.
    """
    # Formata o CEP para remover caracteres não numéricos
    cep = ''.join(filter(str.isdigit, cep))

    if len(cep) != 8:
        return jsonify({'erro': 'CEP inválido. O CEP deve conter 8 dígitos.'}), 400

    try:
        response = requests.get(f'https://viacep.com.br/ws/{cep}/json/')
        response.raise_for_status()  # Lança um erro para respostas HTTP 4xx/5xx
        dados_cep = response.json()

        if dados_cep.get('erro'):
            return jsonify({'erro': 'CEP não encontrado.'}), 404

        return jsonify(dados_cep)

    except requests.exceptions.RequestException as e:
        return jsonify({'erro': f'Erro ao consultar o serviço de CEP: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
