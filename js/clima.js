document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const ciudadSeleccionada = params.get('city');

    const datos = [
        { "ciudad": "Buenos Aires", "temperatura": 20, "condicion": "Mayormente soleado" },
        { "ciudad": "Santiago", "temperatura": 22, "condicion": "Parcialmente nublado" },
        { "ciudad": "Lima", "temperatura": 25, "condicion": "Nublado" },
        { "ciudad": "Ciudad de México", "temperatura": 18, "condicion": "Lluvioso" },
        { "ciudad": "São Paulo", "temperatura": 23, "condicion": "Mayormente soleado" },
        { "ciudad": "Bogotá", "temperatura": 17, "condicion": "Lluvia ligera" },
        { "ciudad": "Montevideo", "temperatura": 19, "condicion": "Mayormente despejado" }
    ];

    const ciudadData = datos.find(c => c.ciudad === ciudadSeleccionada);

    if (!ciudadData) {
        alert('No se encontró información para la ciudad seleccionada.');
        return;
    }

    mostrarClima(ciudadData);
    guardarEnHistorial(ciudadData);
    mostrarHistorial();

    document.getElementById('limpiarHistorial').addEventListener('click', () => {
        localStorage.removeItem('historialClima');
        mostrarHistorial();
    });
});

function mostrarClima(data) {
    const tabla = document.getElementById('tablaClima');
    tabla.innerHTML = `
        <tr><th>Ciudad</th><th>Temperatura</th><th>Condición</th></tr>
        <tr>
            <td>${data.ciudad}</td>
            <td>${data.temperatura}°C</td>
            <td>${data.condicion}</td>
        </tr>
    `;
}

function guardarEnHistorial(data) {
    const historial = JSON.parse(localStorage.getItem('historialClima')) || [];
    historial.push({
        ...data,
        fecha: new Date().toLocaleString()
    });
    localStorage.setItem('historialClima', JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialClima')) || [];
    const ul = document.getElementById('historialConsultas');
    ul.innerHTML = '';
    historial.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.fecha} - ${item.ciudad}: ${item.temperatura}°C, ${item.condicion}`;
        ul.appendChild(li);
    });
}
