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

function checkStringForNums(string) {
    return /\d/.test(string)
}

function totalDisplacement(...args) {
    let displacements = args[0]
    let angles = args[1]
    let x;
    let y;
    let atAngle;

    console.log(`displacements -> ${displacements}\nangles -> ${angles}`)

    for (let i=0; i<displacements.length; i++) {
        //atAngle = checkStringForNums(angles[i])
        atAngle = true
        console.log(`is it at an angle? -> ${atAngle}`)
        // if(atAngle) {
        //     let angle = angles[i].split(" ")[1]
        //     console.log(`angle number -> ${angle}`)
        //     x += Math.sin(angle)*displacements[i]
        //     y += Math.cos(angle)*displacements[i]
        //     console.log(`total x -> ${x}\ntotal y -> ${y}`)
        // }
    }
}



