import React, { FC, useState, Component } from 'react';
import * as THREE from 'three';


export default(() => {
  return class ThreeDevTools {
      USE_RENDER_OVERLAY: any;
      target: any;
      scenes: Set<any>;
      renderers: Set<any>;
      entityCache: any; 
      entitiesRecentlyObserved: Set<any>;
      devtoolsScene: any;
      selected: any;

    constructor(target: any){
      this.USE_RENDER_OVERLAY = false;
      this.target = target;
      this.scenes = new Set();
      this.renderers = new Set();

      this.entityCache = new EntityCache();
      this.entitiesRecentlyObserved = new Set();

      this.devtoolsScene = null;

      this.selected = window.$t = null;

      this.target.addEventListener('observe', (e: any): any => this.observe(e.detail));
      this.target.addEventListener('register', (e: any): any => this.register(e.detail && e.detail.revision));
      this.target.addEventListener('select', (e: any): any => this.select(e.detail && e.detail.uuid));
      this.target.addEventListener('entity-update', (e: any): any => this.update(e.detail));
      window.ctor = this.target.constructor;

      this.target.addEventListener('_request-rendering-info', (e: any): any => this.requestRenderingInfo(e.detail && e.detail.uuid));
      this.target.addEventListener('_request-entity', (e: any): any => this.requestEntity(e.detail && e.detail.uuid));
      this.target.addEventListener('_request-overview', (e: any): any => this.requestOverview(e.detail && e.detail.type));
      this.target.addEventListener('_request-scene-graph', (e: any): any => this.requestSceneGraph(e.detail && e.detail.uuid));
      this.target.addEventListener('_transform-controls-update', (e: any): any => {
        if(this.devtoolsScene){
          const {space, mode} = e.detail;

          if(space) {
            this.devtoolsScene.toggleTransformSpace(space);
          }
          if(mode) {
            this.devtoolsScene.setTransformMode(mode);
          }
        }
      })

      document.addEventListener('keydown', (e: any): any => {
        if(!this.devtoolsScene){
          return;
        }
        switch(e.key){
          case 'q': this.devtoolsScene.toggleTransformSpace(); break;
          case 'w': this.devtoolsScene.setTransformMode('translate'); break;
          case 'e': this.devtoolsScene.setTransformMode('rotate'); break;
          case 'r': this.devtoolsScene.setTransformMode('scale'); break;
        }
      }, { passive: true})
    }

    select(uuid: string){
      this.log('select', uuid);
      const selected: any = this.entityCache.getEntity(uuid);

      if(selected){
        if(this.devtoolsScene){
          this.devtoolsScene.selectObject(selected);
        }
        this.selected = window.$t = selected;
      }
    }

    // type updateType = {
    //   uuid: string;
    //   property: any;
    //   value: number;
    //   dataType: any;
    // };

    update(uuid?: string, property?: any, value: number, dataType?: any){
      this.log('update', uuid, property, value, dataType);
      const entity = this.entityCache.getEntity(uuid);

      if(!entity){
        return;
      }

      const { target, key } = utils.getTargetAndKey(entity, property);

      if(dataType === 'color'){
        if(target[key] && target[key].isColor){
          target[key].setHex(value);
        }
        else{
          // https://stackoverflow.com/questions/17256094/what-does-floatpar4-16-255-255-0f-mean#:~:text=The%20shift%20and%20and%20operator,to%20extract%20only%20one%20byte.&text=This%20gives%20you%20the%20red%20byte.
          // Color constructor looks like it comes from 
          target[key] = new Color((value >> 16 & 255)/255,
          (value >> 8 & 255)/225, (value & 255));
        }
      }
      else if (dataType === 'enum'){
        target[key] = value === -1 ? null : value;
      }
      else{
        target[key] = value;
      }
    }

    register(revision: any) {
      this.log('register', arguments[0]);
      this.send('register', { revision });
    }

    requestSceneGraph(uuid: string){
      this.log('requestSceneGraph', uuid);
      try{
        const data = this.entityCache.getSceneGraph(uuid);
        this.USE_RENDER_OVERLAY('scene-graph', {
          uuid,
          graph: data,  
        });
        // catching errors
      } catch(e) {
        console.log(e);
      }
    }

    requestOverview(type: string){
      this.log('requestOverview', type);
      try{
        const data: any = this.entityCache.getOverview(type);
        this.send('overview', {
          type,
          entities: data,
        });
      } catch(e){
          console.error(e);
      }
    }

    requestEntity(uuid: string){
      this.log('requestEntity', uuid);
      try{
        let data: any = this.entityCache.getSertialzedEntity(uuid);
        if(data){
          this.send('entity', data);
        }
      } catch (e){
          console.error(e);
      }
    }

    requestRenderingInfo(uuid: string){
      this.log('requestRenderingInfo', uuid);
      let data: any = this.entityCache.getRenderingInfo(uuid);
      if(data){
        this.send('rendering-info', data);
      }
    }

    observe(entity: any){
      this.log('observe', entity);
      const uuid: any = this.entityCache.add(entity);

      if(!uuid){
        this.warn(`${uuid} is unobservable`);
        return;
      }

      if(this.entitiesRecentlyObserved.size === 0){
        requestAnimationFrame((): void => {
          this.send('observe', {
            uuids: [...this.entitiesRecentlyObserved]
          });
          this.entitiesRecentlyObserved.clear();
        });
      }

      this.entitiesRecentlyObserved.add(uuid);
    }

    send(type: any, data: any){
      this.log('emitting', type, data);
      try{
        window.postMessage({
          id: 'three-devtools',
          type: type,
          data,
        }, *);
      } catch (e){
        if(!data){
          throw e;
        }
        console.error('Data could not be cloned; ensure "userData" is serializable.', e);
        window.postMessage({
          id: 'three-devtools',
          type,
          data: JSON.parse(JSON.stringify(data))
        });
      }
    }

    log(...message: any[]){
      if(DEBUG){
        console.log('ThreeDevTools: ', 'color:red', ...message);
      }
    }

    warn(...message: any[]){
      if(DEBUG){
        console.log('ThreeDevTools: ', 'color:red', ...message);
      }
    }

    createDevToolsScene(renderer: any, camera: any){
      if(this.devtoolsScene){
        return this.devtoolsScene;
      }

      this.devtoolsScene = new this.devtoolsScene(this.target, renderer.domElement, camera);
      return this.devtoolsScene;
    }

    setActiveRenderer(renderer: any){
      if(!this.USE_RENDER_OVERLAY){
        return;
      }

      const render: any = renderer.render;
      const devtools = this;

      let devtoolsScene: any;
      renderer.render = (scene: any, camera: any): void => {
        const target: any = renderer.getRenderTarget();
        render.call(this, scene, camera);

        if(!target) {
          if(!devtoolsScene){
            devtoolsScene = devtools.createDevToolsScene(renderer, camera);
          }
          devtoolsScene.setCamera(camera);

          const autoClear: any = renderer.autoClear;
          renderer.autoClear = false;
          render.call(renderer, devtoolsScene, camera);
          renderer.autoClear = autoClear;
        }
      };
    }
  };

})();

// const threeDevTools: FC<devToolsProps> = () => {
//   return (
    
//   );
// }

// export default threeDevTools;