import {Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/model/ingriedent.model';
import {ShoppingService} from '../../../services/shopping.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent extends UnsubscribeAbstract implements OnInit {
  IngIndex: number;
  newIng: Ingredient;

  controls = {
    ingredientName: new FormControl(null, [Validators.required]),
    ingredientAmount: new FormControl(null, [Validators.required]),
    amountUnit: new FormControl(null)
  };
  shoppingForm = new FormGroup(this.controls);

  formValueList = [];

  constructor( private shoppingService: ShoppingService) {
    super();
  }
  editing = false;
  ngOnInit() {
    this.shoppingService.editedIngredient.pipe(takeUntil(this.destroyed$)).subscribe((ing: Ingredient) => {
      this.shoppingForm.setValue({
        ingredientName: ing.name,
        ingredientAmount: ing.amount,
        amountUnit: ing.unit || ''
      });
    });
    this.shoppingService.findIndex.pipe(takeUntil(this.destroyed$)).subscribe((index: number) => {
      this.editing = true;
      this.IngIndex = index;
    });
    this.shoppingForm.valueChanges.subscribe(value => {
      this.formValueList = Object.values(this.shoppingForm.value).filter(x => !!x);
    })
  }

  submit() {
    this.newIng = new Ingredient(this.shoppingForm.value.ingredientName, this.shoppingForm.value.ingredientAmount, this.shoppingForm.value.amountUnit);
    if (this.editing) {
      this.shoppingService.editIngredient(this.IngIndex, this.newIng);
    } else {
      this.shoppingService.addIngredient(this.newIng);
    }
    this.shoppingForm.reset();
    this.editing = false;
  }

  delete() {
    this.shoppingService.removeIngredient(this.IngIndex);
    this.shoppingForm.reset();
    this.editing = false;
  }

  clear() {
    this.shoppingForm.reset();
    this.editing = false;
  }
}
