(function(){
	// setup client side form validation
	function createMaskedInput(selector,mask,testFunc,options){

		// extend options
		options = options || {};

		$.extend(options,{
			"oncomplete": function(){
				//console.log('complete');
				if (!testFunc || testFunc.call(this)){
					$(this).removeClass('invalid').addClass('valid');
				} else{
					$(this).removeClass('valid').addClass('invalid');
				}
			},
			"onincomplete": function(){
				//console.log('incomplete');
				if (this.value != ""){
					$(this).removeClass('valid').addClass('invalid');
				}
			},
			"oncleared": function(){
				//console.log('scleared');
				$(this).removeClass('valid').removeClass('invalid');
			},
			"greedy": false
		});
		
		// remove previous mask
		$(selector).inputmask('remove');
		
		$(selector).inputmask(mask,options);
	}

	var specialRequiredClasses = ['dollars','integer'];

	function markRequired(selector){

		var selector = selector || "";
		
		$(selector+'input.required').each(function(){
			if (this.value == ''){
				$(this).addClass('invalid');
			}
		});
		
		// bind change
		$(selector+'input.required').on('keyup change blur',function(event){
			if (this.value != ''){

				var self = this;

				// validation flag is set
				if ($(this).data('validation')){
					return;
				}
				
				var specialClassIntersection = specialRequiredClasses.filter(function(className){
						return self.classList.contains(className);
				});
				
				// only if it's not masked or special masked class
				if (!$(this).inputmask("hasMaskedValue") || (specialClassIntersection.length != 0)){
					$(this).removeClass('invalid').addClass('valid');
				}
			} else {
				$(this).removeClass('valid').addClass('invalid');
			}
		});
	}
	
	function checkAllInputsValid(){
		
		var invalidItems = $('input.invalid');

		if (invalidItems.length > 0){
			// focus on first invalid
			$(invalidItems[0]).focus();
			return false;
		}

		return true;
	}

	function addValidation(selector,func){

		// add validation flag
		$(selector).data('validation',true);
		
		$(selector).on('keyup change blur',function(event){

			if (this.value == ""){
				$(this).removeClass('invalid').removeClass('valid');
				return;
			}
			
			if (func.call(this)){
				$(this).removeClass('invalid').addClass('valid');
			} else{
				$(this).removeClass('valid').addClass('invalid');
			}
		});
	}

	function markUrls(){
		$('input.url').on('keyup change blur',function(event){

			if (this.value == ""){
				$(this).removeClass('valid').removeClass('invalid');
			}
			
			if (urlRegEx.test(this.value)){
				$(this).removeClass('invalid').addClass('valid');
			} else{
				$(this).removeClass('valid').addClass('invalid');
			}
		});
	}



	function startValidation(){
		//datepicker
		createMaskedInput('input.datepicker','9[9]-9[9]-9999');
		
		// turn 
		createMaskedInput('input.turn','9[99]');
		// phone 
		createMaskedInput('input.phone','(999)-999-9999');
		// zip code
		createMaskedInput('input.zip_code','99999[9999]');
		// tax id
		createMaskedInput('input.tax_id','99-9999999');
		// alias
		createMaskedInput('input.alias','A[AAAAA]');
		
		// percantage
		$('input.percantage').on('change', function(){
			var n = parseFloat($(this).val());
			if(n >= 0 && n <= 100){
				$(this).val(n + '%').addClass('valid');
			}else{
				$(this).val(n + '%').addClass('invalid');				
			}
		});
		
		$('input.percantage').on('keyup', function(){
			$(this).removeClass('valid invalid');
		});

		// dollars
		createMaskedInput('input.dollars','$[9][9][9][9][9][9][9][9][.][9][9]');

		// pounds
		createMaskedInput('input.pounds','£[9][9][9][9][9][9][9][9][.][9][9]');

		
		// integers
		createMaskedInput('input.integer','integer');
		
		// rate
		createMaskedInput('input.rate','1.999');
		
		// url
		var urlRegEx = /([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i;
		var urlRegEx2 = "^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$";
		addValidation('input.url',function(){
			return urlRegEx.test(this.value);
		});

		// email
		//var emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		addValidation('input.email',function(){
			return emailRegEx.test(this.value);
		});

		//mark required
		//markRequired();

	}
	
	// default input maskes based on class
	$(document).ready(function() {
		startValidation();
	
	});

	window.fuf = window.fuf || {};
	window.fuf.markRequired = markRequired;


}());
