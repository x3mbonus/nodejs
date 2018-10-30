"use strict";
function User(){
    var isAuthorized = false;

    function toggleAuthElements(){
        $(".for-authorized").toggle(isAuthorized);
    }

    this.toggleAuthElements = toggleAuthElements;

    this.checkLogin = function (callback){
        function customCallback(isAuth){
            isAuthorized = isAuth;
            callback(isAuth);
        }
        var config = new Config();
        var token = Cookies.get('Token');
        if (!token){
            customCallback(false);
            return;
        }

        $.ajax({
            type: "GET",
            url: `${config.serverUrl}/api/user/isAuthorized`,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", token);
            },
            success: result => customCallback(result.IsAuthorized),
            error: () => customCallback(false),
        });
    };
    return this;
}

document.schoolUser = new User();

$(function () {
    var
        SIGN_IN_SECTION = '.sign-in-section',
        SIGN_OUT_SECTION = '.sign-out-section',
        SIGN_UP_DIALOG = '#sign-up-dialog',
        SIGN_UP_DIALOG = '#sign-up-dialog',
        SIGN_UP_SUBMIT = '.sign-up-submit',  
        SIGN_UP_EMAIL = '#sign-up-email',    
        SIGN_UP_PASSWORD = '#sign-up-password',    
        SIGN_IN_DIALOG = '#sign-in-dialog',
        SIGN_IN_SUBMIT = '.sign-in-submit',
        SIGN_IN_EMAIL = '#sign-in-email',    
        SIGN_IN_PASSWORD = '#sign-in-password',
        SIGN_OUT_DIALOG = '#sign-out-dialog',
        SIGN_OUT_SUBMIT = '.sign-out-submit',
        VALIDATION_MESSAGES = '.validation-messages',
        COOKIE_TOKEN = 'Token';

    var config = new Config();

    init();

    function init() {
        initSignInSection();
        initSignUpPopup();
        initSignInPopup();
        initSignOutPopup();

        
    }

    function initSignInSection(){
        document.schoolUser.checkLogin(loggedIn => {
            $(SIGN_IN_SECTION).toggle(!loggedIn);
            $(SIGN_OUT_SECTION).toggle(loggedIn);            
            document.schoolUser.toggleAuthElements();
        });
    }

    function initSignUpPopup() {
        $(SIGN_UP_SUBMIT).click(function () {
            post('/signup', SIGN_UP_DIALOG, {
                email: $(SIGN_UP_EMAIL).val(),
                password:  $(SIGN_UP_PASSWORD).val()
            });            
        });
    }

    function initSignInPopup() {
        $(SIGN_IN_SUBMIT).click(function () {
            post('/signin', SIGN_IN_DIALOG, {
                email: $(SIGN_IN_EMAIL).val(),
                password:  $(SIGN_IN_PASSWORD).val()
            });            
        });
    }

    

    function initSignOutPopup() {
        $(SIGN_OUT_SUBMIT).click(function () {
            Cookies.remove(COOKIE_TOKEN);
            $(SIGN_OUT_DIALOG).modal('hide');
            initSignInSection();
        });
    }

    

    function post(urlPart, dialogSelector, data){
        $.ajax({
            type: 'POST',
            url: `${config.serverUrl}/api/user${urlPart}`,
            contentType: 'application/json',
            data: JSON.stringify(data || {}),
            dataType: "json",
            success: (data) => onSuccess(data, dialogSelector),
            error: (err) => onError(err.responseJSON.Error, dialogSelector)
        });
    }

    function onSuccess(data, dialogSelector){
        $(dialogSelector+" "+VALIDATION_MESSAGES).html('');

        if (data.token) {
            Cookies.set(COOKIE_TOKEN, data.token);
            $(dialogSelector).modal('hide');
            initSignInSection();
        } else {
            onError("Cannot login for some reason", dialogSelector);
        }

    }

    function onError(errorMessage, dialogSelector){
        $(dialogSelector+" "+VALIDATION_MESSAGES).html(errorMessage || '');
        $(dialogSelector).modal('handleUpdate');
    }

    
});