export default function Historia() {
  return (
    <section id="historia" className="bg-bg py-[120px]">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-[70px]">
        <div>
          <span className="sec-num">01 — Nuestra historia</span>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-[340] leading-[1.05]">
            Como en <em className="font-semibold italic text-achiote">la aldea</em>,
            <br />
            se come en comunidad.
          </h2>
          <p className="mt-[30px] text-[1.02rem] font-light text-cal-dim">
            Aldeano es el proyecto del Chef Beto González, un mexicalense de
            corazón que mezcla{" "}
            <strong className="font-medium text-cal">
              lo rural con lo urbano.
            </strong>{" "}
            En la cocina conviven las recetas heredadas — como los ceviches del
            abuelo Alberto, que se preparan igual desde 1954 — con creaciones
            propias del chef que han conquistado Mexicali por años.
          </p>
          <p className="mt-[18px] text-[1.02rem] font-light text-cal-dim">
            Cada plato lleva ese doble origen: la memoria de la mesa familiar y
            la técnica de una cocina moderna, servidas en un espacio pensado
            para quedarse y compartir.
          </p>
        </div>

        <div className="mx-auto flex h-[168px] w-[168px] rotate-[-9deg] items-center justify-center rounded-full border-[1.5px] border-dashed border-oro p-5 text-center font-mono text-[.68rem] uppercase leading-relaxed tracking-[.1em] text-oro">
          Receta del abuelo Alberto · Desde 1954
        </div>
      </div>
    </section>
  );
}
