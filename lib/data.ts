import { prisma } from "./prisma";

export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();
    return contacts;
  } catch (error) {
    console.error("Failed to fetch contacts data", error);
  }
};

export const getContactById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    console.error("Failed to fetch contacts data", error);
  }
};
