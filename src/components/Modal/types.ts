import { ReactNode } from 'react';

export type ModalProps = {
  onClose: VoidFunction;
  width: number;
  height: number;
  children: ReactNode;
};
