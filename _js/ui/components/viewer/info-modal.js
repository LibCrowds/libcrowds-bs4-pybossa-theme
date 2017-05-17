/**
 * Viewer info modal.
 */
class InfoModal {

    constructor(selectionEnabled) {
        this.element = $(`
            <div class="modal viewer-modal fade" id="info-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content bg-inverse text-white">
                        <div class="modal-header">
                            <h5 class="modal-title">Item Details</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="no-manifest" class="text-center my-2" style="display: none;">
                                <p class="lead">No manifest data could be loaded for this task.</p>
                            </div>
                            <div id="manifest">
                                <ul id="metadata" class="list-unstyled"></ul>
                                <div class="text-center mt-5 mb-4">
                                    <img class="img-fluid mb-3" id="logo" />
                                    <p id="attribution"></p>
                                    <p id="license"></p>
                                </div>
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
    }
}

export default InfoModal;
