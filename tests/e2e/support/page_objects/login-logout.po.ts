class Login{
    
    //get the page user name
    getLoginButton = () => cy.get('.nav-item > .nav-link')

    //get the page user name
    getRegister = () => cy.get(' .registere2e')

    //get the page user name
    getUserName = () => cy.get('.userName')

    //get requiredUserName message
    getRequiredUSerName =() => cy.get('.requiredUserName')

    //get invalidUserName message
    getInvalidUserName =() => cy.get('.invalidUserName')

    //get Password 
    getPassword =() => cy.get('.password')
    
    //get requiredPassword message
    getRequiredPassword =() => cy.get('.requiredPassword')

    //get invalidPassword message
    getInvalidPassword =() => cy.get('.invalidPassword')

    //get rememberMe element
    getRememberElement =() => cy.get('.rememberMe')
    
    //get rememberMe element
    getRememberCheckBox =() => cy.get('.rememberMe')

    //get signIn 
    getSignIn =() => cy.get('.signInButton')

    //get forgetPassword 
    getForgetPassword =() => cy.get('.forgetPassword')
    
    //get createAccount 
    getCreateAccount =() => cy.get('.createAccount')


    //get warningMessage 
    getWarningMessage =() => cy.get('.warningMessage')

    //get dangerMessage 
    getDangerMessage =() => cy.get('.dangerMessage')

    //get successfulMessage 
    getsuccessfulMessage =() => cy.get('.successfulMessage')

} 
export default Login;
