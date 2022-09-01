import { LitElement, html} from 'lit-element'

// if all the sheets are large, why do we have to specify?

const icons: any = {
  "close": { sheet:"large", position: "-84px 0px"},
  "visibility": { sheet:"large", position: "28px 0px" },
  "add": { sheet:"large", position: "0px -24px" },
  "check": { sheet:"large", position: "-54px -24px" },
  "shadow": { sheet:"large", position: "0px -48px" },
  "camera": { sheet:"large", position: "-28px -48px" },
  "settings": { sheet:"large", position: "56px -48px" },
  "undo": { sheet:"large", position: "28px -48px" }, 
  "edit": { sheet:"large", position: "0px -96px" },
  "filter": { sheet: "large", position: "-56px -96px" },
  "menu": { sheet:"large", position: "-56px -120px" },
  "search": { sheet:"large", position: "28px -120px" },
  "refresh": { sheet:"large", position: "-84px 48px" }
};

const sizes: any = {
  "large": "width:28px; height:24px"
} 

export default class DevtoolsIconElement extends LitElement {
  // static get properties() {
  //   return {
      "icon": string;
  //   }
  // }

  render(): any {
    const icon: any = icons[this.icon || "refresh"];
    return html`
<style>
:host {
  display: inline-block;
  flex-shrink: 0;
  ${sizes[icon.sheet]};
  background-color: rgb(145, 145, 145);
  -webkit-mask-position: ${icon.position};
          mask-position: ${icon.position};
  -webkit-mask-image: -webkit-image-set(url(assets/${icon.sheet}Icons.png) 1px, url(assets/${icon.sheet}Icons_2x.png) 2x);
          mask-image: url(assets/${icon.sheet}Icons.png);
}
</style>    
    `;
  }

}

// we have to make sure we have the right assets for this file!
// https://stackoverflow.com/questions/68392499/css-webkit-image-set-syntax-doesnt-work-for-chrome