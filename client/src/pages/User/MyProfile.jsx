import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const MyProfile = () => {
  const { user, loading } = useContext(UserContext);

  console.log(user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleChangePassword = async () => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match.");
    return;
  }

  try {
    setIsSubmitting(true);

    const response = await axiosInstance.post(
      API_PATHS.AUTH.CHANGE_PASSWORD,
      {
        oldPassword,
        newPassword,
      }
    );

    alert(response.data.message || "Password changed successfully.");

    // Clear inputs
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error(error);
    const message =
      error?.response?.data?.message || "Failed to change password.";
    alert(message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <DashboardLayout activeMenu="My Profile">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">My Profile</h2>
            </div>

            <div className="mt-2">
              <label className="text-xs font-medium text-slate-600">
                Full Name
              </label>

              <input className="form-input" value={user?.name} />
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Email
              </label>
              <input className="form-input" value={user?.email} />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Change Password
                </label>

                <input
                  placeholder="Old Password"
                  className="form-input"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="new Password"
                  className="form-input"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="new Password"
                  className="form-input"
                />
              </div>
            </div>
            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleChangePassword}
               disabled={loading || isSubmitting}
              >
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
            </div>
            <div className="flex justify-end mt-7"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProfile;
