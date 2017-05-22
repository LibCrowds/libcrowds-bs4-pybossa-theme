/**
 * Viewer sidebar HUD.
 */
class Sidebar {

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
                        <button class="btn btn-success btn-block btn-answer my-2" role="button">${config.answerButtonText}</button>
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
                            <p id="progress-selections" class="text-center" style="display: none;"></p>
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
            if (this.config.selectionEnabled) {
                this.element.find('#progress-selections').show();
            }
        }

        if (this.config.showFavourites) {
            this.element.find('#favourites').show();
        }

        if (this.config.showPreview) {
            this.element.find('#preview').show();
        }

        // Focus on comment input when shown
        this.element.find('#comment').on('shown.bs.collapse', function() {
            $('#comment-input').focus();
        });

        // Focus on container when comment input hidden
        this.element.find('#comment').on('hidden.bs.collapse', () => {
            $('.openseadragon-canvas').focus();
        });
    }
}

export default Sidebar;
