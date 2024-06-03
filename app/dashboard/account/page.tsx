import React from 'react'
import { auth } from '@/auth'
import Image from 'next/image'

async function page() {
  const session = await auth()
  const ImageLink = session?.user?.image ?? "/account.png"

  console.log(ImageLink);
  

  return (
    <div> 
       <h3>{session?.user?.name}</h3> <br/>
       <h5> {session?.user?.email}</h5> <br/>
       <Image
            src={ImageLink}
            height={100}
            width={100}
            className="hidden md:block"
            alt="img"
          />
    </div>
  )
}

export default page