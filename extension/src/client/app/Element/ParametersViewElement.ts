import { LitElement, html } from 'lit-element'
import { Entity } from '../../types';
import RendererTypes from '../data/renderers';
import ObjectTypes from '../data/objects';
import LightTypes from '../data/lights';
import MaterialTypes from '../data/materials';
import GeometryTypes from '../data/geometry';
import TextureTypes from '../data/textures';
import { getEntityName } from '../utils';

const propByString = function(o: any /* object */, s: string) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}

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
  }
};

function propsToElements(entity: Entity, elements: any, props: any[], entities: Entity[]) {
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
      const subProps: any[] = [];
      propsToElements(entity, elements, subProps, [...prop.props]);
      // inside of elements, push additional props?
      elements.push(html`<accordion-view>
        <div class="accordion-title" slot="content">${prop.name}</div>
        ${subProps}
      </accordion-view>`);
      continue;
    } else {
      const { name, type, prop: propName, enumType, default: def, readonly } = prop;

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
  entity: Entity | undefined;
  uuid: string = '';
  entities: any; // object 

  onRefresh(e: any) {
    this.dispatchEvent(new CustomEvent('command', {
      detail: {
        type: 'refresh',
      },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const entityData = (this.entities && this.entities[this.uuid]) || null;
    const entityTitle = entityData ? getEntityName(entityData) : '';
    const elements: any[] = [];

    if (entityData) {
      // types come from data folder - not yet done
      let definition = RendererTypes[entityData.baseType] ||
                       ObjectTypes[entityData.baseType] ||
                       LightTypes[entityData.baseType] ||
                       MaterialTypes[entityData.baseType] ||
                       GeometryTypes[entityData.baseType] ||
                       TextureTypes[entityData.baseType];
      if (!definition) {
        definition = ObjectTypes.Object3D;
      }

      const commonProps = entityData.type === 'renderer' ? [CommonProps.Type, CommonProps.Name] :
		                                           [CommonProps.Type, CommonProps.UUID, CommonProps.Name];
      propsToElements(entityData, elements, [...commonProps, ...definition.props], this.entities);
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
        <devtools-icon-button icon="refresh" class="${!this.entity ? 'hide' : ''}" @click="${this.onRefresh}">
      </title-bar>
      <div class="properties">
        ${elements} 
      </div>
    `;
  }
}
