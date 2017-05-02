/**
 * Viewer controls HUD.
 */
class ViewerControls {
    
    constructor(viewerConfig) {
        this.viewerConfig = viewerConfig;
        this.element = $('<div class="viewer-controls"></div>');
        this.addButtons();
        
        // Show help modal when button clicked
        this.element.on('click', '#show-help-modal', (evt) => {
            $('#help-modal').modal('show');
        });
    }
    
    /**
     * Add a button to the HUD.
     */
    addButton(id, icon, tooltip) {
        let button = $(`
            <button id="${id}" data-toggle="tooltip" title="${tooltip}" role="button">
            <span class="fa ${icon}"></span>
            </button>
        `);
        
        button.tooltip({
            placement: 'right',
            template: `<div class="tooltip tooltip-hud" role="tooltip">
                       <div class="tooltip-arrow"></div>
                       <div class="tooltip-inner"></div>
                       </div>`
        });
        
        this.element.append(button);
    }
    
    /**
     * Add all buttons to the HUD.
     */
    addButtons() {
        this.addButton(this.viewerConfig.zoomInButton, "fa-plus-circle", "Zoom in"); 
        this.addButton(this.viewerConfig.zoomOutButton, "fa-minus-circle", "Zoom out"); 
        this.addButton(this.viewerConfig.homeButton, "fa-refresh", "Reset Zoom"); 
        this.addButton(this.viewerConfig.fullPageButton, "fa-expand", "Fullscreen");
        
        if (this.viewerConfig.selectionEnabled) {
            this.addButton(this.viewerConfig.selectionConfig.toggleButton, "fa-toggle-off", "Toggle selection");
        }
        
        this.addButton(this.viewerConfig.helpButton, "fa-question", "Help");
    }
}

/**
 * Viewer sidebar HUD.
 */
class ViewerSidebar {
    
