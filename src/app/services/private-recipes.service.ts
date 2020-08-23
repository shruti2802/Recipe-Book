import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Subject} from 'rxjs';
import {Recipe} from '../shared/model/recipe.model';
import {environment} from '../../environments/environment';
import {User} from './auth.service';
import {UnsubscribeAbstract} from '../shared/component/unsubscribe/unsubscribe.component';
import {takeUntil} from 'rxjs/operators';
import {LocalStorageConstant} from '../shared/enum/local-storage-constant.enum';

@Injectable({
  providedIn: 'root'
})
export class PrivateRecipesService extends UnsubscribeAbstract {

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
    let i = -1;
    this.httpClient.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((res: User[]) => {
      if (!!res) {
        res.forEach((value, index) => {if (value.id === localStorage.getItem(LocalStorageConstant.token)) {i = index; } });
      }
      if (i >= 0) {
        // tslint:disable-next-line:max-line-length
        this.httpClient.get<Recipe[]>(`${environment.baseUrl}/users/${i}/recipes.json`).pipe(takeUntil(this.destroyed$)).subscribe(receivedRecipes => {
          this.recipeHandler.next(receivedRecipes || []);
        }, _ => {
          window.alert('No Internet Connection...');
        });
      } else {
        this.router.navigate(['/']);
      }
    }, error => {
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
    let i = -1;
    this.httpClient.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((res: User[]) => {
      if (!!res) {
        res.forEach((value, index) => {if (value.id === localStorage.getItem(LocalStorageConstant.token)) {i = index; } });
      }
      if (i >= 0) {
        this.httpClient.put<Recipe[]>(`${environment.baseUrl}/users/${i}/recipes.json`, recipes)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(_ => {
            this.fetchRecipes();
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
