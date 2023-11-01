import {initializeApp} from "firebase/app"

//
const firebaseConfig = {
    apiKey: "AIzaSyCEcQqhivimufZGnvQhpooyvlv-aMuv0kg",
    authDomain: "my-application-3c7b1.firebaseapp.com",
    databaseURL: "https://my-application-3c7b1-default-rtdb.firebaseio.com",
    projectId: "my-application-3c7b1",
    storageBucket: "my-application-3c7b1.appspot.com",
    messagingSenderId: "927438981350",
    appId: "1:927438981350:web:b7d637e46ac9734ef79327",
    measurementId: "G-DQ0TBXJQXD",
    databaseURL:"https://my-application-3c7b1-default-rtdb.firebaseio.com"
  };

  export const app = initializeApp(firebaseConfig);