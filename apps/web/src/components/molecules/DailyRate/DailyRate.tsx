export type DailyRateProps = { amount: number; className?: string };
export function DailyRate({ amount, className = "" }: DailyRateProps) {
  return (
    <p
      className={`flex flex-wrap items-baseline font-body text-xl leading-[1.2] text-black ${className}`}
    >
      <strong className="font-heading text-[25px] leading-[1.25] font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        }).format(amount)}
      </strong>
      <span>/diária</span>
    </p>
  );
}
