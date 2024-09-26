import { TEXTS, STATISTICS } from './data';

export default function KeyPerformance() {
  return (
    <section className="mb-6">
      <h2 className="mb-6 text-lg font-semibold text-white">{TEXTS.title}</h2>
      <ul className="grid max-lg:gap-y-4 lg:grid-cols-2 lg:gap-x-6">
        {STATISTICS.map(({ id, title, value }) => (
          <li
            className="rounded-3 border border-gray-blue-300 bg-downriver p-5.75 text-md font-semibold text-white shadow-xs"
            key={id}
          >
            {title}
            <p className="mt-6 text-display-md -tracking-[0.72px]">{value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
