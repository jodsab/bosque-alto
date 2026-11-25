import content from "@/shared/constants/content.json";

type FinancingOption = (typeof content.lotes.items)[number]["financingOptions"][number];

const roundMoney = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;

export function getFinancingTotals(financing: FinancingOption, term: number) {
  const installment = financing.installments.find((option) => option.term === term);
  if (!installment) return null;

  const installmentsTotal = roundMoney(installment.monthly * term);
  const interest = roundMoney(installmentsTotal - financing.balance);

  return {
    installmentsTotal,
    interest,
    totalToPay: roundMoney(financing.downPayment + installmentsTotal),
  };
}
