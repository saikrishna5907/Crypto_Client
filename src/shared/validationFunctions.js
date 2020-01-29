export const validateSignUpForm = data => {
    let errors = [];
    if(data.firstName.length === 0 || !data.firstName){
        errors.push('First Name cannot be empty.');
    }
    if(data.lastName.length === 0 || !data.lastName){
        errors.push('Last Name cannot be empty.');
    }
    if(data.email.length === 0 || !data.email){
        errors.push('Email cannot be empty.');
    }
    ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/
    if(!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,}$/)){
        errors.push('Password must be atleast 8 characters');
        errors.push('Password must have atleast 1 lowercase letter');
        errors.push('Password must have atleast 1 uppercase letter');
        errors.push('Password must have atleast 1 digit');
        errors.push('Password must have atleast 1 special character');

    }
    if(data.confirmPassword.length === 0 || !data.confirmPassword){
        errors.push('Confirm Password cannot be empty.');
    }
    if(!data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        errors.push('Email is Invalid...!')
    }
    if(data.password !== data.confirmPassword){
        errors.push('Password must Match...!');
    }
    return errors;
}