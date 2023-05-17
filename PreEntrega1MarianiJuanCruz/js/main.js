//Simulador inflación vs plazo fijo => No soy experto en economía, por lo que algún cálculo puede ser diferente a la realidad.
function calcularPlazo (montAct, inflacionInteranual) {
    let valorInflacionado = inversion + inversion * inflacionInteranual;
    let resultadoAnual = inversion + tasaAnual * inversion;
    let difValor = montoActual - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;
    if (montAct > valorInflacionado) {
        alert("A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo.\nPor un beneficio de: $" + (montoActual - inversion).toFixed(2) + "\nLe estás ganando $" + difValor.toFixed(2) + " a la Inflación.\n\nEso sí, bajo tu propio riesgo que esto es Argentina...");
    } else {
        alert("Ni te gastes en hacer el plazo fijo, compra dólares. Estarías perdiendo un valor de $" + valorAbsoluto(difValor));
    } 
    if (resultadoAnual > valorInflacionado) {
        alert("También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2 + " a la inflación.");
    } else {
        alert("Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + valorAbsoluto(difValor2));
    }
}
function valorAbsoluto (valor) {
    if (valor >= 0) {
        return valor; 
    } else { 
        return valor * -1;
    }
}
let tasaAnual = parseFloat(prompt("Ingrese la tasa anual para la constitución de un plazo fijo: \n\nTip: Algunos bancos la tienen en 91%, otros en 97%"));
if (tasaAnual > 3) {
    tasaAnual = tasaAnual / 100;
}

let inflacionInteranual = parseFloat(prompt("Ingrese la inflación interanual: \n\nTip: La del mes de abril fue del 108,8%"));
if (inflacionInteranual > 20) {
    inflacionInteranual = inflacionInteranual / 100;
}
//Decidí poner valores ajustables y no fijos para que el cálculo pueda ser atemporal.
let inversion = parseFloat(prompt("Cuánto dinero estás dispuesto a invertir?"));
let tasaMensual = tasaAnual / 12;
let beneficioMensual = 0;
let montoActual = inversion;
let informacionMes = "";
for (let mes = 1; mes <=12; mes++) {
    beneficioMensual = montoActual * tasaMensual;
    montoActual += beneficioMensual;
    informacionMes += "Mes " + mes + ": Monto acumulado de $" + montoActual.toFixed(2) + "\n";
}
alert("Si reinvertís los dividendos del plazo fijo mes a mes, estos serían los valores que recuperarías cada mes: \n\n" + informacionMes);
// alert("Mes " + mes + ": Monto acumulado de $" + montoActual.toFixed(2) + "\n") => En caso de querer que se produzca un alert por cada mes
calcularPlazo(montoActual, inflacionInteranual);