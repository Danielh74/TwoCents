// components/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";

export default function ThemeToggler() {
    const { setTheme, theme } = useTheme();

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
        </select>
    );
}