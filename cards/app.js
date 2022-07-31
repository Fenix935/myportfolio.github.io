(function () {
    const config = {
        cards: 32,
        time: "01:10",
    }
    let isStarted;
    const ball = 10;
    const field = document.querySelector(".game__field");
    const record =  document.querySelector(".record span");
    const scoreElem = document.querySelector(".score span");
    let interval;
    
    function initGame () {
        field.innerHTML = "";
        scoreElem.textContent = 0;
        isStarted = false;

        for(let i = 0; i < config.cards; i++){
            let div = document.createElement("div");
            div.innerHTML = `
                        <div class="frond">
                            <p>?</p>
                        </div>
                        <div class="back"></div>`;
            div.classList.add("card")
            field.append(div)
        }
        field.style.display = "flex";

        record.textContent = localStore() || "0"

        createFotos();
        initTimer();
        addEvent();
        restart("#restart");

    }

    function randomNum (max, min) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function createFotos () {
        let cards = Array.from(field.querySelectorAll('.card .back'));
        let counter = 1;
        for(let i = cards.length, len = 0; i > len; i--){
            let num = randomNum(cards.length, 0);
            if(i % 2 === 0) counter++; 
            if(counter > 8) counter = 1; 

            cards[num].style.backgroundImage = `url(img/card_${counter}.png)`;
            cards[num].id = `card_${counter}`;
            cards.splice(num, 1);
        }
        
    }

    function addEvent () {
        field.addEventListener('click', function (e) {
            
            if(!isStarted) startTimer();
            // debugger

            let prevElem = field.querySelector('.card.open .back');
            let elem = e.target.closest('.card');

            if(elem && elem.classList.contains("open")) return;

            if(elem && elem.classList.contains('card')){
                
                elem.classList.add("open");
                
                if(prevElem && elem.children[1].id === prevElem.id){
                    setTimeout(() => foundSame([elem, prevElem.parentElement]), 280)
                    console.log("some");
                }
                
                if(prevElem && elem.children[1].id !== prevElem.id)
                    setTimeout(() => notSame([elem, prevElem.parentElement]), 350)
            }

        })
    }

    function foundSame (arr) {
        
        for(let i = 0; i < arr.length; i++){
            arr[i].classList.add('hide');

            setTimeout(() => {
                arr[i].classList.remove("open")
            }, 300);

        }
        scoreElem.textContent = Number(scoreElem.textContent) + ball;

        if(field.querySelectorAll(".card:not(.hide)").length === 0) stopGame("win");
    }

    function notSame (arr) {
        console.log(arr);
        for(let i = 0; i < arr.length; i++){
            arr[i].classList.remove("open")
        }
    }

    function initTimer() {
        let timeElem = document.querySelector("#timer");
        timeElem.style.color = "#fff";
        let timeChildren = timeElem.children;
        let timeArr = config.time.split(":");
        for(let i = 0; i < timeChildren.length; i++){
            timeChildren[i].textContent = timeArr[i];
        }
    }

    function startTimer () {
        let timeElem = document.querySelector("#timer");
        let timeChildren = timeElem.children;
        isStarted = true;
        interval = setInterval(() => {
            let sec = Number(timeChildren[1].textContent);
            let min = Number(timeChildren[0].textContent);
            if(sec <= 15 && min <= 0) timeElem.style.color = "#c15050";

            if(sec <= 0 && min <= 0){
                clearInterval(interval);
                timeElem.style.color = "#fff";
                timeChildren[0].textContent = "00";
                timeChildren[1].textContent = "00";
                stopGame("lose");
                return;
            }

            if(sec <= 1 && min >= 1){
                timeChildren[0].textContent = (min <= 1) ? "00" : min - 1;
                sec = 60;
            }
            timeChildren[1].textContent = (sec <= 10) ? "0" + (sec - 1) : sec - 1;
        }, 1000);
    }

    function stopGame (action) {
        const popup = document.querySelector(".popup");
        const cards = document.querySelectorAll(".card:not(.hide)");

        if(action === "win"){
            popup.classList.add("win");
            popup.querySelector(".popup_text").textContent = "YOU WIN";
            clearInterval(interval)
        }else if(action === "lose"){
            if(cards.length > 0){
                popup.classList.add("lose");
                popup.querySelector(".popup_text").textContent = "YOU LOSE";
                
                cards.forEach(item => item.classList.remove("open"));
            }
        }else{
            popup.className = "popup"
            popup.querySelector(".popup_text").textContent = "";
        }
        if(Number(scoreElem.textContent) > Number(localStore()) || !localStore()){
            localStore(Number(scoreElem.textContent))
        }
    }
    
    function localStore (value) {
        if(value) localStorage.setItem("record", value)
        
        else return localStorage.getItem("record");
    }

    function restart(elem) {
        const restartElem = document.querySelector(elem)
        restartElem.addEventListener("click", () => {
            initGame();
            stopGame();
        })
    }

    initGame();

})()