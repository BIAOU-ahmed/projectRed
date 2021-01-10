document.addEventListener("DOMContentLoaded", function() {

    class Cards {
        constructor(ingredient, image) {
            this.ingredient = ingredient;
            this.image = image;

        }


        create() {
            var main = document.querySelector('#main_content');
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
            like.className = "fas fa-times text-3xl";
            dislike.className = "fas fa-check text-3xl";
            var likeText = document.createTextNode("Sweep");
            var dislikeText = document.createTextNode("Keep");
            var titleText = document.createTextNode(this.ingredient);
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
            main.appendChild(card)

        }

    }
});