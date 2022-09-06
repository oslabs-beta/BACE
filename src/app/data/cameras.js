// function copyCameraProperties(object, data){
//   // handle camera properties
//   if(object.fov !== undefined )	data.fov	= object.fov
//   if(object.near !== undefined )	data.near	= object.near
//   if(object.far !== undefined )	data.far	= object.far

//   // OrthographicCamera
//   if(object.left !== undefined )	data.left	= object.left
//   if(object.right !== undefined )	data.right	= object.right
//   if(object.top !== undefined )	data.top	= object.top
//   if(object.bottom !== undefined)	data.bottom	= object.bottom
// }

const Camera = {
  // these props might need to be adjusted
  type: 'Camera',
  props: [{
    name: 'Matrix World Inverse',
    prop: 'matrixWorldInverse',
    type: 'mat4'
  }, {
    name: 'Projection Matrix',
    prop: 'projectionMatrix',
    type: 'mat4'
  }, {
    name: 'Projection Matrix Inverse',
    prop: 'projectionMatrixInverse',
    type: 'mat4'
  }]
}

const OrthographicCamera = {
  type: 'OrthographicCamera',
  props: [{
    name: 'zoom',
    prop: 'zoom',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }, {
    name: 'view',
    prop: 'view',
    type: 'object',
  }, {
    name: 'left',
    prop: 'left',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: -1
  }, {
    name: 'right',
    prop: 'right',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }, {
    name: 'top',
    prop: 'top',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }, {
    name: 'bottom',
    prop: 'bottom',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: -1
  }, {
    name: 'near',
    prop: 'near',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 0.1
  }, {
    name: 'far',
    prop: 'far',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 2000
  }]
}

const ArrayCamera = {
  type: 'ArrayCamera',
  props: [{
    name: 'cameras',
    prop: 'cameras',
    type: 'array',
  }]
}

const CubeCamera = {
  type: 'CubeCamera',
  props: [{
    name: 'Render Target',
    prop: 'renderTarget',
    type: 'WebGLCubeRenderTarget'
  }]
}

const PerspectiveCamera = {
  type: 'PerspectiveCamera', 
  props: [{
    name: 'Aspect',
    prop: 'aspect',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }, {
    name: 'Far',
    prop: 'far',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 2000
  }, {
    name: 'Film Gauge',
    prop: 'filmGauge',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 35
  }, {
    name: 'Film Offset',
    prop: 'filmOffset',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 0
  }, {
    name: 'Focus',
    prop: 'focus',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 10
  }, {
    name: 'Fov',
    prop: 'fov',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 50
  }, {
    name: 'Near',
    prop: 'near',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 0.1
  }, {
    name: 'View',
    prop: 'view',
    type: 'object',
  }, {
    name: 'Zoom',
    prop: 'zoom',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }]
}

const StereoCamera = {
  type: 'StereoCamera',
  props: [{
    name: 'Aspect',
    prop: 'aspect',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 1
  }, {
    name: 'Eye Sep',
    prop: 'eyeSep',
    type: 'number',
    step: 0.01,
    precision: 3,
    default: 0.064
  }, {
    name: 'CameraL',
    prop: 'cameraL',
    type: 'PerspectiveCamera',
  }, {
    name: 'CameraR',
    prop: 'cameraR',
    type: 'PerspectiveCamera',
  }]
}

export default {
  Camera,
  OrthographicCamera,
  ArrayCamera,
  CubeCamera,
  PerspectiveCamera,
  StereoCamera
}