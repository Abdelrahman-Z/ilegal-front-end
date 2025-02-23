import { Template } from "@/types";
import { getToken } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SuperAdmin", "Tenants", "template"], // Define your tag types here
  endpoints: (builder) => ({
    // super admin
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/super-admin/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    // In your api file
    getAllEmployees: builder.query({
      query: ({ page = 1, limit = 5, name = "" }) => {
        const nameQuery = name ? `&name=${name}` : "";
        return `/super-admin?page=${page}&limit=${limit}${nameQuery}`;
      },
      providesTags: ["SuperAdmin"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/super-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    // auth endpoints
    login: builder.mutation({
      query: (newUser) => ({
        url: "/super-admin/auth/login",
        method: "POST",
        body: newUser,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/super-admin/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/super-admin/auth/verify-reset-token",
        method: "PATCH",
        body: otpData,
      }),
    }),
    resetPassord: builder.mutation({
      query: (data) => ({
        url: "/super-admin/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // tenants endpoints
    createTenant: builder.mutation({
      query: (formData) => ({
        url: "/tenants",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Tenants"],
    }),
    getAllTenants: builder.query({
      query: ({ page = 1, limit = 5, name = "" }) => {
        const nameQuery = name ? `&name=${name}` : "";
        return `/tenants/all/?page=${page}&limit=${limit}${nameQuery}`;
      },
      providesTags: ["Tenants"],
    }),
    updateTenant: builder.mutation({
      query: ({ id, name }) => ({
        url: `/tenants/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Tenants"], // Invalidate "Tenants" to refresh data
    }),
    deleteTenant: builder.mutation({
      query: (id) => ({
        url: `/tenants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tenants"],
    }),
    // templates endpoints
    addTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/pre-configured-template",
        method: "POST",
        body: templateData,
      }),
      invalidatesTags: ["template"],
    }),
    getTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/pre-configured-template/admin/all?page=${page}&limit=${limit}`,
      providesTags: ["template"],
    }),
    deleteTemplate: builder.mutation<void, string>({
      query: (templateId) => ({
        url: `/pre-configured-template/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["template"],
    }),
    getTemplateById: builder.query<Template, string>({
      query: (id) => `/pre-configured-template/admin/one/${id}`,
      providesTags: ["template"],
    }),
    updateTemplate: builder.mutation<Template, { id: string; attachmentFileUrl: string }>({
      query: ({ id, attachmentFileUrl }) => ({
        url: `/pre-configured-template/${id}`,
        method: "PATCH",
        body: { attachmentFileUrl },
      }),
      invalidatesTags: ["template"],
    }),
  }),
});

export const {
  // users
  useCreateUserMutation,
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  // employees
  useResetPassordMutation,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  // tenants
  useCreateTenantMutation,
  useGetAllTenantsQuery,
  useDeleteTenantMutation,
  useUpdateTenantMutation,
  // templates
  useAddTemplateMutation,
  useGetTemplatesQuery,
  useDeleteTemplateMutation,
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation
} = api;
