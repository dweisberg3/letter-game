export interface User {
  
    firstname: string;
    lastname: string;
    grade: string;
    username: string;
    password?: string; // Optional if you don't want to store it in the users list
  }