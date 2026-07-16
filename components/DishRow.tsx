import Stepper from "./order/Stepper";
import { money, type Dish } from "@/lib/content";

export default function DishRow({
  dish,
  groupId,
}: {
  dish: Dish;
  /** Menu category or specials group id — scopes the dish's order key. */
  groupId: string;
}) {
  return (
    // Stacked on phones: the price and stepper together run ~190px, which at
    // 375px squeezes the name into a two-word ribbon. Side by side from sm up.
    // Bar and extras rows are a single line, so they get a tighter rhythm than
    // the dishes that carry a description.
    <li
      className={`flex break-inside-avoid flex-col gap-2 sm:flex-row sm:justify-between sm:gap-[18px] ${
        dish.desc ? "mb-[26px]" : "mb-3"
      }`}
    >
      <div>
        <h4 className="font-serif text-[1.14rem] font-medium">{dish.name}</h4>
        {dish.tag ? (
          <span className="mt-[3px] block font-mono text-[.7rem] uppercase tracking-[.06em] text-nopal">
            {dish.tag}
          </span>
        ) : null}
        {dish.desc ? (
          <p className="mt-1 max-w-[360px] text-[.87rem] font-light text-cal-dim">
            {dish.desc}
          </p>
        ) : null}
        {dish.note ? (
          <p className="mt-1 max-w-[360px] text-[.87rem] font-light italic text-cal-dim">
            {dish.note}
          </p>
        ) : null}
      </div>

      {/* One line per priced serving, so the Rib Eye's 350g and 500g are
          added independently rather than forcing a guess at which is meant. */}
      <div className="flex shrink-0 flex-col gap-2 sm:items-end sm:pt-[2px]">
        {dish.prices.map((variant, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="whitespace-nowrap font-mono text-[.9rem] text-oro">
              {variant.label
                ? `${variant.label} ${money(variant.amount)}`
                : money(variant.amount)}
            </span>
            <Stepper
              groupId={groupId}
              dish={dish.name}
              variant={variant}
              variantIndex={i}
            />
          </div>
        ))}
      </div>
    </li>
  );
}
