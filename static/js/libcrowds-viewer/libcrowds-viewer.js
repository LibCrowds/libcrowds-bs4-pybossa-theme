/**
 * Help modal for LibCrowds viewer.
 */
class LibCrowdsViewerHelpModal {
    
    constructor(selectionEnabled) {
        this.element = $(`
            <div class="modal fade" id="help-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content bg-inverse text-white" style="border: 1px solid #ECEEEF">
                        <div class="modal-header">
                            <h5 class="modal-title">Viewer Controls</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>The following controls are provided towards the left of the viewer:</p>
                            <ul class="list-unstyled">
                                <li class="mb-1"><span class="fa fa-plus-circle fa-fw mr-1"></span>Zoom in</li>
                                <li class="mb-1"><span class="fa fa-minus-circle fa-fw mr-1"></span>Zoom out</li>
                                <li class="mb-1"><span class="fa fa-refresh fa-fw mr-1"></span>Reset zoom</li>
                                <li class="mb-1"><span class="fa fa-expand fa-fw mr-1"></span>Fullscreen</li>
                                <li class="selection-help mb-1"><span class="fa fa-toggle-on fa-fw mr-1"></span>Toggle selection</li>
                                <li class="mb-1"><span class="fa fa-question fa-fw mr-1"></span>Help</li>
                            </ul>
                            <div class="selection-help" style="display: none;">
                                <h4 class="mt-4">Selection controls</h4>
                                <p>The following controls are provided over each selection box:</p>
                                <ul class="list-unstyled">
                                    <li class="mb-1"><span class="fa fa-check fa-fw mr-1"></span>Confirm selection</li>
                                    <li class="mb-1"><span class="fa fa-times fa-fw mr-1"></span>Cancel selection</li>
                                </ul>
                                <p>
                                    Double click on a previously confirmed selection to update it.
                                </p>
                            </div>
                            <h4 class="mt-4">Keyboard Shortcuts</h4>
                            <p>The following keys can be used to perform functions:</p>
                            <div class="table-responsive">
                                <table id="plugins-table" class="table table-inverse bg-inverse mb-0">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0 border-bottom-0 pb-1 card-label text-muted">Function</th>
                                            <th class="border-top-0 border-bottom-0 pb-1 card-label text-muted text-center">Shortcut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Zoom in</td>
                                            <td class="text-center">- / _</td>
                                        </tr>
                                        <tr>
                                            <td>Zoom out</td>
                                            <td class="text-center">= / +</td>
                                        </tr>
                                        <tr>
                                            <td>Reset zoom</td>
                                            <td class="text-center">0</td>
                                        </tr>
                                        <tr>
                                            <td>Fullscreen</td>
                                            <td class="text-center">f</td>
                                        </tr>
                                        <tr class="selection-help" style="display: none;">
                                            <td>Toggle selection</td>
                                            <td class="text-center">c</td>
                                        </tr>
                                        <tr>
                                            <td>Move viewport up</td>
                                            <td class="text-center">w, up arrow</td>
                                        </tr>
                                        <tr>
                                            <td>Move viewport down</td>
                                            <td class="text-center">s, down arrow</td>
                                        </tr>
                                        <tr>
                                            <td>Move viewport left</td>
                                            <td class="text-center">a, left arrow</td>
                                        </tr>
                                        <tr>
                                            <td>Move viewport right</td>
                                            <td class="text-center">d, right arrow</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-white" data-dismiss="modal" role="button">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
        );
        if (selectionEnabled) {
            this.element.find('.selection-help').show();
        }
    }
}

/**
 * Heads up display for the LibCrowds viewer.
 *
 * All controls should still be visible in fullscreen mode.
 */
class LibCrowdsViewerHUD {
    
    constructor() {
        this.element = $('<div class="hud"></div>');
        this.element.css({
            'display': 'flex',
            'flex-direction': 'column',
            'margin': '80px 1rem',
            'position': 'absolute',
            'z-index': '2',
            'border-radius': '25px',
            'background-color': 'rgba(0, 0, 0, 0.75)'
        });
    }
    
    /**
     * Add a button to the HUD.
     */
    addButtonHTML(opts) {
        let button = $(`<button id="${ opts.id }" data-toggle="tooltip" title="${ opts.tooltip }" role="button">
                       <span class="fa ${ opts.icon }"></span>
                       </button>`);
        
        button.tooltip({
            placement: 'right',
            template: `<div class="tooltip tooltip-hud" role="tooltip">
                      <div class="tooltip-arrow"></div>
                      <div class="tooltip-inner"></div>
                      </div>`
        });
        
        button.css({
            'background': 'none',
            'color': '#fff',
            'opacity': '0.8',
            'text-shadow': '0 0 5px #000',
            'font-size': '1.25rem',
            'padding': '.5rem',
            'cursor': 'pointer',
            'border': 'none',
            'outline': 'none !important'
        });
        
        button.hover(function() {
            $(this).css('opacity', '1');
        }, function() {
            $(this).css('opacity', '0.65');
        });
        
        this.element.append(button);
    }
    
    /**
     * Add a collapsable sidebar to the HUD.
     */
    addSidebar(title, content) {
        let sidebar     = $('<div></div>'),
            titleRow    = $(`<p>${title}</p>`),
            collapseBtn = $(`<a href="#" class="show">&#x25B2;</a>`);
        this.element.css({
            'right': '0',
            'margin': '80px 0 0 0',
            'border-radius': '0',
            'color': '#fff',
            'width': '25%',
            'min-width': '200px',
            'background-color': 'transparent',
            'font-size': '0.9rem'
        });
        sidebar.css({
            'padding': '10px',
            'margin': '0 1.5rem 0.8rem',
            'border': '2px solid rgb(85, 85, 85)',
            'background-color': 'rgba(0, 0, 0, 0.75)'
        });
        titleRow.css({
            'margin-bottom': '0',
            'flex-direction': 'row',
            'text-transform': 'uppercase'
        });
        collapseBtn.css({
            'color': 'white',
            'float': 'right',
            'transition': 'transform 350ms'
        });
        content.css({
            'margin-top': '15px',
            'margin-bottom': '0'
        })
        titleRow.prepend(collapseBtn);
        sidebar.append(titleRow);
        sidebar.append(content);
        this.element.append(sidebar);
        
        collapseBtn.on('click', function() {
            if ($(this).hasClass('show')) {
                content.slideUp();
                collapseBtn.css('transform', 'rotate(180deg)');
                $(this).removeClass('show');
            } else {
                content.slideDown();
                collapseBtn.css('transform', 'none');
                $(this).addClass('show');
            }
        })
    }
}

/**
 * Custom OpenSeadragon viewer interface.
 */
class LibCrowdsViewerInterface {

