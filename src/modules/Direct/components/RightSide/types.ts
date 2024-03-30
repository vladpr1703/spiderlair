export type Props = {
  contacts: Contacts[];
  setCurrentDialog: (str: string) => void;
  currentDialog?: string;
};

export type Contacts = {
  friend_address: string;
  friend_nickname?: string;
};
