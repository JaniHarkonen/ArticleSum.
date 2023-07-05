import { useState } from "react";

/**
 * Custom hook that provides a React-component with the following 
 * modal functionalities:
 * - the current displayed modal JSX (`displayedModal`)
 * - `popupModal`-function which can be used to open the modal 
 * window for a given JSX-element
 * - `isModalOpen`-function which returns whether the modal 
 * window is open on the screen
 * - `closeModal`-function which closes the modal window if it is 
 * currently open
 */
export default function useModal() {
  const [displayedModal, popupModal] = useState(null);

  const isModalOpen = () => displayedModal != null;
  const closeModal = () => popupModal(null);

  return {
    displayedModal,
    popupModal,
    isModalOpen,
    closeModal
  };
}
