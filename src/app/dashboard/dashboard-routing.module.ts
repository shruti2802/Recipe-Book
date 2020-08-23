import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {RecipeSelectTextComponent} from './recipes/recipe-select-text/recipe-select-text.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {EditRecipeComponent} from './recipes/edit-recipe/edit-recipe.component';
import {DashboardComponent} from './dashboard.component';
import {InvalidRouteComponent} from '../shared/component/invalid-route/invalid-route.component';

const route: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: '' , redirectTo: 'recipes', pathMatch: 'full'},
      {path: 'recipes', children: [
          {path: '', redirectTo: 'public', pathMatch: 'full'},
          {path: 'public' , component: RecipesComponent, children: [
              {path: '' , redirectTo: '-1', pathMatch: 'full'},
              {path: ':id' , component: RecipeDetailComponent},
              {path: ':id/edit', component: EditRecipeComponent},
              {path: '**', component: InvalidRouteComponent}
            ]},
          {path: 'private' , component: RecipesComponent, children: [
              {path: '' , redirectTo: '-1', pathMatch: 'full'},
              {path: ':id' , component: RecipeDetailComponent},
              {path: ':id/edit', component: EditRecipeComponent},
              {path: '**', component: InvalidRouteComponent}
            ]},
          {path: 'new', component: EditRecipeComponent},
        ]},
      {path: 'shopping' , component: ShoppingComponent},
      {path: '**', component: InvalidRouteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
