export function insertionSort(array){
    const animations = []
    for(let i = 1; i < array.length; i++){
        const key = array[i];
        let j = i - 1;
        while(j >= 0 && key < array[j]){
            animations.push({curr: [j+1, array[j+1]], pred: [j, array[j]] })
            array[j+1] = array[j]
            j-=1
        }
        animations.push({curr: [j+1, array[j+1]], pred: [i, key] })
        array[j+1] = key
    }
    return animations
}
