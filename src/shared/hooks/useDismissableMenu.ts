import { useEffect, useRef, useState } from 'react';

/**
 * Controls a dropdown that closes on a click outside it or on Escape.
 *
 * @returns Whether the menu is open, the ref of the element that wraps the trigger and the
 * menu, the ref of the trigger, and the actions that toggle or close it.
 */
export const useDismissableMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && containerRef.current?.contains(event.target)) return;
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  return { isOpen, containerRef, triggerRef, toggle, close };
};
