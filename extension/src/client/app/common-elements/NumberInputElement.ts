import { LitElement, html } from 'lit-element';

const onActivate: any = Symbol('onActivate');

// type InputElements = {
//   min: number;
//   max: number;
// }

      // min: Number 
      // max: Number;
      // step: Number;
      // value: Number;
      // precision: Number;

class NumberInputElement extends LitElement /*<{}, InputElements>*/ {
  // static get properties() {
  //   return {
      min: number; 
      max: number;
      value: any;
      precision: number;
      step: any;
      distance: number;
      onMouseDownValue: number;
      prevPointer: any;
      input: any;
      shadowRoot: any;
  //   }
  // }

  constructor(){
    super();
    this.min = -Infinity;
    this.max= Infinity;
    this.value = 0;
    this.precision = 3;
    this.step = 1;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  firstUpdated(): void {
    this.distance = 0;
    this.onMouseDownValue = 0;
    this.prevPointer = [0, 0];
    this.input = this.shadowRoot.querySelector('input');
    this.setValue(this.value);
    this.onBlur();
  }

  onMouseMove(event): void {
    const currentValue : number = parseFloat(this.value);
    const pointer: any = [event.clientX, event.clientY];
    const delta: number = pointer[0] - this.prevPointer[0] - (pointer[1] - this.prevPointer[1]);
    this.distance += delta;

    if(Math.abs(delta) <=2){
      return;
    }

    let value: any = this.onMouseDownValue;
    const accel: number = event.shiftKey? 10: 1;
    value = Math.round(this.distance / 2) * accel * this.step; // changed from parseInt to Math.round
    value += currentValue;
    value = Math.min(this.max, Math.max(this.min, value));
    if(currentValue !== value){
      this.setValue(value);
    }
    this.prevPointer = [event.clientX, event.clientY]
  }

  onMouseDown(event): void {
    event.preventDefault();
    this.distance = 0;
    this.onMouseDownValue = this.value;
    this.prevPointer = [event.clientX, event.clientY];
    document.addEventListener('mousemove', this.onMouseMove, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseUp(event): void {
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);

    if (Math.abs(this.distance) < 2) {
      this.input.focus();
      this.input.select();
    }
  };

  setValue(value): void {
    if(value === this.value) return;

    if(value !== undefined) {
      if(this.precision === 0) {
        value = parseInt(value);
      } else {
        value = parseFloat(value);
      }

      if(value < this.min){
        value = this.min;
      }
      if(value > this.max){
        value = this.max;
      }

      this.value = value;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: parseFloat(value.toFixed(5)),
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  shouldUpdate(changed): boolean {
    if(changed.has('value') && changed.get('value') !== this.value){
      return true;
    }
    return true;
  }

  onBlur(): any {
    this.setValue(parseFloat(this.input.value));
  }

  onChange(e): any {
    this.setValue(e.target.value);
  };

  onKeyDown(event): any {
    event.stopPropagation();

    // enter
    if(event.keyCode === 13) {
      this.setValue(parseFloat(this.input.value));
      this.input.blur();
      return;
    }

    // up
    if(event.keyCode === 38) {
      this.setValue(parseFloat(this.value) + this.step);
      return;
    }

    // down
    if(event.keyCode === 40) {
      this.setValue(parseFloat(this.value) - this.step);
      return;
    }
  };

  render(): any{
    const displayValue: any = this.value.toFixed(this.precision);
    return html`
<style>
:host {
  display: inline-block;
}

input{
  width: 100%;
}
</style>
<input
  type="text"
  .value=${displayValue}
  @keydown=${this.onKeyDown}
  @change=${this.onChange}
  @mousedown=${this.onMouseDown}
  @focus=${this.onfocus} 
  @blur=${this.onBlur}
/>    
    `;
  }

}

export default NumberInputElement;
