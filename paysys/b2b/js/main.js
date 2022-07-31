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
window.addEventListener('load', () => {
	function openModal (iteam, iteam2) {
		const triger = document.querySelectorAll(iteam),
		      modal = document.querySelector('.modal'),
		      modalChild = modal.children;

		function open (event, data) {
			event.preventDefault();

			for(let i = 0; i < modalChild.length; i++){
				if(data){
					if(modalChild[i].dataset.kind === 'question'){
						modalChild[i].style.display = "block";
					}
				}else{
					if(modalChild[i].dataset.kind === 'notwork'){
						modalChild[i].style.display = "block";
					}
				}
			}

			modal.style.display = 'flex';

			setTimeout(() => {
				modal.classList.add('open');
			}, 10)
		}

		function close (event) {
			if(event.target.classList.contains('modal') || event.target.classList.contains(iteam2)){
				modal.classList.remove('open');

				setTimeout(() => {
					modal.style.display = 'none';
					for(let i = 0; i < modalChild.length; i++){
						modalChild[i].style.display = 'none';
					}
				}, 400)
			}
		}

		for(let i = 0; i < triger.length; i++){
			triger[i].addEventListener('click', (e) => {
				open(e, triger[i].dataset.open)
			})
		}

		modal.addEventListener('click', close)

	}

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

	function showHidden (iteam, iteam2) {
		const trigger = document.querySelector(iteam),
		  	  hiddenBlock = document.querySelector(iteam2);

		if(trigger === null && hiddenBlock === null) return undefined;

		trigger.addEventListener('click', () => {
			hiddenBlock.classList.add('active');
		});
	}

	const tabs = (iteam, iteam2, className) => {
		const tabsBtn = document.querySelectorAll(iteam),
			  content = document.querySelectorAll(iteam2);

		for(let i = 0; i < tabsBtn.length; i++){
			tabsBtn[i].addEventListener('click', () => {
				changeTab(i)
			})
		}

		function changeTab (index) {
			document.querySelector("." + className).classList.remove(className);
			tabsBtn[index].classList.add(className);


			document.querySelector(".show").style.display = "none";
			document.querySelector(".show").classList.remove('show');

			content[index].style.display = "block";
			setTimeout(() => {
				content[index].classList.add('show')
			}, 10)
		}
	}

	const scroll = (iteam) => {
		const infoBtn = document.querySelector(iteam);
		let blocks = document.querySelectorAll("section");
		let scrollArr = [];

		for(let i = 0; i < blocks.length; i++){
			scrollArr.push(blocks[i].offsetTop) 
		}

		infoBtn.addEventListener('click', countScroll);

		document.querySelector("#connect_btn").addEventListener('click', () => {
			scrollto(1024, window.scrollY);
		});

		function countScroll() {
			let scrollInfo = window.scrollY;
			let scrollRange = 0;
			for(let i = 0; i < scrollArr.length; i++){
				if(scrollInfo < scrollArr[i]){
					scrollRange = scrollArr[i];
					break;
				}
			}
			scrollto(scrollRange, scrollInfo)
			console.log(scrollRange, scrollInfo)
		};
		function scrollto(range, scrolled) {
			let interval = setInterval(function () {
				let interator = scrolled += 40;
				window.scrollTo(0, scrolled)
				if(scrolled >= range){
					clearInterval(interval)
				}
			}, 20)
		}

	}

	const checkInput = () => {
		let allBtn = document.querySelector('#chooseAll');
		let inputs = document.querySelectorAll('.form__block input:not(#chooseAll)');
		let blocksArr = document.querySelectorAll('.form__block:not(.notrequire)');
		let next = document.querySelector('#next');
		let slider = document.querySelector('.choose__block_slider');
		let back = document.querySelector('.choose__block_back');
		let results = {};


		function sliderMove (e) {
			let px = (e.target.id === "next") ? -1130 : 0;
			let test = (e.target.id === "next") ? 'Оставьте свой номер телефона и мы свяжемся с вами в ближайшее время' : 'Выберите начинку для вашего нового бизнеса';

			slider.style.transform = 'translateX(' + px +'px)';
			document.querySelector('.choose__block_content h2').textContent = test;
		}

		function check () {
			if (this.type === "checkbox" || this.type === "radio" ) {
				results[this.parentElement.parentElement.id] = true;
			}else {
				results[this.parentElement.id] = this.checkValidity();
			}

			let values = Object.values(results);
			
			for(let i = 0; i < values.length - 2; i++){
				if(values[i] !== true) return;
			}

			document.querySelector('.form__submit').classList.add('active__btn');
			document.querySelector('.form__submit').disabled = false;

			for(let i = 0; i < values.length; i++){
				if(values[i] !== true) return;
			}

			document.querySelector('#send').classList.add('active__btn');
			document.querySelector('#send').disabled = false;
		}


		for(let i = 0; i < blocksArr.length; i++){
			results[blocksArr[i].id] = false;
		}

		for(let i = 0; i < inputs.length; i++){
			inputs[i].addEventListener('change', check)
		}

		allBtn.addEventListener('change', () => {
			let inputs = document.querySelectorAll('.block2 .form__box input');

			for(let i = 0; i < inputs.length; i++){
				inputs[i].checked = allBtn.checked;
				results[inputs[i].parentElement.parentElement.id] = true;
			}
		})

		next.addEventListener('click', sliderMove)

		back.addEventListener('click', sliderMove)


	}

	function closeLoader (iteam) {
		const loader = document.querySelector(iteam);
		let time2 = new Date().getTime();
		let difference = time2 - time;
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
	function frame() {
		let iframeTag = document.createElement('iframe');
		iframeTag.src = 'gifs/home_page.gif';
		iframeTag.classList.add('iframe');
		document.querySelector('.header__intro_right').append(iframeTag);


		iframeTag.onload = function () {
			document.querySelector('iframe').style.display = "block";
			let iframe = document.querySelector('iframe').contentWindow.window.document.documentElement;
			iframe.style.overflow = 'hidden';
			iframe.querySelector('img').style.width = '275px';
			iframe.querySelector('img').style.height = '260px';
			iframe.querySelector('img').style.borderRadius = "47px";
			iframe.querySelector('img').style.boxShadow = 'rgb(0 0 0 / 25%) 0px 4px 4px';
			iframe.querySelector('img').style.objectFit = 'cover';

			document.querySelector('.header__intro_right img[alt="home_page.gif"]').style.display = "none";
		}
	}
	
	frame();
	chnageFavicon();
	closeLoader('.loader');
	openModal('.open__modal', 'close__modal');
	showHidden('.developers__side', '.hidden__banner')

	if(!document.querySelector('#index')) return;

	checkInput();
	scroll('.down__icon');
	tabs('.payments__inner_right_top_iteam', '.payments__inner_block', 'active_tab');
});