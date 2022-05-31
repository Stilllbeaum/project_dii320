const form=document.getElementById('form');
const username=document.getElementById('username')
const password=document.getElementById('password')
const password_2=document.getElementById('password_2')

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(username.value === ''){
        showerror(username,'pls enter username');
    }else{
        showsucces
    }
    checkPassword(password,password_2)
})

function showerror(input,message){
    const txt_field=input.parentElement;
    txt_field.className='error'
}

function showsucces(){
    
}

function checkPassword(password,password_2){
    if(password.value !== password_2){
        showerror(password_2,'password do not match')
    }
}

function showerror(input,)