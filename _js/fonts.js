import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Assistant', 'Roboto']
    },
    active: function() {
        sessionStorage.fonts = true;
    }
});