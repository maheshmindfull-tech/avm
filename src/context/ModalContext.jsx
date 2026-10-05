import { createContext, useContext, useState } from 'react';
import QuickContactModal from '../components/modals/QuickContactModal';

const ModalContext = createContext({
  isContactOpen: false,
  openContactModal: () => {},
  closeContactModal: () => {},
});

export function ModalProvider({ children }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [initialData, setInitialData] = useState({});

  const openContactModal = (data = {}) => {
    setInitialData(data);
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setInitialData({});
  };

  return (
    <ModalContext.Provider value={{ isContactOpen, openContactModal, closeContactModal }}>
      {children}
      <QuickContactModal
        isOpen={isContactOpen}
        onClose={closeContactModal}
        initialData={initialData}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
