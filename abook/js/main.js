window.addEventListener('load', function() {
	alert("ВНИМАНИЕ!!\nЕсли при изменении ширини экрана верстка поломалась то прошу вас перезагрузить страницу")
	const inputNum = document.querySelector('.forum__iteam input[name="phone"]');

	const closeCookie = (iteam, btn) => {
 		const cookieBtn = document.querySelector(btn),
 		      cookieParent = document.querySelector(iteam);

 		if(localStorage.getItem('cookie') === 'true'){
 			cookieParent.style.display = 'none';
 			return;
 		}

 		cookieParent.style.display = 'flex';

 		cookieBtn.addEventListener('click', () => {
 			localStorage.setItem('cookie', 'true');

 			cookieParent.style.opacity = '0';
 			setTimeout(function() {
 				cookieParent.style.display = 'none';
 			},300)
 		});

	};

	let maskOptions = {
	    mask: '+998 00 000 0000',
	}
	let mask = new IMask(inputNum, maskOptions);

	let mySwiper = new Swiper('.swiper-container', {
	  	slidesPerView: 'auto',
	  	grabCursor: true,
	})

	if(innerWidth <= 550){
		document.querySelector('.swiper-wrapper').classList.remove('catagories');
		let mySwiper2 = new Swiper('.catagories', {
		  	slidesPerView: 'auto',
		  	grabCursor: true,

		  	pagination: {
		        el: '.media__slider_dots',
		        clickable: true,
		      },
		})
	}

	if(innerWidth >= 750){
		closeCookie('.cookies', '.cookies__btn')
	}
	window.addEventListener('resize', () => {
		if(innerWidth >= 750){
			closeCookie('.cookies', '.cookies__btn')
		}

		if(innerWidth <= 550){
			document.querySelector('.swiper-wrapper').classList.remove('catagories');
			let mySwiper2 = new Swiper('.catagories', {
			  	slidesPerView: 'auto',
			  	grabCursor: true,

			  	pagination: {
			        el: '.media__slider_dots',
			        clickable: true,
			      },
			})	
		}
	});
})