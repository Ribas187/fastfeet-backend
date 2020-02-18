<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  FastFeet: Back-end
</h3>

<h3 align="center">
  :warning: Etapa 2/4 do Desafio Final :warning:
</h3>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
<a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#um-pouco-sobre-as-ferramentas">Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#como-instalar-o-projeto-na-sua-máquina">Como Instalar </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;


## :rocket: Sobre o desafio
Esse desafio é a segunda parte do Desafio Final

Continuação do desenvolvimento de um app para uma transportadora fictícia, o FastFeet.

Nesta parte do projeto foi terminada a aplicação back-end do FastFeet.
A API possui deiversas funcionalidades e faz parte de um projeto final com back-end, front-end e mobile.

## **Um pouco sobre as ferramentas**
Durante a resolução do desafio, utilizei as ferramentas :

- NodeJS
- Yarn
- Express
- Sucrase
- Nodemon
- ESLint
- Prettier
- EditorConfig
- [Yup] (https://github.com/jquense/yup)
- [Sequelize] (https://sequelize.org/master/) (PostgreSQL);
- [jsonwebtoken] (https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs] (https://www.npmjs.com/package/bcryptjs)
- [date-fns] (https://date-fns.org/)
- [Multer] (https://github.com/expressjs/multer)
- [NodeMailer] (https://nodemailer.com/about/)
- [Handlebars] (https://handlebarsjs.com/) (Templates Engines)
- [Beequeue] (https://github.com/bee-queue/bee-queue) (Background job)

## **Como instalar o projeto na sua máquina**
1. Git clone.
2. Instale as dependecias do projeto :&nbsp;&nbsp;&nbsp; `yarn add`&nbsp;  ou &nbsp; `npm install`
3. Reenomeie o arquivo **.env.example** para **.env**
4. Configure as variáveis de ambiente (arquivo .env) de acordo com seu ambiente local.
5. Rodar as seeds e migrations:
```sh
yarn sequelize db:migrate
yarn sequelize db:seed:all
```
6. Após finalizar as configurações, inicie a aplicação executando no seu terminal `yarn dev`

## **Funcionalidades**

Abaixo estão descritas as funcionalidades da API.

### **1. Autenticação dos Administradores**

Permissão para que um usuário se autentique na aplicação utilizando e-mail e uma senha.

- A autenticação foi feita utilizando JWT.
- Validação dos dados de entrada.
- Administrador tem acesso a todas as rotas da aplicação.
- Pode gerenciar todos os entregadores, destinatários e entregas.

### **2. Gestão de destinatários**

Permissão para que os destinatários sejam mantidos (cadastrados/atualizados) na aplicação.

- O gerenciamento de destinatários só pode ser feito por administradores autenticados na aplicação.
- Validação dos dados de entrada
- O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

### **3. Gestão de entregadores**

CRUD para que os entregadores sejam mantidos na aplicação.

- O gerencimaneto de entregadores só pode ser feito por administradores autenticados na aplicação.
- Validação dos dados de entrada
- O entregador não pode se autenticar no sistema, ou seja, não possui senha.
- O entregador pode visualizar as entregas vinculadas a ele.
- O entregador pode iniciar uma entrega desde que esteja dentro do horário ( 08: as 18:00 ), e desde que não tenha atingido a cota de  5 ou entregas iniciadas no dia.
- O entregador pode finalizar uma entrega, desde que envie uma foto de sua assinatura.
- O entregador pode cadastrar um problema nas suas entregas.

### **4. Gestão de encomendas**

CRUD para que as encomendas sejam mantidas na aplicação.

- O gerencimaneto de encomendas só pode ser feito por administradores autenticados na aplicação.
- Validação dos dados de entrada.
- A retirada de encomendas só pode ser feita entre 08:00 e 18:00 horas

## :memo: Guilherme Ribas
Desafio realizado por Guilherme Ribas.
