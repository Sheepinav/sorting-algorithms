export function insertionSort(array){
    for(let i = 1; i < array.length; i++){
        const temp = array[i];
        let j = i - 1;
        while(j>=0 && temp<array[j]){
            array[j+1] = array[j]
            j-=1
        }
        array[j+1] = temp
    }
    return array
}
