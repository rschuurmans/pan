var demo = {
	init:function () {
		console.log('demo?');
		// created by Benimation
//		
		var r = 0;
		var rdir = true;

		var screen = document.querySelector('.screen');
	


		window.addEventListener("deviceorientation", handleOrientation, true);
		
		function handleOrientation(event) {
			var absolute = event.absolute;
			if (event.alpha > 180 && event.alpha < 360) {
				var alpha = Math.round(Math.abs(event.alpha/360*255));
				
			} else {
				var alpha = Math.round(Math.abs((360-event.alpha)/360*255));
				
			}
			if (Math.abs(event.beta) > 90 && Math.abs(event.beta) < 180) {
				var beta = Math.round((Math.abs(event.beta/90*255)-225));
				
			} else {
				var beta = Math.round(((180-Math.abs(event.beta))/90*255)-225);
				
			}
			if (Math.abs(event.gamma) > 90 && Math.abs(event.gamma) < 180) {
				var gamma = Math.round(Math.abs(event.gamma/90*255));
				
			} else {
				var gamma = Math.round(((180-Math.abs(event.gamma))/90*255)-255);
				
			}
			
			newColor = "rgba(" + beta + "," + alpha + "," + gamma + ",1.00)";
			
			console.log(alpha, beta, gamma);
			
			// $(".screen").css("background-color", newColor);
			

			screen.style.backgroundColor = newColor;
			
			if (event.alpha > 160 && event.alpha < 180) {
				console.log("north");
				// $(".screen").trigger("click");
				screen.click()
				
			}
			
		}


// To the extent possible under law, the person who associated CC0 with this work has waived all copyright and related or neighboring rights to this work.

// $(document).ready(function(e) {
// 	var r = 0;
// 	var rdir = true;
// 	$(".screen").mousemove(function(event) {
		
		
// 		if (r < 256) {
// 			if (rdir == true) {
// 				r++
// 			} else {
// 				r--
// 			}
			
// 		} else {
// 			rdir = false;
// 			r--;
			
// 		}
		
// 		if (r < 1) {
// 			rdir =  true;
			
// 		}
		
// 		rcolor = r;
		
// 		newColor = "rgba(" + rcolor + "," + gcolor + "," + bcolor + ",1.00)";
		
// 		$(".screen").css("background-color", newColor);
		
// 	});
	
	
	
// 	window.addEventListener("deviceorientation", handleOrientation, true);
	
// 	function handleOrientation(event) {
// 		var absolute = event.absolute;
// 		if (event.alpha > 180 && event.alpha < 360) {
// 			var alpha = Math.round(Math.abs(event.alpha/360*255));
			
// 		} else {
// 			var alpha = Math.round(Math.abs((360-event.alpha)/360*255));
			
// 		}
// 		if (Math.abs(event.beta) > 90 && Math.abs(event.beta) < 180) {
// 			var beta = Math.round((Math.abs(event.beta/90*255)-225));
			
// 		} else {
// 			var beta = Math.round(((180-Math.abs(event.beta))/90*255)-225);
			
// 		}
// 		if (Math.abs(event.gamma) > 90 && Math.abs(event.gamma) < 180) {
// 			var gamma = Math.round(Math.abs(event.gamma/90*255));
			
// 		} else {
// 			var gamma = Math.round(((180-Math.abs(event.gamma))/90*255)-255);
			
// 		}
		
// 		newColor = "rgba(" + beta + "," + alpha + "," + gamma + ",1.00)";
		
// 		console.log(event.alpha);
		
// 		$(".screen").css("background-color", newColor);
		
// 		if (event.alpha > 160 && event.alpha < 180) {
// 			console.log("north");
// 			$(".screen").trigger("click");
			
// 		}
		
// 	}
	
// 	// $(".screen").vibrate("short");
    
// });

	}
}
demo.init();

