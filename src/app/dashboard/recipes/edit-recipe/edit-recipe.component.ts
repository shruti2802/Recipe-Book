import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicRecipesService} from '../../../services/public-recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../../shared/model/recipe.model';
import {PrivateRecipesService} from '../../../services/private-recipes.service';
import {Options} from '../../../shared/enum/options.enum';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../../shared/component/unsubscribe/unsubscribe.component';
import {LocalStorageConstant} from '../../../shared/enum/local-storage-constant.enum';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent extends UnsubscribeAbstract implements OnInit {
  editing: boolean;
  options = Object.keys(Options);
  selectedRecipeIngredients = new FormArray([], [Validators.required]);
  controls = {
    name : new FormControl(null, [Validators.required]),
    url : new FormControl(null),
    description: new FormControl(null, [Validators.required]),
    ingredients : this.selectedRecipeIngredients,
  };
  recipeForm  = new FormGroup(this.controls);
  selectedRecipeIndex: number;
  visibility = new FormControl(null, Validators.required);
  userId = '';
  url: string;
  state = '';

  constructor(private publicRecipeService: PublicRecipesService,
              private privateRecipesService: PrivateRecipesService,
              private activatedRoute: ActivatedRoute , private router: Router) {
    super();
    this.publicRecipeService.fetchRecipes();
    this.privateRecipesService.fetchRecipes();
  }

  ngOnInit() {
    this.userId = localStorage.getItem(LocalStorageConstant.token);
    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe((param: Params) => {
      this.selectedRecipeIndex = +param.id;
      this.editing = this.activatedRoute.snapshot.routeConfig.path.includes('edit');
      // @ts-ignore
      this.url = this.activatedRoute._routerState.snapshot.url;
      if (this.url.includes('public')) {
        this.state = this.options[0];
      }
      if (this.url.includes('private')) {
        this.state = this.options[1];
      }
      this.visibility.setValue(this.state);
    });
    this.initialiseForm();
  }

  private initialiseForm() {
    if (this.editing) {
      const selectedRecipe = this.state === this.options[0] ?
        this.publicRecipeService.getRecipe(this.selectedRecipeIndex) :
        this.privateRecipesService.getRecipe(this.selectedRecipeIndex);
      if (!!selectedRecipe && !!selectedRecipe.ingredients) {
        for (const ing of selectedRecipe.ingredients) {
          this.selectedRecipeIngredients.push(new FormGroup({
            name: new FormControl(ing.name, Validators.required),
            amount: new FormControl(ing.amount, Validators.required),
            unit: new FormControl(ing.unit)
          }));
        }
      }
      this.controls.name.setValue(selectedRecipe.name);
      this.controls.url.setValue(selectedRecipe.imgPath);
      this.controls.description.setValue(selectedRecipe.description);
      this.controls.ingredients = this.selectedRecipeIngredients;
      if (this.userId !== selectedRecipe.creatorId && this.options[0] === this.state) {
        this.visibility.disable();
      }
    }
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute} );
  }

  deleteSingleIngredient(i: number) {
    this.selectedRecipeIngredients.removeAt(i);
  }

  makeNewIngredients() {
    this.selectedRecipeIngredients.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      unit: new FormControl(null)
    }));
  }

  submit() {
    const newRecipe = new Recipe( this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('url').value,
      this.recipeForm.get('ingredients').value
    );
    if (this.editing) {
      if (this.state === this.visibility.value) {
        if (this.state === this.options[0]) {
          this.publicRecipeService.editRecipe(newRecipe, this.selectedRecipeIndex);
        }
        if (this.state === this.options[1]) {
          this.privateRecipesService.editRecipe(newRecipe, this.selectedRecipeIndex);
        }
      } else {
        if (this.visibility.value === this.options[0]) {
          this.privateRecipesService.removeRecipe(this.selectedRecipeIndex);
          this.publicRecipeService.addNewRecipe({...newRecipe, creatorId: this.userId});
        } else {
          this.publicRecipeService.removeRecipe(this.selectedRecipeIndex);
          this.privateRecipesService.addNewRecipe(newRecipe);
        }
      }
    }
    if (isNaN(this.selectedRecipeIndex)) {
      if (this.visibility.value === this.options[0]) {
        this.publicRecipeService.addNewRecipe({...newRecipe, creatorId: this.userId});
      } else {
        this.privateRecipesService.addNewRecipe(newRecipe);
      }
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
