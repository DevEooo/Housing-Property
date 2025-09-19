import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Email login:', { email, password });
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Here you would typically integrate with Google OAuth
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
    // Here you would typically integrate with Apple Sign In
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl text-black">Welcome Back</CardTitle>
        <p className="text-gray-600">
          Sign in to your account to continue
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example: admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-gray-300 text-black placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-gray-300 text-black placeholder:text-gray-500"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-black hover:bg-gray-800 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-left">
          <a 
            href="#" 
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-600">
              Or sign in with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleGoogleLogin}
            variant="outline" 
            className="w-full h-12 gap-3 border-gray-300 text-black hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>

          <Button 
            onClick={handleAppleLogin}
            variant="outline" 
            className="w-full h-12 gap-3 border-gray-300 text-black hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Sign in with Apple
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account yet?{' '}
            <a 
              href="#register" 
              className="text-black hover:underline transition-colors"
            >
              Create one
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}