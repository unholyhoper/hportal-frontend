import Login from "../../support/page_objects/login-logout.po"
import Commonpo from "../../support/page_objects/common.po"

const Common= new Commonpo()
const login= new Login()
describe('Login Page', ()=>{
    before(()=>{
        cy.login()
    })
    describe(' Should be visible' , () =>{
        it('1- Hportal Logo', () =>{ Common.getHPortalLogo().should('be.visible') })
        it('2- UserName', () =>{login.getUserName().should('be.visible')})
        it('3- Password', () =>{login.getUserName().should('be.visible')})
        it('4- Remember Me', () =>{login.getRememberElement().should('be.visible')})
        it('5- Sign In', () =>{login.getSignIn().should('be.visible')})
        it('6- Forget password', () =>{login.getPassword().should('be.visible')})
        it('7- Login Button', ()=>{login.getLoginButton().should('be.visible')})
        it('8- Register Button', ()=>{login.getRegister().should('be.visible')})
    })
    describe('Should Sign In successfuly', () =>{
        it('User respect pattern',() =>{ 
            login.getUserName().type('123456')
            Common.getBody().click()
            login.getInvalidUserName().should('be.visible')
        })
        it('User is not empty',()=>{
            login.getUserName().type('Heni')
            login.getUserName().clear()
            login.getRequiredUSerName().should('be.visible')
        })
        it('Password respect pattern',() =>{ 
            login.getPassword().type('123456')
            Common.getBody().click()
            login.getInvalidPassword().should('be.visible')
        })
        it('Password is not empty',()=>{
            login.getPassword().type('Heni')
            login.getPassword().clear()
            login.getRequiredPassword().should('be.visible')
        })

        it('should show warning message when user name or password is not selected',() =>{
            login.getSignIn().click()
            login.getWarningMessage().should('be.visible')
        })
        it('should show danger message error when user and password are incorrect', () =>{
            login.getUserName().type('Heni')
            login.getPassword().type('heni')
            login.getSignIn().click()
            login.getDangerMessage().should('be.visible')
        })
        it('should show login successfully to Admin account', () =>{
            login.getUserName().clear()
            login.getPassword().clear()
            login.getUserName().type('ADMIN')
            login.getPassword().type('ADMIN')
            login.getSignIn().click()
            login.getsuccessfulMessage().should('be.visible')   
            cy.url().should('eq', 'http://localhost:4200/#/dashboard')
               
        })
        it('should logout and go back to login page', () =>{
            Common.getUserDropDown().click()
            Common.getLogoutButton().click()
            cy.url().should('eq', 'http://localhost:4200/#/login')
        })
    })
})