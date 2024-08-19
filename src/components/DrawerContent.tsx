import { useState, useEffect } from "react";

const DrawerMenu = ({ toggleDrawer }: { toggleDrawer?: () => void }) => {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(window.location.pathname);
  }, []);

  return (
    <div className="h-full bg-primaryLight">
      <ul className="text-secondary flex flex-col w-full justify-center items-center h-full text-4xl gap-10 font-serif">
        {currentLocation !== "/" && (
          <li>
            <a aria-label="Vai alla sezione specialisti" href="/">
              Home
            </a>
          </li>
        )}
        <li>
          <a
            aria-label="Vai alla sezione specialisti"
            onClick={toggleDrawer}
            href="/#specialisti"
          >
            SPECIALISTI
          </a>
        </li>
        <li>
          <a
            aria-label="Vai alla sezione dove siamo"
            onClick={toggleDrawer}
            href="/#dove-siamo"
          >
            DOVE SIAMO
          </a>
        </li>
        <li>
          <a
            aria-label="Vai alla sezione contatti"
            onClick={toggleDrawer}
            href="/#contatti"
          >
            CONTATTI
          </a>
        </li>
        <li>
          <a
            aria-label="Vai alla sezione contatti"
            onClick={toggleDrawer}
            href="/#faq"
          >
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DrawerMenu;
