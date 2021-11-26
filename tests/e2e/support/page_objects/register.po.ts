class Register {
    getUserName = () => cy.get('.userName')
    getUserNameRequired = () => cy.get('.userNameRequired')
    getUserNameInvalid = () => cy.get('.userNameInvalid')

    getFirstname = () => cy.get('.firstname')
    getFirstnameRequired = () => cy.get('.firstnameRequired')
    getFirstnameInvalid = () => cy.get('.firstnameInvalid')
    getfirstnameLenghtError = () => cy.get('.firstnameLenghtError')

    getLastname = () => cy.get('.lastname')
    getLastnameRequied = () => cy.get('.lastnameRequied')
    getLastnameInvalid = () => cy.get('.lastnameInvalid')
    getLastnameLenghtError = () => cy.get('.lastnameLenghtError')

    getDate = () => cy.get('.date')

    getEmail = () => cy.get('.email')
    getEmailRequired = () => cy.get('.emailRequired')
    getEmailInvalid = () => cy.get('.emailInvalid')

    getGender = () => cy.get('.gender')

    getUserType = () => cy.get('.userType')

    getMedicalSerial = () => cy.get('.medicalSerial')
    getMedicalSerialRequired = () => cy.get('.medicalSerialRequired')
    getMedicalSerialInvalid = () => cy.get('.medicalSerialInvalid')

    getCin = () => cy.get('.cin')
    getCinRequired = () => cy.get('.cinRequired')
    getCinInvalid = () => cy.get('.cinInvalid')

    getPhone = () => cy.get('.phone')
    getPhoneRequired = () => cy.get('.phoneRequired')
    getPhoneInvalid = () => cy.get('.phoneInvalid')

    getCountry = () => cy.get('.country')

    getAddress = () => cy.get('.address')

    getProfilePicture = () => cy.get('.profilePicture')

    getPassword = () => cy.get('.password')
    getPasswordRequired = () => cy.get('.passwordRequired')
    getPasswordInvalid = () => cy.get('.passwordInvalid')

    getPasswordStrength = () => cy.get('.passwordStrength')

    geConfirmPasword = () => cy.get('.confirmPasword')
    getConfirmPaswordRequired = () => cy.get('.confirmPaswordRequired')
    getConfirmPaswordInvalid = () => cy.get('.confirmPaswordInvalid')

    getPrivacyPolicy = () => cy.get('.privacyPolicy')

    getCreatAccountButton = () => cy.get('.createAccounte2e')
}
export default Register