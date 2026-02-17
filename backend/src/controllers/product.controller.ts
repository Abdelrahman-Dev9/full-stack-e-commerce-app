import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) {
      return res.status(401).json({ message: "this category not found" });
    }
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        discount: true,
        category: {
          select: {
            name: true,
            icon: true,
            gradientFrom: true,
            gradientTo: true,
            image: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "Categories fetched successfully", products });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        gradientFrom: true,
        gradientTo: true,
        image: true,
      },
    });
    res
      .status(200)
      .json({ message: "Categories fetched successfully", categories });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, icon, gradientFrom, gradientTo, image } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        icon,
        gradientFrom,
        gradientTo,
        image,
      },
    });

    res.status(200).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, discount, categoryId } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
        discount,
        categoryId,
      },
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
