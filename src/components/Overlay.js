import './Overlay.styles.scss';
import classNames from 'classnames';
import RenderPortal from './RenderPortal';

// Overlay controls the state of some component overlays. 

export default function Overlay({ visible = true, ...props }) {
  return (
    <RenderPortal>
      <div {...props} className={classNames('overlay-content', !visible && 'hidden', props.className)}/>
    </RenderPortal>
  );
}
