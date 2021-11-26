import Login from "../../support/page_objects/login-logout.po"
import Commonpo from "../../support/page_objects/common.po"
import Register from "../../support/page_objects/register.po"
const Common= new Commonpo()
const login= new Login()
const register = new Register()

describe('Login Page', ()=>{
    before(()=>{
        cy.login()
        login.getRegister().click()
    })
    describe(' Should be visible' , () =>{
        it('1- Hportal Logo', () =>{ Common.getHPortalLogo().should('be.visible') })
        it('2- User name', () =>{register.getUserName().should('be.visible')})
        it('3- First name', () =>{register.getFirstname().should('be.visible')})
        it('4- Last name', () =>{register.getLastname().should('be.visible')})
        it('5- Date', () =>{register.getDate().should('be.visible')})
        it('6- E-mail', () =>{register.getEmail().should('be.visible')})
        it('7- Gender', ()=>{register.getGender().should('be.visible')})
        it('8- User type', ()=>{register.getUserType().should('be.visible')})
        // it('9- MedicalSerial', ()=>{register.getMedicalSerial().should('not.exists')})
        it('9- CIN', ()=>{register.getCin().should('be.visible')})
        it('10- Phone', ()=>{register.getPhone().should('be.visible')})
        it('11- Profile Picture', ()=>{register.getProfilePicture().should('be.visible')})
        it('12- Password', ()=>{register.getPassword().should('be.visible')})
        it('13- ConfirmPasword', ()=>{register.geConfirmPasword().should('be.visible')})
        it('14- Privacy Policy', ()=>{register.getPrivacyPolicy().should('be.visible')})
        it('14- Create account button', ()=>{register.getCreatAccountButton().should('be.visible')})


    })
})