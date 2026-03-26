export default function ManualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">

      <div
        className="
          prose max-w-none

          prose-headings:font-semibold
          prose-headings:text-gray-900

          prose-h1:text-4xl
          prose-h1:mb-6
          prose-h1:border-b
          prose-h1:pb-3

          prose-h2:text-2xl
          prose-h2:mt-10
          prose-h2:border-l-4
          prose-h2:border-gray-400
          prose-h2:pl-3

          prose-h3:text-xl
          prose-h3:mt-6

          prose-p:text-gray-700
          prose-p:leading-relaxed

          prose-li:my-1

          prose-ul:pl-6

        "
      >
        {children}
      </div>

    </main>
  );
}