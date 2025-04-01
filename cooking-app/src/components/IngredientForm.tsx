// 食材を追加する

import React, { useState, useCallback } from 'react';

interface IngredientFormProps {
    addIngredient: (ingredient: string) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ addIngredient }) => {
    // 食材の状態を管理するためのuseStateフック
    const [ingredient, setIngredient] = useState<string>('');

    // 食材の変更を管理するためのuseCallbackフック
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(event.target.value);
    }, []);

    // フォームの送信を管理するためのuseCallbackフック
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (ingredient.trim()) {
            addIngredient(ingredient);
            setIngredient('');
        }
    }, [ingredient, addIngredient]);

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <div>
                <label htmlFor="ingredient" className="block text-gray-700 text-sm font-bold mb-2">
                    食材を追加
                </label>
                <input 
                    type="text" 
                    value={ingredient} 
                    onChange={handleChange} 
                    placeholder="食材を追加" 
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                追加
            </button>
        </form>
    );
};

export default IngredientForm;