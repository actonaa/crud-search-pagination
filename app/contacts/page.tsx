import { CreateButton } from "@/components/button";
import ContactTable from "@/components/contact-table";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { TableSkeleton } from "@/components/skleton";
import { getContactPages } from "@/lib/data";
import { Suspense } from "react";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";
  const currentPage = Number(resolvedSearchParams?.page || 1);

  const totalPages = await getContactPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages ?? 0} />
      </div>
    </div>
  );
};

export default Contacts;
