/**
 * 検索機能のコンポーネント
 */

import React, { useState } from "react";
import { Ingredient } from '../types/ingredient';
import { useRakutenAPI } from '../hooks/useRakuten';

/** 検索のプロパティ **/
interface SearcherProps {
    ingredients: Ingredient[];
}

const Searcher: React.FC<SearcherProps> = ({ ingredients }) => {
    const { recipes, loading, error, fetchRecipes } = useRakutenAPI();
    const [searchQuery, setSearchQuery] = useState<string>('');

    // 検索ワードを入力したときの処理
    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // 検索ボタンを押したときの処理
    const handleSearch = async () => {
        const ingredient = ingredients.map(ingredient => ingredient.name);
        await fetchRecipes(ingredient, {
            categoryId: '10',
            hits: 20,
            page: 1,
        })
    };

    if (loading) return <div>検索中...</div>;
    if (error) return <div>エラーが発生しました: {error}</div>;

    return (
        <div className="mb-4">
            <button
                onClick={handleSearch}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >レシピ検索</button>
            {recipes.map((recipe, index) => (
                <div key={index}>
                    <h3>{recipe.recipeTitle}</h3>
                    <img src={recipe.foodImageUrl} alt={recipe.recipeTitle} />
                    <a href={recipe.recipeUrl}>レシピを見る</a>
                </div>
            ))}
        </div>
    );
}

export default Searcher;
