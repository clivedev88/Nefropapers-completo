async function cadastrarUsuario(nome, email, senha) {
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        const data = await response.json();
        if (data.error) {
            console.error('Erro ao cadastrar:', data.error);
            alert(`Erro ao cadastrar: ${data.error}`);
        } else {
            alert('E-mail de confirmação enviado. Verifique sua caixa de entrada.');
            window.location.href = 'index.html'; 
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao se conectar ao servidor. Verifique sua conexão.');
    }
}

async function loginUsuario(email, senha) {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (data.apiKey) {
            localStorage.setItem('apiKey', data.apiKey);
            window.location.href = '/front/frontend 3/simulado.html';
        } else {
            console.error('Erro ao receber a API Key:', data.message);
            alert('Erro no login. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao se conectar ao servidor.');
    }
}
