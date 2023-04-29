var imagePath = '';
var stepsCounter = 1;
var random = 1;
var imagesMax = 13;
var selectedMode = 'Default';
$(document).ready(function() {
	random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	arrangeImages();
	$('.prev-record').html(getCookie('minclick'));
})

function arrangeImages() {
	var divs = [];
	for (var i = 1; i <= 9; i++) {
		var div = $('<div></div>');
		div.id = 'parent_'.i;
		div.addClass('col-my-4 position-relative box');
		if(i != 9){
			var image = $('<img>');
			image.attr('src', imagePath+`image/${i}.jpg`);
			image.addClass('w-100 h-100 part-images');
			image.appendTo(div);

			var num = $('<label></label>');
			num.html(i);
			num.addClass('tag-number');
			if(selectedMode == 'Standard' || selectedMode == 'Hard')
				num.hide();
			num.appendTo(div);
		}
		else{
			var blank = $('<div></div>');
			blank.addClass('w-100 h-100');
			blank.html('&nbsp;');
			blank.appendTo(div);
		}
		divs.push(div);
	}
	var randomIndex = generateUniqueRandomNumbers();
	for (var i = 0; i < randomIndex.length; i++) {
		divs[randomIndex[i]].attr('id', i+1);
		divs[randomIndex[i]].appendTo($('#content'));
	}
	divs[8].attr('id', 9);
	divs[8].appendTo($('#content'));
}

function generateUniqueRandomNumbers() {
    let numbers = [];
    while (numbers.length < 8) {
        let randomNumber = Math.floor(Math.random() * 8);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    return numbers;
}

$(document).on('click', '.box', function() {
	var index = $(this).attr('id');
	updateArrangement(index);
	checkMatched();
})

function updateArrangement(index) {
	var nextThirdIndex = parseInt(index)+3;
	var prevThirdIndex = parseInt(index)-3;
	var nextIndex = parseInt(index)+1;
	var prevIndex = parseInt(index)-1;

	

	if((nextThirdIndex <= 9) && $(`#${nextThirdIndex} > img`).length <= 0){
		var prevHTML = $(`#${index}`).html();
		$(`#${index}`).html($(`#${nextThirdIndex}`).html());
		$(`#${nextThirdIndex}`).html(prevHTML);
		$('.steps').html(stepsCounter++);
	}
	else if((prevThirdIndex >=1) && $(`#${prevThirdIndex} > img`).length <= 0){
		var prevHTML = $(`#${index}`).html();
		$(`#${index}`).html($(`#${prevThirdIndex}`).html());
		$(`#${prevThirdIndex}`).html(prevHTML);
		$('.steps').html(stepsCounter++);
	}
	else if((nextIndex <= 9) && (index % 3 != 0) && $(`#${nextIndex} > img`).length <= 0){
		var prevHTML = $(`#${index}`).html();
		$(`#${index}`).html($(`#${nextIndex}`).html());
		$(`#${nextIndex}`).html(prevHTML);
		$('.steps').html(stepsCounter++);
	}
	else if((prevIndex >= 1) && index != 4 && index != 7 && $(`#${prevIndex} > img`).length <= 0){
		var prevHTML = $(`#${index}`).html();
		$(`#${index}`).html($(`#${prevIndex}`).html());
		$(`#${prevIndex}`).html(prevHTML);
		$('.steps').html(stepsCounter++);
	}

	if(selectedMode == 'Hard'){
		let target = $('.target').html();
		if(stepsCounter > target){
			showFailure();
			$('#start_new').show();
		}
	}
}

function checkMatched() {
	var f = 0;
	$('.box').each(function(index, box) {
		if($(this).find('.tag-number').length == 0 || $(this).find('.tag-number').text() != (index+1)){
			if((index < 8))
				f = 1;
		}
	});
	if(f == 1){
		// console.log('nope! not yet!');
		return false;
	}
	else{
		fillLast();
		celebrate();
		return true;
	}

}

function celebrate() {
	let prev = getCookie('minclick');
	prev = parseInt(prev);
	let steps = (stepsCounter-1);
	if(steps!=0 && steps < prev){
		setCookie('minclick', steps, 365);
		$('.prev-record').html(steps);
	}
	else if(steps == 0){
		setCookie('minclick', steps, 365);
		$('.prev-record').html(steps);
	}
	Swal.fire({
	  title: 'WOW! You Did It!',
	  text: `You took ${(stepsCounter-1)} moves to solve it.`,
	  imageUrl: 'success.gif',
	  imageWidth: 400,
	  imageHeight: 225,
	  imageAlt: 'Success',
	})
	$('#start_new').show();
	$('.confetti').show();
	confettiExplosion(origin);
}

function fillLast() {
	var div = $('#9');
	div.html('');
	var image = $('<img>');
	image.attr('src',  imagePath+`image/9.jpg`);
	image.addClass('w-100 h-100');
	image.appendTo(div);

	var num = $('<label></label>');
	num.html(9);
	num.addClass('tag-number');
	if(selectedMode == 'Standard'  || selectedMode == 'Hard')
		num.hide();	
	num.appendTo(div);
}

$(document).on('click', '#restart_this', function(event) {
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
});

function clearArrangement() {
	stepsCounter = 0;
	$('#content').html('');
	$('.steps').html(stepsCounter++);
}

$(document).on('click', '#restart_other', function(event) {
	var oldRand = random;
	random = Math.floor(Math.random() * imagesMax) + 1;
	if(random == oldRand)
		random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
});

$(document).on('click', '#start_new', function(event) {
	var oldRand = random;
	random = Math.floor(Math.random() * imagesMax) + 1;
	if(random == oldRand)
		random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
});

function stopCelebrate() {
	$('#start_new').hide();
	$('.confetti').hide();
}


// confetti js

const defaults = {
  disableForReducedMotion: true
};

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(200 * particleRatio)
    })
  );
}

