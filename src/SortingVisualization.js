import React, { Component } from 'react';
import {mergeSort} from './SortingAlgoAnimations/mergeSort';
import {insertionSort} from './SortingAlgoAnimations/insertionSort';
import './SortingVisualization.css';

export class SortingVisualization extends Component {
    state = {
        array : [],
        arraySize: 100
    }

    componentDidMount(){
        this.resetArray()
    }

    resetArray = () => {
        const array = [];
        for(let i =0; i<this.state.arraySize; i++){
            array.push(this.getRandomInt(300));
        }
        this.setState({array: array})
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
            const currBarIndex = obj.curr[0];
            const predBarIndex = obj.pred[0];
            const currBarStyle = arrayBars[currBarIndex].style;
            const predBarStyle = arrayBars[predBarIndex].style;
            setTimeout(() => {
                currBarStyle.backgroundColor = 'red';
                predBarStyle.backgroundColor = 'red';
                const currBarNewHeight = obj.pred[1];
                currBarStyle.height = `${currBarNewHeight}px`;
                setTimeout(() => {
                    currBarStyle.backgroundColor = '#4169E1';
                    predBarStyle.backgroundColor = '#4169E1';
                }, 18);
                //cannot access the 'this' keyword in Promise but this works too
                //enable buttons after (most) animations play
                if (index + 1 === animations.length){
                    this.enableButtons()
                }
            }, index * 18);
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
                    {/* <button    
                        className="button"
                        onClick={() => {
                            console.log(this.state.array)
                            const sortedArray = mergeSort(this.state.array)
                            console.log(sortedArray)
                        }}>Merge Sort</button> */}
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
