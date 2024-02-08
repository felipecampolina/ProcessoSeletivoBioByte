document.addEventListener('DOMContentLoaded', function() {
    // Função para trocar a visibilidade da senha
    function togglePasswordVisibility() {
        var passwordField = document.getElementById('password');
        var confirmPasswordField = document.getElementById('confirmPassword');
        var icon = document.querySelector('.toggle-password i');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            confirmPasswordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            confirmPasswordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Função para validar o formulário
    function validateForm(event) {
        event.preventDefault(); // Evita o envio do formulário por padrão

        // Obtém os valores dos campos
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        let username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Verifica se o usuário está tentando inserir manualmente "@gmail.com"
        if (username.trim().toLowerCase().endsWith('@gmail.com')) {
            alert('O sufixo "@gmail.com" é completado automaticamente pelo sistema.');
            return; // Impede o envio do formulário se o usuário tentar inserir manualmente o sufixo
        }

        // Valida se todos os campos foram preenchidos
        if (!firstName || !lastName || !username || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return; // Impede o envio do formulário se algum campo estiver vazio
        }

        // Valida se a senha e sua confirmação correspondem
        if (password !== confirmPassword) {
            alert('A senha e sua confirmação não correspondem.');
            return; // Impede o envio do formulário se as senhas não corresponderem
        }

        // Valida se a senha tem oito ou mais caracteres com uma combinação de letras, números e símbolos
        if (!isStrongPassword(password)) {
            alert('A senha deve conter pelo menos oito caracteres, incluindo pelo menos uma letra, um número e um símbolo.');
            return; // Impede o envio do formulário se a senha não atender aos critérios de validação
        }

        // Limpa os campos do formulário
        clearFormFields();

        // Exibe um alerta de confirmação com as informações do usuário
        showConfirmationAlert(firstName, lastName, username,password);
    }

    // Função para limpar os campos do formulário
    function clearFormFields() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
    }

    // Função para exibir um alerta de confirmação com as informações do usuário
    function showConfirmationAlert(firstName, lastName, username,password) {
        alert('Usuário criado com sucesso!\n\nInformações do usuário:\nNome: ' + firstName + ' ' + lastName + '\nNome de usuário: ' + username+'\nSenha: ' + password);
    }

    // Função para validar a força da senha
    function isStrongPassword(password) {
        const passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/
        return passwordRegex.test(password);
    }

    // Adiciona o event listener para o clique no botão de visibilidade da senha
    document.querySelector('.toggle-password').addEventListener('click', togglePasswordVisibility);

    // Adiciona o event listener para o envio do formulário
    document.querySelector('form').addEventListener('submit', validateForm);
});
