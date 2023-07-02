import React, { useState } from "react";
import axios from "axios";

function LogInForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        username,
        password,
      });
      console.log(response.data);
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
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
      <form onSubmit={handleRegister}>
        <label>Register</label>
        <input
          id="name-register"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <input
          id="username-register"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          id="password-register"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <input
          id="confirm-password-register"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <button>Register</button>
      </form>
      ;
    </>
  );
}

export default LogInForm;

///dddd
