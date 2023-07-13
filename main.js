function calcularPlazo(montAct, values) {
    if (values.inflacion > 20) {
        values.inflacion = values.inflacion / 100;
    }

    let valorInflacionado = values.inversion + values.inversion * values.inflacion;
    let resultadoAnual = values.inversion + values.tasaAnual * values.inversion;
    let difValor = montAct - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;
    if (montAct > valorInflacionado) {
        document.getElementById("result").innerHTML = ("A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo. <br> Obtendrás un beneficio de: $" 
            + (montAct - values.inversion).toFixed(2) + "<br>Le estás ganando $" + difValor.toFixed(2) + " a la Inflación. Eso sí, bajo tu propio riesgo que esto es Argentina...");
        document.getElementById("result").className = "text-success text-center";
    }   else {
        document.getElementById("result").innerHTML = ("Ni te gastes en hacer el plazo fijo, compra dólares. <br> Estarías perdiendo un valor de $" + Math.abs((difValor)).toFixed(2));
        document.getElementById("result2").className = "text-danger text-center";
    }

    if (resultadoAnual > valorInflacionado) {
        document.getElementById("result2").innerHTML = ("<br>También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2.toFixed(2) + " a la inflación.");
        document.getElementById("result2").className = "text-success text-center";
    } else {
        document.getElementById("result2").innerHTML = ("<br>Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + Math.abs((difValor2)).toFixed(2));
        document.getElementById("result2").className = "text-danger text-center";
    }
}

function outputMessage(arr) {
    let informacionMes = "";
    arr.forEach(valueMonth => informacionMes += "Mes " + valueMonth.mes + ": Monto acumulado de $" + valueMonth.montoActual + "<br>");
    return informacionMes;
}

function validarInputs(valor1, valor2, valor3) {
    if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3) || valor1 == "" || valor2 == "" || valor3 == "") {
        document.getElementById("result").innerHTML = "Alguno de los campos ingresados no es válido.";
        document.getElementById("result").className = "text-danger text-center";
        document.getElementById("result2").innerHTML = "";
        document.getElementById("result3").innerHTML = "";
        document.getElementById("pResult").innerHTML = "";
        return false;
    }
    return true;
}

function calcularMontoActual(inputValues) {
    if (inputValues.tasaAnual > 3) {
        inputValues.tasaAnual = inputValues.tasaAnual / 100;
    }
    
    let tasaMensual = inputValues.tasaAnual / 12;
    let montoActual = inputValues.inversion;
    let arrInfoMes = [];

    for (let mes = 1; mes <=12; mes++) {
        montoActual += montoActual * tasaMensual;
        arrInfoMes.push({mes: mes, montoActual: (montoActual.toFixed(2))});
    }

    let infoMes = outputMessage(arrInfoMes);
    document.getElementById("pResult").innerHTML = "Acumulación de monto mes a mes:"
    document.getElementById("result3").innerHTML = infoMes;


    return montoActual;
}

let inputValues = {items: []};

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let tasaAnual = document.getElementById("tasaAnual").value;
    let inflacion = document.getElementById("inflacion").value;
    let inversion = document.getElementById("inversion").value;

    if (validarInputs(tasaAnual, inflacion, inversion)) {
        localStorage.getItem("inputValues", (inputValues))
        inputValues.items += JSON.stringify({
            tasaAnual:parseFloat(tasaAnual),
            inflacion:parseFloat(inflacion),
            inversion:parseFloat(inversion)
        })     
        localStorage.setItem("inputValues", JSON.stringify(inputValues));
        calcularPlazo(calcularMontoActual(inputValues), inputValues);
        /* let tbody = document.createElement("tr")
        tbody.innerHTML = inputValues.items */
    }
    
    
})

// Queda listo para utilizarse en entrega futuro (idea de historial de consultas)
/* let inputValues = {
tasaAnual: parseFloat(localStorage.getItem("tasaAnual")),
inflacion: parseFloat(localStorage.getItem("inflacion")),
inversion: parseFloat(localStorage.getItem("inversion"))
} */ 

/* localStorage.clear() */