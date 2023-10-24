
//All logic related to routing towards map select or payment
//Get userid from clerk -> check if it exists in our db. if not, add it. -> check user profile for credits. -> no credits or api key?
//redirect towards payment options -> otherwise, redirect to map list

import { updateUserInformation } from "@/utils/updateUserInformation";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    const hexQuestUser: HexUser = await updateUserInformation();
    console.log(hexQuestUser)

    if (hexQuestUser.credits < 20) {
      redirect('/payment')
    } else {
      redirect('/worlds')
    }
  }

  redirect('/sign-in')
}
