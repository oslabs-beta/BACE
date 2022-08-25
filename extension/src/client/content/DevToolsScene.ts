// import * as THREE from 'three';
// import utils from './utils';
// import TransformControls from './TransformControls';

// export default () => {
//   return class DevToolsScene extends THREE.Scene {

//     bbHelper: BoxHelper;
//     target: any;
//     camera: THREE.Camera;
//     domElement: Element;
//     transformControls: TransformControls; // must import from TransformControls.ts
//     selectedObject: any;

//     constructor(target: any, domElement: Element, camera: THREE.Camera) {
//       super();
//       this.name = 'DevToolsScene';
//       this.bbHelper = new BoxHelper();
//       window.bbHelper = this.bbHelper;
//       this.bbHelper.material.depthWrite = false;
//       this.bbHelper.material.depthTest = false;
//       this.bbHelper.visible = false;
//       this.add(this.bbHelper);
  
//       this.target = target;
//       this.camera = camera;
//       this.domElement = domElement;
//       this.transformControls = new TransformControls(camera, domElement);
//       this.transformControls.space = 'local';
//       this.add(this.transformControls);

//       utils.hideObjectFromTools(this);
//       utils.hideObjectFromTools(this.bbHelper);
//       utils.hideObjectFromTools(this.transformControls);

//       this.transformControls.addEventListener('change', (e: any) => {
//         // Fire an event to __THREE_DEVTOOLS__ so that content
//         // can handle lazy rendering, indicating a rerender is necessary.
//         this.target.dispatchEvent(new CustomEvent('visualization-change'));
//       });

//       this.transformControls.addEventListener('dragging-changed', (e: any) => {
//         this.target.dispatchEvent(new CustomEvent('interaction-change', {
//           detail: {
//             active: e.value,
//           },
//         }));
//       });
//     }

//     // determine mode
//     setTransformMode(mode: string | undefined) {
//       if (mode && this.transformControls.mode !== mode) {
//         this.transformControls.mode = mode;
//       }
//     }
    
//     // decide which space 
//     toggleTransformSpace() {
//       const space = this.transformControls.space;
//       this.transformControls.space = space === 'world' ? 'local' : 'world';
//     }

//     // camera
//     setCamera(camera: THREE.Camera) {
//       this.camera = camera;
//       this.transformControls.camera = camera;
//     }

//     selectObject(object: any) {
//       if (this.selectedObject) {
//         this.selectedObject.removeEventListener('removed', this.onSelectedObjectRemove);
//         this.transformControls.detach();
//       }

//       this.selectedObject = object;
//       this.bbHelper.visible = false;

//       if (object && object.isObject3D && !object.isScene) {
//         this.transformControls.attach(object);
//         object.addEventListener('removed', this.onSelectedObjectRemove);
//       }

//       if (object) {
//         const currentBBVersion = this.bbHelper.geometry.attributes.position.version;
//         this.bbHelper.setFromObject(object);
//         // Only way to determine if the object's bounding box is empty
//         // or not without recomputing
//         if (currentBBVersion !== this.bbHelper.geometry.attributes.position.version) {
//           this.bbHelper.visible = true;
//         }
//       }

//       this.target.dispatchEvent(new CustomEvent('visualization-change'));
//     }

//     // throws an error since it is already defined on THREE.Scene -- hopefully THREE.Scene's will work?
//     // onBeforeRender() {
//     //   if (this.bbHelper.visible) {
//     //     this.bbHelper.update();
//     //   }
//     // }

//     onSelectedObjectRemove() {
//       this.selectObject(null);
//     }
//   }
// };