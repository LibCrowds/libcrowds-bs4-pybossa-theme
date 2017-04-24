/**
 * A class for handling shuffleable tables.
 */
class ShuffleTable {
    
    constructor(selector) {
        this.table = $(selector);
        this.run();
    }
    
    _sort() {
    	let element = $("#shuffle-sort option:selected")[0],
    		reverse = true ? element.getAttribute("data-reverse") : false,
            sortBy  = element.getAttribute("data-sortby"),
            rows    = this.table.find('tbody tr:not(.no-data)');
        
        for (var i = 0; i < rows.length; i++) {
            let sortnr = parseFloat(rows[i].text());
        }
    };
    
    _search() {
		let text  = $('#shuffle-search').val().toLowerCase(),
            words = text.split(' ');
        
        console.log(this.table)
        this.table.find('tbody tr:not(.no-data)').each(function() {
            console.log($(this))
            for (var i = 0; i < words.length; i++) {
                if ($(this).text().toLowerCase().indexOf(words[i]) === -1) {
                    $(this).addClass('hidden');
                    return;
                }
            }
            $(this).removeClass('hidden');
        });
    }
    
    _filterCompleted() {
        $('.shuffle-checkbox').each((i, elem) => {
        	let checked = elem.checked,
        		group   = checked ? elem.getAttribute('data-group') : 'all';
            this.table.find('tbody tr:not(.no-data)').each(function() {
                if (!$(this).data('groups').includes(group)) {
                    $(this).addClass('hidden');
                    return;
                }
                $(this).removeClass('hidden');
            });
        });
    }
    
    run() {
		this._search();
        // this._sort();
        this._filterCompleted();
    }
}


$('.shuffle-table').each(function() {
    let id           = $(this).attr('id'),
        shuffleTable = new ShuffleTable(id);
    
	$('.shuffle-checkbox').on('change', function() {
		shuffleTable.run();
	});

	$('#shuffle-sort').on('change', function() {
        shuffleTable.run();
	});

	$('#shuffle-search').on('keyup', function() {
		shuffleTable.run();
	});
});