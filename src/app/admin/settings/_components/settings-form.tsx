"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/db/api-client";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, User, Lock, Mail, Save } from "lucide-react";
import { toast } from "sonner";

export function SettingsForm() {
  const [user, setUser] = useState<{ id: number; name: string | null; email: string; avatar: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.get("/admin/me")
      .then((res) => {
        const u = res.data.user;
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
        setAvatar(u.avatar);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setAvatarFile(file);

    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);


  };


  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);

    try {
      let avatarUrl = avatar;

      // Upload new avatar first
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const uploadRes = await api.post(
          "/admin/me/avatar",
          formData
        );

        avatarUrl = uploadRes.data.avatar;

        setAvatar(avatarUrl);
        setAvatarFile(null);
      }

      // Update profile information
      const res = await api.patch("/admin/me", {
        name,
        email,
        avatar: avatarUrl,
      });

      setUser(res.data.user);

      toast.success("Profile updated");
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.error || "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      await api.patch("/admin/me", { oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Password change failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#86868b]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
          Profile Information
        </h2>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-[#E8F4E8] dark:border-[#1a3d2a]" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2D5A3D] dark:bg-[#4ADE80] text-2xl font-bold text-white dark:text-[#0A0A0A]">
                  {name?.[0] || email?.[0] || "A"}
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-[#0A0A0A] shadow-md hover:scale-110 transition-transform"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">Profile Photo</p>
              <p className="text-xs text-[#86868b]">JPG, PNG. Max 2MB.</p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              <User className="h-4 w-4 text-[#86868b]" />
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              <Mail className="h-4 w-4 text-[#86868b]" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="rounded-full bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-semibold px-6"
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Profile
          </Button>
        </div>
      </div>

      {/* Password Card */}
      <div className="rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">
          Change Password
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">
              <Lock className="h-4 w-4 text-[#86868b]" />
              Current Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#FAF9F6] dark:bg-[#111] px-4 py-3 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] outline-none focus:border-[#2D5A3D] dark:focus:border-[#4ADE80] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={saving}
            variant="outline"
            className="rounded-full border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 font-semibold px-6"
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}