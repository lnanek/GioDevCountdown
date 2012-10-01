var isDragging;

var logo;

var logoReplacement;

var body;

var PHONE_IMAGES = [
"193004.jpg", 
"272006.jpg",
"279006.jpg",
"293003.jpg",
"293004.jpg",
"302002.jpg",
"311006.jpg",
"345006.jpg",
"358001.jpg",
"420004.jpg",
"444002.jpg",
"58003.jpg",
"608002.jpg",
"72002.jpg",
"850005.jpg",
"850008.jpg",
"892058.jpg"
];

var currentRandomIndex = -1;

var currentUserPhoneElement;

var bits = [];

var MAX_BITS = 50;

var nextBitIndex = 0;

var allBitsCreated;

var digits = [];

//Resizing the screen is more important on Android,
//so don't eat the touch events. It also doesn't have the default Firefox
//behavior of letting users drag a ghost of an image to their desktops,
//which interferes with our dragging...
function isAndroid() {
    return navigator.userAgent.toLowerCase().search("android") > -1;
}

function handleMouseOverDigit(element, id) {
	
	var digit = document.getElementById(id);
	var phone = document.getElementById(id + 'Phone');
	digit.style.display = "none";

	if (element != currentUserPhoneElement) {

		var newRandomIndex;
		do {
			newRandomIndex = Math.floor(Math.random() * PHONE_IMAGES.length);
		} while ( newRandomIndex == currentRandomIndex );
		currentRandomIndex = newRandomIndex;
	}
	currentUserPhoneElement = element;

	var randomPhone = PHONE_IMAGES[currentRandomIndex];
	phone.src = "phones/" + randomPhone;
	phone.style.width = "100%";
	
	element.onmouseout = function() {
		digit.style.display = "";
		phone.src = "images/nexus_one.jpg"
		phone.style.width = "100%";
		element.onmouseout = null;
	}
}

function handleTouchStart(e) {
	isDragging = true;
	logo.style.position = "absolute";
	logo.style.left = e.touches[e.touches.length].pageX - logo.width/2 + "px";
	logo.style.top = e.touches[e.touches.length].pageY - logo.height/2 + "px";
	logoReplacement.style.display = "inline";
	
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function handleMouseDown(e) {
	isDragging = true;
	logo.style.position = "absolute";
	logo.style.left = e.pageX - logo.width/2 + "px";
	logo.style.top = e.pageY - logo.height/2 + "px";
	logoReplacement.style.display = "inline";
	
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function handleMouseUp(e) {
	isDragging = false;
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function handleTouchMove(e) {
	if (null == logo || !isDragging) {
		return false;
	}
		

	logo.style.left = e.touches[e.touches.length].pageX - logo.width / 2 + "px";
	logo.style.top = e.touches[e.touches.length].pageY -logo.height / 2 + "px";;
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function handleMouseMove(e) {
	if (null == logo || !isDragging) {
		return false;
	}
		

	logo.style.left = e.pageX - logo.width / 2 + "px";
	logo.style.top = e.pageY - logo.height / 2 + "px";;
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function animateBits() {

	var maxXSpeed = screen.width / 50;

	var maxYSpeed = screen.height / 50;

	var minXSpeed = screen.width / 100;

	var minYSpeed = screen.height / 100;

	var newBit;
	if (!allBitsCreated) {
		newBit = new Object();
		newBit.img = document.createElement('img');
		newBit.img.className = "flyingBit";
		newBit.img.src = Math.floor(Math.random() * 2) == 0 ? "images/bit_0.png" : "images/bit_1.png";
		newBit.img.onmousedown = noDrag;
	} else {
		newBit = bits[nextBitIndex];
		newBit.img.style.display = "inline"
	}
	
	var logoLocation = getElementLocation(logo);
	newBit.x = logoLocation.left + 3 * logo.width / 4;
	newBit.y = logoLocation.top + logo.height / 2;
	newBit.img.style.left = newBit.x + 'px';
	newBit.img.style.top = newBit.y + 'px';
	
	var target = digits[Math.floor(Math.random() * digits.length)];
	var targetLocation = getElementLocation(target);
	newBit.targetX = targetLocation.left + target.width / 2 - newBit.img.width / 2;
	newBit.targetY = targetLocation.top - newBit.img.height / 2;
	
	if (!allBitsCreated) {
		body.appendChild(newBit.img);
	}
	
	bits[nextBitIndex] = newBit;
	var speed = 10 + Math.floor(Math.random() * 40);
	
	newBit.speedX = (newBit.targetX - newBit.x) / speed;
	newBit.speedY = (newBit.targetY - newBit.y) / speed;
	if ( newBit.speedY < 0 ) {

		newBit.y = logoLocation.top + logo.height / 4 - newBit.img.height;
		newBit.img.style.top = newBit.y + 'px';
		
		newBit.targetY = targetLocation.top + target.height - newBit.img.height / 2;
		newBit.speedY = (newBit.targetY - newBit.y) / speed;
		
	}
	
	nextBitIndex++;
	if ( nextBitIndex >= MAX_BITS ) {
		nextBitIndex = 0;
		allBitsCreated = true;
	}
	
	for( var i in bits ) {
		var bit = bits[i];
		
		bit.x += bit.speedX;
		bit.y += bit.speedY;
		bit.img.style.left = bit.x + 'px';
		bit.img.style.top = bit.y + 'px';					
		
		var pastX = false;
		if ( bit.speedX <= 0 ) {
			if ( bit.x <= bit.targetX ) {
				pastX = true;
			}
		} else if ( bit.x >= bit.targetX ) {
			pastX = true;
		}
		
		var pastY = false;
		if ( bit.speedY <= 0 ) {
			if ( bit.y <= bit.targetY ) {
				pastY = true;
			}
		} else if ( bit.y >= bit.targetY ) {
			pastY = true;
		}
		
		if ( pastX && pastY ) {
			bit.img.style.display = "none"
		}
	}

}

function noDrag(e) {
	if ( !isAndroid() ) {
		e.preventDefault();
	}
}

function handleLoad() {
	logo = document.getElementById('logoImage');
	logoReplacement = document.getElementById('logoReplacement');
	body = document.getElementById('body');
	
	digits[0] = document.getElementById('digitDaysHundredsPhone');
	digits[1] = document.getElementById('digitDaysTensPhone');
	digits[2] = document.getElementById('digitDaysOnesPhone');
	digits[3] = document.getElementById('digitHoursTensPhone');
	digits[4] = document.getElementById('digitHoursOnesPhone');
	digits[5] = document.getElementById('digitMinutesTensPhone');
	digits[6] = document.getElementById('digitMinutesOnesPhone');
	digits[7] = document.getElementById('digitSecondsTensPhone');
	digits[8] = document.getElementById('digitSecondsOnesPhone');
	
	animateBits();
	setInterval(animateBits, 100);
}

function getElementLocation( element ) {
	var left = 0;
	var top = 0;
	if ( element.offsetParent ) {
		do {
			left += element.offsetLeft;
			top += element.offsetTop;
		} while ( element = element.offsetParent );
	}
		
	var result = new Object();
	result.left = left;
	result.top = top;
	return result;
}
