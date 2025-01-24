"use server"

import { slugPageData } from "@/app/[slug]/page";
import { prisma } from "@/lib/prisma";
import { Template, Theme } from "@prisma/client";

export async function getDetailsBySlug(slug: string){
    try{
        const user = await prisma.user.findUnique({
            where:{
                slug,
            },
            include:{
                company: true
            }
        })
        if(!user) throw new Error("not an existing user")
        const company = await prisma.company.findUnique({
            where:{
                companyId: user.id
            },
            include:{
                fields: true
            }
    })

        if(!company){
            throw new Error("this user has no company")
        }

        const returnData: slugPageData ={
            name: company.fields[0].name,
            email: company.fields[0].email,
            phoneNumber: company.fields[0].phoneNumber,
            logo: company.logo as string,
            title: company.title as string,
            template: company.template as Template,
            theme: company.theme as Theme,
            subTitle: company.subTitle as string,
            companyName: company.companyName,
            id: company.companyId
        }

        return returnData
    } catch(error){

    } finally{

    }
}