# Three-tools by BACE

This project iterates on the previous [**three-devtools**](https://github.com/threejs/three-devtools) project by @jsantell. Credits to [Webextension Browser-Polyfill](https://github.com/mozilla/webextension-polyfill) by @rafaelsc for making this extension Chrome-compatible.

## Table of Contents
- [Basic Setup](#Basic-Setup-as-Chrome-Extension)
- [Referencing three-devtools](#Referencing-three-devtools)
- [Documentation](#Documentation)
- [Changes from three-devtools](#Changes-from-three-devtools)
- [Next Steps](#Recommended-Next-Steps)
- [Troubleshooting](#Troubleshooting)
- [To Contribute](#To-Contribute)

## Basic Setup as Chrome Extension
1. clone this repository
2. run commands: `npm ci` and `npm run build:dist:chrome`
3. open Chrome Extensions -> Manage Extensions
4. Change settings into Developer Mode
5. `Load unpacked` this repository
6. After making changes, run `npm run build:dist:chrome` again and click `Update` in the Manage Extensions page
7. Happy debugging :)

## Referencing three-devtools
Three-tools follows the same project architecture and file structure as three-devtools.
Please take a look at the three-devtools [DEVELOPMENT.md](https://github.com/threejs/three-devtools/blob/master/DEVELOPMENT.md) for details.

### Architecture
The [architecture](https://github.com/threejs/three-devtools/blob/master/DEVELOPMENT.md#architecture) follows the same structure as three-devtools'. Take a look at the tech stack below for descriptions on different technologies we've used:

#### Backend Tech Stack
- JavaScript
- [Webextension Browser-Polyfill](https://github.com/mozilla/webextension-polyfill) to make custom-elements Chrome-compatible
- [Chrome API](https://developer.chrome.com/docs/extensions/reference/runtime/) to create DevTools panel and enable message passing

#### Frontend Tech Stack
- JavaScript/HTML/CSS
- [LitElement](https://lit.dev/) to create custom HTML elements
- [three.js](https://threejs.org/)
- [egjs](https://github.com/naver/egjs) to check if a computer is in light or dark mode

### Commands
The following are the most relevant commands among those scripted by three-devtools
- `npm run build:deps` builds dependencies via [@pika/web](https://github.com/FredKSchott/snowpack)
- `npm run build:dist:chrome` builds a zip file of the extension in the `dist` directory for Chrome browsers.

## Documentation
### Getting started with Three-tools
The Three-tools UI is full of information but might be a bit overwhelming! Relevant information is separated into different panels for your convenience.
Recommended starting points for learning how Three-tools can improve your productivity:
(Within each panel, numbers and values can be typed or dragged to change)

### Scenes & Cameras panel
View and change scene and camera properties 
![Scenes & Cameras panel](./placeholderpath)
Click the dropdown menu of scenes and cameras to view different entity maps. Scenes and 3D objects are currently editable but camera properties are not able to be altered.
- Select entities from the tree to view a smaller panel to the right with their properties
- Use the search bar to search for entities by Name, Type or UUID (Note: UUID is not persistent and may change on reload)
- Use the refresh button to reload the panel
- Use the visibility icons to toggle entities on and off 

- For Scenes and 3D Objects / Entities:
  - Developers can view the Type, UUID, and Name properties
  - Developers can see the Transform and Rendering information and adjust those properties
  - Within the Transform tab:
    - Adjust the position, rotation and scale 
    - Use the Matrix Auto Update toggle to adjust whether or not changes are immediately reflected in the DOM
    - Click the `Save` button to save specific properties if you would like to go back to them
    - Click the `Display Saved Data` to open a popup of the saved specs as well as log those specs to your console
  - Within the Rendering tab:
    - Adjust the Render Order
    - The visibility toggle here works the same way as the visibility icon
    - Adjust shadow properties
  - FOR ONLY SCENES: 
    - A Background tab will be available to adjust the Background color if it has been set (currently no support for Background textures or the default `null` background)

- For Cameras:
  - View the Type, UUID, Name and type specific properties
  - These properties are not currently adjustable


### Geometries panel
View and change geometry properties
![Geometry panel](./placeholderpath)
Lists the Geometries / BufferGeometries rendered to the scene(s) available
- Use the search bar to search for entities by Name or UUID (Note: UUID is not persistent and may change on reload)
- Use the refresh button to reload the panel
- Use the visibility icons to toggle the entities on and off 

- Select geometries from the list to see a list of their properties rendered on the right
  - Type, UUID and Name
  - Index
  - Groups
    - If Groups is an array, it will be hyperlinked to open more information in a new tab
  - Morph Targets Relative


### Materials panel
View and change materials properties
![Materials panel](./placeholderpath)
Lists the Materials rendered to the scene(s) available
- Use the search bar to search for entities by Name or UUID (Note: UUID is not persistent and may change on reload)
- Use the refresh button to reload the panel
- Use the visibility icons to toggle the entities on and off 

- Select Materials from the list to see a list of their properties 
  - Type, UUID, Name
  - Color: adjustable by color map
  - Materials Type Specific Properties
    - if null, not editable
    - otherwise, can be adjusted
  - Other nested tabs for more type specific properties

### Textures panel
View and change textures properties
![Textures panel](./placeholderpath)
Lists the Textures rendered to the scene(s) available
- Use the search bar to search for entities by Name or UUID (Note: UUID is not persistent and may change on reload)
- Use the refresh button to reload the panel
- Use the visibility icons to toggle the entities on and off 

- Select Textures from the list to see a list of their properties
  - Changes to these properties are not fully supported
  - Tabs:
    - Filters
      - Min Filter -- dropdown menu of options
      - Mag Filter -- dropdown menu of options
    - Wrapping
      - Wrap S -- dropdown menu of options
      - Wrap T -- dropdown menu of options
    - Transform
      - Offset
      - Repeat
      - Rotation
      - Center
      - matrixAutoUpdate
      - Matrix

### Renderer panel
![Renderer panel](./placeholderpath)
View rendering info from the scenes available.  Note: this information is not always correct due to the renderer.info not being properly reset.  If the information looks incorrect, please see the three.js renderer.info documentation for further information about manually resetting your renderer.info
- Left panel: 
  - Renderer tab tracks different data with a setInterval function to update every second.  This tab lists the information from WebGLRenderer.info.render 
    - frames
    - draw calls
    - triangles
    - points
    - lines
  - Memory tab tracks data from WebGLRenderer.info.memory
    - geometries
    - textures
    - programs
- Right panel: WebGLRenderer
  - Lists the type of renderer used, name and properties
  - (gammaFactor has been removed from THREE.WebGLRenderer so we removed that property)
  - Tone Mapping
  - Shadow Map
  - Buffer Clearing
  - Capabilities
  - Clipping
  - Scene
  - Morph Limits
  

## Changes from three-devtools
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
- Add support to change camera properties (Recommended to take a look at TransformControls.js)
- Once the camera works, add functionality to 'highlight' the selected scene
- Update Manifest version to version 3 (version 2 will be deprecated in ~1 year)
  - Update Manifest.json to accept inject.js file as a web resource
  - Activate background.js as a usable service worker
- Ensure support for all Materials properties
- Make the panels resizeable
- Create a persistent unique identifier (UUID is not persistent currently)
- Renderer info is not always correct -- please see renderer.info in the three.js docs (hyperlinked in the renderer info tab of the devtool)

## Troubleshooting:
- You have an error that you cannot describe or it is your first error
  - Reload the page the extension, this will solve most problems
- You cannot access three-tools in your chrome extension panel
  - Exit out of chrome devtools inspector and re-enter
- You only see "three-tools requires a page reload" 
  - Go to a page utilizing three.js otherwise three-tools will not load
  - three-tools will not recognize three.js objects inside iframes
- You are on three.js website and it still will not load or does not render objects
  - Chrome extension still does not have any compatabilities with websites using i-frames, if you would like to use our tool remove any iframes for our product to register your code. 
- You cannot type h into the searchbar
  - Chrome extension has a bug where h cannot be typed into our extensions searchbar, use shift h in this case
- You are having an issue with the build-dist.sh file
  - Check this [stack overflow](https://stackoverflow.com/questions/14219092/bash-script-and-bin-bashm-bad-interpreter-no-such-file-or-directory) 
    - Recommended to try `sed -i -e 's/\r$//' build-dist.sh` and `./build-dist.sh`

## To Contribute:
- Fork this repository
- Create a new branch with the name of the feature to add / change
- Create a PR to the dev branch
- Use descriptive commit messages and include comments in the description of your PR
- When completed with your feature please send an email to bacetools@gmail.com, and one of the members will review and merge