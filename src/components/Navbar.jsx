import React, { useEffect } from 'react'

const Navbar = () => {
    const handleHomeClick = (e) => {
        e.preventDefault();
        window.location.reload();
      };
    
    return (
        <div>
            <nav className='flex bg-green-950 text-white py-5 justify-between'>
                <div className="logo font-bold mx-10 ">E-Task</div>
                <ul className='flex gap-5 mx-10  '><li className='cursor-pointer hover:font-bold'><a href="/" onClick={handleHomeClick}>Home</a></li>
                    <li className='cursor-pointer hover:font-bold'>Your Task</li></ul>


            </nav>
        </div>
    )
}

export default Navbar
