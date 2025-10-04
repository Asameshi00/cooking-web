/**
 * 楽天グルメAPIへのリクエスト処理
 * レシピデータの取得とフォーマット
 * エラーハンドリング
 */

import { useState, useCallback } from "react";
import { RecipeType } from '../types/recipe';
import { Fetcher } from "react-router-dom";

/** 楽天レシピAPIのレスポンス型定義 **/
interface RakutenRecipeResponse {
    result: Array<{
        recipeTitle: string;       // レシピのタイトル
        recipeUrl: string;         // レシピのURL
        foodImageUrl: string;      // レシピの画像URL
        recipeMaterial: string[];  // レシピの材料
        recipeIndication: string;  // レシピの説明
        recipePublishday: string;  // レシピの公開日(yyyy-mm-dd)
        recipeCost: string;        // レシピのコスト
        recipeDescription: string; // レシピの説明
        nickname: string;          // レシピのニックネーム
    }>;
    count: number; // レシピの件数
    page: number;  // ページ番号(1~10)
    total: number; // 総件数(1~100)
}

/** カスタムフックのプロパティ **/
interface UseRakutenReturn {
    recipes: RecipeType[]; // レシピの配列
    loading: boolean; // ローディング中かどうか
    error: string | null; // エラーのメッセージ
    fetchRecipes:(
        ingredients: string[],
        options?: FetchOptions
    ) => Promise<void>; // レシピの取得
}

/** レシピの取得オプション **/
interface FetchOptions {
    categoryId?: string; // カテゴリID
    hits?: number;       // 取得件数
    page?: number;       // ページ番号
}

export const useRakutenAPI = (): UseRakutenReturn => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = useCallback(
        async (ingredients: string[], options: FetchOptions = {}) => {

        const apiKey = process.env.REACT_APP_RAKUTEN_API_KEY;
        if (!apiKey) {setError('楽天APIキーが設定されていません'); return;}

        setLoading(true);
        setError(null);

        try {
            // APIパラメータの設定
            const params = new URLSearchParams({
                applicationId: apiKey,
                format: 'json',
                categoryId: options.categoryId || '10', // デフォルトは「ご飯もの」
                keyword: ingredients.join(','),
                hits: (options.hits || 20).toString(),
                page: (options.page || 1).toString(),
            });

            const endpoint = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?${params}`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`APIリクエストが失敗しました: ${response.status}`);
            }

            const data: RakutenRecipeResponse = await response.json();

            // レスポンスデータをRecipeType形式に変換
            const formattedRecipes: RecipeType[] = data.result.map(recipe => ({
                recipeTitle: recipe.recipeTitle,
                recipeUrl: recipe.recipeUrl,
                foodImageUrl: recipe.foodImageUrl || '/default-recipe-image.jpg', // デフォルト画像
            }));

            setRecipes(formattedRecipes);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
            setError(errorMessage);
            console.error('楽天レシピAPI取得エラー:', err);
        } finally {
            setLoading(false);
        }
    }, [recipes]);

    return {
        recipes,
        loading,
        error,
        fetchRecipes,
    };
}

export default useRakutenAPI;
