let cursor = document.getElementById('cursor').style
let yScroll = 0;

function updateMouse(event){
    let x = event.clientX
    let y = event.clientY

    cursor.top = `${y+yScroll}px`
    cursor.left = `${x}px`

}
document.addEventListener("mousemove", updateMouse)
document.addEventListener("mouseenter", updateMouse)
document.addEventListener('scroll', function(){
    yScroll = window.scrollY
})



// Supposed to be used for generating solutions but its not working :(
// async function askAI(userMessage) {
//     let answer = await fetch("https://ai.hackclub.com/chat/completions", {
//   method: "POST",
//   body: JSON.stringify({
//     "messages" : [{"role": "user", "content" : userMessage}]
//   }),
//   headers: {
//     "Content-type": "application/json"
//   }
// })

// let json = await answer.json()
// return json.choices[0].message.content

// }

// async function actuallyAskAI(message) {
//    let a = ''
//     await askAI(message).then(answer => {
//         console.log(answer)
//         a = answer
//     })
//     return  a
// }