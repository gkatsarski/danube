import React, { useState } from "react";
import axios from "axios";

function LogInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log(response.data);
      setUsername("");
      setPassword("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(error.response.data);
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <label>Log in</label>
        <input
          id="username-login"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          id="password-login"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button>Log in</button>
      </form>
    </>
  );
}

export default LogInForm;
