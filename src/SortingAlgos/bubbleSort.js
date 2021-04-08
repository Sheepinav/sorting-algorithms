export function bubbleSort(array) {
    let swaps = 1
    while (swaps > 0) {
        swaps = 0
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                let tmp = array[i]
                array[i] = array[i + 1]
                array[i + 1] = tmp
                swaps = swaps + 1
            }
        }
        console.log(swaps)
    }
    return array
}
