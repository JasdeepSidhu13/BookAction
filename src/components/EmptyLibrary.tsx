import Link from "next/link";

type Props = {
  verified: boolean;
  title?: string;
  detail?: string;
};

export function EmptyLibrary({
  verified,
  title = "Your library is empty",
  detail = "Upload a PDF to generate chapter summaries, Action check-ins, and a Question Bank.",
}: Props) {
  return (
    <section className="flex flex-col items-start gap-4 rounded-card border border-line bg-white p-8">
      <h2 className="m-0 font-display text-[22px] font-bold">{title}</h2>
      <p className="m-0 max-w-xl text-[15px] leading-[1.55] text-soft">{detail}</p>
      {verified ? (
        <Link
          href="/upload"
          className="inline-flex h-11 items-center rounded-chip bg-brand px-5 text-sm font-semibold text-white no-underline"
        >
          Upload your first book
        </Link>
      ) : null}
    </section>
  );
}
