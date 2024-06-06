import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
    return (
        <>
            <nav className="container mx-auto w-full relative px-4 py-5 flex items-center justify-between">
                <Link href="/" className="font-bold text-3xl">Ideas<span className="text-primary">UI</span></Link>
                <Link href="#">BD News</Link>
                <Link href="#">Sofware Development</Link>
                <ModeToggle />
            </nav>
        </>
    )
}