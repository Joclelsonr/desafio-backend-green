# 📦 Desafio Técnico Backend - Importação e Gestão de Boletos

Este é um projeto desenvolvido como parte de um desafio técnico de backend. Ele simula a integração entre dois sistemas de um condomínio residencial, importando arquivos `.csv` e `.pdf` de boletos do sistema financeiro para o sistema da portaria.

## 🧰 Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Express
- Multer
- pdf-lib / pdf-parse / pdfkit
- csv-parser

---

## 📄 Funcionalidades

### ✅ Atividade 1 - Importação de CSV

- Endpoint que recebe um arquivo `.csv` contendo os dados dos boletos.
- Os dados são transformados e inseridos na tabela `boletos`, realizando o mapeamento da unidade para o ID do lote.

### ✅ Atividade 2 - Mapeamento de Lotes

- O campo `unidade` do CSV (ex: `17`, `18`, etc.) é mapeado para o `id` correto na tabela `lotes` (ex: `0017` corresponde ao lote com `id = 3`).
- Esse mapeamento é feito via busca no banco de dados, garantindo integridade.

### ✅ Atividade 3 - Importação de PDF e divisão por página

- Endpoint que recebe um PDF com todos os boletos em páginas separadas.
- O sistema extrai os nomes de cada página usando `pdf-parse`, faz o mapeamento com os registros da base e salva os arquivos separadamente no disco, com o ID do lote no boleto.

Exemplo de saída na pasta `/uploads/split`:

### ✅ Atividade 4 - Listagem com Filtros

- Endpoint para listar boletos com filtros:
  - `name` (busca parcial)
  - `value_start` e `value_end`
  - `id_lot`
  - Ordenação via `order`

Exemplo:

```http
GET /bank-slips?name=JOSE&value_start=100&value_end=300&id_lot=17&order=desc
```

### ✅ Atividade 5 - Geração de Relatório PDF

- Ao passar `report=1` na query string, o sistema retorna um relatório em PDF com os dados dos boletos filtrados.

- O PDF é gerado dinamicamente e retornado como `base64`.

```http
GET /bank-slips?report=1
```

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Joclelsonr/desafio-backend-green.git
cd desafio-backend-green
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente: `.env`:

```bash
cp .env.example .env
```

4. Inicie o banco de dados:

```bash
docker compose up -d
```

5. Execute as migrações:

```bash
npm rum migrate && npm run seed
```

6. Inicie o servidor:

```bash
npm run dev
```

## 📬 Endpoints

- **Importação de CSV**: `POST /import/csv`
- **Importação de PDF**: `POST /import/pdf`
- **Listagem de Boletos**: `GET /bank-slips`
- **Relatório PDF**: `GET /bank-slips?report=1`

## 🧪 Testes

Você pode usar o [Postman](https://documenter.getpostman.com/view/21551982/2sB2cYdfms) para testar os endpoints. Exemplos de payloads e arquivos estão na pasta `/samples`.
