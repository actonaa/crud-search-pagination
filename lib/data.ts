import { Contact } from "@prisma/client";
import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            phone: { contains: query, mode: "insensitive" },
          },
        ],
      },
    });
    return contacts;
  } catch (error) {
    console.error("Failed to fetch contacts data", error);
  }
};

export const getContactById = async (id: string): Promise<Contact | null> => {
  try {
    if (!id) return null;
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    console.error("Failed to fetch contacts data", error);
    throw error;
  }
};

export const getContactPages = async (query: string) => {
  try {
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            phone: { contains: query, mode: "insensitive" },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Failed to fetch contacts data", error);
  }
};
