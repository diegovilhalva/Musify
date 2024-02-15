
const addEventOnElems = (elements,eventType,callback) => {
    elements.forEach(element => element.addEventListener(eventType,callback))
}

const msTimeCode = (ms) => {
    const sec = Math.floor((ms % 60000) / 1000)
    const min = Math.floor((ms % 3600000) / 60000)

    const formattedSec = sec.toString().padStart(2, '0')
    const formattedMin = min.toString().padStart(2, '0')

    return `${formattedMin}:${formattedSec}`
}


export {addEventOnElems,msTimeCode}
