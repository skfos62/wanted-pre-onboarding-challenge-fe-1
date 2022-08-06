const checkEmailVaildation = (input: string) => {
  const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
  return regex.test(input)
}
const checkPasswordVaildation = (input: string) => {
  const regex = new RegExp('.{8,}')
  return regex.test(input)
}
export const handleDisabled = (email: string, password: string) => {
  if (checkEmailVaildation(email) && checkPasswordVaildation(password))
    return false
  return true
}
