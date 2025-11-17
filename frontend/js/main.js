document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar envío real de formulario
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Validar credenciales fijas
    if(usuario === 'admin' && contrasena === '12345') {
      // Usuario válido: redirigir a página principal (inicio.html)
      window.location.href = 'inicio.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
