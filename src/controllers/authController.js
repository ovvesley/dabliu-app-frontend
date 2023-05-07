import { useState } from "react";
import baseUrl from "./baseUrl";

export default () => {
  const [token, setToken] = useState(null);

  console.log(token);

  /**
   * @param {*} email
   * @param {*} password
   * @returns 
   */
  return {
    login: async (email, password) => {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      return data;
    },
    /**
     * 
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    register: async (name, email, password, document_cpf) => {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, document_cpf }),
      });

      const data = await res.json();
      console.log(data);
      return data;
    },
  };
};
