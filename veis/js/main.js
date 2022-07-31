window.addEventListener('load', function () {
    const headBox = document.querySelectorAll('.head__box'),
        numberHide = document.querySelectorAll('.number__hide'),
        headInput = document.querySelector('#head__input'),
        tabs = document.querySelectorAll('.tab'),
        content = document.querySelectorAll('.choose__content'),
        contact = document.querySelectorAll('.head__contact'),
        contactHide = document.querySelectorAll('.contact__hide'),
        sliderShow = document.querySelectorAll('.intro__slider');

    let sliderContent;

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = "scroll";
        div.style.visibility = 'hidden';

        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    const showOverlay = (open = true) => {
        if(open){
            document.querySelector('.black__over').style.display = 'block';
            setTimeout(function () {
                document.querySelector('.black__over').classList.add('show__over');
            },10)
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = calcScroll() + 'px';
        }else{
            document.querySelector('.black__over').classList.remove('show__over');
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
            setTimeout(function() {
               document.querySelector('.black__over').style.display = 'none';    
            },300)
        }
    };
    const hideModal = (iteam,iteam2) => {
        for(let i = 0; i < iteam.length; i++){
            iteam[i].classList.remove('show');
            setTimeout(function () {
                iteam[i].style.display = 'none';
            },300)
        }
        for(let i = 0; i < iteam2.length; i++){
            let image =  iteam2[i].querySelectorAll('img');
            for(let j = 0; j < image.length; j++){
                if(image[j].getAttribute('src') === 'img/down_white.png'){
                    image[j].style.transform = 'rotate(0)'
                }
            }
        }
    };

    const searchInput = () => {
        document.querySelector('.map__head_input').classList.add('head__input_active')
        headInput.parentElement.querySelector('#seacrh').style.display = 'none';
        headInput.parentElement.querySelector('.close__icon').style.display = 'inline-block';

        headInput.addEventListener('input', () => {
            showOverlay();

            headInput.parentElement.classList.add('active');
            document.querySelector('.head__hide').classList.add('head__hide_active')
        });


        headInput.parentElement.querySelector('.close__icon').addEventListener('click', closeInput);
        headInput.addEventListener('blur', closeInput);

    };
    function closeInput() {
        headInput.parentElement.classList.remove('active');
        headInput.parentElement.querySelector('.close__icon').style.display = 'none'
        headInput.parentElement.querySelector('#seacrh').style.display = 'inline-block'
        document.querySelector('.head__hide').classList.remove('head__hide_active');
        document.querySelector('.map__head_input').classList.remove('head__input_active')

        headInput.value = '';

        showOverlay(false)
    };

    const showHide = (iteam, iteam2) => {
        for (let i = 0; i < iteam2.length; i++) {
            iteam2[i].addEventListener('click', () => {
                show(i)
            });
        }
        function show(i) {
            if (document.querySelector('.contact__hide').classList.length > 1) {
                return;
            }
            iteam2[i].querySelector('img:not(.vodafone__icon)').style.transform = 'rotate(-180deg)'

            iteam[i].style.display = 'block';

            setTimeout(function () {
                iteam[i].classList.add('show');
            }, 10);

            showOverlay();
        }
    };
    const changeTab = (e, index,media = false) => {
        let tabHide = document.querySelectorAll('.tab__hide');
        if(innerWidth <= 1150 && e.target.classList.contains('active__tab') === true){
            if(tabHide[index].classList.contains('active__tab_menu') === true){
                tabHide[index].classList.remove('active__tab_menu');
                e.target.querySelector('img').style.transform = 'rotate(0)'
            }else{
                for(let i = 0; i < tabHide.length; i++){
                    tabHide[i].classList.remove('active__tab_menu');
                    e.target.querySelector('img').style.transform = 'rotate(0)'
                }
                tabHide[index].classList.add('active__tab_menu');
                e.target.querySelector('img').style.transform = 'rotate(-180deg)'
            } 
        }
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active__tab');
            content[i].classList.add('hide');
        }
        if(e.target.classList.contains('tab') === true){
            e.target.classList.add('active__tab');
            content[index].classList.remove('hide');
            
            tabHide[index - 1 === 0 ? 0 : 1].classList.remove('active__tab_menu');
            tabs[index - 1 === 0 ? 0 : 1].querySelector('img').style.transform = 'rotate(0deg)'
        }else if (e.target.nodeName === 'IMG') {
            e.target.parentElement.classList.add('active__tab');
            content[index].classList.remove('hide');
        }
        
    };

    showHide(numberHide, headBox);
    showHide(contactHide, contact);
    showHide(contactHide, contact);

    headInput.addEventListener('focus', searchInput);

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', (e) => {
            changeTab(e, i);
        });
    }

    document.querySelector('.head__contact').addEventListener('click', function () {
        const hide = document.querySelector('.contact__hide');
        if (hide.classList[1] === "show") {

            hide.style.display = 'none';
            hide.classList.remove('show');

            document.querySelector('.head__contact img').style.transform = 'rotate(0)';

            showOverlay(false);
        }
    });
    document.querySelector('.down__icon').addEventListener('click', function() {
        hideModal(numberHide,headBox);
        showOverlay(false);
    })

    
    document.querySelector('.black__over').addEventListener('click',() => {
        closeInput();
        hideModal(contactHide,contact)
        hideModal(numberHide,headBox)
    });

    const footShow = (iteam, iteam2, clas = false) => {
        const clickBlock = document.querySelectorAll(iteam),
              showBlock = document.querySelectorAll(iteam2);

        for (let i = 0; i < clickBlock.length; i++) {
            clickBlock[i].addEventListener('click', function () {
                openFoot(i)
            });
        }

        function openFoot(i) {
            if (clas == true) {
                clickBlock[i].classList.toggle('active__menu')
            }

            if (showBlock[i].clientHeight > 0) {
                showBlock[i].style.display = 'none';
                showBlock[i].style.height = '0';
                clickBlock[i].querySelector('img').style.transform = 'rotate(0)';
                showOverlay(false);
                hideModal(contactHide,contact);
            } else {
                for (let i = 0; i < showBlock.length; i++) {
                    showBlock[i].style.display = 'none';
                    clickBlock[i].querySelector('img').style.transform = 'rotate(0)';
                }
                showBlock[i].style.display = 'block';
                clickBlock[i].querySelector('img').style.transform = 'rotate(-180deg)';

                setTimeout(function () {
                    showBlock[i].style.height = 'auto';
                }, 10)
            }
        }

    };

    footShow('.media__foot_iteam', '.media__foot_hide');
    footShow('.media__map_iteam', '.media__map_hide');
    footShow('.media__head_burger', '.media__modal', true);

    // window.addEventListener('resize', () => {
    //     if (window.innerWidth <= 1150) {
    //         footShow('.tab', '.tab__hide');
    //     }
    // });
    const viewMore = (iteam, iteam2, btn = false) => {
        const pressBtn = document.querySelector(iteam),
              textBox = document.querySelector(iteam2);

        pressBtn.addEventListener('click', open);

        function open() {
            textBox.classList.toggle('open');
            if (btn === false) {
                if (pressBtn.textContent === "Читать далее") {
                    pressBtn.textContent = "Скрыть";
                    pressBtn.parentElement.querySelector('img').style.transform = 'rotate(-180deg)';
                } else if (pressBtn.textContent === "Скрыть") {
                    pressBtn.textContent = "Читать далее";
                    pressBtn.parentElement.querySelector('img').style.transform = 'rotate(0)';
                }
            }
        }
    };
    

    viewMore('.about__view_more span', '.about__text');
});
