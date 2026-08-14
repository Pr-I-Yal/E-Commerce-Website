import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                     // Minimum length 8
    .is().max(100)                                   // Maximum length 100
    .has().uppercase(1)                              // Must have at least 1 uppercase letters
    .has().lowercase(1)                              // Must have at least 1 lowercase letters
    .has().digits(1)                                 // Must have at least 1 digits
    .has().symbols(1)                                // Must have at least 1 special character
    .has().not().spaces()                            // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);  // Blacklist these values

export default function TextValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 3 || value.length > 100)
                return name + " Field length must be 3-100 Characters"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 13 || value.length > 100)
                return name + " Field length must be 13-100 Characters"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (!schema.validate(value))
                return schema.validate(value, { details: true }).map(x => x.message?.replaceAll("string", "Password")).join(", ")
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 10 || value.length > 10)
                return name + " Field length must be 10 Characters"
            else if (!"6789".includes(value[0]))
                return name + " Field must Start with 6,7,8 or 9"
            else
                return ""

        case "shortDescription":
        case "question":
        case "answer":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 30 || value.length > 1000)
                return name + " Field length must be 30-1000 Characters"
            else
                return ""

        case "icon":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 10 || value.length > 100)
                return name + " Field length must be 10-100 Characters"
            else
                return ""

        default:
            return ""
    }
}