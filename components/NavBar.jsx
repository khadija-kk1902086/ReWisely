/* 'use client';
import Link from 'next/link';
import Image from "next/image";
import React from 'react'
import { useState, useEffect } from 'react'
import 'styles/navBar.css'

function NavBar() {
    const [menuActive, setMenuActive] = useState(false);
    useEffect(()=>{
        const closeMenu =()=>{
            setMenuActive(false);
        };
        if(window.matchMedia('(max-width:550px)').matches){
            closeMenu();
        }
        window.addEventListener("resize",()=>{
            if(window.matchMedia("(max-width:550px)").matches){
                closeMenu();
            }
        });
        return ()=>{
            window.removeEventListener("resize",closeMenu);
        };
    },[] );

    const toggleMenu= ()=>{
        setMenuActive(!menuActive);
    };

    const closeMenu =()=>{
        setMenuActive(false);
    };
  return (
    <div>
    <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <div className='navLogo'>  
        <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="ReWisely Logo"
          width={120}
          height={120}
          className="object-contain rounded-full"
        ></Image>
      </Link> 
        </div>
        <div className='navHumbrger' onClick={toggleMenu}>
            <span className='navHumbrgerLine'></span>
            <span className='navHumbrgerLine'></span>
            <span className='navHumbrgerLine'></span>
        </div>
        <div className={`navMenue ${menuActive ? 'active' : ''}`}>
            <ul>
                <li className='navMenueLink' onClick={closeMenu}>
                    <Link href='/'>Home</Link>
                </li>
                <li className='navMenueLink' onClick={closeMenu}>
                    <Link href='/dashboard'>My revision</Link>
                </li>
                <li className='navMenueLink' onClick={closeMenu}>
                    <Link href='/contacts'>Contacts</Link>
                </li>
            </ul>
        </div>
    </nav>
    <div className='bg'></div>
</div>
  )
}

export default NavBar */


"use client";
import React from 'react'
import Link from "next/link";

function NavBar() {
  return (
 <nav>
    <ul>
        <li>
            <Link href={'/'}>Home</Link>
        </li>
        <li><Link href={'/dashboard'}>My revision</Link></li>
        <li><Link href={'/contacts'}>Contacts</Link></li>
    </ul>
 </nav>
  )
}

export default NavBar