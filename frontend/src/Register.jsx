import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
  async function register(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const {data} = await axios.post(url, {username, password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"
          value={username} onChange={ev => setUsername(ev.target.value)}/>
        <input type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"
          value={password} onChange={ev => setPassword(ev.target.value)}/>
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? '회원가입' : '로그인'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              이미 계정이 있으신가요?
              <button onClick={() => setIsLoginOrRegister('login')}>
                로그인하기
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              아직 계정이 없으신가요?
              <button onClick={() => setIsLoginOrRegister('register')}>
                회원가입하기
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
