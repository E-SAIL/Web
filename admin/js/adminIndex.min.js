//login  user event listner
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit' , e=>{
e.preventDefault();
//get data
const email =loginForm['email'].value;
const password=loginForm['password'].value;
//authenticate server 
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(()=> {
    auth.signInWithEmailAndPassword(email, password)
    .then(cred=>{
        if(cred.user.emailVerified == true)
        {
           
            gotoDashboard();
        }
        else
        {
            $.toast({
                heading: 'Error',
                text: 'User email not verified !',
                position: 'top-center',
                stack: false,
                icon: 'error',
                hideAfter:false
            })
        }
    })
    .catch(err=>{
        $.toast({
            heading: 'Error',
            text: err.message,
            position: 'top-center',
            stack: false,
            icon: 'error',
            hideAfter:false
        })
    })
    }).catch(err=>{
        $.toast({
            heading: 'Error',
            text: err.message,
            position: 'top-center',
            stack: false,
            icon: 'error',
            hideAfter:false
        })
    });
})


//route to dashboard
const gotoDashboard = ()=>{
   
    sessionStorage.setItem(authKey,'1');
    window.location='dashboard.html';
}