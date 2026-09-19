import { useLocation, Link } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-paper">
      <div className="flex max-w-md flex-col items-center text-center">
        <p className="font-display text-7xl font-bold tracking-[-0.06em] text-copper">404</p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em]">Страница не найдена</h1>
        <p className="mt-4 text-sm leading-6 text-paper/60">
          Возможно, страница была перемещена или удалена. Вернитесь на главную,
          чтобы записаться в автосервис.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setLocation("/")}
            className="button-copper inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em]"
          >
            На главную
          </button>
          <Link
            href="/"
            className="button-ghost inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Контакты
          </Link>
        </div>
      </div>
    </main>
  );
}
