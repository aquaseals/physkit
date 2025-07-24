const gravity = 9.8

function mechanicalWork(w, f, d, angle) {
    if (w === "?") {
        return `Work is ${f*d*Math.cos(angle)} joules`
    } else if (f === "?") {
        return `Force is ${w/(d*Math.cos(angle))} newtons`
    } else if (d === "?") {
        return `Displacement is ${w/(f*Math.cos(angle))} meters`
    } else if (angle === "?") {
        return `Angle is ${w/(f*d)} degrees`
    }
}

function Ek(m, vi, vf, ek) {
    if (ek === "?") {
        `Kinetic energy is ${((m*vf*vf)/2)-((m*vi*vi)/2)} joules`
    } else if (m === "?") {
        `Mass of object is ${Math.sqrt((ek*2)/((vf*vf)+(vi*vi)))} kg` 
    } else if (vi === "?") {
        `Initial velocity is ${Matj.sqrt(((ek*2)/m)-(vf*vf))} meters per second`
    } else if (vf === "?") {
        `Final velocity is ${Math.sqrt((ek+((m*vi*vi)/2))*(2/m))}`
    }
}

function Eg(m, h, eg) {
    if (eg === "?") {
        `Gravitational potential energy is ${m*gravity*h} joules`
    } else if (m === "?") {
        `Mass of object is ${eg/h/gravity} kg` 
    } else if (h === "?") {
        `Height is ${eg/m/gravity} meters`
    }
}

function totalEnergy(ek, eg, et) {
    if (et === "?") {
        `Total energy is ${eg+ek} joules`
    } else if (eg === "?") {
        `Gravitational potential energy is ${et-ek} joules` 
    } else if (ek === "?") {
        `Kinetic energy is ${et-eg} joules`
    }
}

function efficiency(input, output, e) {
    if (input === "?") {
        `Input energy is ${(e/100)*(1/output)} joules`
    } else if (output === "?") {
        `Output energy is ${(e/100)*input} joules` 
    } else if (e === "?") {
        `Efficiency is ${(output/input)*100}%`
    }
}

function power(joules, time, power) {
    if (joules === "?") {
        `Net work/Change in energy is ${(e/100)*(1/output)} joules`
    } else if (time === "?") {
        `Time is ${power*(1/joules)} seconds` 
    } else if (power === "?") {
        `Power is ${joules/time} watts`
    }
}

function quantityOfHeat(q, m, c, ti, tf){
    let deltaT = tf-ti
    if (q === "?") {
        return `Quantity of heat transferred is ${m*c*deltaT} joules`
    } else if (m === "?") {
        return `Mass of substance is ${q/(c*deltaT)} grams`
    } else if (c === "?") {
        return `Specific heat capacity of substance is ${q/(m*deltaT)} J/(kg•C˚)`
    } else if (ti === "?") {
        return `Inital temperature of substance is ${tf-(q/(m*c))} degrees celsius`
    }
    else if (tf === "?") {
        return `Final temperature of substance is ${(q/(m*c))+ti} degrees celsius`
    }
}

//not done
function qReleaseVsAbsorbed(m1, c1, ti1, tf1, m2, c2, ti2, tf2) {
    let deltaT1 = tf1-ti1
    let deltaT2 = tf2-ti2
    if (q === "?") {
        return `Quantity of heat transferred is ${m*c*deltaT} joules`
    } else if (m === "?") {
        return `Mass of substance is ${q/(c*deltaT)} grams`
    } else if (c === "?") {
        return `Specific heat capacity of substance is ${q/(m*deltaT)} J/(kg•C˚)`
    } else if (ti === "?") {
        return `Inital temperature of substance is ${tf-(q/(m*c))} degrees celsius`
    } else if (tf === "?") {
        return `Final temperature of substance is ${(q/(m*c))+ti} degrees celsius`
    } else if (q === "?") {
        return `Quantity of heat transferred is ${m*c*deltaT} joules`
    } else if (m === "?") {
        return `Mass of substance is ${q/(c*deltaT)} grams`
    } else if (c === "?") {
        return `Specific heat capacity of substance is ${q/(m*deltaT)} J/(kg•C˚)`
    } else if (ti === "?") {
        return `Inital temperature of substance is ${tf-(q/(m*c))} degrees celsius`
    } else if (tf === "?") {
        return `Final temperature of substance is ${(q/(m*c))+ti} degrees celsius`
    }
}
