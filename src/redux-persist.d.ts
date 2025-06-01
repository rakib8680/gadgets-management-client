declare module "redux-persist/lib/storage" {
  const storage: Storage;
  export default storage;
}

// this file is made to fix redux-persist-lib-storage error. The new version of redux persist does not support the old version of storage. Also installing type-definitions for storage does not work for version 6.0.0 of redux persist.
