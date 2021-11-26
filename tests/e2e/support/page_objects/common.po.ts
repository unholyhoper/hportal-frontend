import { createYield } from "typescript";

class Commonpo {
    getHPortalLogo = () => cy.get('.HportalLogo')
    getBody = () => cy.get('.body')
    getUserDropDown = () => cy.get('.userDropDowne2e')
    getGoToProfilButton = () => cy.get('profilee2e')
    getLogoutButton = () => cy.get('.logoute2e')
}
export default Commonpo;
