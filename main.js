//Simulador inflación vs plazo fijo => No soy experto en economía, por lo que algún cálculo puede ser diferente a la realidad.
function calcularPlazo (montAct, values) {
    let valorInflacionado = values.inversion + values.inversion * values.inflacionInteranual;
    let resultadoAnual = values.inversion + values.tasaAnual * values.inversion;
    let difValor = montAct - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;
    if (montAct > valorInflacionado) {
        alert("A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo.\nPor un beneficio de: $" 
            + (montAct - values.inversion).toFixed(2) + "\nLe estás ganando $" + difValor.toFixed(2) + " a la Inflación.\n\nEso sí, bajo tu propio riesgo que esto es Argentina...");
    } else {
        alert("Ni te gastes en hacer el plazo fijo, compra dólares. Estarías perdiendo un valor de $" + Math.abs((difValor)));
    } 
    if (resultadoAnual > valorInflacionado) {
        alert("También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2 + " a la inflación.");
    } else {
        alert("Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + Math.abs((difValor2)));
    }
}
    
function outputMessage(arr) {
    let informacionMes = "";
    arr.forEach(valueMonth => informacionMes += "Mes " + valueMonth.mes + ": Monto acumulado de $" + valueMonth.montoActual + "\n");
    return informacionMes;
}

let inputValues = {
    tasaAnual: parseFloat(prompt("Ingrese la tasa anual para la constitución de un plazo fijo: \n\nTip: Algunos bancos la tienen en 91%, otros en 97%")),
    inflacionInteranual: parseFloat(prompt("Ingrese la inflación interanual: \n\nTip: La del mes de abril fue del 108,8%")),
    inversion: parseFloat(prompt("Cuánto dinero estás dispuesto a invertir?"))
};


if (inputValues.tasaAnual > 3) {
    inputValues.tasaAnual = inputValues.tasaAnual / 100;
}

if (inputValues.inflacionInteranual > 20) {
    inputValues.inflacionInteranual = inputValues.inflacionInteranual / 100;
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

alert("Si reinvertís los dividendos del plazo fijo mes a mes, estos serían los valores que recuperarías cada mes: \n\n" + infoMes);
calcularPlazo(montoActual, inputValues);