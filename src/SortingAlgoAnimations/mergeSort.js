export function mergeSort(array){
    if (array.length <= 1) return array
    const middleIndex = Math.floor(array.length/2)
    const left= mergeSort(array.slice(0, middleIndex));
    const right = mergeSort(array.slice(middleIndex));
    const sortedArray = [];
    let i = 0, j = 0
    while(i < left.length && j < right.length){
        console.log(left[i] +' ,'+ right[j])
        if(left[i] < right[j]){
            sortedArray.push(left[i++])
            console.log('push left')
        } else {
            sortedArray.push(right[j++])
            console.log('push right')
        }
        console.log(sortedArray)
    }
    //one term left
    while(i < left.length) {
        sortedArray.push(left[i++])
        console.error('push left')
        console.warn(sortedArray)
    }
    while(j < right.length){
        sortedArray.push(right[j++])
        console.error('push right')
        console.warn(sortedArray)
    }
    console.log('return')
    return sortedArray
} 