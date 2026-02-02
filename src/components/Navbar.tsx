"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDown, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");

 
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleMobileNav = (path: string) => {
    setOpen(false);
    window.location.href = path;
  };

  return (
    <header className="w-full bg-white border-b border-[#E2E8F0]">
      <div className="w-full h-[80px] px-4 sm:px-10 lg:px-20 flex items-center relative">

        
        <Link href="/" className="flex items-center gap-[10px] cursor-pointer">
          <img
            src="/logo.png"
            alt="Mentipad Logo"
            className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] translate-y-[-3px]"
          />
          <span
            className="font-bold text-[18px] sm:text-[22px] leading-[28px] sm:leading-[33px] tracking-[-0.5px] text-[#0F172A]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Mentipad
          </span>
        </Link>

       
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-[30px]">
          <Link href="/" className="text-[#475569] hover:text-[#096CC0] transition-colors">Home</Link>
          <Link href="/find-mentors" className="text-[#475569] hover:text-[#096CC0] transition-colors">Find Mentors</Link>
          <Link href="/contact-us" className="text-[#475569] hover:text-[#096CC0] transition-colors">Contact Us</Link>
        </nav>

      
        <div className="hidden lg:flex ml-auto items-center gap-[15px]">
       
          <Link
            href="https://wa.me/918279489409?text=Hello%20Mentipad%20Team,%0AI%20came%20across%20your%20website%20and%20I%E2%80%99m%20interested%20in%20joining%20as%20a%20mentor%20on%20Mentipad.%0APlease%20guide%20me%20through%20the%20next%20steps.%20Thank%20you."
            target="_blank"
            className="flex items-center gap-2 justify-center
            w-[176px] h-[40px]
            border-2 border-[#096CC0]
            rounded-[10px]
            text-[#096CC0] font-semibold text-[14px]
            hover:bg-[#096CC0]/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m12 22l-2-6H2l2 6zm0 0h4m-4-9v-.5c0-1.886 0-2.828-.586-3.414S9.886 8.5 8 8.5s-2.828 0-3.414.586S4 10.614 4 12.5v.5" />
              <path d="M19 13a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-9-9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
              <path strokeLinecap="round" d="M14 17.5h6a2 2 0 0 1 2 2v.5a2 2 0 0 1-2 2h-1" />
            </svg>
            Join as Mentor
          </Link>

        
          {status === "loading" ? null : !session ? (
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center
              w-[176px] h-[40px]
              bg-[#096CC0]
              rounded-[10px]
              text-white font-semibold text-[14px]
              hover:bg-[#1990CD] transition-colors cursor-pointer"
            >
              Sign in with Google
            </button>
          ) : session.user?.role === "admin" ? (
            <Link
              href="/admin"
              className="flex items-center justify-center
              w-[176px] h-[40px]
              bg-[#0F172A]
              rounded-[10px]
              text-white font-semibold text-[14px]
              hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              Admin Panel
            </Link>
          ) : isOnboarding ? null : (
            <div className="relative" ref={menuRef}>
           
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 h-[40px]
                rounded-[10px]
                bg-[#096CC0]/10
                border border-[#096CC0]/20
                text-[#096CC0] font-semibold text-[14px]
                hover:bg-[#096CC0]/20 transition-colors cursor-pointer"
              >
                <span className="max-w-[120px] truncate">
                  Hi, {session.user?.displayName || session.user?.name}
                </span>
                <ChevronDown size={16} />
              </button>

          
              {menuOpen && (
                <div className="absolute right-0 top-[44px] w-full bg-white border border-[#E2E8F0] rounded-[12px] shadow-md overflow-hidden">
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#475569] hover:bg-[#F9FBFC] transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        
        <button
          onClick={() => setOpen(!open)}
          className="ml-auto lg:hidden text-[24px] text-[#0F172A]"
        >
          ☰
        </button>
      </div>

 
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E2E8F0] px-6 py-5">
          <div className="flex flex-col items-center gap-5 text-center">
            <button onClick={() => handleMobileNav("/")}>Home</button>
            <button onClick={() => handleMobileNav("/find-mentors")}>Find Mentors</button>
            <button onClick={() => handleMobileNav("/contact-us")}>Contact Us</button>

            <div className="pt-4 flex flex-col gap-4 w-full max-w-[260px]">
              <Link
                href="https://wa.me/918279489409?text=Hello%20Mentipad%20Team,%0AI%20came%20across%20your%20website%20and%20I%E2%80%99m%20interested%20in%20joining%20as%20a%20mentor%20on%20Mentipad.%0APlease%20guide%20me%20through%20the%20next%20steps.%20Thank%20you."
                target="_blank"
                onClick={() => setOpen(false)}
                className="w-full h-[42px] flex items-center justify-center gap-2 border-2 border-[#096CC0] rounded-[10px] text-[#096CC0] font-semibold"
              >
                Join as Mentor
              </Link>

              {session?.user?.name && (
                <p className="text-center text-[#0F172A] text-[14px] font-medium">
                  Hi, {session.user.name}
                </p>
              )}

              {session?.user?.role === "admin" && (
                <button
                  onClick={() => handleMobileNav("/admin")}
                  className="w-full h-[42px] bg-[#0F172A] text-white font-semibold rounded-[10px] hover:bg-[#1E293B]"
                >
                  Admin Panel
                </button>
              )}

              {status === "loading" ? null : !session ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signIn("google");
                  }}
                  className="w-full h-[42px] bg-[#096CC0] rounded-[10px] text-white font-semibold cursor-pointer"
                >
                  Sign in with Google
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="w-full h-[42px] flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-[10px] text-[#475569] cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
