let usuarios = [];

fetch('usuarios.json')
  .then(res => res.json())
  .then(data => {
    usuarios = data;
  });

function mostrarResultado(texto, permitido) {
  const resultado = document.getElementById('resultado');
  resultado.innerText = texto;
  resultado.style.color = permitido ? 'green' : 'red';
}

function validarQR(contenidoQR) {
  const encontrado = usuarios.find(user => user.id === contenidoQR);
  if (encontrado) {
    mostrarResultado(`✅ Acceso permitido: ${encontrado.nombre}`, true);
  } else {
    mostrarResultado("❌ Acceso denegado", false);
  }
}

// Inicializar escaneo
const qrScanner = new Html5Qrcode("reader");
qrScanner.start(
  { facingMode: "environment" }, // cámara trasera
  { fps: 10, qrbox: 250 },
  (decodedText, decodedResult) => {
    qrScanner.stop();
    validarQR(decodedText);
  },
  error => {
    // Puedes ignorar errores o mostrarlos si deseas
  }
);
