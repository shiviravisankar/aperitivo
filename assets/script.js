console.info('cocktails.js filtered?');

document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('.tab-item');

  tabItems.forEach(function(tabItem) {
    tabItem.addEventListener('click', function() {
    });
  });

  getRandomCocktail();
});

//FETCHING THE API
function getRandomCocktail(){
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
  .then(function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function(data) {
      const randomIndex = Math.floor(Math.random() * data.drinks.length);
      const randomCocktailId = data.drinks[randomIndex].idDrink;
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomCocktailId}`)
        .then(function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          response.json().then(function(data) {
            displayCocktail(data);
          });
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

//DISPLAYING THE DRINK
function displayCocktail(cocktail){
	const imageSection = document.querySelector('#image-section'); // divide sections for desktop 
	imageSection.innerHTML = '';

  const contentSection = document.querySelector('#content-section');
	contentSection.innerHTML = '';

	const drinkImg = document.createElement('img'); // image 
	drinkImg.src = cocktail.drinks[0].strDrinkThumb;
	imageSection.appendChild(drinkImg);

	const drinkName = document.createElement('h1'); // title
	drinkName.innerHTML = cocktail.drinks[0].strDrink;
	contentSection.appendChild(drinkName);

//DISPLAYING THE INGREDIENTS
	const ingredientHeading = document.createElement('h2'); // ingredient
	ingredientHeading.innerText = 'Ingredients';
	contentSection.appendChild(ingredientHeading);
	for(let i=1; i<16; i++){
		if(cocktail.drinks[0][`strIngredient${i}`] == null){
			break;
		}

		let measure = '';
		if(cocktail.drinks[0][`strMeasure${i}`] != null){
			measure = cocktail.drinks[0][`strMeasure${i}`] + ': ';
		}

		const ingredient = document.createElement('h3'); // list of ingredients
		ingredient.innerText = measure + cocktail.drinks[0][`strIngredient${i}`];
		contentSection.appendChild(ingredient);
	}

    const recipeTitle = document.createElement('h4'); 
    recipeTitle.innerText = 'Recipe';
    contentSection.appendChild(recipeTitle);

    const instructions = document.createElement('p'); 
    instructions.innerText = cocktail.drinks[0].strInstructions;
    contentSection.appendChild(instructions);
}

//REFRESH BUTTON
  var refreshBtn = document.getElementById('refresh-button');
  refreshBtn.addEventListener('click', function() {
    location.reload();
  });


//IMAGE MIX BLEND MODE TOGGLE
function filter() {
  var img = document.getElementById('image-section');

  if (img.style.mixBlendMode === 'difference') {
    img.style.mixBlendMode = 'normal';
  } else {
    img.style.mixBlendMode = 'difference';
  }
}

//SWAPPING BACKGROUND COLOR
  function randomColor() {
    var color = '#';
  
    //enter color hex codes
    var colorCode = ['FF8B59','E7408E','A993DE','76C2ED','63F172', 'EC5151', 'E8EB4B'];
  
    //body color
    var className = document.getElementsByClassName("change");
    var i;
    color += colorCode[Math.floor(Math.random() * colorCode.length)];
    for (var i = 0; i < className.length; i ++) {
      className[i].style.backgroundColor = color;
    }
    
    // SVG color
    var svgElements = document.querySelectorAll("svg path.round");
    for (var i = 0; i < svgElements.length; i++) {
        svgElements[i].style.fill = color;
    }

    // set background color of navigation bar for desktop
    var navbar = document.getElementById("desktop");
    navbar.style.backgroundColor = color;

    // change favicon color
 }

 //Text & SVG scroll on image
 window.onscroll = function() {
  var spirit = document.querySelector('.spirit');
  var image = document.querySelector('#image-section');
  var rect = spirit.getBoundingClientRect();
  var imageRect = image.getBoundingClientRect();
  var svg = spirit.querySelector('svg');
  
  if (rect.bottom > imageRect.top && rect.top < imageRect.bottom) {
    spirit.classList.add('textcolor');
    svg.classList.add('ikon');
  } else {
    spirit.classList.remove('textcolor');
    svg.classList.remove('ikon');
  }
}


