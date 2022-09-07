import { LitElement, html } from '../../../web_modules/lit-element.js';
import RendererTypes from '../data/renderers.js';
import ObjectTypes from '../data/objects.js';
import LightTypes from '../data/lights.js';
import MaterialTypes from '../data/materials.js';
import GeometryTypes from '../data/geometry.js';
import TextureTypes from '../data/textures.js';
import CameraTypes from '../data/cameras.js'
import { getEntityName } from '../utils.js';
import clone from '../../../web_modules/just-clone/index.mjs';

// https://stackoverflow.com/a/6491621
const propByString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const $onRefresh = Symbol('onRefresh');
const $onSave = Symbol('onSave');
const $displayData = Symbol('displayData');

let savedData;
let copyInfo;
let popupWindow = 1;

const CommonProps = {
  Type: {
    name: 'Type',
    type: 'string',
    prop: 'baseType',
  },
  UUID: {
    name: 'UUID',
    type: 'string',
    prop: 'uuid',
  },
  Name: {
    name: 'Name',
    type: 'string',
    prop: 'name',
  },
};

function propsToElements(entity, elements, props, entities, onSave, displayData) {
  for (let prop of props) {
    if (typeof prop === 'function') {
      const result = prop(entity);
      if (result) {
        prop = result;
      } else {
        continue;
      }
    }

    if (prop.type === 'group') {
      const subProps = [];
      propsToElements(entity, subProps, [...prop.props]);
      if (prop.name === 'Transform') {
        elements.push(html`
        <accordion-view>
        <div class="accordion-title" slot="content">${prop.name}</div>
        ${subProps}
        <style>
        #btn{
          background-color: gray;
          color:white
        }
        #btn:hover {
          background-color: black;
          color: white;
        }
        </style>
        <button id='transform-cache' @click='${(e) => onSave(e)}'>Save</button>
        <button id='display-transform-cache' @click='${(e) => displayData(e, subProps, elements)}'>Display Saved Data</button>
      </accordion-view>
      `);
      } else {
        elements.push(html`<accordion-view>
        <div class="accordion-title" slot="content">${prop.name}</div>
        ${subProps}
      </accordion-view>`);
      }
      continue;
    } else if (entity.type === 'Camera' || entity.type === 'ArrayCamera' || entity.type === 'PerspectiveCamera' || entity.type === 'OrthographicCamera'|| entity.type === 'CubeCamera' ) {
      // if entity is a camera, add numerical types and push to elements
      const { name, type, prop: propName, enumType, default: def, readonly } = prop;
      // updates to properties currently render in the tool but not on the dom
      let value = propByString(entity, propName);
      if (value === undefined) {
        value = def;
      }

      // For number/int types
      let min = 'min' in prop ? prop.min : -Infinity;
      let max = 'max' in prop ? prop.max : Infinity;
      let step = 'step' in prop ? prop.step :
                 type === 'int' ? 1 : 0.01;
      let precision = 'precision' in prop ? prop.precision :
                      type === 'int' ? 0 : 3; 

      elements.push(html`
        <key-value uuid=${entity.uuid}
          key-name="${name}"
          .value="${value}"
          type="${type}"
          property="${propName}"
          .enumType="${enumType || ''}"
          .min="${min}"
          .max="${max}"
          .step="${step}"
          .precision="${precision}"
          .readonly="${readonly === true}"
          >
        </key-value>`);
    } 
    else {
      const {
        name, type, prop: propName, enumType, default: def, readonly,
      } = prop;

      let value = propByString(entity, propName);
      if (value === undefined) {
        value = def;
      }

      // For number/int types
      const min = 'min' in prop ? prop.min : -Infinity;
      const max = 'max' in prop ? prop.max : Infinity;
      const step = 'step' in prop ? prop.step
        : type === 'int' ? 1 : 0.01;
      const precision = 'precision' in prop ? prop.precision
        : type === 'int' ? 0 : 3;

      // For object types (geometry, material, texture)
      let associatedData = {};
      if (value && entities && ['geometry', 'material', 'texture'].indexOf(prop.type) !== -1) {
        associatedData = entities[value] || {};
      }

      elements.push(html`
        <key-value uuid=${entity.uuid}
          key-name="${name}"
          .value="${value}"
          type="${type}"
          property="${propName}"
          .enumType="${enumType || ''}"
          .min="${min}"
          .max="${max}"
          .step="${step}"
          .precision="${precision}"
          .readonly="${readonly === true}"
          .data="${associatedData}"
          >
        </key-value>`);
    }
  }
}

export default class ParametersViewElement extends LitElement {
  static get properties() {
    return {
      uuid: { type: String },
      // Object with uuids as keys to entity data. Most objects will
      // only contain the selected entity's data (matching the uuid),
      // however things like Mesh will also contain any associated
      // material or geometry, etc.
      entities: { type: Object },
    };
  }

