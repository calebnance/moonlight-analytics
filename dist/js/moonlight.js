(function() {
	var movements = {
		current : {
			x : 0,
			y : 0
		},
		past : []
	};
	var x, y, xC, yC, xD, yD, winH, winW, docH, docW, docOST, docOSL, idleCounter;
	var milliseconds = clicked = clickedDBL = 0;
	
	// Set function for every time mouse moves
	window.onmouseout	= handleMouseOut;
	window.onmousemove	= handleMouseMove;
	window.onclick		= handleOnClick;
	window.ondblclick	= handleDBLClick;
	
	// User went off screen
	function handleMouseOut(event){
		//console.log('_-------------------------------------_');
		//console.log(event);
		//console.log('_-------------------------------------_');

		// stop counter
		window.clearTimeout(idleCounter);
	}

	function handleOnClick(event){
		clicked++;
	}

	function handleDBLClick(event){
		clickedDBL++;
	}

	function handleMouseMove(event){
		event	= event || window.event; // IE-ism
		x		= event.clientX;
		y		= event.clientY;
		xC		= movements.current.x;
		yC		= movements.current.y;

		// Browser Window
		winH	= window.innerHeight;
		winW	= window.innerWidth;

		// Document height and width
		docH	= (document.height !== undefined) ? document.height : document.body.offsetHeight;
		docW	= (document.width !== undefined) ? document.width : document.body.offsetWidth;
		docOST	= (document.body.scrollTop !== undefined) ? document.body.scrollTop : window.pageXOffset;
		docOSL	= (document.body.scrollLeft !== undefined) ? document.body.scrollLeft : window.pageYOffset;

		xD		= x + docOST;
		yD		= y + docOSL;


		//var docOffSet2 = document.documentElement.scrollTop;

		console.log('-------');
		console.log('document');
		console.log('doc h:', docH);
		console.log('doc w:', docW);
		console.log('doc off set top:', docOST);
		console.log('doc off set left:', docOSL);
		console.log('win h:', winH);
		console.log('win w:', winW);
		console.log('-------');

		// User went off screen
		/*
		if(x <= 6 || y <= 6 || x > (window.innerWidth - 2) || y > (window.innerHeight - 2)){
			// stop counter
			window.clearTimeout(idleCounter);

			console.log('at the edge or off the page');
			// fire something here to stop the whole thing
			return false;
		}
		*/

		// Has the mouse moved at least 5px in any direction
		if(x > (xC + 5) || x < (xC - 5) || y > (yC + 5) || y < (yC - 5)){
			//console.log(milliseconds);
			// At 300 milliseconds, let's at least record it
			if(milliseconds >= 300){
				//console.log('LONGER THAN HALF A SECOND');
				var entry = {
					x : x,
					y : y,
					milliseconds : milliseconds,
					clicks : clicked,
					clicksdbl : clickedDBL,
					browser : {
						name : navigator.appName,
						codeName : navigator.appCodeName,
						appVersion : navigator.appVersion,
						language : navigator.language,
						platform : navigator.platform,
						engineName : navigator.product,
						userAgent : navigator.userAgent,
						OS : window.navigator.oscpu
					}
				}
				movements.past.push(entry);

				//console.log('-------');
				//console.log(navigator.userAgent);
				//console.log('-------');
				//console.log('movements');
				//console.log(movements);
				//console.log('-------');
			}
			// Start to see how long the mouse is idle for
			milliseconds = clicked = clickedDBL = 0;
			window.clearTimeout(idleCounter);
			idleCounter = setInterval(idleMouse, 100);
			movements.current.x = x;
			movements.current.y = y;

			// DEBUG START
			console.log('x:', x);
			console.log('y:', y);
			console.log('------');
			console.log('xC:', xC);
			console.log('yC:', yC);
			console.log('------');
			//console.log(event);
			//console.log('------');
			//console.log('movements');
			//console.log(movements);
			//console.log('------');
			//console.log('screen');
			//console.log(screen);
			//console.log('------');
			//console.log('window');
			//console.log(window);
			//console.log('window width:', window.innerWidth);
			//console.log('window height:', window.innerHeight)
			//console.log('------');
			// DEBUG END
		}
	}

	// Seconds timer
	function idleMouse(){
		milliseconds += 100;
		//console.log('milliseconds:', milliseconds);
	}

	/*
	document.getElementById("demo").onclick = function(e) {
		e.preventDefault();
		console.log(e);
		return false;
	};
	*/
	
})();