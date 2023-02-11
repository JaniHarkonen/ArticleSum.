import { useState } from "react";


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
