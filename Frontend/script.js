
document.addEventListener('DOMContentLoaded', () => {

    const modalLogin = document.getElementById('modal-container');
    const btnLogin = document.getElementById('btn-login');
    const btnFecharLogin = document.getElementById('btn-fechar');


    if (btnLogin && modalLogin) {
        btnLogin.addEventListener('click', () => {
            modalLogin.classList.add('ativo');
        });
    }

    if (btnFecharLogin && modalLogin) {
        btnFecharLogin.addEventListener('click', () => {
            modalLogin.classList.remove('ativo');
        });
    }

    if (modalLogin) {
        modalLogin.addEventListener('click', (evento) => {
            if (evento.target === modalLogin) {
                modalLogin.classList.remove('ativo');
            }
        });
    }


    const menuPerfil = document.getElementById('menu-perfil');
    const fundoPerfil = document.getElementById('fundo-perfil');
    const btnPerfil = document.querySelector('.btn-perfil');
    const btnFecharPerfil = document.getElementById('fechar-perfil');

    function abrirMenuPerfil() {
        if (menuPerfil && fundoPerfil) {
            menuPerfil.classList.add('aberto');
            fundoPerfil.classList.add('ativo');
        }
    }

    function fecharMenuPerfil() {
        if (menuPerfil && fundoPerfil) {
            menuPerfil.classList.remove('aberto');
            fundoPerfil.classList.remove('ativo');
        }
    }

    if (btnPerfil) {
        btnPerfil.addEventListener('click', abrirMenuPerfil);
    }

    if (btnFecharPerfil) {
        btnFecharPerfil.addEventListener('click', fecharMenuPerfil);
    }

    if (fundoPerfil) {
        fundoPerfil.addEventListener('click', fecharMenuPerfil);
    }


    const barraPesquisa = document.getElementById('barra-pesquisa');
    const receitas = document.querySelectorAll('.receita');

    function pesquisarReceitas() {
        if (!barraPesquisa) return;

        const termo = barraPesquisa.value
            .trim()
            .toLowerCase();

        receitas.forEach((receita) => {
            const textoReceita = receita.textContent.toLowerCase();

            if (textoReceita.includes(termo)) {
                receita.style.display = '';
            } else {
                receita.style.display = 'none';
            }
        });
    }

    if (barraPesquisa) {
        barraPesquisa.addEventListener('input', pesquisarReceitas);
    }

    const iconeLupa = document.getElementById('icone-lupa');

    if (iconeLupa) {
        iconeLupa.addEventListener('click', pesquisarReceitas);
    }


    const modalReceita = document.getElementById(
        'modal-receita-container'
    );

    const btnFecharReceita = document.getElementById(
        'btn-fechar-receita'
    );

    const imagemModal = document.getElementById(
        'img-modal-receita'
    );

    const tituloModal = document.getElementById(
        'titulo-modal-receita'
    );

    const avaliacaoModal = document.getElementById(
        'avaliacao-modal-receita'
    );

    const descricaoModal = document.getElementById(
        'descricao-modal-receita'
    );

    receitas.forEach((receita) => {
        receita.addEventListener('click', () => {

            if (!modalReceita) return;

            const imagemReceita = receita.querySelector(
                '.img-receita'
            );

            const tituloReceita = receita.querySelector(
                'h2, h3, h4, .titulo-receita'
            );


            const descricaoReceita =
                receita.dataset.descricao ||
                receita.querySelector('.descricao-receita')?.textContent ||
                'Confira os detalhes desta receita.';


            const avaliacaoReceita = receita.querySelector(
                '.avaliacao-receita, #avaliacao-receita'
            );


            if (imagemModal && imagemReceita) {
                imagemModal.src = imagemReceita.src;
                imagemModal.alt = imagemReceita.alt || 'Imagem da receita';
            }


            if (tituloModal) {
                tituloModal.textContent = tituloReceita
                    ? tituloReceita.textContent.trim()
                    : 'Detalhes da receita';
            }


            if (descricaoModal) {
                descricaoModal.textContent = descricaoReceita;
            }


            if (avaliacaoModal) {
                avaliacaoModal.replaceChildren();

                if (avaliacaoReceita) {
                    avaliacaoModal.innerHTML = avaliacaoReceita.innerHTML;
                }
            }


            modalReceita.classList.add('ativo');
        });
    });

    if (btnFecharReceita && modalReceita) {
        btnFecharReceita.addEventListener('click', () => {
            modalReceita.classList.remove('ativo');
        });
    }

    if (modalReceita) {
        modalReceita.addEventListener('click', (evento) => {
            if (evento.target === modalReceita) {
                modalReceita.classList.remove('ativo');
            }
        });
    }



    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {

            if (modalLogin) {
                modalLogin.classList.remove('ativo');
            }

            if (modalReceita) {
                modalReceita.classList.remove('ativo');
            }

            fecharMenuPerfil();
        }
    });


    const btnCriarReceita = document.getElementById(
        'btn-criar-receita'
    );

    if (btnCriarReceita) {
        btnCriarReceita.addEventListener('click', () => {
            alert('A opção de criar receita será implementada aqui.');
        });
    }

});