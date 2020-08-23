import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/model/ingriedent.model';
import {ShoppingService} from '../../services/shopping.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent extends UnsubscribeAbstract implements OnInit {

  ingredients: Ingredient[] = [];
  filteredIngredient: Ingredient[] = [];
  loading = true;

  constructor(private shoppingService: ShoppingService) {
    super();
  }

  ngOnInit() {
    this.shoppingService.fetchIngredient();
    this.shoppingService.ingredientHandler.pipe(takeUntil(this.destroyed$)).subscribe(ing => {
      if (!!ing) {
        this.ingredients = ing;
      }
      this.filteredIngredient = this.ingredients;
      this.loading = false;
    });
  }

  loadIngredient(ing) {
    this.shoppingService.getIndex(ing);
  }

  delete() {
    if (window.confirm('Are you sure you want remove all items from the cart??')) {
      this.shoppingService.clearIngredients();
    }
  }

  filter($event: string) {
    this.filteredIngredient = this.ingredients.filter(x => x.name.toLowerCase().includes($event.toLowerCase()));
  }
}
