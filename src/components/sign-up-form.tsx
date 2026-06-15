'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/supabase/utils'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [isCreateGroup, setIsCreateGroup] = useState(true)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      })
      if (error) throw error

      console.log(data.session)
      console.log(data.user)

      if (!data.user) {
        throw new Error('User creation failed')
      }

      const {error: profileError} = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email,
        })
      console.log('profileError', profileError)
      if (profileError) throw profileError

      let groupId: number

      if (isCreateGroup) {
        const { data: group, error: groupError } = await supabase
          .from('groups')
          .insert({
            name: groupName
          })
          .select()
          .single()
        console.log('groupError', groupError)
        if (groupError) throw groupError
        groupId = group.id
      } else {
        const { data: group } = await supabase
          .from('groups')
          .select()
          .eq('inviteCode', inviteCode)
          .single()
        groupId = group.id
      }

      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          groupId,
          userId: data.user.id,
        })
      console.log('memberError', memberError)
      if (memberError) throw memberError
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      console.log(error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    } 
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={() => setIsCreateGroup(true)}
              >
                グループ作成
              </Button>

              <Button
                type="button"
                onClick={() => setIsCreateGroup(false)}
              >
                招待コードで参加
              </Button>
              {isCreateGroup ? (
                <div className="grid gap-2">
                  <Label htmlFor="group-name">グループ名</Label>
                  <Input
                    id="group-name"
                    type="text"
                    required
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="group-name">招待コード</Label>
                  <Input
                    id="invite-code"
                    type="text"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">パスワード</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">パスワード再入力</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating an account...' : 'Sign up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}