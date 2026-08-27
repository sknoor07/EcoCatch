import { SettingsForm } from "./_components/settings-form";


export const metadata = {
  title: "Settings — EcoCatch Admin",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5]">
          Settings
        </h1>
        <p className="text-sm text-[#86868b]">Manage your profile and security.</p>
      </div>
      <SettingsForm />
    </div>
  );
}