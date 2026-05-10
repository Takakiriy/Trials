import { ExpressTodoOutputPort } from '@src/interface-adapters/controllers-and-presenters/TodoWebAPI';
import { TodoMapStore } from '@src/interface-adapters/gateways/TodoMapStore';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoUseCase } from '../TodoUseCase';

describe('TodoUseCase (Use Cases)', () => {
    let useCase: TodoUseCase;
    let output: ExpressTodoOutputPort;

    beforeEach(() => {
        const db = new TodoMapStore();
        useCase = new TodoUseCase(db);
        output = new ExpressTodoOutputPort();
    });

    /**
     * ddd-backend-lightweight の TodoUseCase は重複時に例外を throw する。
     * ca-backend-lightweight では try/catch で握りつぶし、output.presentError() に渡す設計。
     * 「エラーが Output Port 経由で返り、呼び出し元に例外が漏れない」という
     * Output Port パターンの肝をテストする。
     */
    it('重複タイトルのエラーは例外にならず presentError 経由で返る', async () => {
        await useCase.create({ title: '買い物' }, output);

        const output2 = new ExpressTodoOutputPort();
        // 例外が throw されないこと
        await expect(useCase.create({ title: '買い物' }, output2)).resolves.toBeUndefined();

        // エラー内容が Output Port に渡っていること
        // send() で返す body を取り出すため、ダミーの res オブジェクトを使う
        let capturedBody: unknown;
        const fakeRes = {
            status: () => fakeRes,
            json: (body: unknown) => { capturedBody = body; },
        } as never;
        output2.send(fakeRes);

        expect(capturedBody).toEqual({
            success: false,
            message: '同じタイトルのTodoが既に存在します',
        });
    });
});
