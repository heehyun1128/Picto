'use client'
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const Sidebar = () => {
  const pathname = usePathname()
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
            <Image src="/assets/images/logo.svg" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0,6).map((link) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.route} className={`sidebar-nav_element group ${
                  isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                }`}>
                  <Link className="sidebar-link" href={link.route}>
                    <Image 
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && 'hidden'}`}
                    />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

            <ul className="sidebar-nav_elements">
            {navLinks.slice(6).map((link) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.route} className={`sidebar-nav_element group ${
                  isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                }`}>
                  <Link className="sidebar-link" href={link.route}>
                    <Image 
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                    />
                    {link.label}
                  </Link>
                </li>
              )
            })}
            
      
          <li className="flex-center cursor-pointer gap-2 p-4">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonAvatarBox: "h-10 w-10"
                },
                variables: {
                  colorPrimary: "#4EF4D8"
                }
              }}
              showName={true}
            />
          </li>
            </ul>


          </SignedIn>

           <SignedOut>
           <Button asChild className='button bg-purple-gradient bg-cover text-dark-700 hover:text-white'>
            <Link href="/sign-in">
              Sign In
            </Link>
           </Button>
           </SignedOut>



        </nav>
      </div>
    </aside>
  )
}

export default Sidebar