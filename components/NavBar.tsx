"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/login/actions";

const navItems = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Subscriptions", href: "/subscriptions", icon: "💳" },
  { name: "Calendar", href: "/calendar", icon: "📅" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

interface NavBarProps {
  user?: User | null;
}

export default function NavBar({ user }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="cursor-pointer text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💰 SubTracker
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          {user && (
            <div className="ml-4 flex items-center gap-4">
              <span className="hidden text-sm text-gray-600 md:block dark:text-gray-400">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