    constructor(config) {
        this.config = Object.assign({}, {
            prefixUrl: "/static/img/openseadragon/",
            showNavigator: false,
            showNavigator: true,
            navigatorPosition: 'BOTTOM_LEFT',
            zoomInButton: 'zoom-in',
            zoomOutButton: 'zoom-out',
            homeButton: 'reset-zoom',
            helpButton: 'show-help-modal',
            fullPageButton: 'fullscreen',
            autoHideControls: false,
            minZoomLevel: 0.1,
            gestureSettingsMouse: {
                clickToZoom: false
            },
            gestureSettingsTouch: {
                clickToZoom: false
            },
            gestureSettingsPen: {
                clickToZoom: false
            },
            selectionEnabled: false,
            selectionConfig: {
                prefixUrl: "/static/img/openseadragonselection/",
                restrictToImage: true,
                toggleButton: 'toggle-selection'
            },
            confirmBeforeLeaving: true
        }, config);
        this.loading(true);
        
        // Setup HUD controls and add them to the viewer
        this.controlsHud = this.setupControlsHUD();
        this.sidebarHud = new LibCrowdsViewerHUD();
        this.helpModal = new LibCrowdsViewerHelpModal(this.config.selectionEnabled);
        $(`#${this.config.id}`).prepend(this.controlsHud.element);
        $(`#${this.config.id}`).prepend(this.sidebarHud.element);
        $(`#${this.config.id}`).append(this.helpModal.element);
        
        // Viewer styles
        $(`#${config.id}`).css({
            'overflow': 'hidden',
            'position': 'relative',
            'background-color': '#000'
        });
        
        this.viewer = OpenSeadragon(this.config);
        this.overlayId = 1;
        
        // Setup selection if enabled
        if (this.config.selectionEnabled) {
            OpenSeadragon.setString("Tooltips.SelectionToggle", "Toggle selection");
            OpenSeadragon.setString("Tooltips.SelectionConfirm", "Confirm selection");
            this.selector = this.viewer.selection(this.config.selectionConfig);
        }
    
        // Draw an overlay when a selection is confirmed
        this.viewer.addHandler('selection', (selection) => {
            let vpRect      = this.viewer.viewport.imageToViewportRectangle(selection),
                hoverStyles = { 'opacity': '1' },
                styles      = { 
                    'border': '2px solid rgb(65, 144, 194)', 
                    'background-color': 'rgba(65, 144, 194, 0.1)', 
                    'opacity': '.6' 
                };
            this.drawOverlay(vpRect, styles, hoverStyles, 'selection-overlay');
        });
        
        // Toggle the HUD selection icon
        this.viewer.addHandler('selection_toggle', (evt) => {
            let onOrOff  = evt.enabled ? "on" : "off",
                toggleId = '#' + this.config.selectionConfig.toggleButton;
            $(toggleId).html(`<span class="fa fa-toggle-${onOrOff}"></span>`);
            $(toggleId).blur();
            if (this.selector.element) {
                $(this.selector.element).css('outline', '9999px rgba(0,0,0,.6) solid');
            }
        });
        
        // Hide loading icon after tile drawn
        this.viewer.addHandler('tile-drawn', () => {
            this.loading(false);
        });
        
        // Don't focus on HUD after fullscreen toggled
        this.viewer.addHandler('full-screen', (evt) => {
            this.viewer.container.focus();
        });
        
        // Handle click of help button
        $(this.controlsHud.element).on('click', '#show-help-modal', (evt) => {
            $('#help-modal').modal('show');
        });
        
        // Convert a selection overlay back to a selection box on click
        $(this.viewer.container).on('dblclick', '.selection-overlay', (evt) => {
            this.convertOverlayToSelectionBox(evt.target.id);
        });
        
        // Confirm before leaving if any overlays have been drawn or forms filled
        window.onbeforeunload = () => {
            if (!this.config.confirmBeforeLeaving) {
                return null;
            }
            
            if (this.viewer.currentOverlays.length) {
                return 'Unsaved changes will be lost.';
            } 
            $('input').each(function() {
                if ($(this).val() !== "") {
                    return 'Unsaved changes will be lost.';
                }
            });
            return null;
        };
    }
    
