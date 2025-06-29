// Kinematics Functions

function total(magnitudes) {
    let total = 0
    for(let i=0; i<magnitudes.length; i++) {
        total += Number(magnitudes[i])
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

function multiplyByN1(num) {
    let result = -1 * num
    if (result === -0) {
        result = 0
    }
    return result
}

function totalDisplacement(...args) {
    let displacements = args[0]
    let angles = args[1]
    let x = 0;
    let y = 0;
    let finalAngle = ''

    if (displacements.length === 1 || angles.length === 1) {
        return [displacements[0], angles[0]]
    }


    for (let i=0; i<displacements.length; i++) {
        if(angles[i].length > 1) {
            let start = angles[i].split(" ")[0].toUpperCase()
            let angle = angles[i].split(" ")[1]
            let end = angles[i].split(" ")[2].toUpperCase()

            console.log(`displacements -> ${displacements}\nangles -> ${angles}`)
            console.log(`angle number -> ${angle}`)

            //switching angle direction around so it starts with N/S
            if(start === "W") {
                start = end
                end = "W"
                angle = 90 - angle 
                console.log(start, angle, end)
            } else if (start === "E") {
                start = end
                end = "E"
                angle = 90 - angle
                console.log(start, angle, end)
            }

            let cos =  Math.cos(degreesToRadians(angle))
            let sin =  Math.sin(degreesToRadians(angle))

            if (start === "N") {
                if (end === "E") {
                    x += sin*displacements[i]
                    y += cos*displacements[i]
                } else if (end === "W") {
                    x -= sin*displacements[i]
                    y += cos*displacements[i]
                }
            } else if (start === "S") {
                if (end === "E") {
                    x += sin*displacements[i]
                    y -= cos*displacements[i]
                } else if (end === "W") {
                    x -= sin*displacements[i]
                    y -= cos*displacements[i]
                }
            }

        } else if(angles[i].length === 1) {
            let angle = angles[i].toUpperCase()
            finalAngle = angle
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
    let resultantDisplacement = Math.sqrt((x*x) + (y*y))
    if (resultantDisplacement === 0 || resultantDisplacement < 0.0001) {
        return [0, 'no displacement']
    }

    let displacementAngle =  radiansToDegrees(Math.atan(y/x))

    console.log(displacementAngle)

    if (y > 0) {
        if (x > 0) {
            finalAngle = `[N ${displacementAngle}˚ E]`
        } else if (x < 0) {
            displacementAngle = Math.abs(displacementAngle)
            finalAngle = `[N ${displacementAngle}˚ W]`
        }

    } else if (y < 0) {
        if (x > 0) {
            displacementAngle = Math.abs(displacementAngle)
            finalAngle = `[S ${displacementAngle}˚ E]`
        } else if (x < 0) {
            finalAngle = `[S ${displacementAngle}˚ W]`
            
        }
    }

    switch (String(displacementAngle)) {
        case "-0": // dont ask how -0 happens i ave no clue
            finalAngle = "W"
            break
        case "90":
            finalAngle = "N"
            break
        case "0":
            finalAngle = "E"
            break
        case "-90":
            finalAngle = "S"
            break
    }

    return [resultantDisplacement, finalAngle]
}

function perTime(magnitude, direction, deltaTime) {
    let averagePerTime = magnitude/deltaTime
    if(direction.length === 0) {
        return averagePerTime
    } else {
        return [averagePerTime, direction]
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

function kinematicEquation1(variables, unknown) { // [d, t, vi, vf]
    let d = variables[0]
    let t = variables[1]
    let vi = variables[2]
    let vf = variables[3]

    switch (unknown) {
        case 'd':
            return `${((vf+vi)/2)*t} units`
        case 't':
            return `${((2*d)/(vf+vi))} unit time`
        case 'vf':
            return `${(2*(d/t))-vi} units per unit time`
        case 'vi':
            return `${(2*(d/t))-vf} units per unit time`
    }

}

function kinematicEquation2(variables, unknown) { // [t, vi, vf, a]
    let t = variables[0]
    let vi = variables[1]
    let vf = variables[2]
    let a = variables[3]

    switch (unknown) {
        case 't':
            return `${(vf-vi)/a} unit time`
        case 'vi':
            return `${vf - (a*t)} units per unit time`
        case 'vf':
            return `${vi + (a*t)} units per unit time`
        case 'a':
            return `${(vf-vi)/t} units per unit time squared`
    }

}

function kinematicEquation3(variables, unknown) { // [d, t, vi, a]
    let d = variables[0]
    let t = variables[1]
    let vi = variables[2]
    let a = variables[3]

    switch (unknown) {
        case 'd':
            return `${(vi*t) + (0.5*a*t*t)} units`
        case 't':
            let x1 = zeros(0.5*a, vi, multiplyByN1(d))[0]
            let x2 = zeros(0.5*a, vi, multiplyByN1(d))[1]
            console.log(0.5*a, vi, multiplyByN1(d))
            if (x1 > 0 && x2 > 0) {
                return [x1, x2]
            } else if (x1 > 0) {
                return `${x1} unit time`
            } else if (x2 > 0) {
                return `${x2} unit time`
            } else if (x1 === 0 && x2 === 0){
                return `0 unit time`
            } else {
                return `no solution`
            }
        case 'a':
            return `${(d-(vi*t))/(0.5*t*t)} units per unit time squared`
        case 'vi':
            return `${(d - (0.5*a*t*t))/t} units per unit time`
    }

}

function kinematicEquation4(variables, unknown) { // [d, vi, vf, a]
    let d = variables[0]
    let vi = variables[1]
    let vf = variables[2]
    let a = variables[3]

    switch (unknown) {
        case 'd':
            return `${((vf*vf)-(vi*vi))/(2*a)} units`
        case 'vf':
            return `${Math.sqrt((vi*vi)+(2*a*d))} units per unit time`
        case 'a':
            return `${((vf*vf)-(vi*vi))/(2*d)} units per unit time squared`
        case 'vi':
            return `${Math.sqrt((vf*vf) - (2*a*d))} units per unit time`
    }

}

function kinematicEquation5(variables, unknown) { // [d, t, vf, a]
    let d = variables[0]
    let t = variables[1]
    let vf = variables[2]
    let a = variables[3]

    switch (unknown) {
        case 'd':
            return `${(vf*t) - (0.5*a*t*t)} units`
        case 'vf':
            return `${(d + (0.5*a*t*t))/t} units per unit time`
        case 'a':
            return `${(d-(vf*t))/(-0.5*t*t)} units per unit time squared`
        case 't':
            let x1 = zeros(0.5*a, multiplyByN1(vf), d)[0]
            let x2 = zeros(0.5*a, multiplyByN1(vf), d)[1]
            if (x1 > 0 && x2 > 0) {
                return [x1, x2]
            } else if (x1 > 0) {
                return `${x1} unit time`
            } else if (x2 > 0) {
                return `${x2} unit time`
            } else if (x1 === 0 && x2 === 0){
                return `0 unit time`
            } else {
                return `no solution`
            }
    }

}

function whichVIsUnknown(variableArray) {
    for(let i=0; i<variableArray.length; i++) {
        if(variableArray[i] === "?") {
            return i
        }
    }
}

function zeros(a, b, c) {

    let d = (b**2) + (-4*a*c)
    if (d < 0) {
        return "no zeros found"
    }

    // calculating x values using quadratic formula
    let x1 = ((multiplyByN1(b)) + Math.sqrt((b**2)-(4*a*c))) / (2*a)
    let x2 = ((multiplyByN1(b)) - Math.sqrt((b**2)-(4*a*c))) / (2*a)

    //let zeros = `(${x1}, 0) (${x2}, 0)`
    
    return [x1, x2]

}

// Kinematics Logic
let numOfMagnitudes = document.getElementById('numOfMagnitudes')
let totalMags = document.getElementById('totalMags')

numOfMagnitudes.addEventListener('input', function addInputs(event){
    while (totalMags.firstChild !== null) {
        totalMags.removeChild(totalMags.lastChild)
    }
    let amtToAdd = Number(event.target.value)
    if (amtToAdd > 0) {
        console.log(amtToAdd)
        for (let i=0; i<amtToAdd; i++) {
        let input = document.createElement('input')
        input.min = "0"
        input.type = "number"
        input.step = ".0001"
        input.placeholder = "another magnitude"
        totalMags.appendChild(input)
        }
    }
})

totalMags.addEventListener("input", function handleTotal(event){
    let inputs = totalMags.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let answer = total(m)
        document.getElementById('totalAnswer').innerHTML = `= ${answer} units`
    }
})

let deltaDiv = document.getElementById('delta')

deltaDiv.addEventListener("input", function handleDelta(event){
    let inputs = deltaDiv.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let answer = delta(m[0], m[1])
        document.getElementById('deltaAnswer').innerHTML = `= ${answer} units`
    }
})

let numOfVectors = document.getElementById('numOfVectors')
let tdInputs = document.getElementById('tdInputs')

numOfVectors.addEventListener('input', function addInputs(event){
    document.getElementById('tdAnswer').innerHTML = ""
    while (tdInputs.firstChild !== null) {
        tdInputs.removeChild(tdInputs.lastChild)
    }
    let amtToAdd = Number(event.target.value)
    if (amtToAdd > 0) {
        console.log(amtToAdd)
        for (let i=0; i<amtToAdd; i++) {
        let input = document.createElement('div')
        input.innerHTML = `<input type="number" min="0" step=".0001" placeholder="magnitude">
                           <input type="text" step="1" id="angle" placeholder="direction"> `
        input.class = 'displacement-input'
        tdInputs.appendChild(input)
        }
    }
})

tdInputs.addEventListener("input", function handleDisplacements(event){
    let inputs = tdInputs.children
    let magnitudes = []
    let directions = []

    for(let i=0; i<inputs.length; i++) {
        let magnitude = inputs[i].querySelector('input[type="number"]')
        let direction = inputs[i].querySelector('input[type="text"]')

        if (magnitude.value === "" || direction.value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            magnitudes.push(parseFloat(magnitude.value))
            directions.push(direction.value)
        }
    }

    if (magnitudes.length === inputs.length && directions.length === inputs.length) {
        let answer = totalDisplacement(magnitudes, directions)
        document.getElementById('tdAnswer').innerHTML = `= ${answer[0]} units ${answer[1]}`
    }
})

let aSpeed = document.getElementById('aSpeed')

aSpeed.addEventListener("input", function handleASpeed(event){
    let inputs = aSpeed.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let answer = perTime(m[0], "", m[1])
        document.getElementById('averageSAnswer').innerHTML = `= ${answer} units per unit time`
    }
})

let aVelocity = document.getElementById('aVelocity')

aVelocity.addEventListener("input", function handleAVelocity(event){
    let inputs = aVelocity.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let answer = perTime(m[0], m[1], m[2])
        document.getElementById('averageVAnswer').innerHTML = `= ${answer[0]} units [${answer[1]}] per unit time`
    }
})

let aAcceleration = document.getElementById('aAcceleration')

aAcceleration.addEventListener("input", function handleAAcceleration(event){
    let inputs = aAcceleration.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let answer = perTime(m[0], m[1], m[2])
        document.getElementById('averageAAnswer').innerHTML = `= ${answer[0]} units [${answer[1]}] per unit time squared`
    }
})

let kinematicEInputs = document.getElementById('kinematicEInputs')

kinematicEInputs.addEventListener("input", function handleKinematicE(event){
    let inputs = kinematicEInputs.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(inputs[i].value)
        }
    }

    if (m.length === inputs.length) {
        let variables = []
        let mCount = 0
        let unknownCount = 0
        for(let i=0; i<m.length; i++) {
            let temp = Number(m[i])
            if (temp <= 0 || temp >= 0) {
                variables.push(temp)
            } else {
                variables.push(m[i])
                if (m[i] === "?") {
                    unknownCount++
                } else {
                    mCount++
                }
            }
        }
        console.log(variables)
        if (mCount === 1 && unknownCount === 1) {
            let answer = kinematicEquation(variables[0], variables[1], variables[2], variables[3], variables[4])
        if (typeof(answer) === 'object') { // checking for t1 and t2 answers
            document.getElementById('kinematicEAnswer').innerHTML = `t1=${answer[0]} unit time t2=${answer[1]} unit time`
            } else if (answer === NaN) {
                document.getElementById('kinematicEAnswer').innerHTML = `no solution`
            } else {
                document.getElementById('kinematicEAnswer').innerHTML = `= ${answer}`
            }
        } else {
            document.getElementById('kinematicEAnswer').innerHTML = `invalid input`
        }
        
    }
})

