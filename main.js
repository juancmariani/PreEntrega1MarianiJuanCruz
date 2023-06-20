function calcularPlazo (montAct, values) {
    let valorInflacionado = values.inversion + values.inversion * values.inflacion;
    let resultadoAnual = values.inversion + values.tasaAnual * values.inversion;
    let difValor = montAct - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;
    if (montAct > valorInflacionado) {
        document.getElementById("result").innerHTML = ("A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo. <br> Obtendrás un beneficio de: $" 
            + (montAct - values.inversion).toFixed(2) + "<br>Le estás ganando $" + difValor.toFixed(2) + " a la Inflación. Eso sí, bajo tu propio riesgo que esto es Argentina...");
        document.getElementById("result").className = "text-success text-center";
    }   else {
        document.getElementById("result").innerHTML = ("Ni te gastes en hacer el plazo fijo, compra dólares. <br> Estarías perdiendo un valor de $" + Math.abs((difValor)));
        document.getElementById("result2").className = "text-danger text-center";
    }

    if (resultadoAnual > valorInflacionado) {
        document.getElementById("result2").innerHTML = ("<br>También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2 + " a la inflación.");
        document.getElementById("result2").className = "text-success text-center";
    } else {
        document.getElementById("result2").innerHTML = ("<br>Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + Math.abs((difValor2)));
        document.getElementById("result2").className = "text-danger text-center";
    }
    localStorage.clear()
}

function outputMessage(arr) {
    let informacionMes = "";
    arr.forEach(valueMonth => informacionMes += "Mes " + valueMonth.mes + ": Monto acumulado de $" + valueMonth.montoActual + "<br>");
    return informacionMes;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    localStorage.setItem("tasaAnual", document.getElementById("tasaAnual").value);
    localStorage.setItem("inflacion", document.getElementById("inflacion").value);
    localStorage.setItem("inversion", document.getElementById("inversion").value);
    location.reload();
})

function validarInputs() {
    let valor1 = inputValues.tasaAnual;
    let valor2 = inputValues.inflacion;
    let valor3 = inputValues.inversion;

    if (isNaN(valor1) || valor1 == "" ||
    isNaN(valor2) || valor2 == "" ||
    isNaN(valor3) || valor3 == "") {
        document.getElementById("result").innerHTML = "Alguno de los campos ingresados no es válido.";
        document.getElementById("result").className = "text-danger text-center";
        document.getElementById("result2").innerHTML = "";
        document.getElementById("result3").innerHTML = "";
        document.getElementById("pResult").innerHTML = "";
    }
}

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

calcularPlazo(montoActual, inputValues);
document.getElementById("result3").innerHTML = infoMes
validarInputs();
localStorage.clear()