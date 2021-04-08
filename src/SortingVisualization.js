import React, {Component} from 'react';
// import {mergeSort} from './SortingAlgos/mergeSort';
import {insertionSort} from './SortingAlgoAnimations/insertionSort';
import {selectionSort} from './SortingAlgoAnimations/selectionSort';
import {bubbleSort} from './SortingAlgoAnimations/bubbleSort';
import {mergeSortHelper} from './SortingAlgoAnimations/mergeSort';
import './SortingVisualization.css';

export class SortingVisualization extends Component {
    state = {
        array: [
            169, 240, 50, 177, 240
        ],
        arraySize: 25
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray = () => {
        //reset array values
        const array = [];
        for (let i = 0; i < this.state.arraySize; i++) {
            array.push(this.getRandomInt(300));
        }
        this.setState({array: array})
        //reset color of bars
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
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
            setTimeout(() => {
                const currBarStyle = arrayBars[obj.curr[0]].style;
                currBarStyle.backgroundColor = 'red';
                const currBarNewHeight = obj.pred[1];
                currBarStyle.height = `${currBarNewHeight}px`;
                setTimeout(() => {
                    currBarStyle.backgroundColor = '#00BFFF';
                }, 35);
                // cannot access the 'this' keyword in Promise but this works too
                // enable buttons after (most) animations play
                if (index + 1 === animations.length) {
                    this.enableButtons()
                    setTimeout(() => {
                        for (let obj of arrayBars) {
                            obj.style.backgroundColor = '#4169E1'
                        }
                    }, 35)
                }
            }, index * 35);
        });
    }

    handleSelectionSort = function () {
        this.disableButtons();
        const animations = selectionSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        animations.forEach((obj, index) => {
            //current vs predecessor
            setTimeout(() => {
                const currBarStyle = arrayBars[obj.currIndex].style;
                if (obj.type === 'single') {
                    currBarStyle.backgroundColor = 'red';
                    setTimeout(() => {
                        currBarStyle.backgroundColor = '#00BFFF';
                    }, 35)
                } else if (obj.type === 'no-swap') {
                    setTimeout(() => {
                        currBarStyle.backgroundColor = '#4169E1';
                    }, 35)
                } else {
                    const newBarStyle = arrayBars[obj.newIndex].style;
                    currBarStyle.backgroundColor = 'lightgreen';
                    newBarStyle.backgroundColor = 'lightgreen';
                    const currBarNewHeight = obj.newValue;
                    const newBarNewHeight = obj.currValue;
                    currBarStyle.height = `${currBarNewHeight}px`;
                    newBarStyle.height = `${newBarNewHeight}px`;
                    setTimeout(() => {
                        currBarStyle.backgroundColor = '#4169E1';
                        newBarStyle.backgroundColor = '#00BFFF';
                    }, 35)
                }
                if (index === animations.length - 1) {
                    this.enableButtons()
                }
            }, index * 35)
        })
    }

    handleBubbleSort = function () {
        this.disableButtons();
        const animations = bubbleSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        animations.forEach((obj, index) => {
            setTimeout(() => {
                const currBarStyle = arrayBars[obj.currIndex].style;
                if (obj.type === 'single') {
                    currBarStyle.backgroundColor = 'red';
                    setTimeout(() => {
                        currBarStyle.backgroundColor = '#00BFFF';
                    }, 35)
                } else {
                    const prevBarStyle = arrayBars[obj.prevIndex].style;
                    currBarStyle.backgroundColor = 'lightgreen';
                    prevBarStyle.backgroundColor = 'lightgreen';
                    const currBarNewHeight = obj.prevValue;
                    const prevBarNewHeight = obj.currValue;
                    currBarStyle.height = `${currBarNewHeight}px`;
                    prevBarStyle.height = `${prevBarNewHeight}px`;
                    setTimeout(() => {
                        currBarStyle.backgroundColor = '#00BFFF';
                        prevBarStyle.backgroundColor = '#00BFFF';
                    }, 35)
                }
                if (index === animations.length - 1) {
                    this.enableButtons()
                    setTimeout(() => {
                        for (let obj of arrayBars) {
                            obj.style.backgroundColor = '#4169E1'
                        }
                    }, 35)
                }
            }, index * 35)
        })
    }

    disableButtons = () => {
        //disable buttons while animation plays
        let buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }

    enableButtons = () => {
        //enable buttons after animation plays
        let buttons = document.getElementsByClassName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    }

    render() {
        const arrayBars = this.state.array
        return (
            <div className="page-container">
                <h2>Sorting Algorithm Visualizer</h2>
                <p>This is just a fun side project I wanted to do. More algorithms will be added
                    soon!</p>
                <div className="button-container">
                    <button className="button" onClick={this.resetArray}>Reset Array</button>
                    <button className="button" onClick={() => this.handleSelectionSort()}>Selection Sort</button>
                    <button className="button" onClick={() => this.handleInsertionSort()}>Insertion Sort</button>
                    <button className="button" onClick={() => this.handleBubbleSort()}>Bubble Sort</button>
                </div>
                <div className="array-container">
                    {arrayBars.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            style={{
                            height: `${value}px`,
                            width: `${ 80 / this.state.arraySize}vw` }} /> ))}
                </div>
            </div>
        )
    }
}

export default SortingVisualization
