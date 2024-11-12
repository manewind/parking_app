// components/AuthModal.tsx

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Логика для отправки данных на сервер
  };

  const handleRegister = () => {
    // Логика для отправки данных на сервер
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLogin && (
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        )}
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </Modal.Footer>
      <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </Button>
    </Modal>
  );
};

export default AuthModal;
