import { Login } from '../src/pages/login/Login.tsx';

export default function LoginPage() {
  return (
    <div className="h-screen bg-white flex items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl">
        <Login />
      </div>
    </div>
  );
}
