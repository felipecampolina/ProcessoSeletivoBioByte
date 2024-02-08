document.addEventListener("DOMContentLoaded", function () {
  // Função para trocar a visibilidade da senha
  function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirmPassword");
    var icon = document.querySelector(".toggle-password i");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      confirmPasswordField.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      confirmPasswordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  // Função para validar o formulário e enviar os dados para o backend
  function validateForm(event) {
    event.preventDefault(); // Evita o envio do formulário por padrão

    // Obtém os valores dos campos
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    const domain = document.querySelector(".input-group-text").textContent;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verifica se o usuário está tentando inserir manualmente "@gmail.com"
    if (username.trim().toLowerCase().endsWith("@gmail.com")) {
      alert('O sufixo "@gmail.com" é completado automaticamente pelo sistema.');
      return; // Impede o envio do formulário se o usuário tentar inserir manualmente o sufixo
    }

    // Valida se todos os campos foram preenchidos
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return; // Impede o envio do formulário se algum campo estiver vazio
    }

    // Valida se a senha e sua confirmação correspondem
    if (password !== confirmPassword) {
      alert("A senha e sua confirmação não correspondem.");
      return; // Impede o envio do formulário se as senhas não corresponderem
    }

    // Valida se a senha tem oito ou mais caracteres com uma combinação de letras, números e símbolos
    if (!isStrongPassword(password)) {
      alert(
        "A senha deve conter pelo menos oito caracteres, incluindo pelo menos uma letra, um número e um símbolo."
      );
      return; // Impede o envio do formulário se a senha não atender aos critérios de validação
    }

    username = username + domain;

    // Envia os dados do formulário para o backend
    sendDataToBackend(firstName, lastName, username, password);
  }

  // Função para enviar os dados do formulário para o backend
  function sendDataToBackend(firstName, lastName, username, password) {
    const formData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    };

    fetch("http://localhost:8080/conta/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar conta.");
        }
        return response.text();
      })
      .then((data) => {
        alert(data); // Exibe a mensagem de confirmação do backend
        clearFormFields(); // Limpa os campos do formulário
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao cadastrar a conta.");
      });
  }

  // Função para limpar os campos do formulário
  function clearFormFields() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
  }

  // Função para validar a força da senha
  function isStrongPassword(password) {
    const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/

    return passwordRegex.test(password);
  }

  // Função para substituir o sufixo de e-mail ao clicar no link
  document
    .getElementById("changeEmailLink")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Evita a navegação padrão ao clicar no link
      const newEmail = prompt("Insira seu novo endereço de e-mail:"); // Solicita ao usuário que insira o novo endereço de e-mail
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

  // Adiciona o event listener para o clique no botão de visibilidade da senha
  document
    .querySelector(".toggle-password")
    .addEventListener("click", togglePasswordVisibility);

  // Adiciona o event listener para o envio do formulário
  document.querySelector("form").addEventListener("submit", validateForm);
});
