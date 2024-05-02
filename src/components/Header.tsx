import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerMenu from "./DrawerContent";
import { GiHamburgerMenu } from "react-icons/gi";

import { isDrawerMenuOpen } from "../stores/drawerMenuStore";
import { useStore } from "@nanostores/react";

import logo from "../images/logo.svg";

const Header = () => {
  const $isMenuOpen = useStore(isDrawerMenuOpen);
  const toggleDrawer = () => isDrawerMenuOpen.set(!$isMenuOpen);

  return (
    <header className="relative h-[80px] font-sans mx-8 flex items-center justify-between bg-white text-darkBlue">
      <img className="" src={logo.src} />

      {/* MOBILE */}
      <div className="lg:hidden">
        <button onClick={toggleDrawer}>
          <GiHamburgerMenu size="1.5rem" />
        </button>
        <Drawer open={$isMenuOpen} direction="left" customIdSuffix="drawer">
          <DrawerMenu toggleDrawer={toggleDrawer} />
        </Drawer>
      </div>

      {/* DESKTOP */}
      <nav className="hidden lg:flex items-center justify-between absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 pr-16 2xl:pr-0">
        <ul className="list-none inline-flex items-center gap-5 text-xl">
          <li>
            <a aria-label="Vai alla sezione specialisti" href="#specialisti">
              Home
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione dove siamo " href="#dove-siamo">
              Dove siamo
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione contatti " href="#contatti">
              Contatti
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione faq " href="#faq">
              FAQ
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex gap-6">
        <button className="white-cta">TROVA LO SPECIALISTA</button>
        <button className="blue-cta lg:hidden xl:block">CHIAMA ORA</button>
      </div>
    </header>
  );
};

export default Header;
