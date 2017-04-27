# libcrowds-viewer

An image viewer interface based on OpenSeadragon and designed for use in LibCrowds projects.

## Setup

Import jQuery, OpenSeadragon and OpenSeadragonSelection before [libcrowds-viewer.js](libcrowds-viewer.js).
See the `LibCrowdsViewerInterface` constructor for the default options used, especially the two `prefixUrl`
keys which show where the OpenSeadragon and OpenSeadragonSelection interface images should be placed. 

## Usage

Create a new interface:

```
let lcViewerInterface = new LibCrowdsViewerInterface({
    id: 'openseadragon', /** The viewer container */
    selectionEnabled: true /** Enable image area selection */
});
```

Load an image using the British Library image Ark:

```
lcViewerInterface.loadImage(task.info.image_ark);
```

Add a sidebar to the viewer:
```
lcViewerInterface.loadSidebar(questionAndAnswerHtml);
```

Retreive the coordinates of selection overlays:

```
lcViewer.getSelectionOverlayCoords()
```
