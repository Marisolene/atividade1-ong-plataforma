document.addEventListener('DOMContentLoaded', function() {
  // Atualiza anos no footer
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3').forEach(el => el.textContent = y);

  // Máscaras simples
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');

  function setCursorEnd(el){ setTimeout(()=> el.selectionStart = el.selectionEnd = el.value.length,0); }

  if(cpf){
    cpf.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      this.value = v;
      setCursorEnd(this);
    });
  }

  if(tel){
    tel.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'').slice(0,11);
      v = v.length <= 10
        ? v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').trim()
        : v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').trim();
      this.value = v;
      setCursorEnd(this);
    });
  }

  if(cep){
    cep.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'').slice(0,8);
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      this.value = v;
      setCursorEnd(this);
    });
  }

  // Validação simples do formulário
  const form = document.getElementById('cadastroForm');
  const msg = document.getElementById('form-messages');

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      msg.innerHTML = '';
      const errors = [];
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();

      if(nome.length < 3) errors.push('Informe o nome completo.');
      if(!/^\S+@\S+\.\S+$/.test(email)) errors.push('E-mail inválido.');

      if(errors.length){
        msg.innerHTML = `<ul><li>${errors.join('</li><li>')}</li></ul>`;
        msg.style.color = 'crimson';
        return;
      }

      msg.textContent = 'Cadastro enviado com sucesso (simulado).';
      msg.style.color = 'green';
      form.reset();
    });
  }
});

// --- MENU RESPONSIVO ---
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav ul');

menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('open');
});
