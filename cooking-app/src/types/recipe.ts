// レシピの型定義

export type RecipeType = {
    recipeTitle: string;
    recipeUrl: string;
    foodImageUrl: string;
}

type Props = {
    recipes: RecipeType[];
};