  [$onRefresh](e) {
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'refresh',
      },
      bubbles: true,
      composed: true,
    }));
  }

  [$onSave] = (e) => {
    e.preventDefault();
    savedData = (this.entities && this.entities[this.uuid]) || null;
    copyInfo = clone(savedData);
    console.log('Transform data has been saved!');
  };

  [$displayData] = (e, subProps, elements) => {
    e.preventDefault();
    const copy2 = clone(copyInfo);
 
    const savedPosition = [copy2['position.x'], copy2['position.y'], copy2['position.z']];
    const savedRotation = [copy2['rotation.x'], copy2['rotation.y'], copy2['rotation.z'], 'XYZ'];
    const savedScale = [copy2['scale.x'], copy2['scale.y'], copy2['scale.z']];
    // this is to handle edge cases
    if (savedPosition[0] === undefined) {
      savedPosition[0] = copy2.position[0];
    }
    if (savedPosition[1] === undefined) {
      savedPosition[1] = copy2.position[1];
    }
    if (savedPosition[2] === undefined) {
      savedPosition[2] = copy2.position[2];
    }
    if (savedRotation[0] === undefined) {
      savedRotation[0] = copy2.rotation[0];
    }
    if (savedRotation[1] === undefined) {
      savedRotation[1] = copy2.rotation[1];
    }
    if (savedRotation[2] === undefined) {
      savedRotation[2] = copy2.rotation[2];
    }
    if (savedScale[0] === undefined) {
      savedScale[0] = copy2.scale[0];
    }
    if (savedScale[1] === undefined) {
      savedScale[1] = copy2.scale[1];
    }
    if (savedScale[2] === undefined) {
      savedScale[2] = copy2.scale[2];
    }
    console.log('this is savedPosition', savedPosition);
    console.log('this is savedRotation', savedRotation);
    console.log('this is savedScale', savedScale);

    // keeping elements to see if there is a way to reload elements when button is clicked
    // elements[3].values[2][0].values[2] = savedPosition;
    // elements[3].values[2][1].values[2] = savedRotation;
    // elements[3].values[2][2].values[2] = savedScale;

    let popup = window.open('about:blank', `Saved Transform ${popupWindow}`, 'location=no,width=300,height=300')

    popup.document.title = `Saved Transform Features ${popupWindow}`;
    popupWindow++;
    // create new div elements
    const savedPosDiv = popup.document.createElement("div");
    const savedRotationDiv = popup.document.createElement("div");
    const savedScaleDiv = popup.document.createElement("div");

    // and give them some content
    const savedPosContent = popup.document.createTextNode(`Saved Position: ${savedPosition}`);
    const savedRotationContent = popup.document.createTextNode(`Saved Rotation: ${savedRotation}`);
    const savedScaleContent = popup.document.createTextNode(`Saved Scale: ${savedScale}`);

    // add the text nodes to the newly created divs
    savedPosDiv.appendChild(savedPosContent);
    savedRotationDiv.appendChild(savedRotationContent);
    savedScaleDiv.appendChild(savedScaleContent);

    popup.document.body.appendChild(savedPosDiv);
    popup.document.body.appendChild(savedRotationDiv);
    popup.document.body.appendChild(savedScaleDiv);
  };

 
  render() {
    const entityData = (this.entities && this.entities[this.uuid]) || null;
    const entityTitle = entityData ? getEntityName(entityData) : '';
    const elements = [];

    if (entityData) {
      const commonProps = entityData.type === 'renderer' ? [CommonProps.Type, CommonProps.Name] :
		                                           [CommonProps.Type, CommonProps.UUID, CommonProps.Name];

        let definition = CameraTypes[entityData.baseType] ||
                       RendererTypes[entityData.baseType] ||
                       ObjectTypes[entityData.baseType] ||
                       LightTypes[entityData.baseType] ||
                       MaterialTypes[entityData.baseType] ||
                       GeometryTypes[entityData.baseType] ||
                       TextureTypes[entityData.baseType]
                       ;
        if (!definition) {
          definition = ObjectTypes.Object3D;
        }

      propsToElements(entityData, elements, [...commonProps, ...definition.props], this.entities, this[$onSave], this[$displayData]);
      // if entity is a camera, send event to call TransformControls to run camera.updateMatrixWorld
      if (entityData.type === 'Camera' || entityData.type === 'ArrayCamera' || entityData.type === 'PerspectiveCamera' || entityData.type === 'OrthographicCamera'|| entityData.type === 'CubeCamera' ) {
        this.dispatchEvent(new CustomEvent('camera-update', {
          detail: {entity: entityData},
          bubbles: true,
          composed: true
        }))
      }
    }
    

    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .properties {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .hide {
    display: none;
  }

  accordion-view {
    border-top: 1px solid var(--title-border-color);
  }

  accordion-view ~ accordion-view {
    border-top: 0px;
  }

  accordion-view[open] {
    border-bottom: 1px solid var(--title-border-color);
  }

  .accordion-title {
    line-height: 15px;
    white-space: nowrap;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 2px 0.2em;
  }

</style>
<title-bar title="${entityTitle}">
  <devtools-icon-button icon="refresh" class="${!this.entity ? 'hide' : ''}" @click="${this[$onRefresh]}">
</title-bar>
<div class="properties">
  ${elements} 
</div>
`;
  }
}
