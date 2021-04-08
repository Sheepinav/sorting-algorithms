export function bubbleSort(array) {
    let animations = []
    let swaps = 1
    while (swaps > 0) {
        swaps = 0
        animations.push({currIndex: 0, currValue: array[0], type: 'single'})
        for (let i = 1; i < array.length; i++) {
            animations.push({currIndex: i, currValue: array[i], type: 'single'})
            if (array[i] < array[i - 1]) {
                animations.push({currIndex: i, prevIndex: i - 1, currValue: array[i], prevValue: array[i - 1], type: 'swap'})
                let tmp = array[i]
                array[i] = array[i - 1]
                array[i - 1] = tmp
                swaps = swaps + 1
            }
        }
        console.log(swaps)
    }
    return animations
}
