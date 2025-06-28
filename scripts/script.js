let cursor;
let yScroll;

let compass = new Map()
compass.set('N', "+")
compass.set('E', "+")
compass.set('S', "-")
compass.set('W', "-")

function updateMouse(event){
    let x = event.clientX
    let y = event.clientY

    cursor = document.getElementById('cursor').style

    cursor.top = `${y+yScroll}px`
    cursor.left = `${x}px`

}
document.addEventListener("mousemove", updateMouse)
document.addEventListener("mouseenter", updateMouse)
document.addEventListener('scroll', function(){
    yScroll = window.scrollY
})

function total(...magnitudes) {
    let total;
    for(let i=0; i<magnitudes.length; i++) {
        total += magnitudes[i]
    }
    return total
}

function delta(a, b){
    let d = b - a
    return d
}

function checkStringForNums(string) { // func doesn't work
    return /\d/.test(string)
}

function radiansToDegrees(angle) {
    return (angle * (180/Math.PI))
}

function degreesToRadians(angle) {
    return (angle * (Math.PI /180))
}


function totalDisplacement(...args) {
    let displacements = args[0]
    let angles = args[1]
    let x = 0;
    let y = 0;

    console.log(`displacements -> ${displacements}\nangles -> ${angles}`)

    for (let i=0; i<displacements.length; i++) {
        if(angles[i].length > 1) {
            let angle = angles[i].split(" ")[1]
            console.log(`angle number -> ${angle}`)
            let cos =  Math.cos(degreesToRadians(angle))
            let sin =  Math.sin(degreesToRadians(angle))
            x += sin*displacements[i]
            y += cos*displacements[i]
        } else if(angles[i].length === 1) {
            let angle = angles[i]
            let displacement = displacements[i]
            switch (angle) {
                case "N":
                    y += displacement
                    break
                case "E":
                    x += displacement
                    break
                case "S":
                    y = y - displacement
                    break
                case "W":
                    x = x - displacement
                    break
            }
        }
        console.log(`total x -> ${x}\ntotal y -> ${y}`)
    }
    return {x, y}
}

function perTime(magnitude, direction, deltaTime) {
    let averagePerTime = magnitude/deltaTime
    if(direction.length === 0) {
        return averagePerTime
    } else {
        return {averagePerTime, direction}
    }
}

function kinematicEquation(d, t, vi, vf, a) {
    let variables = [d, t, vi, vf, a]
    let missing = ''

    let unknownIndex = whichVIsUnknown(variables)
    let unknown = ''

    switch (unknownIndex) {
        case 0:
            unknown = 'd'
            break
        case 1:
            unknown = 't'
            break
        case 2:
            unknown = 'vi'
            break
        case 3:
            unknown = 'vf'
            break
        case 4:
            unknown = 'a'
            break
    }

    if (d === "m") {
        missing = 'd'
        variables.splice(0, 1)
        return kinematicEquation2(variables, unknown)
    } else if (t === "m") {
        missing = 't'
        variables.splice(1, 1)
        return kinematicEquation4(variables, unknown)
    } else if (vi === "m") {
        missing = 'vi'
        variables.splice(2, 1)
        return kinematicEquation5(variables, unknown)
    } else if (vf === "m") {
        missing = 'vf'
        variables.splice(3, 1)
        return kinematicEquation3(variables, unknown)
    } else if (a === "m") {
        missing = 'a'
        variables.splice(4, 1)
        return kinematicEquation1(variables, unknown)
    }
}

function whichVIsUnknown(variableArray) {
    for(let i=0; i<variableArray.length; i++) {
        if(variableArray[i] === "?") {
            return i
        }
    }
}


