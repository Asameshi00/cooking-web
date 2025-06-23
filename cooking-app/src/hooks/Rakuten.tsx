import React, {useState} from "react";
import { IngredientForm } from '../components/IngredientForm';
import { RecipeType } from '../types/recipe';

const Rakuten: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const fetchRecipes = async (ingredients: string[]) => {
        const apiKey = process.env.RAKUTEN_API_KEY;
        const endPoint = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${apiKey}&format=json&categoryId=1&keyword=${ingredients.join(',')}`;

    }
    return (
        <div>
            
        </div>
    )
}
