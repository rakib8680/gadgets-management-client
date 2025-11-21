import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GM_Form from "@/components/form/GM_Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordValidationSchema } from "@/utils/formValidation";
import GM_Input from "@/components/form/GM_Input";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ArrowLeft, Lock } from "lucide-react";

export default function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();

    const handleChangePassword = async (
        data: FieldValues,
        methods: UseFormReturn<any>
    ) => {
        const toastId = toast.loading("Changing password...", { position: "top-center" });

        try {
            const res = await changePassword(data).unwrap();

            if (res.success) {
                toast.success("Password changed successfully", {
                    id: toastId,
                    position: "top-center",
                    duration: 2000,
                });
                methods.reset();
                navigate("/settings");
            }
        } catch (error: any) {
            toast.error(error.data?.errorMessage || "Failed to change password", {
                id: toastId,
                position: "top-center",
                duration: 2000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white px-8 py-10 rounded-xl shadow-md dark:bg-zinc-900">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/settings")}
                    className="mb-6 gap-2 pl-0 hover:bg-transparent hover:text-primary cursor-pointer"
                >
                    <ArrowLeft className="size-4" />
                    Back to Settings
                </Button>

                <div className="mb-8 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="size-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                        Change Password
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                        Enter your current password and a new password to update your account security.
                    </p>
                </div>

                <GM_Form
                    onSubmit={handleChangePassword}
                    resolver={zodResolver(changePasswordValidationSchema)}
                    defaultValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    className="space-y-6"
                >
                    {/* Current Password */}
                    <LabelInputContainer className="relative">
                        <GM_Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Current password"
                            name="currentPassword"
                            label="Current Password"
                            disabled={isLoading}
                            required={true}
                        />
                        <div
                            onClick={() => !isLoading && setShowCurrentPassword(!showCurrentPassword)}
                            className={cn(
                                "absolute right-3 top-9 text-gray-500",
                                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            )}
                        >
                            {showCurrentPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </LabelInputContainer>

                    {/* New Password */}
                    <LabelInputContainer className="relative">
                        <GM_Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New password"
                            name="newPassword"
                            label="New Password"
                            disabled={isLoading}
                            required={true}
                        />
                        <div
                            onClick={() => !isLoading && setShowNewPassword(!showNewPassword)}
                            className={cn(
                                "absolute right-3 top-9 text-gray-500",
                                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            )}
                        >
                            {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </LabelInputContainer>

                    {/* Confirm Password */}
                    <LabelInputContainer className="relative">
                        <GM_Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            label="Confirm New Password"
                            disabled={isLoading}
                            required={true}
                        />
                        <div
                            onClick={() => !isLoading && setShowConfirmPassword(!showConfirmPassword)}
                            className={cn(
                                "absolute right-3 top-9 text-gray-500",
                                isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            )}
                        >
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </LabelInputContainer>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "relative w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-700 text-white font-medium transition mt-4",
                            isLoading
                                ? "cursor-not-allowed opacity-70"
                                : "cursor-pointer hover:opacity-90"
                        )}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Updating...</span>
                            </div>
                        ) : (
                            <>Update Password</>
                        )}
                    </Button>
                </GM_Form>
            </div>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
