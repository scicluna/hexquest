
//All logic related to routing towards map select or payment
//Get userid from clerk -> check if it exists in our db. if not, add it. -> check user profile for credits. -> no credits or api key?
//redirect towards payment options -> otherwise, redirect to map list

import { createUser } from "@/utils/usercrud/createUser";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    const hexQuestUser: HexUser = await createUser();

    if (hexQuestUser.credits < 20) {
      redirect(`/payment/${hexQuestUser._id}`)
    } else {
      redirect(`/worlds/${hexQuestUser._id}`)
    }
  }

  redirect('/sign-in')
}
