import { json, redirect } from 'react-router-dom';
import LoginForm from '../../Components/Login/LoginForm';
function Login() {
  return <LoginForm />;
}

export async function action({ request, params }) {
  const userData = await request.formData();
  console.log(userData);
  const eventData = {
    username: userData.get('username'),
    email: userData.get('email'),
    password: userData.get('password'),
  };
  console.log(eventData);
  // const eventData = Object.fromEntries(userData);
  const data = await fetch('https://interface360-backends.onrender.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!data.ok) {
    throw json({ message: 'incorrect Data' }, { status: 201 });
  }
  return redirect('/cars');
}

export default Login;
