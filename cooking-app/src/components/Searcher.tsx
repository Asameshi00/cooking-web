// 検索機能のコンポーネント

import React, { useState } from "react";
import { Ingredient } from '../types/ingredient';

/** 検索のプロパティ **/
interface SearcherProps {
    ingredients: Ingredient[];
}

const Searcher: React.FC<SearcherProps> = ({ ingredients }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="mb-4">
            <button
                onClick={() => {
                        const filteredIngredients = ingredients.filter((ingredient) =>
                            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        console.log(filteredIngredients);
                    }
                }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                検索
            </button>
        </div>
    );
}

export default Searcher;