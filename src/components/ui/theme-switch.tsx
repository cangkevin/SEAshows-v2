'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Switch } from '~/components/ui/switch'

const ThemeSwitch = () => {
  // NOTE https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const ThemeIcon = theme === 'light' ? Sun : Moon

  return (
    <div className='space-x-2'>
      <Switch
        id='dark-mode'
        className='align-middle'
        checked={theme === 'dark'}
        onCheckedChange={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
      />
      <ThemeIcon className='inline' />
      <span className='sr-only'>Toggle theme</span>
    </div>
  )
}

export default ThemeSwitch
