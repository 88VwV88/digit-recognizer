import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen place-items-center grid-rows-[50px_1fr]">
      <header className="w-full text-center">
        <h1 className="text-3xl w-full text-center font-mono">
          Digit Recognizer v2.0
        </h1>
      </header>
      <main className="place-items-center row-start-2 w-full">{children}</main>
    </div>
  );
}