function confettiExplosion(origin) {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin
  });
  fire(0.2, {
    spread: 60,
    origin
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    origin
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    origin
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    origin
  });
}


// custom select js

function create_custom_dropdowns() {
  $('.select').each(function(i, select) {
    if (!$(this).next().hasClass('dropdown')) {
      $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
      var dropdown = $(this).next();
      var options = $(select).find('option');
      var selected = $(this).find('option:selected');
      dropdown.find('.current').html(selected.data('display-text') || selected.text());
      options.each(function(j, o) {
        var display = $(o).data('display-text') || '';
        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
      });
    }
  });
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown', function(event) {
  $('.dropdown').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('.option').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('.option').removeAttr('tabindex');
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on('click', function(event) {
  if ($(event.target).closest('.dropdown').length === 0) {
    $('.dropdown').removeClass('open');
    $('.dropdown .option').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Option click
$(document).on('click', '.dropdown .option', function(event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('.dropdown').find('.current').text(text);
  $(this).closest('.dropdown').prev('.select').val($(this).data('value')).trigger('change');
  changeMode(text);
});

// Keyboard events
$(document).on('keydown', '.dropdown', function(event) {
  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
    if ($(this).hasClass('open')) {
      focused_option.trigger('click');
    } else {
      $(this).trigger('click');
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
      focused_option.prev().focus();
    }
    return false;
  // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
      $(this).trigger('click');
    }
    return false;
  }
});

$(document).ready(function() {
  create_custom_dropdowns();
});


function changeMode(mode) {
	selectedMode = mode;
	switch (mode) {
		case 'Mode':
			easyMode();
			break;
		case 'Standard':
			standardMode();
			break;
		case 'Hard':
			hardMode()
			break;
		default:
			defaultMode();
			break;
	}
}

function easyMode() {
	var oldRand = random;
	random = Math.floor(Math.random() * imagesMax) + 1;
	if(random == oldRand)
		random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
	hideTarget();
}

function standardMode() {
	var oldRand = random;
	random = Math.floor(Math.random() * imagesMax) + 1;
	if(random == oldRand)
		random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
	hideTarget();
}

function hardMode() {
	var oldRand = random;
	random = Math.floor(Math.random() * imagesMax) + 1;
	if(random == oldRand)
		random = Math.floor(Math.random() * imagesMax) + 1;
	imagePath = 'image_'+random+'/';
	$('#imagePreview').attr('src', imagePath+'/image.jpeg');
	clearArrangement();
	arrangeImages();
	stopCelebrate();
	showTarget();
}

function showTarget() {
	var target = getRandomInt(70,130);
	$('.target').html(target);
	$('#hardTarget').removeClass('d-none');
	$('#hardTarget').addClass('d-inline-block');
	Swal.fire({
	  title: "Challenge",
	  text: `Solve the puzzle in ${target} clicks`,
	  icon : 'info'
	});
}

function hideTarget() {
	$('#hardTarget').removeClass('d-inline-block');
	$('#hardTarget').addClass('d-none');
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showFailure() {


    Swal.fire({
	  title: "You couldn't make it.",
	  text: `Don't loose hope. You can try it again`,
	  icon : 'warning',
	  showCancelButton: false,
	  confirmButtonText: 'Try Again!',
	  // cancelButtonText: 'Give Up!',
	}).then((result) => {
	  if (result.isConfirmed) {
	    hardMode();
	  }
	})
}




function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    console.log(name + "=" + (value || "")  + expires + "; path=/");
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return 0;
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/shuffled/service-worker.js')
            .then(reg => {
                console.log('Registration succeeded. Scope is ' + reg.scope);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}


self.addEventListener("fetch", (event) => {
  console.log(`Handling fetch event for ${event.request.url}`);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Found response in cache:", response);
        return response;
      }
      console.log("No response found in cache. About to fetch from network…");

      return fetch(event.request)
        .then((response) => {
          console.log("Response from network is:", response);

          return response;
        })
        .catch((error) => {
          console.error(`Fetching failed: ${error}`);
          throw error;
        });
    })
  );
});