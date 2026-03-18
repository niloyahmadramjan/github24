"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  Star,
  GitFork,
  AlertCircle,
  GitPullRequest,
  Bell,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   NAV CONFIG
────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Overview",      href: "/dashboard",                  icon: LayoutDashboard },
  { label: "Repositories",  href: "/dashboard/repositories",     icon: GitBranch       },
  { label: "Stars",         href: "/dashboard/stars",            icon: Star            },
  { label: "Forks",         href: "/dashboard/forks",            icon: GitFork         },
  { label: "Issues",        href: "/dashboard/issues",           icon: AlertCircle     },
  { label: "Pull Requests", href: "/dashboard/pull-requests",    icon: GitPullRequest  },
  { label: "Notifications", href: "/dashboard/notifications",    icon: Bell            },
  { label: "Analytics",     href: "/dashboard/analytics",        icon: BarChart2       },
  { label: "Contributors",  href: "/dashboard/contributors",     icon: Users           },
];

const BOTTOM_ITEMS = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

/* ──────────────────────────────────────────────────────────
   NAV LINK
────────────────────────────────────────────────────────── */
function NavLink({
  item,
  active,
  collapsed,
  onClick,
  badge,
}: {
  item: (typeof NAV_ITEMS)[0];
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
  badge?: number;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-150 select-none
        ${active
          ? "bg-[#0f172a] text-white shadow-md"
          : "text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
        }
        ${collapsed ? "justify-center" : ""}
      `}
    >
      <Icon
        className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-white" : "text-[#94a3b8] group-hover:text-[#475569]"}`}
        strokeWidth={active ? 2.5 : 2}
      />

      {!collapsed && (
        <span className="flex-1 truncate">{item.label}</span>
      )}

      {!collapsed && badge !== undefined && badge > 0 && (
        <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-black flex items-center justify-center">
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      {/* Tooltip on collapsed */}
      {collapsed && (
        <span className="absolute left-full ml-2.5 px-2.5 py-1.5 rounded-lg bg-[#0f172a] text-white text-xs font-semibold whitespace-nowrap
          opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-lg">
          {item.label}
        </span>
      )}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────
   SIDEBAR
────────────────────────────────────────────────────────── */
function Sidebar({
  collapsed,
  onToggle,
  onSignOut,
  user,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onSignOut: () => void;
  user: { name: string; email: string } | null;
}) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col h-screen bg-white border-r border-[#e5e7eb] flex-shrink-0 overflow-hidden sticky top-0"
    >
      {/* Logo + collapse toggle */}
      <div className={`flex items-center h-16 border-b border-[#f1f5f9] flex-shrink-0 px-3 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <Link href="/" className="flex-1 min-w-0">
            <Image
              src="/assest/logo/navbar.png"
              width={130}
              height={38}
              alt="Git24 logo"
              priority
            />
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center flex-shrink-0">
            <GitBranch className="w-4 h-4 text-white" strokeWidth={2.5} />
          </Link>
        )}
        <button
          onClick={onToggle}
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors flex-shrink-0 ${collapsed ? "hidden" : "ml-2"}`}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            collapsed={collapsed}
            badge={item.label === "Notifications" ? 3 : undefined}
          />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-[#f1f5f9] space-y-0.5">
        {BOTTOM_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}

        {/* Sign out */}
        <button
          onClick={onSignOut}
          title={collapsed ? "Sign Out" : undefined}
          className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-[#475569] hover:text-rose-600 hover:bg-rose-50 transition-all duration-150
            ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0 text-[#94a3b8] group-hover:text-rose-500" strokeWidth={2} />
          {!collapsed && <span>Sign Out</span>}
          {collapsed && (
            <span className="absolute left-full ml-2.5 px-2.5 py-1.5 rounded-lg bg-[#0f172a] text-white text-xs font-semibold
              opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              Sign Out
            </span>
          )}
        </button>

        {/* User avatar */}
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-black">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">{user.name}</p>
              <p className="text-[10px] text-[#94a3b8] truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

/* ──────────────────────────────────────────────────────────
   MOBILE DRAWER
────────────────────────────────────────────────────────── */
function MobileDrawer({
  open,
  onClose,
  onSignOut,
  user,
}: {
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
  user: { name: string; email: string } | null;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#0f172a]/30 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#e5e7eb] flex flex-col lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-[#f1f5f9] flex-shrink-0">
              <Link href="/" onClick={onClose}>
                <Image src="/assest/logo/navbar.png" width={130} height={38} alt="Git24 logo" priority />
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <NavLink
                    item={item}
                    active={pathname === item.href}
                    collapsed={false}
                    onClick={onClose}
                    badge={item.label === "Notifications" ? 3 : undefined}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div className="p-3 border-t border-[#f1f5f9] space-y-0.5">
              {BOTTOM_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={pathname === item.href}
                  collapsed={false}
                  onClick={onClose}
                />
              ))}
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#475569] hover:text-rose-600 hover:bg-rose-50 transition-all duration-150"
              >
                <LogOut className="w-4 h-4 flex-shrink-0 text-[#94a3b8]" strokeWidth={2} />
                Sign Out
              </button>

              {user && (
                <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0f172a] truncate">{user.name}</p>
                    <p className="text-[10px] text-[#94a3b8] truncate">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────
   TOP BAR
────────────────────────────────────────────────────────── */
function Topbar({
  onMenuClick,
  title,
  user,
}: {
  onMenuClick: () => void;
  title: string;
  user: { name: string; email: string } | null;
}) {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-[#f1f5f9] flex items-center gap-4 px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#e5e7eb] text-[#475569] transition-colors flex-shrink-0"
      >
        <Menu className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Page title */}
      <h1 className="font-bold text-[#0f172a] text-base sm:text-lg flex-1 truncate">{title}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell */}
        <Link
          href="/dashboard/notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 border-2 border-white" />
        </Link>

        {/* Live badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>

        {/* Avatar */}
        {user && (
          <Link href="/dashboard/settings">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm hover:scale-105 transition-transform">
              <span className="text-white text-xs font-black">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────
   LAYOUT EXPORT
────────────────────────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router             = useRouter();
  const pathname           = usePathname();
  const { user, loading, signOut } = useAuth();

  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  /* Redirect if not authenticated */
  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  /* Page title from pathname */
  const pageTitle = (() => {
    const seg = pathname.split("/").filter(Boolean);
    if (seg.length === 1) return "Overview";
    return seg[seg.length - 1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();

  /* Loading screen */
  if (loading || user === undefined) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center animate-pulse">
            <GitBranch className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-sm text-[#94a3b8] font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const safeUser = user ? { name: user.name, email: user.email } : null;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">

      {/* Sidebar — desktop */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onSignOut={handleSignOut}
        user={safeUser}
      />

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSignOut={handleSignOut}
        user={safeUser}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          title={pageTitle}
          user={safeUser}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1900px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}