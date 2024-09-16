import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerMenu from "./DrawerContent";
import { GiHamburgerMenu } from "react-icons/gi";

import { isDrawerMenuOpen } from "../stores/drawerMenuStore";
import { useStore } from "@nanostores/react";

import logo from "../images/logo.svg";

const Header = ({ pathname }: { pathname: string }) => {
  const $isMenuOpen = useStore(isDrawerMenuOpen);
  const toggleDrawer = () => isDrawerMenuOpen.set(!$isMenuOpen);
  return (
    <header className="fixed w-full z-50 h-[80px] font-sans px-8 m-0 flex items-center justify-between bg-white text-darkBlue">
      <a href="/">
        <img
          className=""
          src={logo.src}
          width={200}
          height={150}
          alt="logo centro medico agliana"
        />
      </a>

      {/* DESKTOP */}
      <nav className="hidden lg:flex items-center justify-between absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 pr-16 2xl:pr-0">
        <ul className="list-none inline-flex items-center gap-5 text-xl">
          <li>
            <a aria-label="Vai alla sezione specialisti" href="/">
              Home
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione dove siamo" href="/#dove-siamo">
              Dove siamo
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione contatti" href="/#contatti">
              Contatti
            </a>
          </li>
          <li>
            <a aria-label="Vai alla sezione faq" href="/#faq">
              FAQ
            </a>
          </li>
        </ul>
      </nav>
      <div className="hidden lg:flex gap-6">
        {pathname === "/specializzazioni" && (
          <a
            href="https://www.doctolib.it/centro-medico/agliana/centro-medico-agliana-sas-di-pastacaldi-paolo-c"
            className="white-cta"
          >
            PRENOTA ONLINE
          </a>
        )}
        {pathname === "/" && (
          <a href="/specializzazioni" className="white-cta">
            TROVA LO SPECIALISTA
          </a>
        )}
        <a href="tel:0574027087" className="hidden xl:flex blue-cta">
          CHIAMA ORA
        </a>
      </div>
      {/* MOBILE */}
      <div className="lg:hidden">
        <button onClick={toggleDrawer}>
          <GiHamburgerMenu size="1.5rem" />
        </button>
        <Drawer
          open={$isMenuOpen}
          direction="left"
          customIdSuffix="drawer"
          lockBackgroundScroll
          style={{ width: "300px" }}
          onClose={toggleDrawer}
        >
          <DrawerMenu toggleDrawer={toggleDrawer} />
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
