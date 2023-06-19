function calcularPlazo (montAct, values) {
    let valorInflacionado = values.inversion + values.inversion * values.inflacion;
    let resultadoAnual = values.inversion + values.tasaAnual * values.inversion;
    let difValor = montAct - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;
    if (montAct > valorInflacionado) {
        console.log("A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo.\nPor un beneficio de: $" 
            + (montAct - values.inversion).toFixed(2) + "\nLe estás ganando $" + difValor.toFixed(2) + " a la Inflación.\n\nEso sí, bajo tu propio riesgo que esto es Argentina...");
    } else {
        console.log("Ni te gastes en hacer el plazo fijo, compra dólares. Estarías perdiendo un valor de $" + Math.abs((difValor)));
    } 
    if (resultadoAnual > valorInflacionado) {
        console.log("También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2 + " a la inflación.");
    } else {
        console.log("Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + Math.abs((difValor2)));
    }
}

function outputMessage(arr) {
    let informacionMes = "";
    arr.forEach(valueMonth => informacionMes += "Mes " + valueMonth.mes + ": Monto acumulado de $" + valueMonth.montoActual + "\n");
    return informacionMes;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    localStorage.setItem("tasaAnual", document.getElementById("tasaAnual").value);
    localStorage.setItem("inflacion", document.getElementById("inflacion").value);
    localStorage.setItem("inversion", document.getElementById("inversion").value);
})

let inputValues = {
tasaAnual: parseFloat(localStorage.getItem("tasaAnual")),
inflacion: parseFloat(localStorage.getItem("inflacion")),
inversion: parseFloat(localStorage.getItem("inversion"))
}

if (inputValues.tasaAnual > 3) {
    inputValues.tasaAnual = inputValues.tasaAnual / 100;
}

if (inputValues.inflacion > 20) {
    inputValues.inflacion = inputValues.inflacion / 100;
}

let tasaMensual = inputValues.tasaAnual / 12;
let beneficioMensual = 0;
let montoActual = inputValues.inversion;
let arrInfoMes = [];

for (let mes = 1; mes <=12; mes++) {
    montoActual += montoActual * tasaMensual;
    arrInfoMes.push({mes: mes, montoActual: (montoActual.toFixed(2))});
}

let infoMes = outputMessage(arrInfoMes);

console.log("Si reinvertís los dividendos del plazo fijo mes a mes, estos serían los valores que recuperarías cada mes: \n\n" + infoMes);
calcularPlazo(montoActual, inputValues); 