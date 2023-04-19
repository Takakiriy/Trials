describe('My First Test', () => {
    it('Input test', () => {
        cy.visit('test_target_1.html')  // または / または http://localhost:3000/ など

        cy.get('#input-text').clear().type('ABC')  // ABC と入力する
        cy.get('#input-button').click()  // ボタンを押す
        cy.get('#result').should('contain', 'ab')  // 出力をチェックする
        cy.get('#result2').should('include', 'シグネチャ更新')  // 出力をチェックする
        //cy.get('#input-text').should('contain', 'ABC')  // input タグの場合
    })
})
