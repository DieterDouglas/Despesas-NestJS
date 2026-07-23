export enum ExpenseCategory {
  ALIMENTACAO = 'Alimentacao',
  MORADIA = 'Moradia',
  TRANSPORTE = 'Transporte',
  SAUDE = 'Saude',
  LAZER = 'Lazer',
  EDUCACAO = 'Educacao',
  OUTROS = 'Outros',
}

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.ALIMENTACAO]: 'Alimentação',
  [ExpenseCategory.MORADIA]: 'Moradia',
  [ExpenseCategory.TRANSPORTE]: 'Transporte',
  [ExpenseCategory.SAUDE]: 'Saúde',
  [ExpenseCategory.LAZER]: 'Lazer',
  [ExpenseCategory.EDUCACAO]: 'Educação',
  [ExpenseCategory.OUTROS]: 'Outros',
};
