import {Recipe} from '../shared/model/recipe.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../shared/component/unsubscribe/unsubscribe.component';


@Injectable({
  providedIn: 'root'
})
export class PublicRecipesService extends UnsubscribeAbstract {

  recipeHandler = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor( private httpClient: HttpClient,
               private router: Router) {
    super();
    this.recipeHandler.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.recipes = value || [];
    });
  }


  fetchRecipes() {
    this.httpClient.get<Recipe[]>(`${environment.baseUrl}/recipes.json`).pipe(takeUntil(this.destroyed$)).subscribe(receivedRecipes => {
      this.recipeHandler.next(receivedRecipes || []);
    }, _ => {
      window.alert('No Internet Connection...');
    });
  }

  getRecipe(id) {
    if (this.recipes.length) {
      return this.recipes[id];
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  removeRecipe(index) {
    this.recipes.splice(index, 1);
    this.saveData(this.recipes);
  }

  editRecipe(recipe: Recipe , index: number) {
    this.recipes[index] = recipe;
    this.saveData(this.recipes);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.saveData(this.recipes);
  }

  saveData(recipes: Recipe[]) {
    this.httpClient.put<Recipe[]>(`${environment.baseUrl}/recipes.json`, recipes)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.fetchRecipes();
      });
  }

}
