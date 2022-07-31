window.addEventListener('load',function(){

	const productIteam = document.querySelectorAll('.product__iteam'),
		  introFoto = document.querySelectorAll('.intro__foto'),
		  leftArrow = document.querySelector('.left__arrow'),
		  rightArrow = document.querySelector('.right__arrow'),
		  blogIteam = document.querySelectorAll('.blog__iteam'),
		  blogInner = document.querySelector('.blog__slider'),
		  blogLeft = document.querySelector('.blog__left'),
		  tabs = document.querySelectorAll('.tab'),
		  blogRight = document.querySelector('.blog__right');

	let index = 0;
	let priseKind; 

	if(!leftArrow) return;

	for(let i = 0; i < productIteam.length; i++){
		if(productIteam[i].querySelector('.product__prise').classList.length <= 1){
			if(innerWidth >= 660){
				productIteam[i].querySelector('.product__prise').previousElementSibling.style.marginBottom = 'auto';
			}
		}
	}
	document.querySelector('.intro__slider_block2').style.display = 'block';

	for(let i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', () => {
			if(i == 0){
				document.querySelector('.intro__slider_block .slick-list .slick-track').classList.remove('hide_slider');
				document.querySelector('.intro__slider_block2 .slick-list .slick-track').classList.add('hide_slider');

  				$('.intro__slider_block').slick('slickPlay');
  				$('.intro__slider_block2').slick('slickPause');

				document.querySelector('.intro__control').classList.remove('hide');
  				document.querySelector('.intro__control2').classList.add('hide');

			}else if( i == 1){
				document.querySelector('.intro__slider_block .slick-list .slick-track').classList.add('hide_slider');
				document.querySelector('.intro__slider_block2 .slick-list .slick-track').classList.remove('hide_slider');

				$('.intro__slider_block').slick('slickPause');
  				$('.intro__slider_block2').slick('slickPlay');

  				document.querySelector('.intro__control2').classList.remove('hide');
  				document.querySelector('.intro__control').classList.add('hide');
			}

		});
	}

	$('.intro__slider_block').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow: $('.intro__control .left__arrow'),
		nextArrow: $('.intro__control .right__arrow'),
		speed: 600,
		pauseOnHover: true
  	});

  	$('.intro__slider_block2').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow: $('.intro__control2 .left__arrow2'),
		nextArrow: $('.intro__control2 .right__arrow2'),
		speed: 600,
		pauseOnHover: true
  	});
  	$('.intro__slider_block2').slick('slickPause');

  	if(innerWidth <= 560){
	  	$('.mobile__blog_slide').slick({
			infinite: true,
			arrows: true,
			prevArrow: $('.slider_left'),
			nextArrow: $('.slider_right'),
	  	});
  	}


  	document.querySelector('.intro__slider_block2 .slick-list .slick-track').classList.add('hide_slider')
  	
  	const changeFoto = (iteam) => {
  		const clickIteam = document.querySelectorAll(iteam);

  		for(let i = 0; i < clickIteam.length; i++){
  			clickIteam[i].addEventListener('click', () => {
  				change(i)
  			});
  		}

  		function change (index) {
  			let parent = clickIteam[index].offsetParent.offsetParent.offsetParent;
  			parent.querySelector('img').setAttribute('src', clickIteam[index].src)
  		}
  	}

  	const productSorting = (iteam, iteam2, class1, class2, btn = false) => {
  		const title = document.querySelectorAll(iteam),
  			  subtitle  = document.querySelectorAll(iteam2);

  		for(let i = 0; i < title.length; i++){
  			title[i].addEventListener('click', (e) => { 
  				changeActive(i,e)
  			});
  		}

  		for(let i = 0; i < subtitle.length; i++){
  			subtitle[i].addEventListener('click', (e) => { 
  				changeActive(i,e)
  			});
  		}
  		function changeActive (index,e) {
  			if(e.target.parentElement.parentElement.classList.contains('product__king') === true){
	  			for(let i = 0; i < title.length; i++){
	  				title[i].classList.remove(class1)
	  			}
	  			title[index].classList.add(class1)
  			}else if(e.target.parentElement.parentElement.classList.contains('product__name') === true || 
  				e.target.parentElement.parentElement.classList.contains('blog__subtitle') === true){
  				for(let i = 0; i < subtitle.length; i++){
	  				subtitle[i].classList.remove(class2);
	  			}
	  			subtitle[index].classList.add(class2)

	  			if(btn){
	  				const button = document.querySelector(btn);
	  				button.textContent = subtitle[index].textContent
	  			}
  			}
  		}
  	};

  	const slider = (iteam, parent) => {
		const sliderIteam = document.querySelectorAll(iteam),
			  leftBtn = document.querySelector('.slider_left'),
			  rightBtn = document.querySelector('.slider_right'),
			  parentElem = document.querySelector(parent);

		let counter = 0;

		for(let i = 0; i < sliderIteam.length; i++){
			if(i === 1){
				sliderIteam[i].classList.add('right_1');
			}
			if(i === 2){
				sliderIteam[i].classList.add('right_2');
			}
			if(i === sliderIteam.length - 1){
				sliderIteam[i].classList.add('left_1');
			}
			if(i === sliderIteam.length - 2){
				sliderIteam[i].classList.add('left_2');
			}
			sliderIteam[i].addEventListener('click',() => {
				clikedElem(i);
			});
		}

		function clikedElem (index) {
			sliderIteam[index].classList.add('center');
			let classIteam = sliderIteam[index].classList[1].split('_');
			if(classIteam.includes('right') === true){
				
				for(let i = 0; i < sliderIteam.length; i++){
					sliderIteam[i].className = 'blog__slider_iteam';
				}

				sliderIteam[index].classList.add('center')

				if (!parentElem.querySelector('.center').nextElementSibling) {
					sliderIteam[0].className = 'blog__slider_iteam right_1'
				}else{
					parentElem.querySelector('.center').nextElementSibling.className = 'blog__slider_iteam right_1';
				}

				if(parentElem.querySelector('.center').nextElementSibling === null){
					sliderIteam[1].className = 'blog__slider_iteam right_2'
				}else{
					if (!parentElem.querySelector('.center').nextElementSibling.nextElementSibling) {
						sliderIteam[0].className = 'blog__slider_iteam right_2'
					}else{
						parentElem.querySelector('.center').nextElementSibling.nextElementSibling.className = 'blog__slider_iteam right_2';
					}
				}
				
				if(!parentElem.querySelector('.center').previousElementSibling){
					sliderIteam[sliderIteam.length - 1].className = 'blog__slider_iteam left_1'
				}else{
					parentElem.querySelector('.center').previousElementSibling.className = 'blog__slider_iteam left_1';
				}

				if(parentElem.querySelector('.center').previousElementSibling === null){
					sliderIteam[sliderIteam.length - 2].className = 'blog__slider_iteam left_2'
				}else{
					if (!parentElem.querySelector('.center').previousElementSibling.previousElementSibling) {
						sliderIteam[sliderIteam.length - 1].className = 'blog__slider_iteam left_2'
					}else{
						parentElem.querySelector('.center').previousElementSibling.previousElementSibling.className = 'blog__slider_iteam left_2';
					}

				}

			}else if (classIteam.includes('left') === true) {
				for(let i = 0; i < sliderIteam.length; i++){
					sliderIteam[i].className = 'blog__slider_iteam';
				}

				sliderIteam[index].classList.add('center')

				if (!parentElem.querySelector('.center').nextElementSibling) {
					sliderIteam[0].className = 'blog__slider_iteam right_1'
				}else{
					parentElem.querySelector('.center').nextElementSibling.className = 'blog__slider_iteam right_1';
				}

				if(parentElem.querySelector('.center').nextElementSibling === null){
					sliderIteam[1].className = 'blog__slider_iteam right_2'
				}else{
					if (!parentElem.querySelector('.center').nextElementSibling.nextElementSibling) {
						sliderIteam[0].className = 'blog__slider_iteam right_2'
					}else{
						parentElem.querySelector('.center').nextElementSibling.nextElementSibling.className = 'blog__slider_iteam right_2';
					}
				}
				
				if(!parentElem.querySelector('.center').previousElementSibling){
					sliderIteam[sliderIteam.length - 1].className = 'blog__slider_iteam left_1'
				}else{
					parentElem.querySelector('.center').previousElementSibling.className = 'blog__slider_iteam left_1';
				}
				
				if(parentElem.querySelector('.center').previousElementSibling === null){
					sliderIteam[sliderIteam.length - 2].className = 'blog__slider_iteam left_2'
				}else{
					if (!parentElem.querySelector('.center').previousElementSibling.previousElementSibling) {
						sliderIteam[sliderIteam.length - 1].className = 'blog__slider_iteam left_2'
					}else{
						parentElem.querySelector('.center').previousElementSibling.previousElementSibling.className = 'blog__slider_iteam left_2';
					}

				}
			}


		}

		function moveRight() {
			
			parentElem.querySelector('.left_2').classList.remove('left_2');

			parentElem.querySelector('.left_1').classList.add('left_2');
			parentElem.querySelector('.left_1').classList.remove('left_1');

			parentElem.querySelector('.center').classList.add('left_1');
			parentElem.querySelector('.center').classList.remove('center');


			parentElem.querySelector('.right_1').classList.add('center');
			parentElem.querySelector('.right_1').classList.remove('right_1');

			parentElem.querySelector('.right_2').classList.add('right_1');

			if(!parentElem.querySelector('.right_2').nextElementSibling){
				parentElem.querySelector('.right_2').classList.remove('right_2');
				parentElem.querySelector('.blog__slider_iteam').classList.add('right_2')
			}else{
				parentElem.querySelector('.right_2').nextElementSibling.classList.add('right_2');
				parentElem.querySelector('.right_2').classList.remove('right_2');
			}
			
		}
		function moveLeft() {
			parentElem.querySelector('.right_2').classList.remove('right_2');

			parentElem.querySelector('.right_1').classList.add('right_2');
			parentElem.querySelector('.right_1').classList.remove('right_1');


			parentElem.querySelector('.center').classList.add('right_1');
			parentElem.querySelector('.center').classList.remove('center');

			parentElem.querySelector('.left_1').classList.add('center');
			parentElem.querySelector('.left_1').classList.remove('left_1');

			parentElem.querySelector('.left_2').classList.add('left_1');

			if(!parentElem.querySelector('.left_2').previousElementSibling){
				parentElem.querySelector('.left_2').classList.remove('left_2');
				sliderIteam[sliderIteam.length - 1].classList.add('left_2')
			}else{
				parentElem.querySelector('.left_2').classList.remove('left_2');
				parentElem.querySelector('.left_1').previousElementSibling.classList.add('left_2');
			}
			
		}

		rightBtn.addEventListener('click',moveRight);
		leftBtn.addEventListener('click',moveLeft);
	};

	const checkProducts = (iteam) => {
		// let counter = 5;
		// let start = 2;

		const productInner = document.querySelectorAll(iteam);

		for(let i = 0; i < productInner.length; i++){
			let productColorIteam = productInner[i].querySelectorAll('img:not(.product__hide_icon)');
			if(productColorIteam.length <= 6){
				productInner[i].parentElement.querySelector('.product__hide_icon').style.display = "none";
			}else if(productColorIteam.length >= 7){
				changeProduct(productColorIteam);		
			}
		}
		function changeProduct (iteam) {
			let counter = 5;
			let start = 2;
			for(let i = 0; i < iteam.length; i++){
				if(i >= 5){
					iteam[i].style.display = 'none';
				}
			}
			let div = document.createElement('div');
			div.classList.add('product__icon_box');
			div.classList.add('product__hide_arrow')
			let img = document.createElement('img');
			img.classList.add('product__hide_icon');
			img.src = "img/left.svg";

			div.append(img);
			iteam[0].parentElement.prepend(div)


			let productIcon = iteam[iteam.length - 1].nextElementSibling.querySelector('img');

			productIcon.addEventListener('click',() => {
				changeRight(iteam, productIcon)
			})
			iteam[0].previousElementSibling.addEventListener('click',() => {
				changeLeft(iteam, iteam[0].previousElementSibling)
			});
			function changeRight(iteam,iteam2) {
				if(start <= 0){
					start = 2;
				}
				if(counter <= 4){
					counter = 5;
				}
				for(let i = 0; i < iteam.length; i++){
					iteam[i].style.display = 'none';
				}
				for(let i = counter; i >= start; i--){
					iteam[i].style.display = 'block';
				}
				iteam[0].previousElementSibling.classList.remove('product__hide_arrow');
				
				counter++;
				if(counter >= iteam.length - 1){
					iteam2.parentElement.classList.add('product__hide_arrow')
					iteam[counter].style.display = 'block';
				}
				start++;
			}
			function changeLeft(iteam,iteam2) {
				counter--;
				start--;
				for(let i = 0; i < iteam.length; i++){
					iteam[i].style.display = 'none';
				}
				if(counter <= 5){
					iteam2.classList.add('product__hide_arrow')
					iteam[counter - 1].style.display = 'block';
					counter = 4;
					start = 0;
				}
				for(let i = counter; i >= start; i--){
					iteam[i].style.display = 'block';
				}
				iteam[iteam.length - 1].nextElementSibling.classList.remove('product__hide_arrow');
			}
		}
	}
  	
  	if(window.innerWidth <= 1800 ||
  		document.querySelector('.brands__slide').clientWidth > document.querySelector('.brands__name').clientWidth){

  		const runLine = (iteam) => {
	  		const brandBlock =  document.querySelector(iteam),
	  			  brandIteam = document.querySelector('.brands__block1');

	  		let counter = 0;
	  		let hovered = false;
	  		let a = 1;
	  		let b = 2;
	  		let a2 = 1;
	  		let b2 = 2;
	  		let array = [];
	  		let cliked = false;
	  		let interatot = 2;

	  		document.querySelector('.brands__name').addEventListener('mouseenter',() => {
	  			hovered = true;
	  		});

	  		document.querySelector('.brands__name').addEventListener('mouseleave',() => {
	  			hovered = false;
	  			brandMove();
	  		});

  			document.querySelector('.brands__name').addEventListener('mousedown',() => {
	  			cliked = true;
  				hovered = true;

	  		});
	  		window.addEventListener('mouseup',() => {
	  			cliked = false;
	  			array = [];
	  		});

	  		window.addEventListener('mousemove',movePosition);

	  		let div = document.createElement('div');
	  		div.classList.add('brands__block2');
	  		div.innerHTML = brandIteam.innerHTML;
	  		brandBlock.append(div);
  			let brandIteam2  = document.querySelector('.brands__block2');
  			let links = brandBlock.querySelectorAll('a');

  			for(let i = 0; i < links.length; i++){
	  			links[i].addEventListener("dragstart", (event) => {
				    event.preventDefault();

	  			});
  			}
  			
  			document.querySelector('.brands__name').addEventListener("touchend", (e) => {
	  			hovered = false;
	  			brandMove();
  			})

	  		document.querySelector('.brands__name').addEventListener("touchmove", (e) => {
	  			hovered = true;
  				array.push(e.touches[0].clientX);

	  			if(counter > (-200)){
	  				brandIteam2.style.transform = 'translateX(' + 0  + 'px)';
	  			}
  				if(counter <=  (brandIteam.clientWidth * -1) * a){
	  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2) * (b / 2) + 'px)';
	  				a += 2
	  			}
	  			if(counter <=  (brandIteam2.clientWidth * -1) * b){
	  				console.log('cvbcvb')
	  				brandIteam2.style.transform = 'translateX(' + brandIteam.clientWidth * 2 * (b / 2)   + 'px)';
	  				b += 2
	  			}
	  			if(counter > 0){
						brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';

	  				if(counter >=  (brandIteam.clientWidth) * a2){
		  				console.log('asd')
		  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2) + 'px)';
		  				a2 += 2
		  			}
		  			if(counter >=  (brandIteam2.clientWidth) * b2){
		  				console.log('cvbcvb')
		  				brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';
		  				b2 += 2
		  			}
	  			}

  				if(array[array.length - 2] - e.touches[0].clientX < 0){

  					counter += 7;
  					brandBlock.style.transform = 'translateX(' + counter + 'px)';
  				}else{

  					counter -= 7;
  					brandBlock.style.transform = 'translateX(' + counter + 'px)';
  				}
	  		});

	  		function movePosition(e) {
	  			let a2 = 1;
	  			let b2 = 2;

	  			if(cliked){
	  				hovered = true;
	  				array.push(e.clientX);

		  			if(counter > (-200)){
		  				console.log('dfgdfg')
		  				brandIteam2.style.transform = 'translateX(' + 0  + 'px)';
		  			}
	  				if(counter <=  (brandIteam.clientWidth * -1) * a){
		  				console.log('asd')
		  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2) * (b / 2) + 'px)';
		  				a += 2
		  			}
		  			if(counter <=  (brandIteam2.clientWidth * -1) * b){
		  				console.log('cvbcvb')
		  				brandIteam2.style.transform = 'translateX(' + brandIteam.clientWidth * 2 * (b / 2)   + 'px)';
		  				b += 2
		  			}
		  			if(counter > 0){
  						brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';

		  				if(counter >=  (brandIteam.clientWidth) * a2){
			  				console.log('asd')
			  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2) + 'px)';
			  				a2 += 2
			  			}
			  			if(counter >=  (brandIteam2.clientWidth) * b2){
			  				console.log('cvbcvb')
			  				brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';
			  				b2 += 2
			  			}
		  			}

	  				if(array[array.length - 2] - e.clientX < 0){

	  					counter += 7;
	  					brandBlock.style.transform = 'translateX(' + counter + 'px)';
	  				}else{

	  					counter -= 7;
	  					brandBlock.style.transform = 'translateX(' + counter + 'px)';
	  				}
	  			}
	  		}

	  		

	  		function brandMove () {
	  			// console.log(hovered)
	  			let num = ((Math.ceil(brandIteam.clientWidth / interatot)) * interatot) - brandIteam.clientWidth;
	  			if(hovered){
		  			return;
	  			}else{

	  				if(counter > (-200)){
		  				brandIteam2.style.transform = 'translateX(' + 0  + 'px)';
		  			}
		  			if(counter <=  (brandIteam.clientWidth * -1) * a){
		  				console.log('asd')
		  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2) * (b / 2) + 'px)';
		  				a += 2
		  			}
		  			if(counter <=  (brandIteam2.clientWidth * -1) * b){
		  				console.log('cvbcvb')
		  				brandIteam2.style.transform = 'translateX(' + brandIteam.clientWidth * 2 * (b / 2)   + 'px)';
		  				b += 2
		  			}
		  			if(counter > 0){
  						brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';

		  				if(counter >=  (brandIteam.clientWidth) * a2){
			  				console.log('asd')
			  				brandIteam.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2) + 'px)';
			  				a2 += 2
			  			}
			  			if(counter >=  (brandIteam2.clientWidth) * b2){
			  				console.log('cvbcvb')
			  				brandIteam2.style.transform = 'translateX(' + (brandIteam.clientWidth * 2 * -1) * (b2 / 2)   + 'px)';
			  				b2 += 2
			  			}
		  			}

		  			counter -= interatot;
	  				brandBlock.style.transform = 'translateX(' + counter + 'px)';

		  			window.requestAnimationFrame(brandMove)
	  			}
	  		}

	  		window.requestAnimationFrame(brandMove)

	  	}
	  	runLine('.brands__slide')
  	}
	slider('.blog__slider_iteam','.blog__slider_center');
	checkProducts('.product__hide_colors');
	changeFoto('.product__hide_iteam');
	productSorting('.first__kind pre span', '.product__name pre span', 'product__king_active', 'product__name_active', '.product__btn_box .intro__btn span');
	productSorting('.second__kind pre span', '.blog__subtitle pre span', 'product__king_active', 'blog__subtitle_active');
	
	window.addEventListener('resize', () => {
		if(innerWidth <= 560){
		  	$('.mobile__blog_slide').slick({
				infinite: true,
				arrows: true,
				prevArrow: $('.slider_left'),
				nextArrow: $('.slider_right'),
		  	});
	  	}
	})
});