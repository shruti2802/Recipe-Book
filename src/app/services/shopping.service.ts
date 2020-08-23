import {Ingredient} from '../shared/model/ingriedent.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from './auth.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../shared/component/unsubscribe/unsubscribe.component';
import {LocalStorageConstant} from '../shared/enum/local-storage-constant.enum';

export class ShoppingService extends UnsubscribeAbstract {
  index: number;
  ingredients: Ingredient[] = [];
  findIndex = new Subject<number>();
  editedIngredient = new Subject<Ingredient>();
  ingredientHandler = new Subject<Ingredient[]>();

  constructor(private httpClient: HttpClient,
              private router: Router) {
    super();
    this.ingredientHandler.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.ingredients = value || [];
    });
  }


  fetchIngredient() {
    let i = -1;
    this.httpClient.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((res: User[]) => {
      res.forEach((value, index) => {if (value.id === localStorage.getItem(LocalStorageConstant.token)) {i = index; } });
      if (i >= 0) {
        this.httpClient.get<Ingredient[]>(`${environment.baseUrl}/users/${i}/shopping.json`).pipe(takeUntil(this.destroyed$)).subscribe(receivedIng => {
          this.ingredientHandler.next(receivedIng);
        });
      } else {
        this.router.navigate(['/']);
      }
    }, error => {
        window.alert('No Internet Connection...');
    });
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.saveData(this.ingredients);
  }

  getIndex(ing) {
    this.index = this.ingredients.indexOf(ing);
    this.findIndex.next(this.index);
    this.editedIngredient.next(this.ingredients[this.index]);
  }

  editIngredient(i, ingredient) {
      this.ingredients[i] = ingredient;
      this.saveData(this.ingredients);
  }

  removeIngredient(index) {
    this.ingredients.splice(index, 1);
    this.saveData(this.ingredients);
  }

  clearIngredients() {
    this.ingredients = [];
    this.saveData(this.ingredients);
  }

  saveData( ingredient: Ingredient[]) {
    let i = -1;
    this.httpClient.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((res: User[]) => {
      res.forEach((value, index) => {if (value.id === localStorage.getItem(LocalStorageConstant.token)) {i = index; } });
      if (i >= 0) {
        this.httpClient.put<Ingredient[]>(`${environment.baseUrl}/users/${i}/shopping.json`, ingredient)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(_ => {
            this.fetchIngredient();
          });
      } else {
        this.router.navigate(['/']);
      }
    });

  }


}
