import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesComponent} from './recipes/recipes.component';
import {HeadersComponent} from './headers/headers.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {ShoppingEditComponent} from './shopping/shopping-edit/shopping-edit.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeSelectTextComponent} from './recipes/recipe-select-text/recipe-select-text.component';
import {EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    RecipesComponent,
    HeadersComponent,
    ShoppingComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    RecipeSelectTextComponent,
    EditRecipeComponent
  ],
  exports: [
    HeadersComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
