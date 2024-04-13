import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/lib/types';

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const activeLinkRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (activeLinkRef.current) {
      activeLinkRef.current.focus();
    }
  }, [pathname]);

  const handleListItemKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      const nextIndex = (index + 1) % sidebarLinks.length;
      navigate(sidebarLinks[nextIndex].route);
    } else if (event.key === 'ArrowUp') {
      const prevIndex = (index - 1 + sidebarLinks.length) % sidebarLinks.length;
      navigate(sidebarLinks[prevIndex].route);
    }
  };

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-10">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3" aria-label="Profile">
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink, index: number) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && 'bg-purple-600'}`}
                tabIndex={isActive ? 0 : -1}
                ref={isActive ? activeLinkRef : null}
                onKeyDown={(event) => handleListItemKeyDown(event, index)}
                role="menuitem" // Set role="menuitem" to indicate list items as menu items
                aria-label={link.label} // Providing a concise label for screen readers
              >
                <NavLink to={link.route} className="flex gap-4 items-center p-3" tabIndex={-1} aria-hidden="true">
                  <img src={link.imgURL} alt="" className={`group-hover:invert-white ${isActive && 'invert-white'}`} /> {/* Empty alt attribute to avoid duplication */}
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={handleLogoutClick}
          aria-label="Logout" // Providing a concise label for screen readers
        >
          <img src="/assets/icons/logout.svg" alt="" /> {/* Empty alt attribute to avoid duplication */}
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
