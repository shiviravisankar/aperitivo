console.info('cocktails.js filtered?');

document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('.tab-item');
  const toolbarTitle = document.querySelector('ons-toolbar .center');

  tabItems.forEach(function(tabItem) {
    tabItem.addEventListener('click', function() {
      toolbarTitle.innerHTML = this.getAttribute('label');
    });
  });

  getRandomCocktail();
});

//FETCHING THE API
function getRandomCocktail(){
	fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
        displayCocktail(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//DISPLAYING THE DRINK
function displayCocktail(cocktail){
	const drinkSection = document.querySelector('#drink-section');
	drinkSection.innerHTML = '';

	const drinkImg = document.createElement('img');
	drinkImg.src = cocktail.drinks[0].strDrinkThumb;
	drinkSection.appendChild(drinkImg);

	const drinkName = document.createElement('h1');
	drinkName.innerHTML = cocktail.drinks[0].strDrink;
	drinkSection.appendChild(drinkName);

//DISPLAYING THE INGREDIENTS
	const ingredientHeading = document.createElement('h2');
	ingredientHeading.innerText = 'Ingredients';
	drinkSection.appendChild(ingredientHeading);
	for(let i=1; i<16; i++){
		if(cocktail.drinks[0][`strIngredient${i}`] == null){
			break;
		}

		let measure = '';
		if(cocktail.drinks[0][`strMeasure${i}`] != null){
			measure = cocktail.drinks[0][`strMeasure${i}`] + ': ';
		}

		const ingredient = document.createElement('h3');
		ingredient.innerText = measure + cocktail.drinks[0][`strIngredient${i}`];
		drinkSection.appendChild(ingredient);
	}

	const instructions = document.createElement('h4');
	instructions.innerText = cocktail.drinks[0].strInstructions;
	drinkSection.appendChild(instructions);
}

//SWAPPING BACKGROUND COLOR
function randomColor() {
    var color = '#';

    //enter color hex codes
    var colorCode = ['FF8B59','E7408E','A993DE','76C2ED','63F172', 'EC5151', 'E8EB4B'];

    //this class should go in the body
    var className = document.getElementsByClassName("change");
    var i;
    color += colorCode[Math.floor(Math.random() * colorCode.length)];
  for (var i = 0; i < className.length; i ++) {
      className[i].style.backgroundColor = color; }
}
