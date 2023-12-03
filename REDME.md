# API to pratice authentication

## Pré-requisitos

- Node.js instalado
- npm (gerenciador de pacotes do Node.js) instalado

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/mateushernande6/api-to-auth-pratice-m2
   cd seu-repositorio
   ```

## Instale as dependências

```bash
Copy code
npm install
```

## Execute o servidor

```bash
npm run dev
```

O servidor estará em execução em <http://localhost:3333>.

### Registro de Usuário

- **Endpoint:** `POST /register`
- **Descrição:** Registra um novo usuário.
- **Corpo da Requisição:**

  ```json
  {
    "username": "SeuNome",
    "email": "seuemail@example.com",
    "password": "suaSenha"
  }
  ```

- **Exemplo de Uso**

````bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "SeuNome", "email": "seuemail@example.com", "password": "suaSenha"}' http://localhost:3333/register


## Login

- **Endpoint:** `POST /login`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
    "username": "SeuNome",
    "password": "suaSenha"
  }


### Exemplo de Uso

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "SeuNome", "password": "suaSenha"}' http://localhost:3333/login

### Busca de Todos os Usuários

- **Endpoint:** `GET /users`
- **Descrição:** Retorna todos os usuários registrados.

### Exemplo de Uso

```bash
curl http://localhost:3333/users

### Busca de Usuários por ID

- **Endpoint:** `GET /users/:id`
- **Descrição:** Retorna um usuário com base no ID fornecido.


### Exemplo de Uso

```bash
curl http://localhost:3333/users/1
````

## Rota Protegida Autenticada

## Criação de Filme para o Usuário

- **Endpoint:** `POST /user/movies`
- **Descrição:** Cria um filme associado ao usuário autenticado.
- **Parâmetros do Corpo da Requisição:**

  ```json
  {
    "title": "Nome do Filme",
    "image": "URL da Imagem",
    "category": "Categoria do Filme",
    "rating": 5, // Avaliação do Filme
    "synopsis": "Sinopse do Filme"
  }
  ```

- **Exemplo de uso:**

```bash
# Substitua "SEU_TOKEN_JWT" pelo token JWT obtido durante o login
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_JWT" -d '{"title": "Nome do Filme", "image": "URL da Imagem", "category": "Categoria do Filme", "rating": 5, "synopsis": "Sinopse do Filme"}' http://localhost:3333/user/movies
```
