export const LOCAL_STORAGE_TOKEN_KEY = 'authToken';
export const LOCAL_STORAGE_SESSION_TIME = 'expTime';

export const TOKEN =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    : null;

export const EXP_TIME =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_SESSION_TIME)
    : null;

export const tableColl = [
  { title: 'Made', dataIndex: 'yacht_make', sorter: true },
  { title: 'Model', dataIndex: 'yacht_model', sorter: true },
  { title: 'Country', dataIndex: 'yacht_country', sorter: true },
  { title: 'City', dataIndex: 'yacht_town', sorter: true },
  { title: 'First name', dataIndex: 'yacht_owner_first_name', sorter: true },
  { title: 'Last name', dataIndex: 'yacht_owner_last_name', sorter: true },
  { title: 'Phone number', dataIndex: 'yacht_owner_telephone' },
];
