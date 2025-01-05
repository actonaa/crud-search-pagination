import UpdateFrom from "@/components/edit-form";
import { getContactById } from "@/lib/data";
import { notFound } from "next/navigation";

interface UpdateContactPageProps {
  params: Promise<{
    id: string;
  }>;
}

const UpdateContactPage = async ({ params }: UpdateContactPageProps) => {
  const { id } = await params;
  const contact = await getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateFrom contact={contact} />
    </div>
  );
};

export default UpdateContactPage;
