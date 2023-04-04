<h4> PLF-ES-2023-1-MON-CursoNodeJS </h4>

<hr>

<h3 align="center">
    Curso de monitoria
    <br>
    Como criar uma API RESTful com NodeJS
    <br><br>
    <p align="center">
      <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-monitor">Monitor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-professor-responsável">Professor responsável</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-instruções-de-utilização">Instruções de utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-licença">Licença</a>
  </p>
</h3>

<hr>

## 🔖 Sobre

Curso de programação para apoio da disciplina Trabalho Interdisciplinar Aplicações para Processos de Negócios do 2º período de Engenharia de Software, PucMinas Praça da Liberdade 2023/1.

Neste curso é abordado como criar uma API RESTful com NodeJS.
Conteúdo inclui vídeo aulas de explicações teóricas, instalação de ferramentas, prática focada no código e como consumir a API pelo Postman. Além disso, é apresentado como criar uma simples interface web em HTML, CSS e 
Script (também com a biblioteca Booststrap) que consume esta API.

Esta é uma simples aplicação onde usuário podem se cadastrar e registrarem tarefas para sua conta.

---

## 👨‍💻 Monitor

* [Lucas Ângelo Oliveira Martins Rocha](https://lucasangelo.com)

---

## 👩‍🏫 Professor responsável

* Hugo Bastos De Paula

---

## 🚀 Tecnologias

- Frontend:
  - [HTML 5](https://www.w3schools.com/howto/howto_make_a_website.asp/)
  - [CSS 3](https://www.w3schools.com/css/css_website_layout.asp/)
  - [JavaScript](https://www.javascript.com/)
  - [Bootstrap 5](https://getbootstrap.com/)
- Backend:
  - [NodeJS 16.19.0](https://nodejs.org/download/release/v16.19.0/)
- Database:
  - [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Ferramenta
  - [Visual Studio Code (VSCode)](https://code.visualstudio.com)
  - [Postman](http://www.postman.com/downloads/)
  - [Git](https://git-scm.com/downloads)
  - [Docker](https://docs.docker.com/desktop/install/windows-install/)

---

## ⤵ Instruções de utilização

Essas instruções vão te levar a uma cópia do projeto rodando em sua máquina local para propósitos de testes, desenvolvimento e aprendizagem.

Pré-requisitos:
- Ter instalado todas as ferramentas e dependências ensinadas no vídeo [Aula 02 - Instalação de todas as ferramentas e configuração de ambiente](https://youtu.be/1YOV6JeSBA4)
  - NodeJS
  - NPM
  - MySQL
  - Docker (Docker-Compose)

<br>

- Passo 1: Clonar o repositório:
  ```bash
  $ git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/PLF-ES-2023-1-MON-CursoNodeJS.git
  ```

<br>

- Passo 2: Configurar e iniciar a API NodeJS (backend)

  - Passo 2.1: Criar o arquivo .env pelo .env.sample:
  ```bash
  $ vi PLF-ES-2023-1-MON-CursoNodeJS\.env
  ```

  - Passo 2.2: Configurar as variáveis de ambiente:
  ```env
    APP_DEBUG=true

    NODE_APP_HOST=localhost

    NODE_LOCAL_PORT=3001
    NODE_DOCKER_PORT=3000

    MYSQL_HOST=localhost
    MYSQL_LOCAL_PORT=3307
    MYSQL_DOCKER_PORT=3306
    MYSQL_DATABASE=todosimple
    MYSQL_USERNAME=root
    MYSQL_PASSWORD=root

    SECRET_KEY=v9y$B&EH@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8y/A?DG+KbPeShVmYq
  ```

  - Passo 2.3: Ir para a pasta raíz do projeto:
  ```bash
  $ cd PLF-ES-2023-1-MON-CursoNodeJS\
  ```

  - Passo 2.4: Abrir o terminal e instalar as dependências do projeto utilizando o NPM:
  ```bash
  $ npm install
  ```

  - Passo 2.4: Iniciar a aplicação NodeJS:

      - Passo 2.4.1: Iniciar a aplicação NodeJS utilizando o NPM:
      ```bash
      $ npm run start
      ```

      ou

      - Passo 2.4.1: Iniciar a aplicação utilizando Docker-Compose:
      ```bash
      $ docker-compose up
      ```

  - API estará rodando em http://localhost:3001/
<br>

- Passo 3: Entrar na aplicação frontend após subir a API

  - Passo 3.1: Entrar na pasta raíz do projeto:
  ```bash
  $ cd PLF-ES-2023-1-MON-CursoNodeJS\
  ```

  - Passo 3.2: Abrir o arquivo index.html diretamente ou pela extensão Live Server do VsCode:
  ```bash
  $ cd PLF-ES-2023-1-MON-CursoNodeJS\view\login.html
  ```

  - Frontend estará rodando em http://127.0.0.1:5500/view/login.html caso iniciado com Live Server.

---

## 🔗 Links do projeto

- [Playlist do Youtube com vídeos do curso](https://www.youtube.com/playlist?list=PLiXotHlANc8raOozVpOpZucmeT4s9DS2f)
- [Slide de apresentação](docs/Slide%20API%20RESTful%20com%20NodeJS.pdf)
- [Documento de ferramentas e configuração de ambiente](docs/Ferramentas%20e%20configura%C3%A7%C3%A3o%20do%20ambiente.pdf)

---

## 📝 Licença

Esse projeto está sob a licença MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