    constructor(config) {
        this.config = config;
        this.element = $(`
            <div class="viewer-sidebar-container">
                <div class="viewer-sidebar">
                    <h4 class="viewer-sidebar-title font-weight-bold text-uppercase">
                        ${config.title}
                        <a href="#sb-content" class="viewer-sidebar-toggle" data-toggle="collapse" role="button">&#x25B2;</a>
                    </h4>
                    <div id="sb-content" class="sidebar-content collapse show">
                        <h3 class="objective"></h3>
                        <p class="guidance"></p>
                        <form id="answer-form"></form>
                        <button class="btn btn-success btn-block btn-answer my-2" role="button">
                            ${this.config.answerButtonText}
                        </button>
                        <div id="favourites" style="display: none;"></div>
                        <a id="tutorial" href="../tutorial" class="btn btn-outline-white btn-block my-2" role="button" style="display: none;">
                            View Tutorial
                        </a>
                        <div id="comments" class="my-2" style="display: none;">
                            <a href="#comment" class="btn btn-outline-white btn-block" role="button" data-toggle="collapse">
                                Add Comment
                            </a>
                            <div id="comment" class="mt-2 collapse">
                                <textarea id="comment-input" class="form-control margin-bottom-xs" rows="3" placeholder="Add a comment..."></textarea>
                            </div>
                        </div>
                        <div id="progress" class="mt-4" style="display: none;">
                            <h5 class="viewer-sidebar-title font-weight-bold text-uppercase">Progress</h5>
                            <div class="progress my-2">
                                <div class="progress-bar" role="progress-bar" style="width: 0%;"></div>
                            </div>
                            <p id="progress-summary" class="text-center"></p>
                        </div>
                        <div id="preview" class="mt-4" style="display: none;">
                            <h5 class="viewer-sidebar-title font-weight-bold text-uppercase">Up Next</h5>
                            <div class="text-center mt-2">
                                <img class="img-fluid" id="preview-thumbnail" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        if (this.config.showTutorial) {
            this.element.find('#tutorial').show();
        }
        
        if (this.config.showComments) {
            this.element.find('#comments').show();
        }
        
        if (this.config.showProgress) {
            this.element.find('#progress').show();
        }
        
        if (this.config.showFavourites) {
            this.element.find('#favourites').show();
        }
        
        if (this.config.showPreview) {
            this.element.find('#preview').show();
        }
        
        // Focus on comment input when shown
        this.element.find('#comment').on('shown.bs.collapse', function() {
            console.log('shown')
            $('#comment-input').focus();
        });
        
        // Focus on container when comment input hidden
        this.element.find('#comment').on('hidden.bs.collapse', () => {
            console.log('hidden')
            $('.openseadragon-canvas').focus();
        });
    }
}

/**
 * Viewer footer HUD, to be shown on smaller screens.
 */
class ViewerFooter {
    
    constructor() {
        this.element = $(`
            <div class="viewer-footer">
                <h3 class="objective"></h3>
                <button class="btn btn-success btn-block btn-answer my-2" role="button">Done</button>
            </div>
        `);
    }
}

/**
 * Help modal for LibCrowds viewer.
 */
class ViewerHelpModal {
    
    constructor(selectionEnabled) {
        this.element = $(`
            <div class="modal viewer-modal fade" id="help-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content bg-inverse text-white">
                        <div class="modal-header">
                            <h5 class="modal-title">Help</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <a id="tutorial" href="../tutorial" class="btn btn-info btn-block mt-2" role="button">
                                View Tutorial
                            </a>
                            <h4 class="mt-3">Viewer controls</h4>
                            <p>The following controls are provided towards the left of the viewer:</p>
                            <ul class="list-unstyled">
                                <li class="mb-1"><span class="fa fa-plus-circle fa-fw mr-1"></span>Zoom in</li>
                                <li class="mb-1"><span class="fa fa-minus-circle fa-fw mr-1"></span>Zoom out</li>
                                <li class="mb-1"><span class="fa fa-refresh fa-fw mr-1"></span>Reset zoom</li>
                                <li class="mb-1"><span class="fa fa-expand fa-fw mr-1"></span>Fullscreen</li>
                                <li class="selection-help mb-1">
                                    <span class="fa fa-toggle-on fa-fw mr-1"></span>Toggle selection
                                </li>
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
                                            <td class="text-center">SHIFT (Hold)</td>
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
                            <button type="button" class="btn btn-outline-white" data-dismiss="modal" role="button">
                                Close
                            </button>
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
 * Custom OpenSeadragon viewer interface.
 */
class LibCrowdsViewerInterface {

    constructor(config) {
        this.config = Object.assign({}, {
            prefixUrl: "/static/img/openseadragon/",
            showNavigator: false,
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
                dblClickToZoom: false
            },
            gestureSettingsPen: {
                dblClickToZoom: false
            },
            selectionEnabled: false,
            selectionConfig: {
                prefixUrl: "/static/img/openseadragonselection/",
                restrictToImage: true,
                toggleButton: 'toggle-selection'
            },
            confirmBeforeLeaving: true,
            sidebarConfig: {
                title: 'Task',
                answerButtonText: 'Done',
                showProgress: true,
                showFavourites: true,
                showTutorial: true,
                showComments: true,
                showPreview: true
            }
        }, config);
        this.viewer = OpenSeadragon(this.config);
        this.overlayId = 1;
        
        // Setup HUD controls and add them to the viewer
        this.controls = new ViewerControls(this.config);
        this.sidebar = new ViewerSidebar(this.config.sidebarConfig);
        this.footer = new ViewerFooter();
        this.helpModal = new ViewerHelpModal(this.config.selectionEnabled);
        $(`#${this.config.id}`).prepend(this.controls.element);
        $(`#${this.config.id}`).prepend(this.sidebar.element);
        $(`#${this.config.id}`).append(this.helpModal.element);
        $(`#${this.config.id}`).append(this.footer.element);
        
        //Fix navbar styles
        $('.navbar').css('background-color', 'rgba(0, 0, 0, 0.75)');
        
        // Setup selection if enabled
        if (this.config.selectionEnabled) {
            OpenSeadragon.setString("Tooltips.SelectionToggle", "Toggle selection");
            OpenSeadragon.setString("Tooltips.SelectionConfirm", "Confirm selection");
            this.selector = this.viewer.selection(this.config.selectionConfig);
        }
    
        // Draw an overlay when a selection is confirmed
        this.viewer.addHandler('selection', (selection) => {
            let vpRect = this.viewer.viewport.imageToViewportRectangle(selection);
            this.drawOverlay(vpRect, 'selection-overlay');
        });
        
        // Toggle the HUD selection icon
        this.viewer.addHandler('selection_toggle', (evt) => {
            let onOrOff  = evt.enabled ? "on" : "off",
                toggleId = '#' + this.config.selectionConfig.toggleButton;
            $(toggleId).html(`<span class="fa fa-toggle-${onOrOff}"></span>`);
            $(toggleId).blur();
        });
        
        // Hide loading icon after tile drawn
        this.viewer.addHandler('tile-drawn', () => {
            this.loading(false);
        });
        
        // Don't focus on HUD after fullscreen toggled
        this.viewer.addHandler('full-screen', (evt) => {
            $('.openseadragon-canvas').focus();
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
        
        // Toggle selection while shift is held.
        $(document).on('keyup keydown', (evt) => {
            if(evt.shiftKey) {
                this.selector.enable();
            } else {
                if (this.selector.isSelecting) {		
                    this.selector.confirm();		
                }
                this.selector.disable();
            }
        });
    }
    
    /**
     * Load an image and the task details.
     */
    loadTask(imageArk, objective, guidance, taskId) {
        this.viewer.open({
            type: 'image',
            tileSource:  `http:\/\/api.bl.uk\/image\/iiif\/${imageArk}\/info.json`,
            buildPyramid: false
        });
        this.sidebar.element.find('.objective').text(objective);
        this.footer.element.find('.objective').text(objective);
        this.sidebar.element.find('.guidance').text(guidance);
        this.footer.element.find('.guidance').text(guidance);
        
        getFavouritesButton(taskId).then(function(btn) {
            btn.addClass('btn-block btn-outline-white');
            btn.removeClass('btn-info');
            $('#favourites').html(btn);
        });
    }
    
    /**
     * Remove the current image, preview thumbnail and any comments.
     */
    clearTask() {
        this.viewer.close();
        this.sidebar.element.find('#preview-thumbnail').removeAttr('src');
        this.sidebar.element.find('#comment').collapse('hide');
        this.sidebar.element.find('#comment-input').val('');
        this.sidebar.element.find('#answer-form').html('');
        this.loading(true);
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
     * Update user progress in the sidebar.
     */
    updateUserProgress(data) {
        let pct  = Math.round((data.done*100)/data.total),
            pBar = this.sidebar.element.find('#progress');
        pBar.find('.progress-bar').css('width', `${pct}%`);
        pBar.find('#progress-done').text(data.done);
        pBar.find('#progress-total').text(data.total);
        pBar.find('#progress-summary').text(`You have completed ${data.done + ' '} of ${data.total + ' '} tasks`);
    }
    
    /**
     * Update the next task preview thumnail.
     */
    updatePreview(imageArk) {
        var url = `http:\/\/api.bl.uk\/image\/iiif\/${imageArk}\/full\/,200\/0\/default.jpg`;
        this.sidebar.element.find('#preview-thumbnail').attr('src', url);
    }
    
    /**
     * Return any task comments.
     */
    getComments() {
        return this.sidebar.element.find('#comment-input').val();
    }
    
    /**
     * Return the serialized answer form input.
     */
    getFormData() {
        return this.sidebar.element.find('#answer-form').serialize();
    }
    
    /**
     * Add an input field to the answer form.
     */
    addFormInput(id, name, placeholder, type) {
        let input = `<input id="${id}" class="form-control my-2" name="${name}" placeholder="${placeholder}" type="${type}" />`;
        this.sidebar.element.find('#answer-form').append(input);
    }

    /**
     * Draw an overlay of the given class.
     */
    drawOverlay(vpRect, cls) {
        let overlayElem = $(`<div id="overlay-${this.overlayId}" class="${cls}"></div>`);
        this.viewer.addOverlay({
            element: overlayElem[0],
            location: new OpenSeadragon.Rect(vpRect.x, vpRect.y, vpRect.width, vpRect.height, vpRect.degrees)
        });
        this.overlayId += 1;
    }
    
    /**
     * Highlight an area of the image.
     */
    highlight(region) {
        const json   = JSON.parse(region),
              rect   = new OpenSeadragon.Rect(json.x, json.y, json.width, json.height, json.degrees),
              vpRect = this.viewer.viewport.imageToViewportRectangle(rect);
        this.drawOverlay(vpRect, 'highlight-overlay');
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
     * Add loading icon.
     */
    loading(isLoading) {
        if (isLoading) {
            $(`#${this.config.id}`).addClass('viewer-loading-icon');
        } else {
            $(`#${this.config.id}`).removeClass('viewer-loading-icon');
        }
    }
}
