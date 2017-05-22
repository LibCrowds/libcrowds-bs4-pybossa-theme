/**
 * Viewer footer HUD, to be shown on smaller screens.
 */
class Footer {

    constructor(config) {
        this.element = $(`
            <div class="viewer-footer">
                <h3 class="objective"></h3>
                <p class="guidance"></p>
                <form id="answer-form"></form>
                <button class="btn btn-success btn-block btn-answer my-2" role="button">${config.answerButtonText}</button>
            </div>
        `);
    }
}

export default Footer;
