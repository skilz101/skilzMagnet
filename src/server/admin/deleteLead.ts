"use server"

import { prisma } from "@/lib/prisma"

export async function deleteLead(id:string){  
    try{
        const deleteLead = await prisma.leads.delete({
            where:{
                id,
            }
        })
        return deleteLead
    } catch(error){
        throw new Error(`${error}`)
    } finally{
        await prisma.$disconnect()
    }
}