document.addEventListener('DOMContentLoaded', function(){
  // ano no footer
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn?.addEventListener('click', ()=> {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', (!expanded).toString());
    if(mobileMenu.style.display === 'none' || mobileMenu.style.display === ''){
      mobileMenu.innerHTML = `
        <a href="#/" style="display:block;padding:8px 6px">Início</a>
        <a href="#/projetos" style="display:block;padding:8px 6px">Projetos</a>
        <a href="#/cadastro" style="display:block;padding:8px 6px">Cadastro</a>
      `;
      mobileMenu.style.display = 'block';
    } else {
      mobileMenu.style.display = 'none';
    }
  });

  // fechar menu mobile ao mudar de rota
  window.addEventListener('hashchange', ()=> {
    document.getElementById('mobile-menu').style.display = 'none';
    document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
  });

  // inicializa router (SPA)
  Router.init();
});
