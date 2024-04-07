import {auth, signIn, signOut} from "../../auth";
import Link from "next/link";

export default async function Home() {
  const session =  await auth();

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {
      session?.user ? (
        <><div>{session.user.name}</div><SignOut /></>
      ):(
        <Link href="/login"><button>Sign In</button></Link>
      )
     }
    </main>
  );
}

const SignOut = () =>{
  return (
    <form action={async() => {
      "use server"
      await signOut()
    }}>

      <button type="submit"> Sign Out</button>

    </form>
  )
}



