class LoginPage {
    get loginSuccessText(){
        return cy.get('[class="post-title"]')
    }

    get loginErrorText(){
        return cy.get('#error');
    }

    verifyLoginSuccessText(){
        this.loginSuccessText.should('have.text', 'Logged In Successfully')
    }

    verifyLoginErrorText(keyWord){
        this.loginErrorText.should('have.text', `Your ${keyWord} is invalid!`)
    }
}

export default new LoginPage();