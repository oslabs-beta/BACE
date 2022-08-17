import BaseElement from "./BaseElement";

export default class SelectElement extends BaseElement {
  constructor () {
    super();
    // there are going to be 2 ways to select the element

    // one is by hovering
    this.onHover = this.onHover.bind(this);
    // the other is by clicking
    this.onClick = this.onClick.bind(this);
    // by default, the target is going to be the entire document body
    this.target = document.body;
  }

  onHover = () => {

  }

  onClick = (event) => {
    target = event.target.getAttribute('')
  }

  render() {

  }
}