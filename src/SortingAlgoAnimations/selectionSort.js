export function selectionSort(array) {
    const animations = []
    for (let i = 0; i < array.length - 1; i++) {
        animations.push({currIndex: i, type: 'single'})
        let minValue = array[i]
        let minIndex = i
        for (let j = i + 1; j < array.length; j++) {
            animations.push({currIndex: j, type: 'single'})
            if (array[j] < minValue) {
                minValue = array[j]
                minIndex = j
            }
        }
        if(minIndex !== i) {
            animations.push({currIndex: i, newIndex: minIndex, currValue: array[i], newValue: array[minIndex], type: 'swap'})
        } else {
            animations.push({currIndex: i, type: 'no-swap'})
        }
        let tmp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = tmp
    }
    animations.push({currIndex: array.length - 1, type: 'no-swap'})
    console.log(animations)
    return animations
}