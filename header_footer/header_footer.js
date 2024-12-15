document.addEventListener('DOMContentLoaded', () => {
    // Incluir o cabeçalho
    fetch('../header_footer/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
            // Garantir que o CSS seja carregado
            const headerLink = document.createElement('link');
            headerLink.rel = 'stylesheet';
            headerLink.href = '../header_footer/header.css';
            document.head.appendChild(headerLink);
        })
        .catch(error => {
            console.error("Erro ao carregar o cabeçalho:", error);
        });

    // Incluir o rodapé
    fetch('../header_footer/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            // Garantir que o CSS seja carregado
            const footerLink = document.createElement('link');
            footerLink.rel = 'stylesheet';
            footerLink.href = '../header_footer/footer.css';
            document.head.appendChild(footerLink);
        })
        .catch(error => {
            console.error("Erro ao carregar o rodapé:", error);
        });
});
