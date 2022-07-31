const letters = document.querySelectorAll('.loader__inner span');
let time = new Date().getTime();
let interval = setInterval(() => {
	for(let i = 0; i < letters.length; i++){
		letters[i].classList.remove('animation__start');
		setTimeout(() => {
			letters[i].classList.add('animation__start');
		}, 100)
	}
}, 5000)
setTimeout(() => {
	for(let i = 0; i < letters.length; i++){
		letters[i].style.display = "block";
	}
}, 400)
window.addEventListener('load', function() {
	let mySwiper = new Swiper('.swiper-container', {
	  	slidesPerView: 'auto',
	  	grabCursor: true,
	  	loop: true,
	  	centeredSlides: true,
	})

	function chnageFavicon () {
		let link = document.querySelector('link[rel="shortcut icon"]');
		let index = 1;

		let interval = setInterval(() => {
			index++
			if(index > 8){
				index = 1;
			}
			link.href = "img/icons/icon" + index + ".png"
		}, 200)
	}

	// function openModal (iteam, iteam2) {
	// 	const triger = document.querySelectorAll(iteam),
	// 	      modal = document.querySelector('.modal');
	// 	let triggered;

	// 	function open (event, data) {
	// 		console.log(data)
	// 		triggered = data;
	// 		event.preventDefault();
	// 		modal.style.display = 'flex';
	// 		if(data){
	// 			modal.classList.add('request');
	// 		}

	// 		setTimeout(() => {
	// 			modal.classList.add('open');
	// 		}, 10)
	// 	}

	// 	function close (event, data) {
	// 		console.log(data)
	// 		if(event.target.classList.contains(data ? null : 'modal') || event.target.classList.contains(iteam2)){
	// 			modal.classList.remove('open');

	// 			setTimeout(() => {
	// 				modal.style.display = 'none';
	// 				modal.classList.remove('request');
	// 			}, 400)
	// 		}
	// 	}

	// 	for(let i = 0; i < triger.length; i++){
	// 		triger[i].addEventListener('click', (event) => {
	// 			open(event, triger[i].dataset.kind)	
	// 		})
	// 	}

	// 	modal.addEventListener('click', (event) => {
	// 		close(event, triggered)
	// 	})
	// }

	function openModal (iteam, iteam2, iteam3) {
		const trigger = document.querySelectorAll(iteam),
			  modal = document.querySelector(iteam2);


		const open = (event) => {
			event.preventDefault();
			modal.style.display = 'flex';

			setTimeout(() => {
				modal.classList.add('open');
			}, 10)

			if (event.target.dataset.kind) {
				modal.querySelector(`[data-kind="${event.target.dataset.kind}"]`).style.display = 'block'
			}else{
				modal.querySelector(`[data-kind="notwork"]`).style.display = 'block'
			}

		}

		const close = (event) => {
			if(event.target.classList.contains('modal') || event.target.classList.contains(iteam3)){
				modal.classList.remove('open');

				setTimeout(() => {
					modal.style.display = 'none';
					for(let i = 0; i < modal.children.length; i++){
						modal.children[i].style.display = 'none'
					}
				}, 400)
			}
		}

		for(let i = 0; i < trigger.length; i++){
			trigger[i].addEventListener('click', open);
		}

		modal.addEventListener('click', (event) => {
			close(event)
		})
	}

	function closeLoader (iteam) {
		const loader = document.querySelector(iteam);
		let time2 = new Date().getTime();
		let difference = time2 - time;
		console.log(difference)
		if(difference >= 3010){
			clear();
		}else if(difference >= 1200 && difference <= 3000){
			document.querySelector('.loader__inner').classList.add('fast__load');
			setTimeout(clear(), 2400)

		}else if(difference >= 1 && difference <= 1200){
			clear();
		}

		function clear () {
			loader.style.display = 'none'
			document.body.style.overflow = 'auto';
			clearInterval(interval);
		}
	}

	function tabSwitcher(tabsContainer, BodiesContainer, active) {
	    let tab = tabsContainer.children;
	    let body = BodiesContainer.children;
	    if (tab.length != body.length) {
	        throw new Error('tabs and bodies are not equal');
	    }

	    function deactivateElement(index) {
	        for (let i = 0; i < tab.length; i++) {
	            if (i != index) {
	                tab[i].classList.remove(active);
	                body[i].classList.remove(active);
	            }
	        }
	    }

	    for (let i = 0; i < tab.length; i++) {
	        tab[i].addEventListener('click', () => {
	            deactivateElement(i);
	            tab[i].classList.add(active);
	            body[i].classList.add(active);
	        });
	    }
	}

	function formSubmit (iteam) {
		const submitBtn = document.querySelector(iteam);

		submitBtn.addEventListener("submit", (e) => {
			e.preventDefault();
		})
	}
	

	chnageFavicon();
	closeLoader('.loader');
	formSubmit('#submit')
	openModal('.open__modal', '.modal' ,'close__modal');
	tabSwitcher(document.querySelector('.tabs'), document.querySelector('.bodies'), 'active');
})