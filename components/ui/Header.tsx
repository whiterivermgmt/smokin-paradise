'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import Searchbar from './Searchbar'
import Carticon from './Carticon'
import Favoriteicon from './Favoriteicon'
import Signin from './Signin'
import Mobilemenu from './Mobilemenu'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'

const Header = () => {
  const pathname = usePathname()
  const [scrollShrink, setScrollShrink] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollShrink(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="sticky top-0 w-full z-50 bg-black text-white shadow-md">
      {/* Top Header with Logo + Social + Icons */}
      <div className={`${scrollShrink ? 'py-2' : 'py-4'} transition-all duration-300`}>
        <Container className="flex items-center justify-between w-full relative">
          {/* Left: Social Icons (desktop) */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <SiGoogle size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>

          {/* Mobile: Hamburger + Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <Mobilemenu />
            <Searchbar iconColor="text-white" />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo className={`transition-all duration-150 ${scrollShrink ? 'scale-95' : 'scale-100'}`} />
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-3 ml-auto">
            {!isMobileView && (
              <>
                <Searchbar iconColor="text-white" />
                <Carticon />
                <Favoriteicon />
                <Signin />
              </>
            )}
            {isMobileView && (
              <>
                <Carticon />
                <Favoriteicon />
                <Signin />
              </>
            )}
          </div>
        </Container>
      </div>

      {/* Header Menu */}
      <div className="bg-black border-t border-white/30">
        <Container className="flex justify-center py-2">
          <HeaderMenu />
        </Container>
      </div>
    </header>
  )
}

export default Header
