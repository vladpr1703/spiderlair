import { StaticImageData } from 'next/image';

export type DialogProps = {
  avatar: StaticImageData;
  shortMessage: string;
  contactName: string;
};
