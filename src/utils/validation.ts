export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidName = (name: string) => {
    return name.trim().length >=2 && name.trim().length <=100
}