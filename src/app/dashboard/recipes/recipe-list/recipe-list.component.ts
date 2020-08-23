import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../../shared/model/recipe.model';
import {PublicRecipesService} from '../../../services/public-recipes.service';
import {AuthService} from '../../../services/auth.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrivateRecipesService} from '../../../services/private-recipes.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  get recipes(): Recipe[] {
    return this._recipes;
  }

  @Input() set recipes(value: Recipe[]) {
    this._recipes = value;
  }

  // tslint:disable-next-line:variable-name
  private _recipes: Recipe[];

  constructor() {
  }
  ngOnInit() {
  }
}
