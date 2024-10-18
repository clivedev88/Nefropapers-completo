// Mostrar pop-up com informações do simulado
function showSimuladoInfo(title, description, questionCount, modules) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup-questions').innerText = 'Quantidade de questões: ' + questionCount;
    document.getElementById('popup-modules').innerText = 'Módulos: ' + modules.join(', ');
    document.getElementById('simulado-popup').style.display = 'flex';
}

// Fechar o pop-up
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('simulado-popup').style.display = 'none';
});

// Marcar "Gostei" ou "Não Gostei" com exclusividade
document.querySelectorAll('.like-btn, .dislike-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que o pop-up seja acionado ao clicar nos botões
        const simuladoCard = this.closest('.simulado-card');
        const likeButton = simuladoCard.querySelector('.like-btn');
        const dislikeButton = simuladoCard.querySelector('.dislike-btn');

        if (this === likeButton) {
            likeButton.style.backgroundColor = likeButton.style.backgroundColor === '#FF9600' ? 'transparent' : '#FF9600';
            dislikeButton.style.backgroundColor = 'transparent';
        } else if (this === dislikeButton) {
            dislikeButton.style.backgroundColor = dislikeButton.style.backgroundColor === '#FF9600' ? 'transparent' : '#FF9600';
            likeButton.style.backgroundColor = 'transparent';
        }
    });
});
