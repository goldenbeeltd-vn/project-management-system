/**
 * Hook for currency formatting utilities
 */
export function useCurrencyFormatter() {
  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (field: string, value: unknown) => void,
  ) => {
    const formatted = formatCurrency(e.target.value);
    onChange("budget", formatted);
  };

  return {
    formatCurrency,
    handleBudgetChange,
  };
}
