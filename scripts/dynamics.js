function fma(f, m, a) {
    if (f === "") {
        return `Force is ${m*a} newtons`
    } else if (m === "") {
        return `Mass is ${f/a} kg`
    } else if (a === "") {
        return `Acceleration is ${f/m} meters per second squared`
    }
}

function universalGravitation(fg, m1, m2, d) {
    const gravitationalConstant = 6.67430 * (10**-11) // (N • m^2)/kg^2
    let answer;
    if (fg === "") {
        answer = (gravitationalConstant*m1*m2)/(d**2)
        return `Force is ${answer} newtons`
    } else if (m1 === "") {
        answer = (fg*(d**2))/(m2*graviationalConstant)
        return `First mass is ${answer} kg`
    } else if (m2 === "") {
        answer = (fg*(d**2))/(m1*graviationalConstant)
        return `Second mass is ${answer} kg`
    } else if (d === "") {
        answer = Math.sqrt((graviationalConstant*m1*m2)/(fg))
        return `Distance between the center of the two masses is ${answer} m`
    }
}

function frictionCoefficient(mu, fn, ff) {
    if (ff === "") {
        return `Friction force is ${mu*fn} newtons`
    } else if (fn === "") {
        return `Normal force is ${ff/mu} newtons`
    } else if (mu === "") {
        return `Coefficient of kinetic friction is ${ff/fn}`
    }

}

function fmg (m, fn) {
    const gravity = 9.8
    if (m === "") {
        return `Mass is ${fn/gravity} kg`
    } else if (fn === "") {
        return `Normal force is ${m*gravity} newtons`
    }
}