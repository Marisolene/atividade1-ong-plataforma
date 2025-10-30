// app.js - validações e interatividade
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        // ativa validação nativa visual
        form.reportValidity();
        alert('Por favor corrija os campos destacados.');
        return;
      }
      // Exemplo: validação extra (ex.: CPF mínimo de dígitos)
      const cpf = document.getElementById('cpf').value.replace(/\D/g,'');
      if(cpf.length !== 11){
        alert('CPF inválido. Verifique e tente novamente.');
        return;
      }

      // Simula armazenamento local (localStorage)
      const data = {
        nome: form.nome.value,
        email: form.email.value,
        cpf: form.cpf.value,
        telefone: form.telefone.value,
        nascimento: form.nascimento.value,
        cep: form.cep.value,
        endereco: form.endereco.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        criadoEm: new Date().toISOString()
      };
      let registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.push(data);
      localStorage.setItem('registros', JSON.stringify(registros));

      alert('Cadastro enviado com sucesso (simulado).');
      form.reset();
    });
  }

  // Menu acessível: fechar ao clicar fora
  const menuToggle = document.getElementById('menu-toggle');
  if(menuToggle){
    document.addEventListener('click', (e) => {
      if(!menuToggle.contains(e.target)){
        menuToggle.setAttribute('aria-expanded', 'false');
        const nav = document.getElementById('main-nav');
        if(nav) nav.style.display = 'none';
      }
    });
  }
});
