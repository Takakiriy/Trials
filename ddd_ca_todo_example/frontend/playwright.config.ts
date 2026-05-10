/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    // テスト前にフロントエンドとバックエンドを自動起動する
    webServer: [
        {
            // DDD バックエンド（ポート 3001）
            command: 'cd .. && npm run dev:ddd:lightweight-full',
            port: 3001,
            reuseExistingServer: !process.env.CI,
        },
        {
            // フロントエンド（DDD バックエンドに接続）
            command: 'VITE_BACKEND_URL=http://localhost:3001 npm run dev',
            port: 5173,
            reuseExistingServer: !process.env.CI,
        },
    ],
    use: {
        baseURL: 'http://localhost:5173',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
