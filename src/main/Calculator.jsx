import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: 0,
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      switch (currentOperation) {
        case "+":
          values[0] = values[0] + values[1];
          break;
        case "-":
          values[0] = values[0] - values[1];
          break;
        case "*":
          values[0] = values[0] * values[1];
          break;
        case "/":
          values[0] = values[0] / values[1];
          break;
        default:
          break;
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.toString().includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === 0 ||
      this.state.clearDisplay ||
      this.state.displayValue === "0";

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const displayValue =
      currentValue === "0" && n !== "." ? n : currentValue + n;

    this.setState({
      displayValue: displayValue,
      clearDisplay: false,
    });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  /*   addDigit(n) {
    if (n === "." && this.state.displayValue.toString().includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === 0 ||
      this.state.clearDisplay ||
      this.state.displayValue === "0";

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const displayValue = currentValue + n;

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }

    this.setState({ displayValue, clearDisplay: false });
  } */

  render() {
    const addDigit = (n) => this.addDigit(n);
    const setOperation = (operation) => this.setOperation(operation);
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
