// ルーティング設定

import React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import App from '../App';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} /> {/* トップページ */}
                <Route path="/recipe" element={<div>レシピ一覧</div>} /> {/* レシピ一覧 */}
                <Route path="/recipe/:id" element={<div>レシピ詳細</div>} /> {/* レシピ詳細 */}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;