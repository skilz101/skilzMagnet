"use client"
import {Button} from "@/components/ui/button"

export default function NavBar(){
    return(
        <nav className="flex justify-between fixed items-center top-0 px-6 py-3 left-0 z-50 w-full backdrop-blur-md bg-background/50 shadow-sm">
            <Button>Login</Button>
        </nav>
    )
}