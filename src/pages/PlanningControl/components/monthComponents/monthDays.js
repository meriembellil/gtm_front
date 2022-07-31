const curr = new Date()
const currentDays = (curr) => {
    let days = new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate()
    let currDays = []
    let currEl = 1
    while (days >= currEl) {
        currDays.push(new Date(curr.getFullYear(), curr.getMonth(), currEl))
        currEl++
    }
    return currDays
}

const nextDays = (curr) => {
    let days = new Date(curr.getFullYear(), curr.getMonth() + 1, 1).getDay()
    let nextDays = []
    let diff = 7 - days + 1
    let start = 1
    while (start <= diff) {
        nextDays.push(new Date(curr.getFullYear(), curr.getMonth() + 1, start))
        start++
    }
    return nextDays
}

export const allDays = (curr) => {
    let days = new Date(curr.getFullYear(), curr.getMonth(), 0).getDate()
    let pos = new Date(curr.getFullYear(), curr.getMonth(), 0).getDay()
    let lastDays = []
    let diff = days - pos + 1
    while (diff <= days) {
        lastDays.push(new Date(curr.getFullYear(), curr.getMonth() - 1, diff))
        diff++
    }
    return lastDays.concat(currentDays(curr)).concat(nextDays(curr))
}