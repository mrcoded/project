const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');

const signInForm=document.getElementById('signIn');//sign in form
const signUpForm=document.getElementById('signup');//sign up form


signUpButton.addEventListener('click',function(){
    signInForm.classList.add('disable');
    signUpForm.classList.remove('disable')

});

signInButton.addEventListener('click', function(){
    signInForm.classList.remove('disable');
    signUpForm.classList.add('disable')

})