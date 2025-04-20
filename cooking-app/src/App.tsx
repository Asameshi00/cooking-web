import React, { useState, useCallback } from "react";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import { Ingredient, Quantity } from "./types/ingredient";

const App: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  const addIngredient = useCallback((name: string, quantity: Quantity) => {
    // スプレッド構文を使用して、既存の配列に新しい食材を追加
    setIngredient((prevIngredients) => [...prevIngredients, {name: name, quantity: quantity}]);
  }, []);

  const removeIngredient = useCallback((ingredientName: string) => {
    setIngredient((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.name !== ingredientName));
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Cooking-Web</h1>
        <IngredientForm addIngredient={addIngredient} />
        <IngredientList ingredients={ingredient} removeIngredient={removeIngredient} />
      </div>
    </div>
  );
}

export default App;
