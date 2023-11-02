import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "../../constants";
import { useUserContext } from "../../context/AuthContext";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route === '/profile' ? `/profile/${user.id}` : link.route}
            className={`${
              isActive
            } flex-center flex-col p-2 transition`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={32}
              height={16}
              className={`${isActive && "invert-white"}`}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;