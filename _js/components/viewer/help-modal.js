/**
 * Viewer help modal.
 */
class HelpModal {

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
                                    To update a previously confirmed selection click on it with a mouse or tap and
                                    hold for one second on mobile.
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

export default HelpModal;