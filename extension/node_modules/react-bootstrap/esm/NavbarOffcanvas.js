import * as React from 'react';
import { useContext } from 'react';
import Offcanvas from './Offcanvas';
import NavbarContext from './NavbarContext';
import { jsx as _jsx } from "react/jsx-runtime";
const NavbarOffcanvas = /*#__PURE__*/React.forwardRef((props, ref) => {
  const context = useContext(NavbarContext);
  return /*#__PURE__*/_jsx(Offcanvas, {
    ref: ref,
    show: !!(context != null && context.expanded),
    ...props,
    renderStaticNode: true
  });
});
NavbarOffcanvas.displayName = 'NavbarOffcanvas';
export default NavbarOffcanvas;