import React, { useState, useCallback } from "react";
import IngredientSelector from "./components/Ingredient";
import IngredientForm from "./components/IngredientForm";
import IngredientList from "./components/IngredientList";
import { Ingredient } from "./types/ingredient";

const App: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient[]>([]);

  const addIngredient = useCallback((name: string) => {
    setIngredient((prevIngredients) => [...prevIngredients, {name: name, quantity: '適量'}]);
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setIngredient((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Cooking-Web</h1>
        <IngredientForm addIngredient={addIngredient} />
        <IngredientList ingredients={ingredient} removeIngredient={removeIngredient} />
        <IngredientSelector />
      </div>
    </div>
  );
}

export default App;
