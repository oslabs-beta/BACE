import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import BaseOverlay from '@restart/ui/Overlay';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useEventCallback from '@restart/hooks/useEventCallback';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useOverlayOffset from './useOverlayOffset';
import Fade from './Fade';
import safeFindDOMNode from './safeFindDOMNode';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultProps = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: 'top'
};

function wrapRefs(props, arrowProps) {
  const {
    ref
  } = props;
  const {
    ref: aRef
  } = arrowProps;

  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(safeFindDOMNode(r)));

  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = r => aRef(safeFindDOMNode(r)));
}

const Overlay = /*#__PURE__*/React.forwardRef(({
  children: overlay,
  transition,
  popperConfig = {},
  ...outerProps
}, outerRef) => {
  const popperRef = useRef({});
  const [firstRenderedState, setFirstRenderedState] = useCallbackRef();
  const [ref, modifiers] = useOverlayOffset(outerProps.offset);
  const mergedRef = useMergedRefs(outerRef, ref);
  const actualTransition = transition === true ? Fade : transition || undefined;
  const handleFirstUpdate = useEventCallback(state => {
    setFirstRenderedState(state);
    popperConfig == null ? void 0 : popperConfig.onFirstUpdate == null ? void 0 : popperConfig.onFirstUpdate(state);
  });
  useIsomorphicEffect(() => {
    if (firstRenderedState) {
      popperRef.current.scheduleUpdate == null ? void 0 : popperRef.current.scheduleUpdate();
    }
  }, [firstRenderedState]);
  return /*#__PURE__*/_jsx(BaseOverlay, { ...outerProps,
    ref: mergedRef,
    popperConfig: { ...popperConfig,
      modifiers: modifiers.concat(popperConfig.modifiers || []),
      onFirstUpdate: handleFirstUpdate
    },
    transition: actualTransition,
    children: (overlayProps, {
      arrowProps,
      popper: popperObj,
      show
    }) => {
      var _popperObj$state, _popperObj$state$modi;

      wrapRefs(overlayProps, arrowProps); // Need to get placement from popper object, handling case when overlay is flipped using 'flip' prop

      const updatedPlacement = popperObj == null ? void 0 : popperObj.placement;
      const popper = Object.assign(popperRef.current, {
        state: popperObj == null ? void 0 : popperObj.state,
        scheduleUpdate: popperObj == null ? void 0 : popperObj.update,
        placement: updatedPlacement,
        outOfBoundaries: (popperObj == null ? void 0 : (_popperObj$state = popperObj.state) == null ? void 0 : (_popperObj$state$modi = _popperObj$state.modifiersData.hide) == null ? void 0 : _popperObj$state$modi.isReferenceHidden) || false
      });
      if (typeof overlay === 'function') return overlay({ ...overlayProps,
        placement: updatedPlacement,
        show,
        ...(!transition && show && {
          className: 'show'
        }),
        popper,
        arrowProps
      });
      return /*#__PURE__*/React.cloneElement(overlay, { ...overlayProps,
        placement: updatedPlacement,
        arrowProps,
        popper,
        className: classNames(overlay.props.className, !transition && show && 'show'),
        style: { ...overlay.props.style,
          ...overlayProps.style
        }
      });
    }
  });
});
Overlay.displayName = 'Overlay';
Overlay.defaultProps = defaultProps;
export default Overlay;