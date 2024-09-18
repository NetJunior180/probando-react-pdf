import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <nav className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/pdf-tests/pdf-lib" legacyBehavior>
            <a className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Librería 1</a>
          </Link>
          <Link href="/pdf-tests/react-pdf" legacyBehavior>
            <a className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Librería 2</a>
          </Link>
          <Link href="/pdf-tests/" legacyBehavior>
            <a className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-1 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Librería 3</a>
          </Link>
        </nav>
      </main>
    </div>
  );
}

