import { useState } from "react";

export default function SignUpPage () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = async (e: React.FormEvent) => { 
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: ${location.origin}/auth/callback,
      },
  })
}}