/**
 * A class for handling shuffleable grids.
 */
class ShuffleGrid {
    
    constructor(selector) {
        this.grid = $(selector);
        this.sizer = this.grid.find('.grid-item').first();
        this.shuffle = new shuffle(this.grid, {
            itemSelector: '.grid-item',
            sizer: this.sizer
        });
        this.run();
    }
    
    /**
     * Sort grid items according to selected sort option.
     */
    _sort() {
    	let element = $("#shuffle-sort option:selected")[0],
    		reverse = element.getAttribute("data-reverse") || false,
            options = { 
                by: function(element) {
            		let res = element.getAttribute("data-sortby");
            		return $.isNumeric(res) ? parseFloat(res) : res;
                }, 
                reverse: reverse 
            };
    	this.shuffle.sort(options);
    };
    
    /**
     * Return true if the element contains all search terms, false otherwise.
     */
    _search(elem) {
		let text  = $('#shuffle-search').val().toLowerCase(),
            words = text.split(' ');

        for (var i = 0; i < words.length; i++) {
            if (elem.text().toLowerCase().indexOf(words[i]) === -1) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Return true if an element should be shown, false otherwise.
     */
    _filter(elem) {
        let filter = true;
        $('.shuffle-checkbox').each((i, checkbox) => {
        	let checked = checkbox.checked,
        		group   = checkbox.getAttribute('data-group');
            
            if (checked && !elem.data('groups').includes(group)) {
                filter = false;
            }
        });
        return filter;
    }
    
    /**
     * Show placeholders if there are no visible grid items.
     */
    _showPlaceholders() {
        
        if (this.grid.find('.shuffle-item--visible').length) {
            $('#shuffle-grid-placeholders').hide();
        } else {
            $('#shuffle-grid-placeholders').show();
        }
    }
    
    run() {
        this.shuffle.filter((elem) => {
            return this._filter($(elem)) && this._search($(elem));
        });
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
    	let element = $("#shuffle-sort option:selected")[0],
    		reverse = element.getAttribute("data-reverse") || false,
            sortBy  = element.getAttribute("data-sortby"),
            rows    = this.table.find('tbody tr:not(.no-data)');
        
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
     * Return true if an element should be shown, false otherwise.
     */
    _filter(row) {
        let filter = true;
        $('.shuffle-checkbox').each((i, elem) => {
        	let checked = elem.checked,
        		group   = checked ? elem.getAttribute('data-group') : 'all';
            
            if (!row.data('groups').includes(group)) {
                filter = false;
            }
        });
        return filter;
    }
    
    /**
     * Hide rows if filtered or search terms not found, otherwise show and sort.
     */
    run() {
        this.table.find('tbody tr:not(.no-data)').each((i, row) => {
            if (this._filter($(row)) && this._search($(row))) {
                this._sort();
                $(row).removeClass('hidden');
            } else {
                $(row).addClass('hidden');
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