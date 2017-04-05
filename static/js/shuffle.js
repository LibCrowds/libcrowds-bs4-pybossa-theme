/**
 * A class for handling shuffleable grids.
 */
function ShuffleGrid(grid, initialGroup) {
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
}

ShuffleGrid.prototype.sortBy = function(value) {
	return function(element) {
		var res = element.getAttribute('data-' + value);
		return $.isNumeric(res) ? parseFloat(res) : res;
	};
};

ShuffleGrid.prototype.setupFilters = function() {
	var _this = this;
	this.checkboxes.on('change', function(evt) {
		var checked = evt.target.checked,
			group   = checked ? evt.target.getAttribute('data-group') : 'all';
		_this.shuffle.filter(group);
	});
};

ShuffleGrid.prototype.setupSorting = function() {
	var _this = this;
	this.sortOptions.on('change', function(evt) {
		var value   = evt.target.value,
			element = evt.target.querySelector('option[value="' + value + '"]'),
			reverse = true ? element.getAttribute("data-reverse") : false,
			options = { by: _this.sortBy(value), reverse: reverse };
		_this.shuffle.sort(options);
	});
};

ShuffleGrid.prototype.setupSearching = function() {
	var _this = this;
	this.searchbox.on('keyup', function(evt) {
		var searchText = evt.target.value.toLowerCase();
		_this.shuffle.filter(function(element) {
			var textContent = element.textContent.toLowerCase();
			return textContent.indexOf(searchText) !== -1;
		});
	});
};


$(window).on("load", function() {
    if ($('.shuffle-grid').length == 1) {
        var grid          = $('.shuffle-grid').first(),
            initial_group = grid.data("initial-group"),
            shuffle       = new ShuffleGrid(grid, initial_group);
		shuffle.setupFilters();
		shuffle.setupSearching();
		shuffle.setupSorting();
    }
});