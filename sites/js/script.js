window.onload = function(){
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input[type="number"]')

    const check = (e) =>{
        e.preventDefault();
        if(e.target.elements[0].value == ''){
            alert("Enter your Number");
        } else if (e.target.elements[0].value.length <= 6){
            alert("Your number too small");
        }else{
            open2('#modal2', '#close2');
            input.forEach((iteam)=>{
                iteam.value = "";
            })
        }
    }

    const open = (modal, openIteam, closeIteam) =>{
        modal = document.querySelector(modal);
        openIteam = document.querySelector(openIteam);
        closeIteam = document.querySelector(closeIteam);

        modal.addEventListener("click",function(e) {
            e.preventDefault();
            openIteam.style.display = "block";
            document.body.style.overflow = "hidden"; 
        });

        closeIteam.addEventListener("click", function (e) {
            openIteam.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    const open2 = (openIteam, closeIteam) => {
        openIteam = document.querySelector(openIteam);
        closeIteam = document.querySelector(closeIteam);

        document.querySelector(".modal").style.display = "none";

        openIteam.style.display = "block";
        document.body.style.overflow = "hidden";

        closeIteam.addEventListener("click", function () {
            openIteam.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    form.forEach((iteam) =>{
        iteam.addEventListener('submit', check);
    })

    open('#btn', '.modal','.modal img');
    open('#btn2', '.modal','.modal img');
    open('.menu__iteam a', '.modal','.modal img');
}