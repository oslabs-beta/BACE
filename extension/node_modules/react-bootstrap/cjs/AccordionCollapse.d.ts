import { CollapseProps } from './Collapse';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from './helpers';
export interface AccordionCollapseProps extends BsPrefixProps, CollapseProps {
    eventKey: string;
}
/**
 * This component accepts all of [`Collapse`'s props](/utilities/transitions/#collapse-props).
 */
declare const AccordionCollapse: BsPrefixRefForwardingComponent<'div', AccordionCollapseProps>;
export default AccordionCollapse;
