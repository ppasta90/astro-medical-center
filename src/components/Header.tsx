
import Drawer from "react-modern-drawer";
import 'react-modern-drawer/dist/index.css'
import DrawerMenu from "./DrawerContent";
import {GiHamburgerMenu} from 'react-icons/gi'

import { isDrawerMenuOpen } from "../stores/drawerMenuStore";
import { useStore } from "@nanostores/react";

import logo from '../images/logo.svg'

const Header = ()  => {

  const $isMenuOpen = useStore(isDrawerMenuOpen);
  const toggleDrawer = () => isDrawerMenuOpen.set(!$isMenuOpen)

  return (
    <header className="h-[72px] font-serif flex items-center justify-between bg-lightGreen text-secondary">
        <div className="flex items-center justify-between w-full mx-8">
          <img src={logo.src} />

          {/* MOBILE */}
            <div className="lg:hidden">
              <button onClick={toggleDrawer}>
                <GiHamburgerMenu size="1.5rem" />
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
                <ul className="list-none flex gap-5 text-xl">
                  <li>
                    <a
                      aria-label="Vai alla sezione specialisti"
                      href="#specialisti"
                    >
                      SPECIALISTI
                    </a>
                  </li>
                  <li>
                    <a aria-label="Vai alla sezione dove siamo " href="#dove-siamo">
                      DOVE SIAMO
                    </a>
                  </li>
                  <li>
                    <a
                      aria-label="Vai alla sezione contatti "
                      href="#contatti"
                    >
                      CONTATTI
                    </a>
                  </li>
                  <li>
                    <a aria-label="Vai alla sezione faq " href="#faq">
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