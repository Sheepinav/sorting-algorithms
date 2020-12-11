import React, { Component } from 'react';
import {mergeSortHelper} from './SortingAlgoAnimations/mergeSort';
import {mergeSort} from './SortingAlgos/mergeSort';
import {insertionSort} from './SortingAlgoAnimations/insertionSort';
import './SortingVisualization.css';

export class SortingVisualization extends Component {
    state = {
        array : [38,27,43,3,9,82,10],
        arraySize: 7
    }
    //arraySize usually 100,
    componentDidMount(){
        //this.resetArray()
    }

    resetArray = () => {
        //reset array values
        const array = [];
        for(let i =0; i<this.state.arraySize; i++){
            array.push(this.getRandomInt(300));
        }
        this.setState({array: array})
        //reset color of bars
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i=0; i<arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = '#00BFFF';
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    handleInsertionSort = function () {
        this.disableButtons();
        const animations = insertionSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        animations.forEach((obj, index) => {
            //current vs predecessor
            const currBarStyle = arrayBars[obj.curr[0]].style;
            const predBarStyle = arrayBars[obj.pred[0]].style;
            setTimeout(() => {
                currBarStyle.backgroundColor = 'red';
                predBarStyle.backgroundColor = 'red';
                const currBarNewHeight = obj.pred[1];
                currBarStyle.height = `${currBarNewHeight}px`;
                setTimeout(() => {
                    currBarStyle.backgroundColor = '#4169E1';
                    predBarStyle.backgroundColor = '#4169E1';
                }, 17);
                //cannot access the 'this' keyword in Promise but this works too
                //enable buttons after (most) animations play
                if (index + 1 === animations.length){
                    this.enableButtons()
                }
            }, index * 17);
        });
        console.log(animations.length)
    }

    disableButtons = () => {
        //disable buttons while animation plays
        let buttons = document.getElementsByClassName('button');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
    }

    enableButtons = () => {
        //enable buttons after animation plays
        let buttons = document.getElementsByClassName('button');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].disabled = false;
        }
    }

    render() {
        const arrayBars = this.state.array
        return (
            <div className="page-container">
                <h2>Sorting Algorithm Visualizer</h2>
                <p>This is just a fun side project I always wanted to do. More algorithms will be added soon!</p>
                <div className="button-container">
                    <button    
                        className="button"
                        onClick={this.resetArray}>Reset Array</button>
                    <button    
                        className="button"
                        onClick={() => {
                            console.log(this.state.array)
                            const sorted = mergeSort(this.state.array)
                            console.log(sorted)
                            this.handleMergeSort(this.state.array)
                            // mergeSortHelper(this.state.array)
                            // const sortedArray = mergeSortHelper(this.state.array)
                            // console.log(sortedArray)
                        }}>Merge Sort</button>
                    <button    
                        className="button"
                        onClick={() => this.handleInsertionSort()}>insertion Sort</button>
                </div>
                <div className="array-container">
                    {arrayBars.map((value, index) => (
                        <div 
                            className = "array-bar" 
                            key = {index}
                            style={{height: `${value}px`, width: `${80/this.state.arraySize}vw`}}></div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SortingVisualization
