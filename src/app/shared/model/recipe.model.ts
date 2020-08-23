import {Ingredient} from './ingriedent.model';

export class Recipe {
    public name: string;
    public description: string;
    public imgPath: string;
    public ingredients: Ingredient[];
    public id?: number;
    public creatorId?: string;

    constructor(name: string, description: string, imgPath: string, ingredients: Ingredient[], creatorId?: string, id?: number) {
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
        this.ingredients = ingredients;
        this.creatorId = creatorId;
        this.id = id;
    }
}
