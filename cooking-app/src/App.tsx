import React, { useState, useCallback } from "react";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import { Ingredient, Quantity } from "./types/ingredient";
import Searcher from "./components/Searcher";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // スプレッド構文を使用して、既存の配列に新しい食材を追加
  const addIngredient = useCallback((name: string, quantity: Quantity) => {
    setIngredients((prevIngredients) => [...prevIngredients, {name: name, quantity: quantity}]);
  }, []);

  // filterメソッドを使用して、指定された食材を除外した新しい配列を作成
  const removeIngredient = useCallback((ingredientName: string) => {
    setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.name !== ingredientName));
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Cooking-Web</h1>
        <Searcher ingredients={ingredients}/>
        <IngredientForm addIngredient={addIngredient} />
        <IngredientList ingredients={ingredients} removeIngredient={removeIngredient} />
      </div>
    </div>
  );
}

export default App;
