document.addEventListener('DOMContentLoaded', () => {
    fetchPopularRecipes();
});

async function fetchPopularRecipes() {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=9bcf184e470f4becb076afad747c358e`);
        const data = await response.json();
        const recipes = data.recipes;

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            const recipeImg = document.createElement('img');
            recipeImg.src = recipe.image;
            recipeCard.appendChild(recipeImg);

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;
            recipeCard.appendChild(recipeTitle);

            const recipeDescription = document.createElement('p');
            recipeDescription.innerHTML = recipe.summary.split(' ').slice(0, 10).join(' ') + '...';
            recipeCard.appendChild(recipeDescription);

            const recipeLink = document.createElement('a');
            recipeLink.href = `recipe.html?id=${recipe.id}`;
            recipeLink.textContent = 'View Recipe';
            recipeCard.appendChild(recipeLink);

            recipesContainer.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error fetching popular recipes:', error);
        recipesContainer.innerHTML = '<p>Error fetching popular recipes. Please try again later.</p>';
    }
}

async function searchRecipes() {
    const query = document.getElementById('search-bar').value;
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=9bcf184e470f4becb076afad747c358e`);
        const data = await response.json();
        const recipes = data.results;

        recipes.forEach(async recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            const recipeImg = document.createElement('img');
            recipeImg.src = recipe.image;
            recipeCard.appendChild(recipeImg);

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;
            recipeCard.appendChild(recipeTitle);

            // Fetch recipe details to get the summary
            const recipeDetailsResponse = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=9bcf184e470f4becb076afad747c358e`);
            const recipeDetails = await recipeDetailsResponse.json();
            
            const recipeDescription = document.createElement('p');
            recipeDescription.innerHTML = recipeDetails.summary.split(' ').slice(0, 10).join(' ') + '...';
            recipeCard.appendChild(recipeDescription);

            const recipeLink = document.createElement('a');
            recipeLink.href = `recipe.html?id=${recipe.id}`;
            recipeLink.textContent = 'View Recipe';
            recipeCard.appendChild(recipeLink);

            recipesContainer.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}


