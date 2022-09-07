# BACE Three Devtool

Credits to the previous Three Devtool (@jsantell), https://github.com/threejs/three-devtools, and @rafaelsc for the browser-polyfill upgrade to make this extension Chrome compatible

## To Use This Devtool as a Chrome Extension
- clone repository
- run commands: `npm ci` and `npm run build:dist:chrome`
- open Chrome Extensions -> Manage Extensions
- Change settings into Developer Mode
- 'Load unpacked' this repository
- Happy debugging! :)

## Changes from the previous Three Devtool
- removed requirement to hit reload button when extension is first opened
- implemented search bar functionality to allow users to search through entities by uuid, name or type
- added hide/show toggle icon to control visibility of scene elements, textures, geometries and materials 
- updated three.js version to the latest version
- updated UI/UX for easy debugging experience
- support for rendering camera information for debugging 
  - changing camera properties currently does not work 
  - this functionality creates an array of DevToolsScenes corresponding to the cameras as well as TransformControls objects for each DevToolsScene
  - these objects (DevToolsScenes and TransformControls) are not yet functional
  - currently calls updateMatrixWorld but does not see properties updated
  - updated dropdown menu on scene viewing tab to include Camera entities 
- support for scene background colors
- added ability to save transformed properties
  - information is then opened in a popup window and logged in the console

## Recommended Next Steps:
- add support to change camera properties (Recommended to take a look at TransformControls.js)
- update Manifest version to version 3 (version 2 will be deprecated in ~1 year)
- ensure support for all Materials properties
- make the panels resizeable
- create a persistent unique identifier (UUID is not persistent currently)
- renderer info is not always correct -- please see renderer.info in the three.js docs (hyperlinked in the renderer info tab of the devtool)

## To contribute:
- Fork this repository
- create a new branch with the name of the feature to add / change
- open PR's to the dev branch
- use concise commit messages and include more details in the description of your PR
