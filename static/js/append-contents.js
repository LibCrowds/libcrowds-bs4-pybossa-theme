/**
 * Load all h2, h3, h4, h5 and h6 tags as contents.
 */
$('.append-contents').each(function() {
    let html      = '<ul class="list-unstyled contents">',
        level     = 2;
    
    for(let h of $('h2, h3, h4, h5, h6').not('.append-contents')) {
        let newLevel = parseInt(h.tagName.charAt(1));
        if (newLevel > level) {
            html += `<ul>`;
        } else if (newLevel < level) {
            html += `</li></ul>`;
        } else {
            html += `</li>`;
        }
        level = newLevel;
        html = `${html}<li><a href="#${h.innerHTML.replace(/ /g,'')}">${h.innerHTML}</a>`;
        h.setAttribute('id', h.innerHTML.replace(/ /g,''));
    }
    
    while (level > 2) {
        html += `</ul>`;
        level -= 1;
    }
    $(this).after(html);
});