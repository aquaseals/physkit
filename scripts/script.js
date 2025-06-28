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
    let missing = ''
    if (typeOf(d) === 'String') {
        missing = 'd'
    } else if (typeOf(t) === 'String') {
        missing = 't'
    } else if (typeOf(vi) === 'String') {
        missing = 'vi'
    } else if (typeOf(vf) === 'String') {
        missing = 'vf'
    } else if (typeOf(a) === 'String') {
        missing = 'a'
    }

    switch (missing) {
        case 'd':
            break
        case 't':
            break
        case 'vi':
            break
        case 'vf':
            break
        case 'a':
            break
    }

}



