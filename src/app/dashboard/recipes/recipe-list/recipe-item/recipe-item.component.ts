import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Recipe } from '../../../../shared/model/recipe.model';
import {PublicRecipesService} from '../../../../services/public-recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }
}
