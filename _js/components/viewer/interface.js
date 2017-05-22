import OpenSeadragon from 'openseadragon';
import 'openseadragonselection/dist/openseadragonselection';
import Controls from './controls';
import Footer from './footer';
import Sidebar from './sidebar';
import HelpModal from './help-modal';
import InfoModal from './info-modal';

/**
 * Custom OpenSeadragon viewer interface.
 */
class Interface {

    constructor(config) {
        this.config = Object.assign({}, {
            prefixUrl: "/static/img/openseadragon/",
            showNavigator: false,
            navigatorPosition: 'BOTTOM_LEFT',
            zoomInButton: 'zoom-in',
            zoomOutButton: 'zoom-out',
            homeButton: 'reset-zoom',
            helpButton: 'show-help-modal',
            infoButton: 'show-info-modal',
            fullPageButton: 'fullscreen',
            autoHideControls: false,
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
                toggleButton: 'toggle-selection',
                keyboardShortcut: null,
                returnPixelCoordinates: false
            },
            confirmBeforeLeaving: true,
            taskInputConfig: {
                title: 'Task',
                answerButtonText: 'Done',
                showProgress: true,
                showFavourites: true,
                showTutorial: false,
                showComments: true,
                showPreview: true
            }
        }, config);
        this.viewer = OpenSeadragon(this.config);

        // Setup HUD controls and add them to the viewer
        this.controls = new Controls(this.config);
        this.sidebar = new Sidebar(this.config.taskInputConfig);
        this.footer = new Footer(this.config.taskInputConfig);
        this.helpModal = new HelpModal(this.config.selectionEnabled);
        this.infoModal = new InfoModal();
        this.hint = $(`
            <div class="viewer-hint">
                <div class="viewer-hint-text">Click and Drag</div>
            </div>
        `);
        $(this.viewer.container).prepend(this.controls.element);
        $(this.viewer.container).prepend(this.sidebar.element);
        $(this.viewer.container).append(this.footer.element);
        $(this.viewer.container).append(this.helpModal.element);
        $(this.viewer.container).append(this.infoModal.element);
        $(this.viewer.container).append(this.hint.element);

        // Add navbar to the viewer container so it's visible in full screen mode
        $(this.viewer.container).prepend($('.navbar'));

        // Setup selection if enabled
        if (this.config.selectionEnabled) {
            OpenSeadragon.setString("Tooltips.SelectionToggle", "Toggle selection");
            OpenSeadragon.setString("Tooltips.SelectionConfirm", "Confirm selection");
            this.selector = this.viewer.selection(this.config.selectionConfig);
        }

        // Draw an overlay when a selection is confirmed
        this.viewer.addHandler('selection', (selection) => {
            this.drawOverlay(selection, 'selection-overlay');
        });

        // Toggle the HUD selection icon
        this.viewer.addHandler('selection_toggle', (evt) => {
            if (evt.enabled) {
                this.hint.element.addClass('show');
                setTimeout(() => {
                    this.hint.element.removeClass('show');
                }, 2500);
            } else {
                this.hint.element.removeClass('show');
            }
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
        this.viewer.addHandler('full-screen', () => {
            $('.openseadragon-canvas').focus();
        });

        // Convert a selection overlay back to a selection box on dblclick or taphold
        $(this.viewer.container).on('click taphold', '.selection-overlay', (evt) => {
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
        $(document).on('keydown', (evt) => {
            if (evt.shiftKey && !this.selector.isSelecting) {
                this.selector.enable();
            }
        }).on('keyup', (evt) => {
            if (evt.which === 16) {
                this.selector.confirm();
                this.selector.disable();
            }
        });

        // Toggle full screen mode with 'f' key
        $(this.viewer.container).on('keypress', (evt) => {
            if (String.fromCharCode(evt.keyCode) === 'f' || String.fromCharCode(evt.keyCode) === 'F') {
                this.viewer.setFullScreen(!this.viewer.isFullPage());
            }
        });
    }

    /**
     * Load an image and the task details.
     */
    loadTask(task) {
        let form = task.info.form;
        this.loading(true);
        this.viewer.open({
            type: 'image',
            tileSource:  `http:\/\/api.bl.uk\/image\/iiif\/${task.info.image_ark}\/info.json`,
            buildPyramid: false
        });
        this.sidebar.element.find('.objective').text(task.info.objective);
        this.sidebar.element.find('.guidance').text(task.info.guidance);
        this.footer.element.find('.objective').text(task.info.objective);
        this.footer.element.find('.guidance').text(task.info.guidance);

        if (typeof form !== 'undefined') {
            for (let input of JSON.parse(form)) {
                this.addFormInput(input);
            }
        }

        this.loadItemDetails(task.info.manifest_url);
    }

    /**
     * Remove the current image, preview thumbnail and any comments.
     */
    clearTask() {
        this.loading(true);
        this.viewer.close();
        this.sidebar.element.find('#preview-thumbnail').removeAttr('src');
        this.sidebar.element.find('#comment').collapse('hide');
        this.sidebar.element.find('#comment-input').val('');
        this.sidebar.element.find('#answer-form').html('');
        this.footer.element.find('#answer-form').html('');
    }

    /**
     * Load item details into the info modal from a manifest URL.
     */
    loadItemDetails(manifestUrl) {
        if (typeof manifestUrl === 'undefined') {
            this.infoModal.element.find('#manifest').hide();
            this.infoModal.element.find('#no-manifest').show();
            return;
        }

        $.ajax({
            url: manifestUrl,
            dataType: 'json',
            type: 'GET'
        }).done((data) => {
            this.infoModal.element.find('#manifest').show();
            this.infoModal.element.find('#no-manifest').hide();
            this.infoModal.element.find('#metadata').html('');
            for (let item of data.metadata) {
                this.infoModal.element.find('#metadata').append(`<li class="my-2"><strong>${item.label}:</strong>&nbsp;${item.value}</li>`);
            }
            this.infoModal.element.find('#attribution').html(data.attribution);
            this.infoModal.element.find('#license').html(data.license);
            this.infoModal.element.find('#logo').attr('src', data.logo);
        }).fail(function(xhr, status) {
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
        if (this.viewer)
        this.sidebar.element.find('#progress-selections').text(`You have made {} selections for the current task`);
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
    addFormInput(opts) {
        let input = `<input id="${opts.id}" class="form-control my-2" name="${opts.name}" placeholder="${opts.placeholder}" type="${opts.type}" />`;
        this.sidebar.element.find('#answer-form').append(input);
        this.footer.element.find('#answer-form').append(input);
    }

    /**
     * Draw an overlay of the given class.
     */
    drawOverlay(vpRect, cls) {
        let overlayElem = $(`<div id="overlay-${Date.now()}" class="${cls}"></div>`);
        this.viewer.addOverlay({
            element: overlayElem[0],
            location: new OpenSeadragon.Rect(vpRect.x, vpRect.y, vpRect.width, vpRect.height, vpRect.degrees)
        });
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
    getSelections() {
        return this.viewer.currentOverlays.map((overlay) => {
            if (overlay.element.className === 'selection-overlay') {
                return this.overlayToImageRect(overlay);
            }
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
     * Toggle loading icon.
     */
    loading(show) {
        if (show) {
            $(this.viewer.container).addClass('viewer-loading-icon');
        } else {
            $(this.viewer.container).removeClass('viewer-loading-icon');
        }
    }
}

export default Interface;
