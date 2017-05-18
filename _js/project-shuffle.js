import shuffle from 'shufflejs';

let ps;

/**
 * A class for handling project shuffle grids and tables.
 */
class ProjectShuffle {

    constructor(gridSelector, tableSelector) {
        this.grid = $(gridSelector);
        this.table = $(tableSelector);
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
    _sortGridItems() {
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
    }

    /**
     * Sort table rows according to selected sort option.
     */
    _sortTableRow() {
    	let element = $("#shuffle-sort option:selected")[0],
    		reverse = element.getAttribute("data-reverse") || false,
            sortBy  = element.getAttribute("data-sortby");

        let sortedTable = this.table.find('tbody tr').sort(function(a, b) {
            if (reverse) {
                return b.getAttribute(`data-${sortBy}`) - a.getAttribute(`data-${sortBy}`);
            } else {
                return a.getAttribute(`data-${sortBy}`) - b.getAttribute(`data-${sortBy}`);
            }
        });

        this.table.find('tbody').first().html(sortedTable);
        this.table.find('tbody').append(this.table.find('tbody tr.no-data'));
    }

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
    _showGridPlaceholders() {

        if (this.grid.find('.shuffle-item--visible').length) {
            $('#shuffle-grid-placeholders').hide();
        } else {
            $('#shuffle-grid-placeholders').show();
        }
    }

    /**
     * Filter and sort grid items and table rows.
     */
    run() {
        this.table.find('tbody tr:not(.no-data)').each((i, row) => {
            if (this._filter($(row)) && this._search($(row))) {
                this._sortTableRow();
                $(row).removeClass('hidden');
            } else {
                $(row).addClass('hidden');
            }
        });

        this.shuffle.filter((elem) => {
            return this._filter($(elem)) && this._search($(elem));
        });
        this._sortGridItems();
        this._showGridPlaceholders();
    }
}


if ($('.shuffle-controls').length === 1) {
    let projectShuffle = new ProjectShuffle('#shuffle-grid', '#shuffle-table');

	$('.shuffle-control').on('change keyup', function() {
		projectShuffle.run();
	});

    $('.shuffle-tab').on('shown.bs.tab', function() {
        projectShuffle.run();
        projectShuffle.shuffle.update();
    });

    $(window).on('load', function() {
        projectShuffle.shuffle.update();
    });
}

export default ps;
