import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-header-background px-16 flex justify-between items-center shadow-header">
            <div></div>

            <Link href="/">
                <Image src="/images/logo.svg" alt="Clicksign Project Manager" width={193} height={72} className="my-1" />
            </Link>
            
            <button type="button" aria-label="Buscar" className="hover-zoom cursor-pointer bg-transparent border-0 p-0">
                <Image src="/images/search.svg" alt="" width={18} height={18} className="my-1" />
            </button>
        </header>
    );
}