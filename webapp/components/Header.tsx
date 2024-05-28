import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import MenuItem from "./MenuItem";

export default function Header() {
    return (
        <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
            {/* Menu */}
            <div className="flex">
                <MenuItem title="HOME" address="./" Icon={AiFillHome} />
            </div>
            {/* Logo */}
            <div className="">
                <Link href="./">
                    <h2 className="text-2xl">
                        <span className="font-bold bg-blue-600 text-white py-1 px-2 rounded-lg mr-1">Demo</span>
                        <span className="text-xl hidden sm:inline">Health</span>
                    </h2>
                </Link>
            </div>
        </div>
    )
}