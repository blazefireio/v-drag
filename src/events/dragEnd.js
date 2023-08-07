import dragMove from './dragMove';

import eventListener from '../utils/eventListener';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import updateMousePosition from '../utils/updateMousePosition';
import vueDragEvent from '../utils/vueDragEvent';
import closestValueToSnap from '../utils/closestValueToSnap';

export default function () {
  // Prevent TypeError from showing
  if (!(window.data.grab && window.data.move)) return;

  // Stop move animation
  cancelAnimationFrame(window.data.posAnimation);

  // Remove setUpMovement() if mouse/touch hasn't moved
  eventListener(['mousemove', 'touchmove'], dragMove, 'remove');

  window.data.move.className = window.data.move.className.replace(window.data.animationCSS, '').trim();

  // Replace transform properties with left and top
  moveElementTransform(
    window.data.matrix ? returnPositionString(window.data.matrix, 0, 0) : 'none',
    `${window.data.matrixX + closestValueToSnap(window.data.relativeX, 'x')}px`,
    `${window.data.matrixY + closestValueToSnap(window.data.relativeY, 'y')}px`,
  );

  const el = document.getElementsByClassName('draggable-parent');
  if (el.length === 1) {
    const firstEl = el[0];
    const width = firstEl.clientWidth -
      parseFloat(window.getComputedStyle(firstEl, null).getPropertyValue("padding-left")) -
      parseFloat(window.getComputedStyle(firstEl, null).getPropertyValue("padding-right"));
    const height = firstEl.clientHeight -
      parseFloat(window.getComputedStyle(firstEl, null).getPropertyValue("padding-top")) -
      parseFloat(window.getComputedStyle(firstEl, null).getPropertyValue("padding-bottom"));

    const elWidth = parseFloat(window.data.move.offsetWidth);
    const elHeight = parseFloat(window.data.move.offsetHeight);

    const posX = +window.data.move.offsetLeft;
    const posY = +window.data.move.offsetTop;

    if (posX < 0 || posX > document.body.clientWidth) {
      window.data.move.style.left = '0px';
    } else if (posY < 0 || posY > document.body.clientHeight) {
      window.data.move.style.top = '0px';
    } else {
      if (posY > (height - elHeight) && (height - elHeight) + posY < document.body.clientHeight) {
        window.data.move.style.top = `${(height - elHeight)}px`;
      }

      if (posX > (width - elWidth) && (width - elWidth) + posX < document.body.clientWidth) {
        window.data.move.style.left = `${width - elWidth}px`;
      }
    }

  }

  // Remove CSS classes
  window.data.grab.classList.remove(window.data.class.down);
  window.data.move.classList.remove(window.data.class.move);

  // Vue event on drag end
  vueDragEvent(window.data.move, 'end');

  // Stop updating mouse position
  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}