    /**
     * Load an image into the viewer.
     */
    loadImage(id) {
        this.loading(true);
        return this.viewer.open({
            type: 'image',
            tileSource:  `http:\/\/api.bl.uk\/image\/iiif\/${id}\/info.json`,
            buildPyramid: false
        });
    }
    
    /**
     * Load tile sources from a BL manifest URL.
     */
    loadManifest(manifestUrl) {
        $.ajax({
            url: manifestUrl,
            dataType: 'json',
            type: 'GET'
        }).done((data) => {
            let tileSources = $.map(data.sequences[0].canvases, function(canvas) {
                return canvas.images[0].resource.service;
            });
            this.viewer.open(tileSources);
        }).fail(function(xhr, status, error) {
            throw new Error(status);
        });
    }
    
    /**
     * Setup and return the main HUD controls.
     */
    setupControlsHUD() {
        let hud = new LibCrowdsViewerHUD();
        hud.addButtonHTML({ id: this.config.zoomInButton, icon: "fa-plus-circle", tooltip: "Zoom in" }); 
        hud.addButtonHTML({ id: this.config.zoomOutButton, icon: "fa-minus-circle", tooltip: "Zoom out" }); 
        hud.addButtonHTML({ id: this.config.homeButton, icon: "fa-refresh", tooltip: "Reset Zoom" }); 
        hud.addButtonHTML({ id: this.config.fullPageButton, icon: "fa-expand", tooltip: "Fullscreen" });
    
        if (this.config.selectionEnabled) {
            hud.addButtonHTML({ id: this.config.selectionConfig.toggleButton, icon: "fa-toggle-off", tooltip: "Toggle selection" });
        }
        
        hud.addButtonHTML({ id: this.config.helpButton, icon: "fa-question", tooltip: "Help" });
        return hud;
    }

