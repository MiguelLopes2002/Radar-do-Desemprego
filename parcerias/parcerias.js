document.addEventListener('DOMContentLoaded', () => {
    const parceirosContainer = document.getElementById('parceiros-container');
    const detalhesSection = document.getElementById('parceiro-detalhes');
    const titulo = document.querySelector('.detalhes-titulo');
    const descricao = document.querySelector('.detalhes-descricao');

    // Carregar dados do JSON
    fetch('parcerias/parcerias.json')
        .then(response => response.json())
        .then(parceiros => {
            // Adicionar parceiros ao container
            parceiros.forEach(parceiro => {
                const parceiroDiv = document.createElement('div');
                parceiroDiv.classList.add('parceiro');
                parceiroDiv.dataset.parceiro = parceiro.nome_detalhado;
                parceiroDiv.innerHTML = `
                    <img src="${parceiro.imagem}" alt="${parceiro.nome}">
                    <p class="parceiro-nome">${parceiro.nome}</p>
                `;
                parceirosContainer.appendChild(parceiroDiv);

                // Adicionar evento de clique
                parceiroDiv.addEventListener('click', () => {
                    titulo.textContent = parceiro.nome_detalhado;
                    descricao.textContent = parceiro.descricao;
                    detalhesSection.style.display = 'flex';
                });
            });
        })
        .catch(error => console.error('Erro ao carregar dados dos parceiros:', error));
});