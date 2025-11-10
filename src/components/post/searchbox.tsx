'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect, use } from 'react'
import {useRouter} from 'next/navigation'

export default function SearchBox() {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const router = useRouter()

    // デバウンス
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setDebouncedSearch(search)
      }, 500)

     return () => clearTimeout(timer)

    }, [search])

    // debouncedSearchが更新されたら
    useEffect(()=>{
      if(debouncedSearch.trim()){
        router.push(`/?search=${debouncedSearch.trim()}`)
      } else {
        router.push('/')
      }

    }, [debouncedSearch, router])
    
  return (
    <>
    <input 
          placeholder="記事を検索..."
          className="w-[200px] lg:w-[300px] bg-white mr-2"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}

        />
        </>
  )
}
