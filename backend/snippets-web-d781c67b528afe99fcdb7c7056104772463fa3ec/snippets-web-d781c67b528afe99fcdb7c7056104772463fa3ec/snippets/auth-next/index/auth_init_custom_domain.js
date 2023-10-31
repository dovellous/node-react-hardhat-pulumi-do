// This snippet file was generated by processing the source file:
// ./auth-next/index.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_init_custom_domain_modular]
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "...",
  // By default, authDomain is '[YOUR_APP].firebaseapp.com'.
  // You may replace it with a custom domain.
  authDomain: '[YOUR_CUSTOM_DOMAIN]'
};
const firebaseApp = initializeApp(firebaseConfig);
// [END auth_init_custom_domain_modular]