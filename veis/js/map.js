window.addEventListener('load',function () {
	const mapSlider = document.querySelector('.map__slider'),
		  viewSlider = document.querySelector('.view__slider'),
		  mapBtnLeft = document.querySelector('.map__left'),
		  mapBtnRight = document.querySelector('.map__right'),
		  viewLeft = document.querySelector('.view__left'),
		  viewRight = document.querySelector('.view__right'),
		  commetIteam = document.querySelectorAll('.comment__iteam'),
		  commetFoto = document.querySelectorAll('.comment__iteam_foto_block');

	let step = 0;
	let step2 = 0;
	let endTime = '2020-12-18';
	let videoLink = `
		<iframe src="https://www.youtube.com/embed/6CSyVxdaAVs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	`;

	for(let i = 0; i < commetIteam.length; i++){
		// console.log(commetIteam[i].offsetHeight,commetIteam[i])
		if(commetIteam[i].clientHeight < 707 && commetIteam[i].classList.contains('subtext') === false){
			commetIteam[i].querySelector('.comment__iteam_text').style.height = '224px'
		}
	}

	for(let i = 0; i < commetFoto.length; i++){
		commetFoto[i].addEventListener('click', () => {	
			let foto = commetFoto[i].querySelector('img');
			let modal =  document.querySelector('.modal'),
			  	close = document.querySelector('.close');

			close.addEventListener('click', closeModa)

			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';

			let img = document.createElement('img');
			img.setAttribute('src',foto.getAttribute('src'))
			img.classList.add('comment__big');

			modal.querySelector('.video__block').classList.add('comment__big_block');
			modal.querySelector('.video__block').append(img);

			function closeModa() {
				modal.querySelector('.video__block').classList.add('comment__big_block');
				modal.querySelector('.video__block').innerHTML = '';

				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		})
	}

	const changeFoto = (fotos,iteam) =>{
		const foto = document.querySelectorAll(fotos),
			  mainFoto  = document.querySelector(iteam);

		for(let i = 0; i < foto.length; i++){
			if(foto[i].classList.length == 1){
				foto[i].addEventListener('click',clickFoto);
			}
		}
		function clickFoto(e) {
			mainFoto.setAttribute('src', e.target.src) 
		}
	};
	changeFoto('.slider__iteam','#main__foto')

	const modal = (selector) =>{
		const icon = document.querySelector(selector),
			  modal = document.querySelector('.modal'),
			  close = document.querySelector('.close');

		if(icon.classList.length == 2){
			icon.addEventListener('click', openModal);
			close.addEventListener('click', closeModal);

			function openModal(){
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';

				modal.querySelector('.video__block').innerHTML = videoLink;

				modal.querySelector('.modal__iteam').style.width = '100%';
				modal.querySelector('.modal__iteam').style.height = '100%';
			}
			function closeModal(){
				modal.querySelector('.video__block').innerHTML = '';

				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}

		}else{

			icon.addEventListener('click', openModal);
			close.addEventListener('click', closeModal);

			function openModal(){
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';

				console.log(modal.querySelector('.load'))

				let img = document.createElement('img');
				img.setAttribute('src',icon.getAttribute('src'))
				img.classList.add('big__foto');

				modal.querySelector('.video__block').append(img);

			}
			function closeModal(){
				modal.querySelector('.video__block').innerHTML = '';

				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		}
			
	};
	modal('.map__iteam_foto img');
	modal('.slider__iteam');

	const moveSlide = (iteam,btn,btn2,move) => {
		let foto = iteam.children,
			styles = foto[0].currentStyle || window.getComputedStyle(foto[0]),
		    stepsum = Math.round(foto[0].clientWidth + (+styles.marginRight.replace(/px/g, '')));
		let maxSlide;

		if(window.innerHeight <= 426){
			maxSlide = Math.round(iteam.clientWidth - (1 * stepsum));
		}else{
			maxSlide = Math.round(iteam.clientWidth - (4 * stepsum));
		}
		btn.addEventListener('click', moveLeft);
		btn2.addEventListener('click', moveRight);

		function moveRight(){
		console.log(maxSlide)
			move += -stepsum;
			if(move <= -maxSlide){
				move = -maxSlide;
			}
			console.log(move)

			iteam.style.transform = 'translateX(' + move + 'px)';
		}

		function moveLeft(){
			move += stepsum;
			if(move >= 0){
				move = 0;
			}


			console.log(move)
			iteam.style.transform = 'translateX(' + move + 'px)';
		}
	};

	// moveSlide(mapSlider,mapBtnLeft,mapBtnRight,step);
	moveSlide(viewSlider,viewLeft,viewRight,step2);

	if(!document.querySelector('.clock__days #day')) return;

	const addZero = (num) =>{
		if(num <= 9){
			return "0" + num;
		}else{
			return num;
		}
	}

	const getTimeRemaining = (endTime) =>{
		const t = Date.parse(endTime) - Date.parse(new Date()),
		  	  minutes = Math.floor((t/1000/60) % 60),
		  	  hours = Math.floor((t/(1000 * 60 * 60)) % 24),
		  	  days = Math.floor((t/(1000 * 60 * 60 * 24)));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes
		};
	};
	const setClock = (selector,endTime) =>{
		const timer = document.querySelector(selector),
			  days = timer.querySelector('.clock__days #day'),
			  hour = timer.querySelector('.clock__days #hour'),
			  minutes = timer.querySelector('.clock__days #min'),
			  timeInterval = setInterval(updateClock,1000);

		updateClock();
		function updateClock(){
			const t = getTimeRemaining(endTime);

			days.textContent = addZero(t.days);
			hour.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);

			if(t.total <= 0){
				days.textContent = "00";
				hour.textContent = "00";
				minutes.textContent = "00";

				clearInterval(timeInterval);
			}
		}
	};

	if(commetIteam.length > 4){
		$('.comment__inner').slick({
			infinite: true,
			arrows: true,
			prevArrow: $('.comment__conteiner .left'),
			nextArrow: $('.comment__conteiner .right'),
		  	variableWidth: true,
			contain: true,
			speed: 400,
	  	});
	}

	$('.map__slider').slick({
		infinite: true,
		arrows: true,
		prevArrow: $('.map__left'),
		nextArrow: $('.map__right'),
	  	variableWidth: true,
		speed: 400,
  	});


	const addFix = (iteam, iteam2) => {
		const mapIteam = document.querySelector(iteam),
			  mapDesp = document.querySelector(iteam2);
		
		let scrollLenght = mapIteam.clientHeight - (mapDesp.clientHeight + document.querySelector('.map__iteam2_top').clientHeight + 40);
		if(scrollLenght < 0){
			window.addEventListener('scroll', (e) => {
				if(scrollY >= 300 && scrollY <= 300 + (-scrollLenght)){
					mapIteam.classList.add('fixed__map');
				}else{
					mapIteam.classList.remove('fixed__map');
				}
			})
		}else{
			document.querySelector('.map__iteam2_top').style.position = "static"
			return;
		}
	};

	addFix('.map__main_iteam', '.map__iteam2_bottom')
	setClock('#media__clock',endTime);
	setClock('#deckstop__clock',endTime);

});