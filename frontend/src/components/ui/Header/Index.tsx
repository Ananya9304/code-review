import React from 'react'

const Index = () => {
    const navlinks = [
        {
            name:"Home",
            href:"/"
        },
        {
            name:"Login",
            href:"/login"
        },
        {
            name:"Register",
            href:"/register"
        },{
            name:"Profile",
            href:"/profile"
        }
    ]
  return (
    <div className='flex justify-between '>
      <div>image</div>
      <div>
        {navlinks.map((link)=>(
            <a 
            key={link.name}
            href={link.href}
            className='px-6 py-2 '>{link.name}</a>
        ))}
      </div>
    </div>
  )
}

export default Index
