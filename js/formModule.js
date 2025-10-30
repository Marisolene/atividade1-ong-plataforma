const FormModule = (function(){
  function setCursorEnd(el){ setTimeout(()=> el.selectionStart = el.selectionEnd = el.value.length,0); }
  function maskCPF(input){ input.addEventListener('input', function(){ let v=this.value.replace(/\D/g,'').slice(0,11); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d)/,'$1.$2'); v=v.replace(/(\d{3})(\d{1,2})$/,'$1-$2'); this.value=v; setCursorEnd(this); }); }
  function maskTel(input){ input.addEventListener('input', function(){ let v=this.value.replace(/\D/g,'').slice(0,11); v = v.length<=10 ? v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').trim() : v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3').trim(); this.value=v; setCursorEnd(this); }); }
  function maskCEP(input){ input.addEventListener('input', function(){ let v=this.value.replace(/\D/g,'').slice(0,8); v=v.replace(/(\d{5})(\d)/,'$1-$2'); this.value=v; setCursorEnd(this); }); }

  function validateCPFRaw(cpf){ const v=(cpf||'').replace(/\D/g,''); if(v.length!==11) return false; let sum=0, rev; for(let i=1;i<=9;i++) sum+=parseInt(v.substring(i-1,i))*(11-i); rev=(sum*10)%11; if(rev===10)rev=0; if(rev!==parseInt(v.substring(9,10))) return false; sum=0; for(let i=1;i<=10;i++) sum+=parseInt(v.substring(i-1,i))*(12-i); rev=(sum*10)%11; if(rev===10)rev=0; if(rev!==parseInt(v.substring(10,11))) return false; return true; }

  function validateEmail(email){ return /^\S+@\S+\.\S+$/.test(email); }
  function calcAge(d){ if(!d) return 0; const today=new Date(), b=new Date(d); let age=today.getFullYear()-b.getFullYear(); const m=today.getMonth()-b.getMonth(); if(m<0 || (m===0 && today.getDate()<b.getDate())) age--; return age; }

  function showMessage(el, msgs, isError=true){
    if(!el) return;
    el.innerHTML = '';
    el.className = isError ? 'form-error' : 'form-success';
    if(Array.isArray(msgs)){ const ul=document.createElement('ul'); msgs.forEach(m=>{ const li=document.createElement('li'); li.textContent=m; ul.appendChild(li); }); el.appendChild(ul); }
    else el.textContent = msgs;
  }

  function renderVoluntarios(){
    const list = document.getElementById('voluntariosList');
    if(!list) return;
    const arr = Storage.all();
    if(!arr.length){ list.innerHTML = '<p>Nenhum voluntário cadastrado.</p>'; return; }
    list.innerHTML = '';
    arr.forEach(v=>{
      const d=document.createElement('div'); d.className='card'; d.innerHTML = `<strong>${v.nome}</strong><div style="color:var(--muted);font-size:0.95rem">${v.interesse} • ${v.email || ''} • CPF: ${v.cpf}</div>`; list.appendChild(d);
    });
  }

  function init(){
    const form=document.getElementById('cadastroForm');
    if(!form) return;
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const nascimento = document.getElementById('nascimento');
    const interesse = document.getElementById('interesse');
    const msgEl = document.getElementById('form-messages');
    const exportBtn = document.getElementById('exportCSV');

    if(cpf) maskCPF(cpf);
    if(tel) maskTel(tel);
    if(cep) maskCEP(cep);

    renderVoluntarios();

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const errors=[];

      if(!nome.value.trim() || nome.value.trim().length<3) errors.push('Nome inválido (mín. 3 caracteres).');
      if(!validateEmail(email.value)) errors.push('E-mail inválido.');
      if(!validateCPFRaw(cpf.value)) errors.push('CPF inválido.');
      const cpfRaw = (cpf.value||'').replace(/\D/g,'');
      if(Storage.existsCPF(cpfRaw)) errors.push('CPF já cadastrado.');
      const age = calcAge(nascimento.value);
      if(age < 14) errors.push('Idade mínima 14 anos.');

      if(errors.length){
        // remover / adicionar destaques
        [nome,email,cpf,nascimento,interesse].forEach(i=> i && i.classList.remove('field-error'));
        if(!validateEmail(email.value)) email.classList.add('field-error');
        if(!validateCPFRaw(cpf.value)) cpf.classList.add('field-error');
        if(nome.value.trim().length<3) nome.classList.add('field-error');
        if(age<14) nascimento.classList.add('field-error');
        showMessage(msgEl, errors, true);
        return;
      }

      const payload = {
        nome: nome.value.trim(),
        cpf: cpfRaw,
        nascimento: nascimento.value,
        email: email.value.trim(),
        telefone: tel?.value || '',
        cep: cep?.value || '',
        interesse: interesse.value || '',
        mensagem: document.getElementById('mensagem')?.value || '',
        createdAt: new Date().toISOString()
      };

      Storage.add(payload);
      showMessage(msgEl, 'Cadastro realizado com sucesso!', false);
      form.reset();
      renderVoluntarios();
    });

    exportBtn?.addEventListener('click', function(){
      const csv = Storage.exportCSV();
      if(!csv){ alert('Nenhum registro para exportar.'); return; }
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'voluntarios.csv'; a.click();
      URL.revokeObjectURL(url);
    });
  }

  return { init };
})();
