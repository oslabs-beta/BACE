import THREE from 'three'

declare global {
  type obj = {
    [key:string]:any
  }
}

export type Entity = {
  uuid: string, 
  [key:string]:any
}

declare global {
  interface Window {
    bbHelper: THREE.BoxHelper;
    ctor: any;
    t: Entity | null;
  }
}

declare global {
  export class BoxHelper extends LineSegments {
    /**
     * @param object
     * @param [color=0xffff00]
     */
    constructor(object?: THREE.Object3D, color?: THREE.ColorRepresentation);

    /**
     * @default 'BoxHelper'
     */
    type: string;

    update(object?: THREE.Object3D): void;

    setFromObject(object: THREE.Object3D): this;
  }
}

declare global {
  export class LineSegments<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends THREE.Material = THREE.Material,
  > extends Line<TGeometry, TMaterial> {
      constructor(geometry?: TGeometry, material?: TMaterial);

      /**
       * @default 'LineSegments'
       */
      type: 'LineSegments' | string;
      readonly isLineSegments: true;
  }
}

declare global {

  export class Line<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends THREE.Material = THREE.Material,
    // TMaterial extends Material | Material[] = Material | Material[],
    > extends THREE.Object3D {
    constructor(geometry?: TGeometry, material?: TMaterial);

    geometry: TGeometry;
    material: TMaterial;

    type: 'Line' | 'LineLoop' | 'LineSegments' | string;
    readonly isLine: true;

    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;

    computeLineDistances(): this;
    raycast(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void;
    updateMorphTargets(): void;
  }
}

declare global {
  interface Element {
    assignedElements(): any;
  }
}

declare global {
  export class BufferGeometry extends THREE.EventDispatcher {
    /**
     * This creates a new BufferGeometry. It also sets several properties to an default value.
     */
    constructor();

    /**
     * Unique number of this buffergeometry instance
     */
    id: number;
    uuid: string;

    /**
     * @default ''
     */
    name: string;

    /**
     * @default 'BufferGeometry'
     */
    type: string;

    /**
     * @default null
     */
    index: THREE.BufferAttribute | null;

    /**
     * @default {}
     */
    attributes: {
        [name: string]: THREE.BufferAttribute;
    };

    /**
     * @default {}
     */
    morphAttributes: {
        [name: string]: Array<THREE.BufferAttribute>;
    };

    /**
     * @default false
     */
    morphTargetsRelative: boolean;

    /**
     * @default []
     */
    groups: Array<{ start: number; count: number; materialIndex?: number | undefined }>;

    /**
     * @default null
     */
    boundingBox: THREE.Box3 | null;

    /**
     * @default null
     */
    boundingSphere: THREE.Sphere | null;

    // @default { start: 0, count: Infinity }
    drawRange: { start: number; count: number };

    /**
     * @default {}
     */
    userData: { [key: string]: any };
    readonly isBufferGeometry: true;

    getIndex(): THREE.BufferAttribute | null;
    setIndex(index: THREE.BufferAttribute | number[] | null): BufferGeometry;

    setAttribute(
        name: THREE.BuiltinShaderAttributeName | (string & {}),
        attribute: THREE.BufferAttribute,
    ): BufferGeometry;
    getAttribute(name: THREE.BuiltinShaderAttributeName | (string & {})): THREE.BufferAttribute;
    deleteAttribute(name: THREE.BuiltinShaderAttributeName | (string & {})): BufferGeometry;
    hasAttribute(name: THREE.BuiltinShaderAttributeName | (string & {})): boolean;

    addGroup(start: number, count: number, materialIndex?: number): void;
    clearGroups(): void;

    setDrawRange(start: number, count: number): void;

    /**
     * Bakes matrix transform directly into vertex coordinates.
     */
    applyMatrix4(matrix: THREE.Matrix4): BufferGeometry;
    applyQuaternion(q: THREE.Quaternion): BufferGeometry;

    rotateX(angle: number): BufferGeometry;
    rotateY(angle: number): BufferGeometry;
    rotateZ(angle: number): BufferGeometry;
    translate(x: number, y: number, z: number): BufferGeometry;
    scale(x: number, y: number, z: number): BufferGeometry;
    lookAt(v: THREE.Vector3): void;

    center(): BufferGeometry;

    setFromPoints(points: THREE.Vector3[] | THREE.Vector2[]): BufferGeometry;

    /**
     * Computes bounding box of the geometry, updating Geometry.boundingBox attribute.
     * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are null.
     */
    computeBoundingBox(): void;

    /**
     * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
     * Bounding spheres aren't' computed by default. They need to be explicitly computed, otherwise they are null.
     */
    computeBoundingSphere(): void;

    /**
     * Computes and adds tangent attribute to this geometry.
     */
    computeTangents(): void;

    /**
     * Computes vertex normals by averaging face normals.
     */
    computeVertexNormals(): void;

    merge(geometry: BufferGeometry, offset?: number): BufferGeometry;
    normalizeNormals(): void;

    toNonIndexed(): BufferGeometry;

    toJSON(): any;
    clone(): BufferGeometry;
    copy(source: BufferGeometry): this;

    /**
     * Disposes the object from memory.
     * You need to call this when you want the bufferGeometry removed while the application is running.
     */
    dispose(): void;

    /**
     * @deprecated Use {@link BufferGeometry#groups .groups} instead.
     */
    drawcalls: any;

    /**
     * @deprecated Use {@link BufferGeometry#groups .groups} instead.
     */
    offsets: any;

    /**
     * @deprecated Use {@link BufferGeometry#setIndex .setIndex()} instead.
     */
    addIndex(index: any): void;

    /**
     * @deprecated Use {@link BufferGeometry#addGroup .addGroup()} instead.
     */
    addDrawCall(start: any, count: any, indexOffset?: any): void;

    /**
     * @deprecated Use {@link BufferGeometry#clearGroups .clearGroups()} instead.
     */
    clearDrawCalls(): void;

    /**
     * @deprecated Use {@link BufferGeometry#setAttribute .setAttribute()} instead.
     */
    addAttribute(name: string, attribute: THREE.BufferAttribute): BufferGeometry;
    addAttribute(name: any, array: any, itemSize: any): any;

    /**
     * @deprecated Use {@link BufferGeometry#deleteAttribute .deleteAttribute()} instead.
     */
    removeAttribute(name: string): BufferGeometry;
  }
}

// for ResourcesViewElement.ts
declare global {
  interface HTMLElement {
    open: boolean,
  }
}

// for TransformControls.ts:
// declare global {
//   interface THREE {
//     // addAttribute(TransformControls: any): any;
//     TransformControls: any; // (THREE.Camera, any) => any
//   }
// }



// export type THREEwithTransformControls <T> = Partial<T> & {TransformControls: any}

// for TransformControls.ts: -- for gizmo
declare global {
  export interface LineBasicMaterialParameters extends THREE.MaterialParameters {
    color?: THREE.ColorRepresentation | undefined;
    linewidth?: number | undefined;
    linecap?: string | undefined;
    linejoin?: string | undefined;
    fog?: boolean;
  }

  export class LineBasicMaterial extends THREE.Material {
    constructor(parameters?: LineBasicMaterialParameters);

    /**
     * @default 'LineBasicMaterial'
     */
    type: string;

    /**
     * @default 0xffffff
     */
    color: THREE.Color;

    /**
     * @default 1
     */
    linewidth: number;

    /**
     * @default 'round'
     */
    linecap: string;

    /**
     * @default 'round'
     */
    linejoin: string;

    fog: boolean;

    setValues(parameters: LineBasicMaterialParameters): void;
  }
}
  
