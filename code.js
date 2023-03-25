//Definir variables
const ip = prompt("IP")
const redes = parseInt(prompt("Sub-redes"))
let IP = ip.split(".")
let clase, prefijo, mascara
let sPrefijo, sMascara, host, hostT, salto

//Definir propiedades de la ip
let off = 0
if (IP[0] < 128) {
    clase = "A"
    prefijo = 8
    mascara = [255, 0, 0, 0]
    sMascara = [255, 0, 0, 0]
    off = 16
} else if (IP[0] < 192) {
    clase = "B"
    prefijo = 16
    mascara = [255, 255, 0, 0]
    sMascara = [255, 255, 0, 0]
    off = 8
} else if (IP[0] < 224) {
    clase = "C"
    prefijo = 24
    mascara = [255, 255, 255, 0]
    sMascara = [255, 255, 255, 0]
    off = 0
} else {alert("No se puede subnetear")}

//Determinar bits adicionales
let bits = 0
let i = 1
while (i < redes) {
    i = i * 2
    bits++
}

//Actualizar prefijo
sPrefijo = prefijo + bits

//Actualizar mascara
let octal = []
for (i = 0; i < bits; i++) {
    octal.push(1)
}
for (i = 0; 8 - octal.length; i++) {
    octal.push(0)
}
octal.reverse()
let decimal = 0
for (i = 0; i < 8; i++) {
    if (octal[i] == 1) {
        octal[i] = 2 ** i
        decimal += octal[i]
    }
}
let l = 0
while(sMascara[l] != 0){
    l++
}
sMascara[l] = decimal

//Determinar host
host = (8 - bits) + off
host = 2 ** host - 2
hostT = host * redes

//Determinar los saltos de red
salto = 256 - decimal

//Mostrar resultados
document.write(`Ip: <b>${ip}</b><br>`)
document.write(`Sub redes: <b>${redes}</b><br>`)
document.write(`Clase: <b>${clase}</b><br>`)
document.write(`Prefijo: <b>/${prefijo}</b><br>`)
document.write(`Mascara: <b>${mascara[0]}.${mascara[1]}.${mascara[2]}.${mascara[3]}</b><br>`)

document.write("<br>")

document.write(`Bits adicionales para red: <b>${bits}</b><br>`)
document.write(`Nuevo prefijo: <b>/${sPrefijo}</b><br>`)
document.write(`Nueva mascara: <b>${sMascara[0]}.${sMascara[1]}.${sMascara[2]}.${sMascara[3]}</b><br>`)
document.write(`Host por red: <b>${host}</b><br>`)
document.write(`Host totales: <b>${hostT}</b><br>`)
document.write(`Saltos de red: <b>${salto}</b><br>`)
document.write("<hr>")

//Mostrar rangos de ip

IP[0] = parseInt(IP[0]); IP[1] = parseInt(IP[1]); IP[2] = parseInt(IP[2]); IP[3] = parseInt(IP[3]) //arreglar ip

let push
Push = () => {
    IP[3] += host - 1 // añadir los host
    push = Math.trunc(IP[3] / 256) // calcular sobrante
    IP[3] = IP[3] % 256 // asignar la ultima ip
    IP[2] += push

    push = Math.trunc(IP[2] / 256) // calcular sobrante
    IP[2] = IP[2] % 256 // asignar la ultima ip
    IP[1] += push

    push = Math.trunc(IP[1] / 256) // calcular sobrante
    IP[1] = IP[1] % 256 // asignar la ultima ip
    IP[0] += push
}

let jump
Jump = () => {
    //coregir salto de red
    let jump = Math.trunc(IP[3] / 256)
    IP[3] = IP[3] % 256

    IP[2] += jump
    jump = Math.trunc(IP[2] / 256)
    IP[2] = IP[2] % 256

    IP[1] += jump
    jump = Math.trunc(IP[1] / 256)
    IP[1] = IP[1] % 256

    IP[0] += jump
    jump = Math.trunc(IP[0] / 256)
    IP[0] = IP[0] % 256
}

document.write("<table>")
document.write("<th>No.</th> <th>Red</th> <th>Primer Host</th> <th>Ultimo Host</th> <th>BroadCast</th>")
for (i = 0; i < redes; i++) {
    document.write("<tr>")

    document.write(`<td>${i + 1}</td>`) // numero de red
    document.write(`<td>${IP[0]}.${IP[1]}.${IP[2]}.${IP[3]}</td>`) //id de red

    IP[3]++
    document.write(`<td>${IP[0]}.${IP[1]}.${IP[2]}.${IP[3]}</td>`)// primera red

    Push()
    document.write(`<td>${IP[0]}.${IP[1]}.${IP[2]}.${IP[3]}</td>`)// ultima red red

    IP[3]++
    document.write(`<td>${IP[0]}.${IP[1]}.${IP[2]}.${IP[3]}</td>`)// broadcast

    document.write("</tr>")
    IP[3]++ //dar salto de red

    Jump()
}
document.write("</table>")