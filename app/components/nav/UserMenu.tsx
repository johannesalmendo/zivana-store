'use client'

import { useCallback, useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps{
    currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return ( 
    <>
        <div className="relative z-30">
            <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center rounded-full cursor-pointer hover:shadow-sm hover:shadow-white transition text-white">
                <Avatar src={currentUser?.image}/>
                <IoCaretDown />
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-sm w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer text-black">
                    {currentUser ? <div>
                        <Link href="/orders">
                            <MenuItem onClick={toggleOpen}>
                                Orderan Saya
                            </MenuItem>
                        </Link>
                        <Link href="/admin">
                            <MenuItem onClick={toggleOpen}>
                                Admin Dashboard
                            </MenuItem>
                        </Link>
                        <hr/>
                        <MenuItem onClick={() => {
                            toggleOpen();
                            signOut()
                        }}>Keluar
                        </MenuItem>
                    </div> : 
                    <div className="">
                    <Link href="/login">
                        <MenuItem onClick={toggleOpen}>
                            Masuk Akun
                        </MenuItem>
                    </Link>
                    <Link href="/register">
                        <MenuItem onClick={toggleOpen}>
                            Daftar Akun
                        </MenuItem>
                    </Link>
                    </div>
                    }
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/>  : null }
    </>
    );
}
 
export default UserMenu;