

$(function() {

	'use strict';


	var pageNum = $('.lightbox > li').length;

	var totalNum = 114;

	$('.js-total-count').text(totalNum);

	var selecta = {
		init :  function() {

		$('.bulkbar-select').click(function() {
			var $this = $(this);
			var numSelected = selecta.getNumSelected();
			if ( numSelected === pageNum ) {
				$this.removeClass('all some');
				selecta.selectAll(false);
			} else {
				$this.removeClass('some');
				$this.addClass('all');
				selecta.selectAll(true);
			}
			return false;
		});

		$('.lightbox input[type=checkbox]').click(function() {
			if( $(this).prop('checked')) {
				$(this).parents('li').addClass('is-selected');
			} else {
				$(this).parents('li').removeClass('is-selected');
			}

			selecta.updateCount();
		});

		$('.js-clear-full-select').click(function() {
			selecta.selectAll(false);
			selecta.updateCount();
			return false;
		});

		$('.js-do-full-select').click(function() {
			selecta.selectAll(true);
			$('.muted').addClass('highlight');
			$('.js-select-count').text(totalNum);
			$('.full-select-mode').hide();
			$('.full-select-done').show();

			return false;
		});

		},

		getNumSelected : function() {
			// returns the number of selected assets
			return $('.lightbox input[type=checkbox]:checked').length;
		},

		revertFullSelection : function() {
			$('.full-select-mode').hide();
			$('.full-select-done').hide();
			$('.muted').removeClass('highlight');
		},

		updateCount : function() {
			// Update the page count
			var count = selecta.getNumSelectedd();
			$('.js-select-count').text(count);

			if( count > 0 && count != pageNum ) {
				$('.bulkbar-select').removeClass('all').addClass('some');
				$('.full-select-mode').hide();	
			}
			if ( count === pageNum && totalNum > pageNum ) {
				$('.full-select-mode').show();
			}

			if (count === 0) {
				selecta.revertFullSelection();
				$('.bulkbar-select').removeClass('all some');
			}

		},

		selectAll : function(bool) {
			// Select or deselect all assets
			$('.lightbox input[type=checkbox]').prop('checked',false);

			// Should they be green?
			if(bool) {
				$('.lightbox > li').addClass('is-selected');
			} else {
				$('.lightbox > li').removeClass('is-selected');
			}

			// Update the page count
			selecta.updateCount();
		},
	};


	selecta.init();


});