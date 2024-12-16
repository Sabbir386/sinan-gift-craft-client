import { baseApi } from "../redux/api/baseApi";

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Forget Password API
        forgetPassword: builder.mutation({
            query: ({ email }) => {
                // Directly construct the body with the email field
                const body = { email }; 
                console.log("Request body:", body); // This should log { email: "example@gmail.com" }
                return {
                    url: "/auth/forget-password",
                    method: "POST",
                    body, // Send the properly structured body
                };
            },
        }),

        // Reset Password API
        resetPassword: builder.mutation({
            query: ({ token, email, newPassword }) => {
                const body = { email, newPassword };
                console.log("Reset request body:", body);
                return {
                    url: `/auth/reset-password?token=${token}`, // Token is passed in query params
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

// Export hooks for components to call the APIs
export const { useForgetPasswordMutation, useResetPasswordMutation } = loginApi;
