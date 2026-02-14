import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getCartProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    if (!products) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    return res.status(200).json({
      success: true,
      userId,
      count: products.length,
      items: products.map((item) => ({
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
export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    const productExistInCart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (productExistInCart) {
      return res.status(404).json({ message: "Product already in cart" });
    }

    const cart = await prisma.cart.create({
      data: {
        userId,
        productId,
      },
    });

    return res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const removeProductFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    const productExistInCart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!productExistInCart) {
      return res.status(404).json({ message: "Product doesn't exist in cart" });
    }

    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return res.status(201).json({ message: "Product deleted from cart" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
