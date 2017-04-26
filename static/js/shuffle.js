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
    
    /**
     * Show placeholders if there are no visible grid items.
     */
    _showPlaceholders() {
        if (this.grid.height() === 0) {
            $('.shuffle-grid-placeholder').show();
        } else {
            $('.shuffle-grid-placeholder').hide();
        }
    }
    
    run() {
        this._filterCompleted();
		this._search();
        this._sort();
        this._showPlaceholders();
    }
}


/**
 * A class for handling shuffleable tables.
 */
class ShuffleTable {
    
    constructor(selector) {
        this.table = $(selector);
        this.run();
    }
    
    /**
     * Sort rows according to selected sort option.
     */
    _sort() {
    	let element      = $("#shuffle-sort option:selected")[0],
    		reverse      = element.getAttribute("data-reverse") || false,
            sortBy       = element.getAttribute("data-sortby"),
            rows         = this.table.find('tbody tr:not(.no-data)');
        
        let sortedTable = this.table.find('tbody tr').sort(function(a, b) {
            if (reverse) {
                return b.getAttribute(`data-${sortBy}`) - a.getAttribute(`data-${sortBy}`);
            } else {
                return a.getAttribute(`data-${sortBy}`) - b.getAttribute(`data-${sortBy}`);
            }
        });
        
        this.table.find('tbody').first().html(sortedTable);
    };
    
    /**
     * Return true if the row contains all search terms, false otherwise.
     */
    _search(row) {
		let text  = $('#shuffle-search').val().toLowerCase(),
            words = text.split(' ');
        
        for (var i = 0; i < words.length; i++) {
            if (row.text().toLowerCase().indexOf(words[i]) === -1) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Return true if the row should be filtered out, false otherwise.
     */
    _filter(row) {
        let filter = false;
        $('.shuffle-checkbox').each((i, elem) => {
        	let checked = elem.checked,
        		group   = checked ? elem.getAttribute('data-group') : 'all';
            
            if (!row.data('groups').includes(group)) {
                filter = true;
            }
        });
        return filter;
    }
    
    /**
     * Hide rows if filtered or search terms not found, otherwise show and sort.
     */
    run() {
        this.table.find('tbody tr:not(.no-data)').each((i, row) => {
            if (this._filter($(row)) || !this._search($(row))) {
                $(row).addClass('hidden');
            } else {
                this._sort();
                $(row).removeClass('hidden');
            }
        });
    }
}


if ($('#project-shuffle').length === 1) {
    let shuffleGrid  = new ShuffleGrid('#shuffle-grid'),
        shuffleTable = new ShuffleTable('#shuffle-table');
    
	$('.shuffle-control').on('change keyup', function() {
		shuffleGrid.run();
        shuffleTable.run();
	});
    
    $('.shuffle-tab').on('shown.bs.tab', function() {
        shuffleGrid.run();
        shuffleTable.run();
        shuffleGrid.shuffle.update();
    });
    
    $(window).on('load', function() {
        shuffleGrid.shuffle.update();
    })
}