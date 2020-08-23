import { Component, OnInit } from '@angular/core';
import {PublicRecipesService} from '../../../services/public-recipes.service';
import {Recipe} from '../../../shared/model/recipe.model';
import {ShoppingService} from '../../../services/shopping.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PrivateRecipesService} from '../../../services/private-recipes.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../../shared/component/unsubscribe/unsubscribe.component';
import {LocalStorageConstant} from '../../../shared/enum/local-storage-constant.enum';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends UnsubscribeAbstract implements OnInit {

  detailedRecipe: Recipe;
  id: number;
  url: string;
  isCreator = false;
  display = false;

  constructor(private publicRecipeService: PublicRecipesService,
              private privateRecipesService: PrivateRecipesService,
              private shoppingService: ShoppingService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
    this.publicRecipeService.fetchRecipes();
    this.privateRecipesService.fetchRecipes();
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe((param: Params) => {
      this.id = +param.id;
      // @ts-ignore
      this.url = this.activatedRoute._routerState.snapshot.url;
      if (this.id >= 0) {
        this.display = false;
        if (this.url.includes('public')) {
          this.detailedRecipe = this.publicRecipeService.getRecipe(this.id);
          this.isCreator = (!!this.detailedRecipe && this.detailedRecipe.creatorId === localStorage.getItem(LocalStorageConstant.token));
        }
        if (this.url.includes('private')) {
          this.detailedRecipe = this.privateRecipesService.getRecipe(this.id);
          this.isCreator = true;
        }
      }
      if (this.id < 0) {
        if (this.url.includes('public')) {
          this.publicRecipeService.recipeHandler.subscribe( x => {
            if (x.length) {
              this.display = true;
            }
          });
        }
        if (this.url.includes('private')) {
          this.privateRecipesService.recipeHandler.subscribe(x => {
            if (x.length) {
              this.display = true;
            }
          });
        }
      }
    });
  }

  sendRecipeIngredientsToShopping() {
    for (const ing of this.detailedRecipe.ingredients) {
      this.shoppingService.addIngredient(ing);
    }
  }
  deleteRecipe() {
    if (confirm('Are you want to delete this recipe??')) {
      if (this.url.includes('public')) {
        this.publicRecipeService.removeRecipe(this.id);
      }
      if (this.url.includes('private')) {
        this.privateRecipesService.removeRecipe(this.id);
      }
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
  }
}
