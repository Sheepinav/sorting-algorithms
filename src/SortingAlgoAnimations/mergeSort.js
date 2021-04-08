export async function mergeSortHelper(array) {
    let arrayWithIndex = []
    await array.map((value, index) => {
        return arrayWithIndex.push({
            index: index, 
            value: value, 
            originalIndex: index})
    })
    console.log(arrayWithIndex)
    return await mergeSort(arrayWithIndex)
}
export function mergeSort(array, animationArray = []) {
    if (array.length <= 1) 
        return [array]
    const middleIndex = Math.floor(array.length / 2)
    const [left,] = mergeSort(array.slice(0, middleIndex), animationArray);
    const [right,] = mergeSort(array.slice(middleIndex), animationArray);
    const sortedArray = [];
    let i = 0,
        j = 0
    while (i < left.length && j < right.length) {
        if (left[i].value < right[j].value) {
            console.log(left[i])
            console.log(right[j])
            animationArray.push({
                leftIndex:left[i].index, 
                rightIndex:right[j].index, 
                leftValue:left[i].value, 
                rightValue:right[j].value, 
                move:'left' })
            // let tmp = right[j].index
            // right[j].index = left[i].index
            // left[i].index = tmp
            // console.log('left ',left[i])
            sortedArray.push(left[i++])
        } else {
            let indexCounter = i
            console.log('right j '+ j)
            animationArray.push({
                leftIndex:left[i].index, 
                rightIndex:right[j].index, 
                leftValue:left[i].value, 
                rightValue:right[j].value, 
                move:'right' })
            console.log(right[j])
            console.log(left[i])
            //swapping two columns does not work 
            // let tmp = right[j].index
            // right[j].index = left[i].index
            // left[i].index = tmp
            // console.log('right ' , right[j])
            sortedArray.push(right[j++])
        }
    }
    //one term left
    while (i < left.length) {
        // animationArray.push({
        //     leftIndex:left[i].index, 
        //     leftValue:left[i].value, 
        //     move:'last-left'})
        // console.log('las left ' , left[i])
        sortedArray.push(left[i++])
    }
    while (j < right.length) {
        // animationArray.push({
        //     rightIndex:right[j].index, 
        //     rightValue:right[j].value, 
        //     move:'last-right'})
        // console.log('last right' , right[j])
        sortedArray.push(right[j++])
    }
    // console.log(sortedArray)
    return [sortedArray, animationArray]
}



// handleMergeSort = async function(){
//     const [sortedArray,animations] = await mergeSortHelper(this.state.array);
//     console.log(sortedArray)
//     const arrayBars = document.getElementsByClassName('array-bar');
//     animations.forEach((obj, index) => {
//         // console.log(obj)
//         setTimeout(() => {
//             if(obj.move === 'last-right'){
//                 const rightBarStyle = arrayBars[obj.rightIndex].style;
//                 rightBarStyle.backgroundColor = 'red';
//                 setTimeout(() => {
//                     rightBarStyle.backgroundColor = '#4169E1';
//                 }, 200);
//             } else if (obj.move === 'last-left'){
//                 const leftBarStyle = arrayBars[obj.leftIndex].style;
//                 leftBarStyle.backgroundColor = 'red';
//                 setTimeout(() => {
//                     leftBarStyle.backgroundColor = '#4169E1';
//                 }, 200);
//             } else{
//                 const leftBarStyle = arrayBars[obj.leftIndex].style;
//                 const rightBarStyle = arrayBars[obj.rightIndex].style;
//                 leftBarStyle.backgroundColor = 'red';
//                 rightBarStyle.backgroundColor = 'red';
//                 if(obj.move === 'right'){
//                     const leftBarNewHeight = obj.rightValue;
//                     const rightBarNewHeight = obj.leftValue;
//                     leftBarStyle.height = `${leftBarNewHeight}px`;
//                     rightBarStyle.height = `${rightBarNewHeight}px`;
//                 }
//                 setTimeout(() => {
//                     leftBarStyle.backgroundColor = '#4169E1';
//                     rightBarStyle.backgroundColor = '#4169E1';
//                 }, 200);
//             }
//         }, index * 250);
//     })
// }