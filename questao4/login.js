document.addEventListener("DOMContentLoaded", function () {
  // Função para trocar a visibilidade da senha
  function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var icon = document.querySelector(".toggle-password i");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  // Função para validar o formulário e enviar os dados para o backend
  function validateForm(event) {
    event.preventDefault(); // Evita o envio do formulário por padrão

    // Obtém os valores dos campos
    let username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const domain = document.querySelector(".input-group-text").textContent;

    // Valida se o usuário está tentando inserir manualmente "@gmail.com"
    if (username.trim().toLowerCase().endsWith("@gmail.com")) {
      alert('O sufixo "@gmail.com" é completado automaticamente pelo sistema.');
      return; // Impede o envio do formulário se o usuário tentar inserir manualmente o sufixo
    }

    // Valida se todos os campos foram preenchidos
    if (!username || !password) {
      alert("Por favor, preencha todos os campos.");
      return; // Impede o envio do formulário se algum campo estiver vazio
    }

    username = username + domain;
    // Envia os dados do formulário para o backend
    sendDataToBackend(username, password);
  }

  // Função para enviar os dados do formulário para o backend
  function sendDataToBackend(username, password) {
    const formData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8080/conta/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao fazer login.");
        }
        return response.json(); // Alterado para response.json() para processar o JSON retornado pelo servidor
      })
      .then((data) => {
        alert(data.message); // Exibe a mensagem de confirmação do backend
        if (data.success) {
          // Verifica se a autenticação foi bem-sucedida
          clearFormFields(); // Limpa os campos do formulário apenas se o login for bem-sucedido
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao fazer login.");
      });
  }

  // Função para limpar os campos do formulário
  function clearFormFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
  document
    .getElementById("changeEmailLink")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Evita a navegação padrão ao clicar no link
      const newEmail = prompt("Insira seu endereço de e-mail:"); // Solicita ao usuário que insira o novo endereço de e-mail
      if (newEmail) {
        const atIndex = newEmail.lastIndexOf("@");
        const domain = newEmail.substring(atIndex);
        document.getElementById("username").value = newEmail.replace(
          domain,
          ""
        ); // Atualiza o valor do campo de e-mail com o novo endereço inserido pelo usuário
        document.querySelector(".input-group-text").textContent = domain; // Atualiza o texto do span com o novo domínio inserido pelo usuário
      }
    });

  // Função para atualizar o placeholder do campo de e-mail com o novo endereço inserido pelo usuário
  function updateEmailPlaceholder(newEmail) {
    document
      .getElementById("username")
      .setAttribute("placeholder", "Nome de usuário (" + newEmail + ")");
    document.querySelector(".input-group-text").textContent = "@" + newEmail;
  }

  // Adiciona o event listener para o clique no botão de visibilidade da senha
  document
    .querySelector(".toggle-password")
    .addEventListener("click", togglePasswordVisibility);

  // Adiciona o event listener para o envio do formulário
  document.querySelector("form").addEventListener("submit", validateForm);
});

module.exports = { clearForms };