    /**
     * Draw an overlay with the given styles and class.
     */
    drawOverlay(viewportRectangle, styles, hoverStyles, cls) {
        let overlayElem = $('<div></div>'),
            id          = 'overlay-' + this.overlayId;
        overlayElem.attr('id', id);
        overlayElem.css(styles);
        overlayElem.hover(function() {
            $(this).css(hoverStyles);
        }, function() {
            $(this).css(styles);
        });
        if (cls) {
            overlayElem.addClass(cls);
        }
        this.viewer.addOverlay({
            element: overlayElem[0],
            location: new OpenSeadragon.Rect(viewportRectangle.x, 
                                             viewportRectangle.y, 
                                             viewportRectangle.width, 
                                             viewportRectangle.height, 
                                             viewportRectangle.degrees)
        });
        this.overlayId += 1;
    }
    
    /**
     * Highlight an area of the image.
     */
    highlight(region) {
        const json   = JSON.parse(region),
              rect   = new OpenSeadragon.Rect(json.x, json.y, json.width, 
                                              json.height, json.degrees),
              vpRect = this.viewer.viewport.imageToViewportRectangle(rect),
              styles = { 
                  'outline': '9999px rgba(0,0,0,.35) solid',
                  'border': '1px solid rgb(255, 255, 255)'
              };
        this.drawOverlay(vpRect, styles, null, 'highlight-overlay');
    }
    
    /**
     * Get an image rectangle from an overlay.
     */
    overlayToImageRect(overlay) {
        let bounds = overlay.getBounds(this.viewer.viewport),
            vpRect = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height, bounds.degrees);
        return this.viewer.viewport.viewportToImageRectangle(vpRect);
    }

    /**
     * Return an array of image rectangles from the current overlays.
     */
    getOverlaysAsImageRectangles() {
        return this.viewer.currentOverlays.map((overlay) => {
            return this.overlayToImageRect(overlay);
        });
    }

    /**
     * Convert an overlay to a selection box.
     */
    convertOverlayToSelectionBox(id) {
        const overlay = this.viewer.getOverlayById(id),
              bounds  = overlay.getBounds(this.viewer.viewport);
        this.viewer.removeOverlay(id);
        this.selector.rect = new OpenSeadragon.SelectionRect(bounds.x, bounds.y, bounds.width, bounds.height, bounds.degrees);
        this.selector.draw();
        this.selector.enable();
    }
    
    /**
     * Add a sidebar to the viewer.
     */
    loadSidebar(title, element) {
        this.sidebarHud.addSidebar(title, element);
    }
    
    /**
     * Remove all sidebars.
     */
    removeSidebars() {
        this.sidebarHud.element.html('');
    }
    
    /**
     * Add loading icon.
     */
    loading(isLoading) {
        if (isLoading) {
            $(`#${this.config.id}`).css({
                'background-image': 'url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgICAgIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjMwcHgiIHZpZXdCb3g9IjAgMCAyNCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4gICAgPHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIiBmaWxsPSIjREEwMDAwIiBvcGFjaXR5PSIwLjIiPiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIwLjI7IDE7IC4yIiBiZWdpbj0iMHMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDIwOyAxMCIgYmVnaW49IjBzIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIxMDsgNTsgMTAiIGJlZ2luPSIwcyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4gICAgPC9yZWN0PiAgICA8cmVjdCB4PSI4IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iMTAiIGZpbGw9IiNEQTAwMDAiICBvcGFjaXR5PSIwLjIiPiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIwLjI7IDE7IC4yIiBiZWdpbj0iMC4xNXMiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDIwOyAxMCIgYmVnaW49IjAuMTVzIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPiAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdmFsdWVzPSIxMDsgNTsgMTAiIGJlZ2luPSIwLjE1cyIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4gICAgPC9yZWN0PiAgICA8cmVjdCB4PSIxNiIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIiBmaWxsPSIjREEwMDAwIiAgb3BhY2l0eT0iMC4yIj4gICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMC4yOyAxOyAuMiIgYmVnaW49IjAuM3MiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiBhdHRyaWJ1dGVUeXBlPSJYTUwiIHZhbHVlcz0iMTA7IDIwOyAxMCIgYmVnaW49IjAuM3MiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieSIgYXR0cmlidXRlVHlwZT0iWE1MIiB2YWx1ZXM9IjEwOyA1OyAxMCIgYmVnaW49IjAuM3MiIGR1cj0iMC42cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+ICAgIDwvcmVjdD4gIDwvc3ZnPg==)',
                'background-repeat': 'no-repeat',
                'background-position': '50% 50%'
            });
        } else {
            $(`#${this.config.id}`).css('background-image', 'none');
        }
    }
}
