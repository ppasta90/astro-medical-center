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
            href="/specializzazioni"
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
            aria-label="Chiama il numero 0574027087"
            onClick={(e) => {
              e.preventDefault();
              toggleDrawer?.();
              if (typeof window !== 'undefined' && typeof (window as any).gtag_report_conversion === 'function') {
                (window as any).gtag_report_conversion('tel:0574027087');
              }
              window.location.href = 'tel:0574027087';
            }}
            href="tel:0574027087"
          >
            CHIAMA
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DrawerMenu;
