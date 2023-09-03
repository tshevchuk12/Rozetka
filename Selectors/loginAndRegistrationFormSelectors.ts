const loginFormSelectors ={
    LOGIN_BUTTON: '.header-actions__item.header-actions__item--user',
    LOGIN_FORM_HEADER: 'h3.modal__heading',
    EMAIL_FIELD: '#auth_email',
    PASSWORD_FIELD: '#auth_pass',
    PASSWORD_TOGGLE_BUTTON: '.button_type_link.form__toggle-password',
    REGISTRATION_BUTTON: '.auth-modal__register-link.button.button--link',
    CAPTCHA_ERROR_TEXT: '.error-message_color_red'
}

const registrationFormSelectors = {
    REGISTRATION_FORM_HEADER: 'h3.modal__heading',
    USER_NAME_FIELD: '#registerUserName',
    USER_SURNAME_FIELD: '#registerUserSurname',
    USER_PHONE_FIELD: '#registerUserPhone',
    USER_PASSWORD_FIELD: '#registerUserPassword',
    USER_EMAIL_FIELD: '#registerUserEmail',
    SUBMIT_REGISTRATION_BUTTON: '.button.button--large.button--green.auth-modal__submit',
    EMAIL_VALIDATION_ERROR_TEXT:'.form__row.ng-star-inserted .validation-message.ng-star-inserted'

}

export {loginFormSelectors}
export {registrationFormSelectors}