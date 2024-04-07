"use client"

import { signOut } from 'next-auth/react'
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'

const SignOut = () =>{
    const router = useRouter()
    return (
  
         <Button onClick={() => {
            signOut({ callbackUrl: '/' });  
            }}>
           SignOut
          </Button>   
    )
  }

export default SignOut