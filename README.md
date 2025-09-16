# API CEP em Python (Flask)

Aplicação web simples para consulta de CEP usando o serviço público ViaCEP.

- Backend: `Flask` (Python)
- HTTP client: `requests`
- Frontend: HTML/CSS/JS estático em `templates/` e `static/`

## Funcionalidades
- Página web para digitar um CEP e visualizar o endereço retornado.
- Endpoint de API que consulta o ViaCEP, valida o CEP e retorna JSON.

## Estrutura do projeto
```
api_cep_python/
├─ app.py                 # App Flask e endpoint /consulta/<cep>
├─ requirements.txt       # Dependências (Flask, requests)
├─ templates/
│  └─ index.html          # Página principal
└─ static/
   ├─ style.css           # Estilos
   └─ script.js           # Lógica de chamada à API
```

## Requisitos
- Python 3.9+

## Instalação
Recomenda-se usar um ambiente virtual (venv):
```bash
python -m venv .venv
# Windows (PowerShell)
. .\.venv\Scripts\Activate.ps1
# macOS/Linux (bash/zsh)
# source .venv/bin/activate

pip install -r requirements.txt
```

## Executando o servidor
```bash
python app.py
```
- O servidor iniciará em `http://127.0.0.1:5001/` (porta definida em `app.py`).

## Endpoints
- `GET /` — página web de busca por CEP.
- `GET /consulta/<cep>` — retorna JSON com os dados do CEP.
  - Parâmetros: `cep` (apenas números; 8 dígitos)
  - Respostas possíveis:
    - `200 OK` — JSON com dados do ViaCEP
    - `400 Bad Request` — `{"erro": "CEP inválido..."}`
    - `404 Not Found` — `{"erro": "CEP não encontrado."}`
    - `500 Internal Server Error` — erro ao consultar serviço externo

Exemplo de chamada via `curl`:
```bash
curl http://127.0.0.1:5001/consulta/01001000
```

## Como funciona
- O arquivo `app.py` expõe o endpoint `/consulta/<cep>`.
- O CEP é normalizado para conter apenas dígitos e validado com 8 caracteres.
- Em seguida, a API chama o ViaCEP em `https://viacep.com.br/ws/<cep>/json/` e retorna o JSON processado.
- A página `templates/index.html` consome este endpoint via `fetch` (em `static/script.js`).

## Desenvolvimento
- Rodar com recarregamento automático (usando Flask debug)
  - Já definido `debug=True` em `app.py`.
- Logs e erros serão mostrados no terminal.

## Licença
Este projeto é licenciado sob a licença MIT.

- Texto canônico (EN): veja `LICENSE`
- Tradução PT-BR: veja `LICENSE_PT_BR.md`
