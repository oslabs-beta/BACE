import { Entity } from "../types";

const utils = {
  /**
   * Find the corresponding target and property given
   * an object and a string including object accessor's
   * (e.g. "."), like "position.x" to return the
   * "position" object as target, and "x" as the key.
   */
   getTargetAndKey: (entity: Entity, property: string) => {
    const path = property.split('.');
    let target = entity;
    let key = path.shift();
    while (path.length) {
      if (key) target = target[key];
      key = path.shift();
    }
    return { target, key };
  },

  // used to hide three js box helper, transform controls and devtools scene from the user?
  hideObjectFromTools: (object: any) => {
    object.userData.fromDevtools = true;
  },

  isHiddenFromTools: (object: any) => {
    return !!(object.userData && object.userData.fromDevtools);
  },

  /**
  * executes fn passed in for the entity and all its dependents
  * dependents != children (unless options.recursive)
  * 
  * @param {Function} fn 
  * @param {Object} options 
  * options.recursive [false] whether or not an object should recursively iterate over Object3D children and their dependencies.
  */
  forEachDependency(entity: Entity, fn: (entity: Entity) => void, options: any = {}) {
    fn(entity);

    // check properties on entity
    if (entity.isObject3D) {
      if (entity.material && entity.material.isMaterial) {
        utils.forEachDependency(entity.material, fn, options);
      }
      if (entity.geometry && (entity.geometry.isGeometry || entity.geometry.isBufferGeometry)) {
        utils.forEachDependency(entity.geometry, fn, options);
      }
      if (entity.isScene && entity.background) {
        utils.forEachDependency(entity.background, fn, options);
      }

      // check children of entity
      if (options.recursive && entity.children && entity.children.length > 0) {
        for (let child of entity.children) {
          utils.forEachDependency(child, fn, options);
        }
      }
    }
    else if (entity.isBufferGeometry) {
      // handle attributes
    }
    else if (entity.isMaterial) {
      for (let key of Object.keys(entity)) {
        // @TODO cache textures used as uniforms here as well
        const texture = entity[key];
        if (texture && texture.isTexture) {
          utils.forEachDependency(texture, fn, options);
        }
      }
      if (entity.uniforms) {
        for (let name of Object.keys(entity.uniforms)) {
          const value = entity.uniforms[name].value;
          if (value && value.isTexture) {
            // What other "dependency" data could a material have?
            // more geometry/buffers?
            utils.forEachDependency(value, fn, options);
          }
        } 
      }
    }
    else if (entity.isTexture) {
      if (entity.image && entity.image.uuid) {
        // maybe don't cache images as an entity
        //Object.prototype.toString.call(this.image) === '[object Object]';
      }
    }
  },

  /**
   * baseType is usually same as type but be sure to check
   */
  getBaseType: (entity: Entity): string => {
    let type =
           // objects
           // check to see what type entity is - of three js types
           entity.isScene ? 'Scene' :
           entity.isGroup ? 'Group' :
           entity.isLOD ? 'LOD' :
           entity.isBone ? 'Bone' :
           entity.isSkeleton ? 'Skeleton' :
           entity.isPoints ? 'Points' :
           entity.isSprite ? 'Sprite' :

           entity.isSkinnedMesh ? 'SkinnedMesh' :
           entity.isInstancedMesh ? 'InstancedMesh' :
           entity.isMesh ? 'Mesh' :

           entity.isLineLoop ? 'LineLoop' :
           entity.isLineSegments ? 'LineSegments' :
           entity.isLine ? 'Line' :

           // lights
           entity.isAmbientLightProbe ? 'AmbientLightProbe' :
           entity.isHemisphereLightProbe ? 'HemisphereLightProbe' :
           entity.isLightProbe ? 'LightProbe' :

           entity.isAmbientLight ? 'AmbientLight' :
           entity.isDirectionalLight ? 'DirectionalLight' :
           entity.isHemisphereLight ? 'HemisphereLight' :
           entity.isPointLight ? 'PointLight' :
           entity.isRectAreaLight ? 'RectAreaLight' :
           entity.isSpotLight ? 'SpotLight' :
           entity.isLight ? 'Light' :

           // cameras
           entity.isArrayCamera ? 'ArrayCamera' :
           entity.isPerspectiveCamera ? 'PerspectiveCamera' :
           entity.isOrthographicCamera ? 'OrthographicCamera' :
           entity.isCubeCamera ? 'CubeCamera' :
           entity.isCamera ? 'Camera' :

           entity.isObject3D ? 'Object3D' :

           // geometries only have `type` property containing
           // a reference to its type if a preset like Sphere or Plane.
           entity.isGeometry ? 'Geometry' :
           //@TODO what is DirectGeometry? entity.isDirectGeometry ? 'DirectGeometry' :
           entity.isInstancedBufferGeometry ? 'InstancedBufferGeometry' :
           entity.isBufferGeometry ? 'BufferGeometry' :
           // buffer attributes
           entity.isInstancedBufferAttribute ? 'InstancedBufferAttribute' :
           entity.isInterleavedBufferAttribute ? 'InterleavedBufferAttribute' :
           entity.isBufferAttribute ? 'BufferAttribute' :

           // materials
           entity.isLineBasicMaterial ? 'LineBasicMaterial' :
           entity.isLineDashedMaterial ? 'LineDashedMaterial' :
           entity.isMeshBasicMaterial ? 'MeshBasicMaterial' :
           entity.isMeshDepthMaterial ? 'MeshDepthMaterial' :
           entity.isMeshDistanceMaterial ? 'MeshDistanceMaterial' :
           entity.isMeshLambertMaterial ? 'MeshLambertMaterial' :
           entity.isMeshMatcapMaterial ? 'MeshMatcapMaterial' :
           entity.isMeshNormalMaterial ? 'MeshNormalMaterial' :
           entity.isMeshToonMaterial ? 'MeshToonMaterial' :
           entity.isMeshPhongMaterial ? 'MeshPhongMaterial' :
           entity.isPointsMaterial ? 'PointsMaterial' :
           entity.isShadowMaterial ? 'ShadowMaterial' :
           entity.isSpriteMaterial ? 'SpriteMaterial' :

           entity.isMeshPhysicalMaterial ? 'MeshPhysicalMaterial' :
           entity.isMeshStandardMaterial ? 'MeshStandardMaterial' :

           entity.isRawShaderMaterial ? 'RawShaderMaterial' :
           entity.isShaderMaterial ? 'ShaderMaterial' :
           entity.isMaterial ? 'Material' :

           // textures 
           entity.isCanvasTexture ? 'CanvasTexture' :
           entity.isCompressedTexture ? 'CompressedTexture' :
           entity.isCubeTexture ? 'CubeTexture' :
           entity.isDataTexture2DArray ? 'DataTexture2DArray' :
           entity.isDataTexture3D ? 'DataTexture3D' :
           entity.isDataTexture ? 'DataTexture' :
           entity.isDepthTexture ? 'DepthTexture' :
           entity.isVideoTexture ? 'VideoTexture' :
           entity.isTexture ? 'Texture' :

           // Not yet supported fully, but tag it accordingly
           entity.isWebGLRenderTarget ? 'WebGLRenderTarget' :

           // renderers
           // `WebGLRenderer` does not have a boolean prop, test for that below.
           entity.isWebGL1Renderer ? 'WebGL1Renderer' :

           // If nothing matches...
           'Unknown';

    // catch unknown type if render function and setPixelRatio function as WebGLRenderer
    if (type === 'Unknown' && typeof entity.render === 'function' && typeof entity.setPixelRatio === 'function') {
      type = 'WebGLRenderer';
    }

    return type;
  },

}

export default utils;