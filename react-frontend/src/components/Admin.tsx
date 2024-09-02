import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  grade: string;
  username: string;
  password?: string; // Optional if you don't want to store it in the users list
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    firstname: '',
    lastname: '',
    grade: '',
    username: '',
    password: '',
  });

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_users'); // Replace with your API endpoint
      const data = await response.json();
      const allUsers: User[] = data.map((el:User[]) => ({id:el[0], firstname:el[1],lastname:el[2],username:el[3]}))
      setUsers(allUsers);
      console.log(allUsers)
      // console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to add a new user via API using FormData
  const addUser = async () => {
    const formData = new FormData();
    formData.append('firstname', newUser.firstname);
    formData.append('lastname', newUser.lastname);
    formData.append('username', newUser.username);
    formData.append('password', newUser.password!);

    try {
      const response = await fetch('http://127.0.0.1:5000/create_user', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setNewUser({ firstname: '', lastname: '', grade: '',username: '', password: '' });
      } else {
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    addUser(); // Call the addUser function on form submission
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Grade</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.grade}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={newUser.firstname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={newUser.lastname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={newUser.grade}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminPage;
