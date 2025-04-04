// 食品の量の型定義

type Quantity = '多' | '中' | '小' | '適量';

interface Ingredient {
    name: string;
    quantity: Quantity;
}

export type { Quantity, Ingredient };