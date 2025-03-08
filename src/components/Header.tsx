import Image from "next/image";

export default function Header() {
    return (
      <header className="p-4 w-screen">
        <div className="rounded p-4 bg-white flex items-center justify-center">
          <Image src="/logo.png" width={123} height={32} alt="StudyVerse" className="h-[32px] w-auto" />
        </div>
      </header>
    );
}