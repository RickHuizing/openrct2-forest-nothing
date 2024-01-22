let storage = context.getParkStorage()

export function getChance() {
    let chance = storage.get<string>('chance')
    if (chance == undefined) chance = '0.01'
    let parsed = parseFloat(chance)
    if (isNaN(parsed)) parsed = 0.01
    return parsed
}

export function setChance(chance: number) {
    storage.set<string>('chance', chance.toFixed(2))
}

export function updatePerTicks() {
    return 100 //ticks
}

export let chanceNames = [
    'never', 'a little', 'sometimes', 'often', 'very often', 'A LOT'
]
export let chances = [
    0.0, 0.01, 0.02, 0.05, 0.10, 0.33
]

export function setChanceByIndex(index: number) {
    if (index >= 0 && index < chanceNames.length) {
        setChance(chances[Math.round(index)])
    }
}

export function getSelectedIndex() {
    let chance = getChance()
    let index = chances.indexOf(chance)
    if (index == undefined) {
        setChance(chances[1])
        return 1
    }
    return index
}