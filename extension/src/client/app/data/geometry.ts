import { Entity } from '../../types';

const BufferAttributes = (entity: Entity) => {
  // get attributes, if none, return
  const attributes = entity.data && entity.data.attributes;
  if (!attributes) {
    return;
  }

  // map attributes so they have the same three keys
  const attrType = 'array'; // { name, itemSize, type, array, normalized }
  const attrs = Object.keys(attributes).map(key => {
    return {
      name: key,
      type: attrType,
      prop: `data.attributes.${key}`
    }
  });
  return {
    name: 'Attributes',
    type: 'group',
    props: attrs,
  }
}

// boundingBox, boundingSphere
const Geometry = {
  type: 'geometry',
  props: [{
    name: 'Vertices',
    type: 'array',
    prop: 'data.vertices',
  }, {
    name: 'Colors',
    type: 'array',
    prop: 'colors',
  }, {
    name: 'Faces',
    type: 'array',
    prop: 'faces',
  }, {
    name: 'Faces Vertex UVs',
    type: 'array',
    prop: 'faceVertexUvs',
  }, {
    name: 'Morph Targets',
    type: 'array', // { name: ..., vertices: [new Vector3()]}
    prop: 'morphTargets',
  }, {
    name: 'Morph Normals',
    type: 'array', // { name: ..., normals: [new Vector3()]}
    prop: 'morphNormals',
  }, {
    name: 'Skin Weights',
    type: 'array',
    prop: 'skinWeights',
  }, {
    name: 'Skin Indices',
    type: 'array',
    prop: 'skinIndices',
  }, {
    name: 'Line Distances',
    type: 'array',
    prop: 'faceVertexUvs',
  }]
}

// boundingBox, boundingSphere, morphAttributes
const bufferGeometryProps = [{
    name: 'Index',
    type: 'attribute',
    prop: 'data.index',
  }, {
    name: 'Groups',
    type: 'array', // { start, count, materialIndex }
    prop: 'data.groups',
  },
  {
    name: 'Morph Targets Relative',
    type: 'boolean',
    prop: 'data.morphTargetsRelative',
    default: false,
}];

const BufferGeometry = {
  type: 'geometry',
  props: [
    ...bufferGeometryProps
  ],
  BufferAttributes,
}

const InstancedBufferGeometry = {
  type: 'geometry',
  props: [
    ...bufferGeometryProps, {
      name: 'Instance Count',
      type: 'int',
      prop: 'instanceCount',
    }
  ],
  BufferAttributes,
}

// object with all types of geometry
declare global {
  interface GeometryTypesObject {
    [key:string]: any,
  }
}

const GeometryTypes: GeometryTypesObject = {
  BufferGeometry: BufferGeometry,
  Geometry: Geometry,

  InstancedBufferGeometry: InstancedBufferGeometry,

  BoxBufferGeometry: BufferGeometry,
  BoxGeometry: Geometry,
  CircleBufferGeometry: BufferGeometry,
  CircleGeometry: Geometry,
  ConeBufferGeometry: BufferGeometry,
  ConeGeometry: Geometry,
  CylinderBufferGeometry: BufferGeometry,
  CylinderGeometry: Geometry,
  DodecahedronBufferGeometry: BufferGeometry,
  DodecahedronGeometry: Geometry,
  EdgesGeometry: Geometry,
  ExtrudeBufferGeometry: BufferGeometry,
  ExtrudeGeometry: Geometry,
  IcosahedronBufferGeometry: BufferGeometry,
  IcosahedronGeometry: Geometry,
  LatheBufferGeometry: BufferGeometry,
  LatheGeometry: Geometry,
  OctahedronBufferGeometry: BufferGeometry,
  OctahedronGeometry: Geometry,
  ParametricBufferGeometry: BufferGeometry,
  ParametricGeometry: Geometry,
  PlaneBufferGeometry: BufferGeometry,
  PlaneGeometry: Geometry,
  PolyhedronBufferGeometry: BufferGeometry,
  PolyhedronGeometry: Geometry,
  RingBufferGeometry: BufferGeometry,
  RingGeometry: Geometry,
  ShapeBufferGeometry: BufferGeometry,
  ShapeGeometry: Geometry,
  SphereBufferGeometry: BufferGeometry,
  SphereGeometry: Geometry,
  TetrahedronBufferGeometry: BufferGeometry,
  TetrahedronGeometry: Geometry,
  TextBufferGeometry: BufferGeometry,
  TextGeometry: Geometry,
  TorusBufferGeometry: BufferGeometry,
  TorusGeometry: Geometry,
  TorusKnotBufferGeometry: BufferGeometry,
  TorusKnotGeometry: Geometry,
  TubeBufferGeometry: BufferGeometry,
  TubeGeometry: Geometry,
  WireframeGeometry: Geometry,
}

export default GeometryTypes;
