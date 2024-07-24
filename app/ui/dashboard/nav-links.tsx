"use client";
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    UserCircleIcon,
    Cog8ToothIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSocket } from "@/components/SocketContext";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    {
        name: "Messages",
        href: "/dashboard/messages",
        icon: ChatBubbleLeftRightIcon,
        badge: true,
    },
    { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
    {
        name: "Account",
        href: "/dashboard/account?tag=posts",
        icon: UserCircleIcon,
    },
    { name: "Settings", href: "/dashboard/settings", icon: Cog8ToothIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    const { messages } = useSocket();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center  justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600":
                                    pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                        {link.badge ? (
                            <div className="notification">
                                <span className="badge">{messages.length}</span>
                            </div>
                        ) : null}
                    </Link>
                );
            })}
        </>
    );
}
