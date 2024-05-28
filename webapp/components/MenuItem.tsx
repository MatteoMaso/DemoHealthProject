import Link from "next/link";

interface MenuItemProps {
  title: string;
  address: string;
  Icon: React.ElementType;
}

export default function MenuItem({title, address, Icon}: MenuItemProps) {
    return (
        <div>
            <Link href={address} className="mx-4 lg:mx-6 hover:text-blue-600" >
                <Icon className="text-2xl sm:hidden mx-4"/>
                <p className="hidden sm:inline my-2 text-sm" >{title}</p>
            </Link>
        </div>
    )
}