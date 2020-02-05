<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

## :rocket: Sobre o desafio

A aplicação é um app para uma transportadora, o FastFeet.

Nesse primeiro desafio foi usado diversas funcionalidades aprendidas durando o GoStack Bootcamp. Esse projeto será desenvolvido aos poucos até o fim da sua jornada ter uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**, então, bora pro código!

### **Um pouco sobre as ferramentas**

A aplicação foi feita utilizando o [Express](https://expressjs.com/), além do auxílio de outras ferramentas como:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### **Bibliotecas utilizadas**
- [**express**] (https://expressjs.com/pt-br/starter/installing.html)
- [**sequelize**] (https://sequelize.org/v5/index.html)
- [**jsonwebtoken**] (https://github.com/auth0/node-jsonwebtoken)
- [**bcryptjs**] (https://www.npmjs.com/package/bcryptjs)
- [**yup**] (https://github.com/jquense/yup)

### **Funcionalidades**

Abaixo estão descritas as funcionalidades da aplicação.

### **1. Autenticação**

Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

    yarn sequelize seed:generate --name admin-user

No arquivo gerado na pasta `src/database/seeds` adicione o código referente à criação de um usuário administrador:

    const bcrypt = require("bcryptjs");

    module.exports = {
      up: QueryInterface => {
        return QueryInterface.bulkInsert(
          "users",
          [
            {
              name: "Distruidora FastFeet",
              email: "admin@fastfeet.com",
              password_hash: bcrypt.hashSync("123456", 8),
              created_at: new Date(),
              updated_at: new Date()
            }
          ],
          {}
        );
      },

      down: () => {}
    };

Agora execute:

    yarn sequelize db:seed:all

Agora você tem um usuário na sua base de dados, utilize esse usuário para todos os logins que você fizer.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

### 2. Gestão de destinatários

Você agora precisa permitir que destinatários sejam mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o **nome** do destinatário e campos de endereço: **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**.

Utilize uma nova tabela no banco de dados chamada `recipient` para guardar informações do destinatário.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

## :memo: Guilherme Ribas
Desafio realizado por Guilherme Ribas.
