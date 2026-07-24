export default function TextValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 3 || value.length > 30)
                return name + " Field length must be 3-30 Characters"
            else
                return ""

        default:
            return ""
    }
}