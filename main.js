document.addEventListener('DOMContentLoaded', () =>{
    // получаем json
    let request = new XMLHttpRequest(),
        data = {},
        cars = [];
 
    request.open('GET','./data/cars.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onreadystatechange = function(){
        if (request.readyState < 4) {
            console.log ("loading");
            }
        else if (request.readyState === 4 && request.status == 200) {
            data = JSON.parse(request.response);
            cars = data.cars;
            loadCards(cars);

            setTimeout(() => {
                selectCards();
            }, 100);

        } else {
            console.log('error');
        }
    };

   
    function loadCards(array) {

        let container = document.querySelector('.wrap'),
            imgPath = '',
            name = '',
            description = '',
            price = '',
            country = '';
            
        for (let i = 0; i < array.length; i++) {
            let card = document.createElement('div');
            
            imgPath = array[i]['img'];
            name = array[i]['name'];
            country = array[i]['category'];
            
            container.appendChild(card);
            card.className = "card";
            card.classList.add(`${country}`);
            
            
            card.innerHTML = `<img src=${imgPath}><p>${name}</p>`;      
        }
        
        let card1 = document.getElementsByClassName('card');
        
        for (let i = 0; i < array.length; i++){
            
            description = array[i]['description'];
            price = array[i]['price'];

            let cardDesc = document.createElement('div');
            card1[i].appendChild(cardDesc);

            cardDesc.className = "cardDesc";
            cardDesc.innerHTML = `<p>${description}</p>`;

            let cardPrice = document.createElement('div');
            card1[i].appendChild(cardPrice);

            cardPrice.className = "cardPrice";
            cardPrice.innerHTML = `<p>${price}</p>`;  
        } 
    }

    function selectCards() {

        let btnAll = document.querySelector("#all"),
            btnFr = document.querySelector("#fr"),
            btnIt = document.querySelector("#it"),
            btnGr = document.querySelector("#gr"),
            boxes = document.querySelectorAll(".card"),
            check  = true;
        
        function showCountry(name) {
            boxes.forEach((item) => {
                
                item.style.display = "none";
                
                setTimeout(() => {
                if(item.classList.contains(name)) {
                    item.style.display = "block";
                }
                }, 100); 
            });
        }

        btnFr.addEventListener('click', () =>{ if(check) {showCountry("france");} });
        
        btnIt.addEventListener('click', () =>{ if(check) {showCountry("italian");} });
        
        btnGr.addEventListener('click', () =>{ if(check) {showCountry("germany");} });
        
        btnAll.addEventListener('click', () =>{

            if(check) {

                boxes.forEach((item) => {
                
                    item.style.display = "none";
                    
                    setTimeout(() => {
                        item.style.display = "block";
                    }, 100);
                });
            }
        });

        boxes.forEach((item) =>{

            item.addEventListener('click', () =>{
              
                if(check){

                    boxes.forEach((item) => {
                        item.style.display = 'none';
                    });

                    check = !check;
                    
                    setTimeout(() => {
                        document.querySelector(".wrap").style.justifyContent = "center";
                        item.classList.add("active");
                        item.style.display = "block";
                    }, 100);

                } else {
                    item.classList.remove("active");
                    check = !check;

                    setTimeout(() => {
                        boxes.forEach((item) => {
                            document.querySelector(".wrap").style.justifyContent = "flex-start";
                            item.style.display = "block";
                        });
                    }, 100);
                }
            });
        });
    } //Eof selectCards 
});
    
    
    




