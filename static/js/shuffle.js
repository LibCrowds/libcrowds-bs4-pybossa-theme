/**
 * A class for handling shuffleable grids.
 */
class ShuffleGrid {
    
    constructor(selector) {
        this.grid = $(selector);
        this.initialGroup = this.grid.data('initial-group'),
        this.initialSort = $('.shuffle-sort option').first().val();
        this.sizer = this.grid.find('.grid-item').first();
        this.shuffle = new shuffle(this.grid, {
            itemSelector: '.grid-item',
            group: this.initialGroup || Shuffle.ALL_ITEMS,
            sizer: this.sizer
        });
        this.run();
    }
    
    _sort() {
    	let element = $("#shuffle-sort option:selected")[0],
    		reverse = true ? element.getAttribute("data-reverse") : false,
            options = { 
                by: function(element) {
            		let res = element.getAttribute("data-sortby");
            		return $.isNumeric(res) ? parseFloat(res) : res;
                }, 
                reverse: reverse 
            };
    	this.shuffle.sort(options);
    };
    
    _search() {
		let text = $('#shuffle-search').val().toLowerCase();
		this.shuffle.filter(function(element) {
			let textContent = element.textContent.toLowerCase();
			return textContent.indexOf(text) !== -1;
		});
    }
    
    _filterCompleted() {
        $('.shuffle-checkbox').each((i, elem) => {
        	let checked = elem.checked,
        		group   = checked ? elem.getAttribute('data-group') : 'all';
        	this.shuffle.filter(group);
        });
    }
    
    _showPlaceholders() {
        if (this.grid.height() === 0) {
            $('.shuffle-grid-placeholder').show();
        } else {
            $('.shuffle-grid-placeholder').hide();
        }
    }
    
    run() {
		this._search();
        this._sort();
        this._filterCompleted();
        this._showPlaceholders();
    }
}


if ($('#shuffle-grid').length === 1) {
    let shuffleGrid = new ShuffleGrid('#shuffle-grid');
    
	$('.shuffle-checkbox').on('change', function() {
		shuffleGrid.run();
	});

	$('#shuffle-sort').on('change', function() {
        shuffleGrid.run();
	});

	$('#shuffle-search').on('keyup', function() {
		shuffleGrid.run();
	});
    
    $(window).on('load', function() {
        shuffleGrid.shuffle.update();
    })
}