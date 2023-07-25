function calcularPlazo(values) {
    let resultDiv = document.getElementById("result");
    let h2 = document.createElement("h2");
    h2.innerHTML = "Recomendación";
    resultDiv.append(h2);
    let montAct = calcularMontoActual(values, resultDiv)

    if (values.inflacion > 20) {
        values.inflacion = values.inflacion / 100;
    }

    let valorInflacionado = values.inversion + values.inversion * values.inflacion;

    let resultadoAnual = values.inversion + values.tasaAnual * values.inversion;
    let difValor = montAct - valorInflacionado;
    let difValor2 = resultadoAnual - valorInflacionado;

    let results = [{}];
    localStorage.setItem("results", results);
    results.push(JSON.stringify(valorInflacionado));
    let p1 = document.createElement("p");
    if (montAct > valorInflacionado) {
        p1.innerHTML = "A esta inflación y con esta tasa, te conviene realizar un plazo fijo y reinvertir los dividendos en el mismo. <br> Obtendrás un beneficio de: $" 
            + (montAct - values.inversion).toFixed(2) + "<br>Le estás ganando $" + difValor.toFixed(2) + " a la Inflación. Eso sí, bajo tu propio riesgo que esto es Argentina..."
        p1.className = "text-success text-center";
    }   else {
        p1.innerHTML = "Ni te gastes en hacer el plazo fijo, compra dólares. <br> Estarías perdiendo un valor de $" + Math.abs((difValor)).toFixed(2);
        p1.className = "text-danger text-center";
    }

    resultDiv.append(p1);

    let p2 = document.createElement("p");

    if (resultadoAnual > valorInflacionado) {
        p2.innerHTML = "<br>También te conviene realizar el plazo fijo aunque retires los dividendos. Le estarías ganando $" + difValor2.toFixed(2) + " a la inflación.";
        p2.className = "text-success text-center";
    } else {
        p2.innerHTML = "<br>Si retiras los dividendos mes a mes, no te conviene hacer el plazo fijo. Compra dólares para no perder un valor de $" + Math.abs((difValor2)).toFixed(2);
        p2.className = "text-danger text-center";
    }
    resultDiv.append(p2);
    swal(resultDiv);
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
        return false;
    }
    return true;
}

function calcularMontoActual(inputValues, resultDiv) {
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
    
    let p = document.createElement("p");

    let infoMes = "Acumulación de monto mes a mes: <br>";
    infoMes += outputMessage(arrInfoMes);
    p.innerHTML = infoMes;
    resultDiv.append(p);

    return montoActual;
}

function simularValoresBtn(tasaAnual, inflacion, inversion) {
    document.getElementById("result").innerHTML = '';
    let historicalValues = {"tasaAnual":tasaAnual, "inflacion":inflacion, "inversion":inversion};
    calcularPlazo(historicalValues)
}

function getHistorial() {
    if (JSON.parse(localStorage.getItem("inputValues")).items.length != 0) {
        

        document.getElementById("historicalBody").innerHTML = ""
        let tbody = document.getElementById("historicalBody");
        let savedValues = JSON.parse(localStorage.getItem("inputValues"));
        
        let i = 0;
        
        savedValues.items.forEach(item => {
            item = JSON.parse(item);
            let row = document.createElement("tr");
            let tdNumber = document.createElement("td");
            let tdTasaAnual = document.createElement("td");
            let tdInflacion = document.createElement("td");
            let tdInversion = document.createElement("td");
            let simularBtn = document.createElement("button");
            simularBtn.className = "btn btn-warning";
            simularBtn.setAttribute("onclick","simularValoresBtn("+ item.tasaAnual + ", " + item.inflacion + ", " + item.inversion + ");");
            tdNumber.innerHTML = i+1;
            tdTasaAnual.innerHTML = item.tasaAnual;
            tdInflacion.innerHTML = item.inflacion;
            tdInversion.innerHTML = item.inversion;
            simularBtn.innerHTML = "Simular";
            row.append(tdNumber);
            row.append(tdTasaAnual);
            row.append(tdInflacion);
            row.append(tdInversion);
            row.append(simularBtn);
            tbody.append(row);
            i++;
        });
        document.getElementById("historicalTableDiv").style.display = "block";
    }
}

// Al intentar levantar el archivo local apiConfig.json el navegador me lanza un CORS error
/*
const getJsonData = async () => {
    try {
        const data = await fetch("apiConfig.json");
        const config = await respuesta.json();
    } catch(error) {
        console.log("error");
    }
}

getJsonData();
*/


let inputValues = {items: []};
localStorage.setItem("inputValues", JSON.stringify(inputValues));

const simularPlazoFijoButton = document.getElementById("simularPlazoFijoButton");

simularPlazoFijoButton.addEventListener("click", function(event) {
    event.preventDefault();
    let tasaAnual = document.getElementById("tasaAnual").value;
    let inflacion = document.getElementById("inflacion").value;
    let inversion = document.getElementById("inversion").value;
    document.getElementById("result").innerHTML = '';

    if (validarInputs(tasaAnual, inflacion, inversion)) {
        let values = {
            tasaAnual:parseFloat(tasaAnual),
            inflacion:parseFloat(inflacion),
            inversion:parseFloat(inversion)
        }
        let inputValues = JSON.parse(localStorage.getItem("inputValues"));     
        inputValues.items.push(JSON.stringify(values));
        localStorage.setItem("inputValues", JSON.stringify(inputValues));
        calcularPlazo(values);
        getHistorial()
    }
})

fetch("https://api.bluelytics.com.ar/v2/latest")
.then(respuesta => respuesta.json())
.then(datos => {
    const dolarValues = {
        ventaOficial:datos.oficial.value_sell,
        compraOficial:datos.oficial.value_buy,
        ventaBlue:datos.blue.value_sell,
        compraBlue:datos.blue.value_buy
    }

    let dolarDiv = document.getElementById("dolarValues");
    let vOf = document.createElement("td");
    let cOf = document.createElement("td");
    let vBl = document.createElement("td");
    let cBl = document.createElement("td");
    vOf.innerHTML = dolarValues.ventaOficial;
    vOf.className = "text-success";
    cOf.innerHTML = dolarValues.compraOficial;
    cOf.className = "text-success";
    vBl.innerHTML = dolarValues.ventaBlue;
    vBl.className = "text-primary";
    cBl.innerHTML = dolarValues.compraBlue;
    cBl.className = "text-primary";

    dolarDiv.append(vOf);
    dolarDiv.append(cOf);
    dolarDiv.append(vBl);
    dolarDiv.append(cBl);
});