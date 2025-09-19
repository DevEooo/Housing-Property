import { motion } from 'framer-motion';
import { SignUp } from '../src/pages/signup/signup.tsx';
import '../src/styles/login.css';

export default function SignUpPage() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Panel - Property Image (Desktop only) */}
      <motion.div 
        className="w-[45%] bg-cover bg-center bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: "url('/assets/super-house.jpg')"
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      </motion.div>

      {/* Right Panel - Signup Form */}
      <motion.div 
        className="w-full lg:w-[55%] bg-white"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex items-center justify-center h-full p-6 sm:p-8">
          <div className="w-full max-w-sm lg:max-w-md">
            <SignUp />
          </div>
        </div>
      </motion.div>
    </div>
  );
}