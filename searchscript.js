// Search button functionality
const searchButton = document.getElementById('searchbutton');
searchButton.addEventListener('click', function() {
  const searchInput = document.getElementById('searchtext').value;
  const cocktailList = document.getElementById('filtereddrinks');
  cocktailList.innerHTML = '';

// Make API request to get cocktails by ingredient
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {

// DISPLAY TITLE AND IMAGE ONLY
      data.drinks.forEach(drink => {
        const cocktailDiv = document.createElement('div');
        cocktailDiv.className = 'alcohol';

        const cocktailImg = document.createElement('img');
        cocktailImg.src = drink.strDrinkThumb;
        cocktailImg.alt = drink.strDrink;
        cocktailDiv.appendChild(cocktailImg);

        const cocktailName = document.createElement('p');
        cocktailName.textContent = drink.strDrink;
        cocktailDiv.appendChild(cocktailName);
        cocktailList.appendChild(cocktailDiv);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
});
