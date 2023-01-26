export const validateNewIngredient = ({ name, amount, unit }) => {
  if (!name || !amount || !unit) return 'All fiels are required'
  if (isNaN(amount)) return 'Amount must be a number'
  return ''
}
