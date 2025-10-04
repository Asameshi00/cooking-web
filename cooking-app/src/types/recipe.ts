/**
 * レシピの型定義
 */

/** レシピの型定義 **/
export type RecipeType = {
    recipeTitle: string;  // レシピのタイトル
    // recipeTime: time;  // レシピの所要時間
    recipeUrl: string;    // レシピのURL
    foodImageUrl: string; // レシピの画像URL
}

type Props = {
    recipes: RecipeType[];
};
