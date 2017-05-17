/**
 * Viewer controls HUD.
 */
class Controls {

    constructor(viewerConfig) {
        this.viewerConfig = viewerConfig;
        this.element = $('<div class="viewer-controls"></div>');
        this.addButtons();

        this.element.on('click', '#show-help-modal', (evt) => {
            $('#help-modal').modal('show');
        });

        this.element.on('click', '#show-info-modal', (evt) => {
            $('#info-modal').modal('show');
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

        this.addButton(this.viewerConfig.helpButton, "fa-question-circle", "Help");
        this.addButton(this.viewerConfig.infoButton, "fa-info-circle", "Item Details");
    }
}

export default Controls;
