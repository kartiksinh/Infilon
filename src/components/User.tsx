import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";

type UserType = {
  id: string;
  name: string;
  email: string;
};

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  // Fetch all users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  // Add new user
  const addUser = () => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newUser) => {
        console.log(newUser);
        setUsers([...users, newUser]);
        setName("");
        setEmail("");
      });
  };

  // Edit a user
  const editUser = (user: UserType) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUser(user);
  };

  // Update a user
  const updateUser = () => {
    fetch(`/api/users/${editingUser?.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setName("");
        setEmail("");
        setEditingUser(null);
      });
  };

  // Delete a user
  const deleteUser = (id: string) => {
    fetch(`/api/users/${id}`, { method: "DELETE" }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };
  return (
    <>
      <h1>User List</h1>
      <Grid2>
        <TextField
          id="outlined-password-input"
          label="UserName"
          type="text"
          size="small"
          autoComplete="current-password"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Email"
          size="small"
          autoComplete="current-password"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={editingUser ? updateUser : addUser}
        >
          {editingUser ? "Update User" : "Add User"}
        </Button>
      </Grid2>

      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {users.map((user) => (
          <div
            style={{
              display: "flex",
            }}
          >
            <Card
              sx={{ minWidth: 300, marginBottom: "20px", marginRight: "20px" }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
            </Card>
            <Grid2>
              <Button
                variant="contained"
                onClick={() => editUser(user)}
                style={{ marginRight: "20px" }}
              >
                Edit
              </Button>
              <Button variant="contained" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
            </Grid2>
          </div>
        ))}
      </Grid2>
    </>
  );
};

export default User;
