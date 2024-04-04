import { AiOutlineClose } from "react-icons/ai";

const DrawerMenu = ({ toggleDrawer }: { toggleDrawer?: () => void }) => {
  return (
    <div className="">
      <AiOutlineClose className="" onClick={toggleDrawer} size={30} />

      <ul>
        <li>
          <a aria-label="Vai alla sezione specialisti" href="/specialisti">
            SPECIALISTI
          </a>
        </li>
        <li>
          <a aria-label="Vai alla sezione dove siamo" href="/chi-siamo">
            DOVE SIAMO
          </a>
        </li>
        <li>
          <a aria-label="Vai alla sezione contatti" href="/contatti">
            CONTATTI
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DrawerMenu;
