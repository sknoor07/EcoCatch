import { ContactsClient } from "./_components/contacts-client";


export const metadata = {
  title: "Contacts — EcoCatch Admin",
};

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5]">
          Contact Queries
        </h1>
        <p className="text-sm text-[#86868b]">Manage and respond to incoming messages.</p>
      </div>
      <ContactsClient />
    </div>
  );
}