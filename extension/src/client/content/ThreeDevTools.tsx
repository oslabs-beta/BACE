import React, { FC, useState } from 'react';
import { Entity } from '../types';
import EntityCache from './EntityCache';

type devToolsProps = {
  USE_RENDER_OVERLAY: boolean;
  target: any; // event?
  scenes: Set<Entity>;
  renderers: Set<any>;
  entityCache: EntityCache;
  entitiesRecentlyObserved: Set<any>;
  devtoolsScene: null;
  selected: null;
  select: (uuid: string) => any;
}

const threeDevTools = (
  USE_RENDER_OVERLAY: boolean,
  target: any, // event?
  scenes: Set<Entity>,
  renderers: Set<any>,
  entityCache: EntityCache,
  entitiesRecentlyObserved: Set<any>,
  devtoolsScene: null,
  selected: null,
): JSX.Element => {
  // add event listeners

  // select active object in devtools viewer
  select = (uuid: string) => {
    const selected: Entity = this.entityCache.getEntity(uuid);
    if (selected) {
      if (this.devtoolsScene) {
        this.devtoolsScene.selectObject(selected);
      }
    }
  }

  return (
    <div />
  );
  
}

export default threeDevTools;