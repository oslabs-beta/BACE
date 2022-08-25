const Filters = {
  name: 'Filters',
  type: 'group',
  props: [{
    name: 'Min Filter',
    prop: 'minFilter',
    type: 'enum',
  }, {
    name: 'Mag Filter',
    prop: 'magFilter',
    type: 'enum',
  }]
};

const Wrapping = () => ({
  name: 'Wrapping',
  type: 'group',
  // wrapR is currently used with DataTexture3D but not serialized,
  // let's not display it for now.
  props: [{
    name: 'Wrap S',
    prop: 'wrap[0]',
    type: 'enum',
    enumType: 'wrapping',
  }, {
    name: 'Wrap T',
    prop: 'wrap[1]',
    type: 'enum',
    enumType: 'wrapping',
  }]
});

const Transform = {
  name: 'Transform',
  type: 'group',
  props: [{
    name: 'Offset',
    prop: 'offset',
    type: 'vec2',
  }, {
    name: 'Repeat',
    prop: 'repeat',
    type: 'vec2',
  }, {
    name: 'Rotation',
    prop: 'rotation',
    type: 'radians',
  }, {
    name: 'Center',
    prop: 'center',
    type: 'vec2',
  }, {
    name: 'matrixAutoUpdate',
    prop: 'matrixAutoUpdate',
    type: 'boolean',
    default: true,
  }, {
    name: 'Matrix',
    prop: 'matrix',
    type: 'mat3',
  }]
};

const Texture = {
  type: 'texture',
  props: [{
    name: 'Mapping',
    prop: 'mapping',
    type: 'enum',
  }, {
    name: 'Encoding',
    prop: 'encoding',
    type: 'enum',
  }, {
    name: 'Format',
    prop: 'format',
    type: 'enum',
  }, {
    name: 'Byte Type',
    prop: 'type',
    type: 'enum',
  }, {
    name: 'Anisotropy',
    prop: 'anisotropy',
    type: 'number',
    min: 0,
  }, {
    name: 'Flip Y',
    prop: 'flipY',
    type: 'boolean',
    default: true,
  }, {
    name: 'Generate Mipmaps',
    prop: 'generateMipmaps',
    type: 'boolean',
    default: true,
  }, {
    name: 'Premultiply Alpha',
    prop: 'premultiplyAlpha',
    type: 'boolean',
    default: false,
  },
  Filters,
  Wrapping,
  Transform,
  ]
}

// object with all types of textures
interface TexturesTypesObject {
  [key:string]: any,
}

const TextureTypes: TexturesTypesObject = {
  Texture: Texture,
  CanvasTexture: Texture,
  CompressedTexture: Texture,
  CubeTexture: Texture,
  DataTexture: Texture,
  DataTexture2DArray: Texture,
  DataTexture3D: Texture,
  DepthTexture: Texture,
  VideoTexture: Texture,
};

export default TextureTypes;