document.addEventListener("DOMContentLoaded", function() {

    window.localStorage.clear();

    /**
     * This class is to create a card for a ingredient
     * to create it the constructor need the name of the ingredient
     * and the link to the image location
     */
    class Cards {
        constructor(ingredient, image) {
            this.ingredient = ingredient;
            this.image = image;

        }


        create() {

            //creation of all element necessary for the card
            var container = document.querySelector('#main_content');
            var card = document.createElement("div");
            var cardContent = document.createElement("div");
            var rounded = document.createElement("div");
            var title = document.createElement("h2");
            var ilustration = document.createElement("img");
            var content = document.createElement("div");
            var buttons = document.createElement("div");
            var firtButtons = document.createElement("button");
            var secondButtons = document.createElement("button");
            var like = document.createElement("i");
            var dislike = document.createElement("i");

            var x = Math.floor((Math.random() * 10) + 1);
            var y = Math.floor((Math.random() * 10) + 0);

            if (y <= 5) {
                card.className += "rotate-" + x;
            } else {
                card.className += "-rotate-" + x;
            }

            //add of tailwind class for card
            card.className += " sm:w-1/10 md:w-2/5 lg:w-2/6 xl:w-1/6  absolute h-1/4 mx-auto transform  flex items-center";
            cardContent.className = "text-3xl px-1 w-full h-full";
            rounded.className += "max-w-md bg-white grid  overflow-hidden ";
            title.className += "text-center";
            ilustration.className += "w-5/6 h-64  justify-self-center border-2 border-black"
            content.className += "px-6 py-4";
            buttons.className += "flex justify-between";
            firtButtons.className += "bg-red-600 rounded-full h-24 w-24 flex-col flex items-center text-xl justify-center";
            secondButtons.className += "bg-green-600 rounded-full h-24 w-24 flex-col flex items-center text-xl justify-center";
            secondButtons.id = "right"
            firtButtons.id = "left"

            //add off icons
            like.className = "fas fa-times text-3xl";
            dislike.className = "fas fa-check text-3xl";

            //add the text of button and title
            var likeText = document.createTextNode("Sweep");
            var dislikeText = document.createTextNode("Keep");
            var titleText = document.createTextNode(this.ingredient);

            //add the image
            ilustration.src = './images/ingredients/' + this.image

            title.appendChild(titleText)
            firtButtons.appendChild(like);
            firtButtons.appendChild(likeText);
            secondButtons.appendChild(dislike);
            secondButtons.appendChild(dislikeText);
            buttons.appendChild(firtButtons);
            buttons.appendChild(secondButtons);
            content.appendChild(buttons)
            rounded.appendChild(content)
            rounded.insertBefore(ilustration, content)
            rounded.insertBefore(title, ilustration)
            cardContent.appendChild(rounded)
            card.appendChild(cardContent)
            container.appendChild(card)

        }

    }

    var listKeep = [];
    var count = 0;

    function swipe(type) {

        var supperParent = event.currentTarget.parentNode.parentNode;
        var mainBody = document.querySelector('#main_content')
        var parent = supperParent.parentNode.parentNode.parentNode
        var choice = document.createElement("div");
        var title = parent.querySelector('h2').textContent;
        var link = document.createElement("a");

        link.innerHTML = " recettes ";
        link.href = "recipes.html"
        link.style.textDecoration = "underline";
        var text;

        //we check is swipe to right or left
        if (type == 1) {


            parent.className += " rotate-left"
            choice.className += "status dislike"
            text = document.createTextNode("Dislike");
        } else {

            parent.className += " rotate-right"
            choice.className += "status like"
            text = document.createTextNode("Like");
            listKeep.push(title);
            localStorage.setItem("ingredients", JSON.stringify(listKeep));

        }

        choice.appendChild(text);
        supperParent.appendChild(choice)

        var bottomDiv = document.querySelector('#nextPage')
        bottomDiv.innerHTML = '<a class="inline-flex items-center h-10 px-4 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" href="./recipes.html">Liste de recettes</a>';

        setTimeout(function() {

            parent.remove();

            parent.classList.remove("rotate-right");
            parent.classList.remove("rotate-left");
            console.log(parent)
            var trr = supperParent.querySelector('.status');
            trr.remove()
            mainBody.prepend(parent)
        }, 2000);


        count++;
        var total = document.querySelectorAll('#main_content>div');
        console.log("total " + total.length)
        if (count == total.length) {

            count = 0;
            window.location.href = './recipes.html';
        }
    }


    // this part allow to open the ingredient JSON file and create the card according to the information in the JSON files
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            // document.getElementById("demo").innerHTML = myObj.name;

            const randomly = () => Math.random() - 0.1;
            const dynamicCard = [].concat(myObj).sort(randomly);

            myObj.forEach((element, index) => {

                var card = new Cards(dynamicCard[index].name, dynamicCard[index].image)
                card.create()
            });

            //this get all the button which have "left" like id and add the ivent listener
            var test = document.querySelectorAll('#left');
            test.forEach(element => {
                element.addEventListener('click', function() { swipe(1); });
            });

            //this get all the button which have "right" like id and add the ivent listener
            var test1 = document.querySelectorAll('#right');

            test1.forEach(element => {
                element.addEventListener('click', function() { swipe(2); });
            });
        }
    };
    xmlhttp.open("GET", "ingredient.json", true);
    xmlhttp.send();

});