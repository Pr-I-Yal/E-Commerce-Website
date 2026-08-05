export default function ImageValidators(e) {
    console.log(e.target.files.length)
    if (e.target.files.length === 1) {
        let pic = e.target.files[0]
        if (!["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"].includes(pic.type))
            return "Invalid Pic Format, Please Upload an Image of type .jpg,.jpeg,.png,.gif,.webp,.avif"
        else if (pic.size > 1048576)
            return "Pic is too Heavy, Please Upload an Image Upto 1MB"
        else
            return ""
    }
    else {
        let errorMessage = []
        Array.from(e.target.files).forEach((pic, index) => {
            if (!["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"].includes(pic.type))
                errorMessage.push(`Invalid Pic${index + 1} Format, Please Upload an Image of type .jpg, .jpeg, .png, .gif, .webp and .avif`)
            else if (pic.size > 1048576)
                errorMessage.push(`Pic${index + 1} is Too Heavy, Please Upload an Image Upto 1MB`)
        })
        return errorMessage.length ? errorMessage.join("|") : ""
    }
}