import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getWishList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const wishList = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return res.status(200).json({
      success: true,
      userId,
      count: wishList.length,
      items: wishList.map((item) => ({
        id: item.id,
        productId: item.productId,
        createdAt: item.createdAt,
        product: item.product,
      })),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    const productExistInWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (productExistInWishlist) {
      return res
        .status(400)
        .json({ message: "Product already exist in wishlist" });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
      include: {
        product: true,
      },
    });

    return res.status(201).json({
      message: "Product added to wishlist successfully",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteFromWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    const productExistInWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!productExistInWishlist) {
      return res
        .status(400)
        .json({ message: "Product already doesn't exist in wishlist" });
    }

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return res.status(201).json({
      message: "Product deleted from wishlist successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
