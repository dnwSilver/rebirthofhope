"use server";

import { savior } from "@/db";
import mongoose from "mongoose";
import SaviorCards from "@/components/savior-cards";
import Greeting from "@/components/greeting";
import ProfileInfo from "@/components/profile-info";

const Home = async () => {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB);
  } else {
    throw new Error("Environment variable DB not found.");
  }

  const saviors = await savior.find().exec();

  return (
    <main
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        marginLeft: "2%",
        marginRight: "2%",
        display: "grid",
        gridTemplateColumns: "400px auto 400px",
      }}
    >
      <SaviorCards saviors={saviors} />
      <ProfileInfo />
      <Greeting />
    </main>
  );
};

export default Home;
