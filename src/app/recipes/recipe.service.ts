import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
   
    // private recipes: Recipe[] = [
    //     new Recipe('Best Hamburger Patty Recipe',
    //     'The best recipe for perfect hamburger patties every time!',
    //     'https://cdn-aiapl.nitrocdn.com/KZJKWDkEwMJCwERIlnRsPNdqobwBIlEo/assets/static/optimized/rev-e0253d2/wp-content/uploads/2020/05/Best-Hamburger-Patty-Recipe-25-650x931.jpg',
    //     [
    //         new Ingredient('1lb Ground Beef', 2),
    //         new Ingredient('1/2 Cup GF Bread Crumbs', 1),
    //         new Ingredient('Large Egg', 1),
    //         new Ingredient('Tbsp Worcestershire Sauce', 2),
    //         new Ingredient('Tbsp Milk', 2),
    //         new Ingredient('Tsp Salt', 1),
    //         new Ingredient('Tsp Garlic Powder', 1),
    //         new Ingredient('Tsp Onion Powder', 1),
    //         new Ingredient('1/2 Tsp Black Pepper', 1)
    //     ]),
    //     new Recipe('Spaghetti Squash', 'Recipe for some delicious low-carb spaghetti!',
    //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1460385498-delish-whole-foods-spaghetti-squash-1524857975.jpg',
    //     [
    //         new Ingredient('Squash', 1),
    //         new Ingredient('Spaghetti Sauce', 1),
    //         new Ingredient('1lb Ground Beef', 1)
    //     ])
    // ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
        
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}