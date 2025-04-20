// 追加した食材のリストを表示するコンポーネント
import React from 'react';
import { Ingredient } from '../types/ingredient';
import RadioButton from './RadioButton';

interface IngredientListProps {
    ingredients: Ingredient[];
    removeIngredient: (ingredient: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, removeIngredient }) => {
    return (
        <ul>
            {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <span className="text-gray-700">{ingredient.name}</span>
                    <button 
                        onClick={() => removeIngredient(ingredient.name)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        削除
                    </button>
                </li>
            ))}
            <li className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span className="text-gray-700">量</span>
                <RadioButton />
            </li>
        </ul>
    );
};

export default IngredientList;