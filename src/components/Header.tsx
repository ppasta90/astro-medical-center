
import Drawer from "react-modern-drawer";
import 'react-modern-drawer/dist/index.css'
import DrawerMenu from "./DrawerContent";
import {FaHamburger} from 'react-icons/fa'

import { isDrawerMenuOpen } from "../stores/drawerMenuStore";
import { useStore } from "@nanostores/react";

import { getImage } from "astro:assets";


const Header = ()  => {

  const $isMenuOpen = useStore(isDrawerMenuOpen);
  const toggleDrawer = () => isDrawerMenuOpen.set(!$isMenuOpen)

  return (
    <header className="h-[72px] flex items-center justify-between bg-slate-700">
        <div className="flex items-center justify-between mx-4 w-full">
          {/* TODO https://www.reddit.com/r/astrojs/comments/1bia6lq/how_to_utilize_image_with_react_component/ add Logo with getImage */}
          <span>LOGO</span>

          {/* MOBILE */}
            <div className="lg:hidden">
              <button onClick={toggleDrawer}>
                <FaHamburger />
              </button>
              <Drawer
                open={$isMenuOpen}
                direction="left"
                customIdSuffix="drawer"
              >
                <DrawerMenu toggleDrawer={toggleDrawer}  />
              </Drawer>
            </div>
        

          {/* DESKTOP */}
            <div className="hidden lg:block">
              <nav>
                <ul className="list-none flex gap-5">
                  <li>
                    <a
                      aria-label="Vai alla sezione specialisti"
                      href="#specializations"
                    >
                      SPECIALISTI
                    </a>
                  </li>
                  <li>
                    <a aria-label="Vai alla sezione dove siamo " href="#where">
                      DOVE SIAMO
                    </a>
                  </li>
                  <li>
                    <a
                      aria-label="Vai alla sezione contatti "
                      href="#contacts"
                    >
                      CONTATTI
                    </a>
                  </li>
                  <li>
                    <a aria-label="Vai alla sezione faq " href="#faqs">
                      FAQ
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
        
        </div>
    </header>
)
}

export default Header;