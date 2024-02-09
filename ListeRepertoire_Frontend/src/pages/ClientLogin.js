import React, { createContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getClientByName } from '../requestApi/client_request.js'
// export const UserContext = createContext()
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null)

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     )
// }
/*
3. 使用React的Context API：使用React的Context API来创建一个全局的上下文，在其中存储和共享当前登录用户的信息。这种方法适用于需要在 组件树中的多个层级中访问用户信息的应用程序。

首先，创建一个包含当前登录用户信息的上下文：

```javascript
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

然后，在根组件中使用`UserProvider`来包裹整个应用程序，并将用户信 息传递给上下文：

```javascript
import React from 'react';
import { UserProvider } from './UserContext';
import App from './App';

const Root = () => {
  const user = {
    id: '123',
    username: 'John',
  };

  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

export default Root;
```

在其他组件中，可以使用`UserContext.Consumer`来访问和更新用户信息 ：

```javascript
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default UserProfile;
```





*/


export const ClientLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify({
          nom: username,
          password: password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      console.log(response)
      const { data } = await response.json()
      setUser(data)
      alert(data)
      // 登录成功
      // 将用户信息保存到本地存储或Redux状态中
      // 跳转到登录后的页面
    } catch (error) {
      // 登录失败
      setError(error)
      alert(error)
    }
  }





  return (
    <Container className='bg-dark py-5'>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formNom">
              <Form.Label>Entrez votre nom:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMotDePasse">
              <Form.Label>Entrez votre mot de passe :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleLogin}
              disabled={!(username !== '' && password !== '')}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container >
  )
}
