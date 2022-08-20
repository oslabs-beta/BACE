import * as React from 'react';
import { OverlayArrowProps } from '@restart/ui/Overlay';
import { Placement, PopperRef } from './types';
import { BsPrefixProps } from './helpers';
export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, BsPrefixProps {
    placement?: Placement;
    arrowProps?: Partial<OverlayArrowProps>;
    show?: boolean;
    popper?: PopperRef;
}
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLDivElement>>;
export default Tooltip;
