import { useState, useCallback } from "react";

export function useModal<T = unknown>(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState<T | null>(null);

  const openModal = useCallback((modalData?: T) => {
    setIsOpen(true);
    if (modalData !== undefined) {
      setData(modalData);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggleModal = useCallback(
    (modalData?: T) => {
      if (isOpen) {
        closeModal();
      } else {
        openModal(modalData);
      }
    },
    [isOpen, closeModal, openModal],
  );

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen,
    setData,
  };
}
