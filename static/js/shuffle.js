/**
 * A class for handling shuffleable grids.
 */
class ShuffleGrid {

    constructor(grid, initialGroup) {
        this.checkboxes = $('.shuffle-checkbox');
        this.searchbox = $('.shuffle-search');
        this.sortOptions = $('.shuffle-sort');
        this.initialSort = $('.shuffle-sort option').first().val();
        this.sizer = grid.find('.grid-item').first();
        this.shuffle = new shuffle(grid, {
            itemSelector: '.grid-item',
            group: initialGroup || Shuffle.ALL_ITEMS,
            initialSort: { by: this.sortBy(this.initialSort) },
            sizer: this.sizer
        });
        this.setupFilters();
        this.setupSearching();
        this.setupSorting();
    }

    sortBy(value) {
        return function(element) {
            const res = element.getAttribute(`data-${value}`);
            return $.isNumeric(res) ? parseFloat(res) : res;
        };
    }

    setupFilters() {
        this.checkboxes.on('change', (evt) => {
            const checked = evt.target.checked,
                  group   = checked ? evt.target.getAttribute('data-group') : 'all';
            this.shuffle.filter(group);
        });
    }

    setupSorting() {
        this.sortOptions.on('change', (evt) => {
            const value   = evt.target.value,
                  element = evt.target.querySelector(`option[value="${value}"]`),
                  reverse = true ? element.getAttribute("data-reverse") : false,
                  options = { by: this.sortBy(value), reverse: reverse };
            this.shuffle.sort(options);
        });
    }

    setupSearching() {
        this.searchbox.on('keyup', (evt) => {
            const searchText = evt.target.value.toLowerCase();
            this.shuffle.filter(function(element) {
                const textContent = element.textContent.toLowerCase();
                return textContent.indexOf(searchText) !== -1;
            });
        });
    }
}


$(window).on("load", function() {
    if ($('.shuffle-grid').length == 1) {
        const grid          = $('.shuffle-grid').first(),
              initial_group = grid.data("initial-group");
        new ShuffleGrid(grid, initial_group);
    }
});