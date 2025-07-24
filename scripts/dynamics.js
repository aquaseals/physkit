function fma(f, m, a) {
    if (f === "?") {
        return `Force is ${m*a} newtons`
    } else if (m === "?") {
        return `Mass is ${f/a} kg`
    } else if (a === "?") {
        return `Acceleration is ${f/m} meters per second squared`
    }
}

function universalGravitation(fg, m1, m2, d) {
    const gravitationalConstant = 6.67430 * (10**-11) // (N • m^2)/kg^2
    let answer;
    if (fg === "?") {
        answer = (gravitationalConstant*m1*m2)/(d**2)
        return `Force is ${answer} newtons`
    } else if (m1 === "?") {
        answer = (fg*(d**2))/(m2*gravitationalConstant)
        return `First mass is ${answer} kg`
    } else if (m2 === "?") {
        answer = (fg*(d**2))/(m1*gravitationalConstant)
        return `Second mass is ${answer} kg`
    } else if (d === "?") {
        answer = Math.sqrt((gravitationalConstant*m1*m2)/(fg))
        return `Distance between the center of the two masses is ${answer} m`
    }
}

function frictionCoefficient(ff, fn, mu) {
    if (ff === "?") {
        return `Friction force is ${mu*fn} newtons`
    } else if (fn === "?") {
        return `Normal force is ${ff/mu} newtons`
    } else if (mu === "?") {
        return `Coefficient of kinetic friction is ${ff/fn}`
    }

}

function fmg (fn, m) {
    const gravity = 9.8
    if (m === "?") {
        return `Mass is ${fn/gravity} kg`
    } else if (fn === "?") {
        return `Normal force is ${m*gravity} newtons`
    }
}

let newtonInputs = document.getElementById('newtonInputs')

newtonInputs.addEventListener("input", function handleNewton(event){
    let inputs = newtonInputs.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(Number(inputs[i].value))
        }
    }

    if (m.length === inputs.length) {
        let answer = fma(m[0], m[1], m[2])
        document.getElementById('newtonAnswer').innerHTML = answer
    }
})

let gravitationInputs = document.getElementById('gravitationInputs')

gravitationInputs.addEventListener("input", function handleGravity(event){
    let inputs = gravitationInputs.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(Number(inputs[i].value))
        }
    }

    if (m.length === inputs.length) {
        console.log(m)
        let answer = universalGravitation(m[0], m[1], m[2], m[3])
        document.getElementById('gravitationAnswer').innerHTML = answer
    }
})

let frictionInputs = document.getElementById('frictionInputs')

frictionInputs.addEventListener("input", function handleFriction(event){
    let inputs = frictionInputs.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(Number(inputs[i].value))
        }
    }

    if (m.length === inputs.length) {
        let answer = frictionCoefficient(m[0], m[1], m[2])
        document.getElementById('muAnswer').innerHTML = answer
    }
})

let normalInputs = document.getElementById('normalInputs')

normalInputs.addEventListener("input", function handleNormal(event){
    let inputs = normalInputs.children
    let m = []
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i].value === "") {
            console.log(`an input is empty, must be filled to calculate`)
        } else {
            m.push(Number(inputs[i].value))
        }
    }

    if (m.length === inputs.length) {
        let answer = fmg(m[0], m[1])
        document.getElementById('normalAnswer').innerHTML = answer
    }
})