import { Component, OnInit } from '@angular/core';
import {PublicRecipesService} from '../../services/public-recipes.service';
import {PrivateRecipesService} from '../../services/private-recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../../shared/model/recipe.model';
import {FormControl} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent extends UnsubscribeAbstract implements OnInit {
  recipes: Recipe[];
  options = ['public', 'private'];
  visibility = new FormControl(this.options[0]);
  filteredRecipe: Recipe[];
  publicRecipes: Recipe[] = [];
  privateRecipes: Recipe[] = [];

  constructor(private publicRecipeService: PublicRecipesService,
              private privateRecipesService: PrivateRecipesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
    this.publicRecipeService.fetchRecipes();
    this.privateRecipesService.fetchRecipes();
  }


  ngOnInit() {
    this.visibility.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.router.navigate([`../${value}`], {relativeTo: this.activatedRoute});
    });
    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(_ => {
      if (this.activatedRoute.snapshot.url[0].path.includes(this.options[0])) {
        this.visibility.setValue(this.options[0]);
      }
      if (this.activatedRoute.snapshot.url[0].path.includes(this.options[1])) {
        this.visibility.setValue(this.options[1]);
      }
    });

    combineLatest(this.publicRecipeService.recipeHandler, this.privateRecipesService.recipeHandler, this.activatedRoute.params).pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.publicRecipes = [...value[0]];
      this.privateRecipes = [...value[1]];
      if (this.activatedRoute.snapshot.url[0].path.includes(this.options[0])) {
        this.recipes = [...this.publicRecipes];
      }
      if (this.activatedRoute.snapshot.url[0].path.includes(this.options[1])) {
        this.recipes = [...this.privateRecipes];
      }
      this.filteredRecipe = this.recipes.map((x, index) => ({...x, id: index}));
    });
  }

  filter(e: string) {
    this.filteredRecipe = this.recipes.map((value, index) => ({...value, id: index}));
    this.filteredRecipe = this.filteredRecipe.filter(x => x.name.toLowerCase().includes(e.toLowerCase()));
  }
}
