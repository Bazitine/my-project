import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';



@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
   
    // private recipes: Recipe[] = [
    //     new Recipe('Best Hamburger Patty Recipe',
    //     'The best recipe for perfect hamburger patties every time!',
    //     'https://cdn-aiapl.nitrocdn.com/KZJKWDkEwMJCwERIlnRsPNdqobwBIlEo/assets/static/optimized/rev-e0253d2/wp-content/uploads/2020/05/Best-Hamburger-Patty-Recipe-25-650x931.jpg',
    //     [
    //         new Ingredient('Ground Beef', 2, 'lbs'),
    //         new Ingredient('GF Bread Crumbs', 1/2, 'Cup'),
    //         new Ingredient('Large Egg', 1, ''),
    //         new Ingredient('Worcestershire Sauce', 2, 'Tbsp'),
    //         new Ingredient('Milk', 2, 'Tbsp'),
    //         new Ingredient('Salt', 1, 'Tsp'),
    //         new Ingredient('Garlic Powder', 1, 'Tsp'),
    //         new Ingredient('Onion Powder', 1, 'Tsp'),
    //         new Ingredient('Black Pepper', 1/2, 'Tsp')
    //     ]),
    //     new Recipe('Spaghetti Squash', 'Recipe for some delicious low-carb spaghetti!',
    //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1460385498-delish-whole-foods-spaghetti-squash-1524857975.jpg',
    //     [
    //         new Ingredient('Squash', 1, ''),
    //         new Ingredient('Spaghetti Sauce', 1, ''),
    //         new Ingredient('Ground Beef', 1, 'lb')
    //     ])
    // ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
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