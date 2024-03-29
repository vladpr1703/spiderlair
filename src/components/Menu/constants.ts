import dm from '../../../assets/dm.svg';
import dmActive from '../../../assets/dmActive.svg';
import groups from '../../../assets/groups.svg';
import groupsActive from '../../../assets/groupsActive.svg';
import contacts from '../../../assets/contacts.svg';
import contactsActive from '../../../assets/contactsActive.svg';

export const MENU_ITEMS = [
  { label: 'My DM', icon: dm, activeIcon: dmActive, path: '/direct' },
  //   { label: 'Groups', icon: groups, activeIcon: groupsActive, path: '' },
  {
    label: 'Contacts',
    icon: contacts,
    activeIcon: contactsActive,
    path: '/contacts',
  },
];
