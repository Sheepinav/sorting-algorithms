export function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minValue = array[i]
        let minIndex = 0
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < minValue) {
                minValue = array[j]
                minIndex = j
            }
        }
        let tmp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = tmp
    }
    return array
}