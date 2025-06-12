import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price: BigInt(price),
        address,
        country,
        city,
        facilities,
        image,
        //owner: { connect: { email: userEmail } },
        createdAt: new Date(),
        updatedAt: new Date(),
        userEmail,
      },
    });

    const residencyForResponse = {
      ...residency,
      price: residency.price.toString(),
    };

    res.send({ message: "Residency created successfully", residency: residencyForResponse });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const residenciesForResponse = residencies.map(r => ({
    ...r,
    price: r.price.toString(),
  }));

  res.send(residenciesForResponse);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    const residencyForResponse = {
      ...residency,
      price: residency.price.toString(),
    };
    res.send(residencyForResponse);
  } catch (err) {
    throw new Error(err.message);
  }
});
