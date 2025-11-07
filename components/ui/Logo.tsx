import Image from "next/image"
import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-block select-none transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      <Image
        src="/Logo/Logo.png"
        alt="Smokin' Paradise Logo"
        width={200}      // smaller default width
        height={80}      // proportional height
        priority
        className="h-auto w-auto sm:w-48 sm:h-auto md:w-56 md:h-auto" // responsive: mobile → sm → md
      />
    </Link>
  )
}

export default Logo
