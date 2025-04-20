// ラジオボタンコンポーネント

import React, { useState } from 'react';
import { Quantity } from '../types/ingredient';

const RadioButton: React.FC = () => {
    // 食材の量のラジオボタンを管理するための状態
    const [selectedQuantity, setSelectedQuantity] = useState<Quantity>('適量');

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(event.target.value as Quantity);
    };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="多"
                    checked={selectedQuantity === '多'}
                    onChange={handleQuantityChange}
                />
                多
            </label>
            <label>
                <input
                    type="radio"
                    value="中"
                    checked={selectedQuantity === '中'}
                    onChange={handleQuantityChange}
                />
                中
            </label>
            <label>
                <input
                    type="radio"
                    value="小"
                    checked={selectedQuantity === '小'}
                    onChange={handleQuantityChange}
                />
                小
            </label>
            <label>
                <input
                    type="radio"
                    value="適量"
                    checked={selectedQuantity === '適量'}
                    onChange={handleQuantityChange}
                />
                適量
            </label>
        </div>
    )
}

export default RadioButton;