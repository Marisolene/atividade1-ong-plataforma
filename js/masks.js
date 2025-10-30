// máscaras simples para CPF, telefone e CEP (client-side)
function maskCpf(value){
  return value
    .replace(/\D/g,'')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
}

function maskPhone(value){
  value = value.replace(/\D/g,'');
  if(value.length > 10){
    // (99) 99999-9999
    return value.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');
  } else {
    // (99) 9999-9999
    return value.replace(/(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3');
  }
}

function maskCep(value){
  return value.replace(/\D/g,'').replace(/(\d{5})(\d{1,3})/,'$1-$2');
}

document.addEventListener('input', (e) => {
  if(!e.target) return;
  if(e.target.id === 'cpf'){
    e.target.value = maskCpf(e.target.value);
  } else if(e.target.id === 'telefone'){
    e.target.value = maskPhone(e.target.value);
  } else if(e.target.id === 'cep'){
    e.target.value = maskCep(e.target.value);
  }
});
