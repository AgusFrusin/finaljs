const formulario = document.getElementById("formulario");
const tasaInteres = 0.75; 
let valorDolar; 

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = document.getElementById("monto").value;
    const plazo = document.getElementById("plazo").value;
    const interes = (monto * tasaInteres * plazo) / 12;
    const total = parseFloat(monto) + parseFloat(interes);

    mostrarMensaje(interes, total);
})

const mostrarMensaje = (interes, total) => {
    formulario.innerHTML = 
        `<strong>El interés generado es de $${interes.toFixed(2)} y el monto total a recibir es de $${total.toFixed(2)}, la cotización del dolar es de $ ${valorDolar} </strong>
        <div class="form-group">
            <h2>Ingrese sus datos </h2>
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre"> <br>

            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" id="apellido"> <br>

            <label for="email">Email</label>
            <input type="email" class="form-control" id="email"> <br>

            <button id="crearPF" class="btn botonMio">Crear Plazo Fijo</button>
        </div>
        `
    const crearPF = document.getElementById("crearPF");
    crearPF.addEventListener("click", () => {
        Swal.fire("En breve nos comunicaremos con usted");
        const nombre = document.getElementById("nombre");
        const apellido = document.getElementById("apellido");
        const email = document.getElementById("email");

        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            interes: interes,
            total: total,
        }

        localStorage.setItem("datos", JSON.stringify(datos));
    })
}


const dolar = document.getElementById("dolar");

const url = "https://criptoya.com/api/dolar";

setInterval( () => {
    fetch(url)
        .then((response) => response.json())
        .then(({blue, oficial, solidario, mep, ccl, ccb}) => {
            dolar.innerHTML = `<p>Dolar Blue $${blue} - Dolar Oficial $${oficial} - Dolar Solidario $${solidario} - Dolar MEP $${mep} - Dolar CCL $${ccl} - Dolar CCB $${ccb} </p>`
            valorDolar = blue;
        })
}, 2000)



