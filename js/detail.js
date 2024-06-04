// detail.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    const recipeDetailContainer = document.getElementById('recipe-detail-container');

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9bcf184e470f4becb076afad747c358e`);
        const recipe = await response.json();

        const recipeImg = document.createElement('img');
        recipeImg.src = recipe.image;
        recipeDetailContainer.appendChild(recipeImg);

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.title;
        recipeDetailContainer.appendChild(recipeTitle);

        const recipeSummary = document.createElement('p');
        recipeSummary.innerHTML = recipe.summary;
        recipeDetailContainer.appendChild(recipeSummary);

        const recipeInstructions = document.createElement('p');
        recipeInstructions.innerHTML = recipe.instructions;
        recipeDetailContainer.appendChild(recipeInstructions);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
});


