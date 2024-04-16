import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { useRef } from 'react';

const Bottombar = () => {
  const { pathname } = useLocation();
  const activeLinkRef = useRef<HTMLAnchorElement>(null); // Changed type to HTMLAnchorElement

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`bottombar-link ${isActive ? 'bg-purple-600 rounded-10' : ''} flex items-center justify-center gap-2 p-2 transition`}
            tabIndex={isActive ? 0 : -1}
            ref={isActive ? activeLinkRef : null}
            aria-current={isActive ? 'page' : undefined} // Indicate current page for accessibility
          >
            <img src={link.imgURL} width={16} height={16} alt="" className={`${isActive ? 'invert-white' : ''}`} />
            <p className="tiny-medium text-light-2">{link.label}</p> {/* Corrected class name */}
          </Link>
        );
      })}
    </section>
  );
}

export default Bottombar;
