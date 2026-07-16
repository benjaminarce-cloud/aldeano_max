import { type Dish } from "@/lib/content";

export default function DishRow({ dish }: { dish: Dish }) {
  return (
    // Bar and extras rows are a single line, so they get a tighter rhythm than
    // the dishes that carry a description.
    <li
      className={`flex break-inside-avoid justify-between gap-[18px] ${
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
      <span className="whitespace-nowrap pt-[3px] font-mono text-[.9rem] text-oro">
        {dish.price}
      </span>
    </li>
  );
}
