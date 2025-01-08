export function getCurrentEmailList() {
  const emailListName = sessionStorage.getItem('@currentEmailList')
  return { emailListName }
}