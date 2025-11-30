import { queryOptions } from '@tanstack/react-query';
import {
    getAllGlobalProcedures,
    getMyProcedures, getMySalons,
    getSalonStaffProcedures,
    getStaffAppointments,
    getStaffAvailability, // YENİ IMPORT
    getUserById,
    getUsers,
    getUsersByOrganisation
} from "@/modules/users/server/procedures";

// ----------------------------------------------------------------------
// 1. Query Key Factory
// ----------------------------------------------------------------------
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    byOrganisation: (organisationId: string) => [...userKeys.lists(), 'by-organisation', organisationId] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
    staffProcedures: (salonId: string) => [...userKeys.all, 'staff-procedures', salonId] as const,
    staffAppointments: (date?: string) => [...userKeys.all, 'staff-appointments', date ?? 'all'] as const,

    // YENİ: Staff Availability için key
    staffAvailability: (salonId: string, staffId: string, startDate: string, endDate: string) =>
        [...userKeys.all, 'availability', salonId, staffId, startDate, endDate] as const,

    mySalons: () => [...userKeys.all, 'my-salons'] as const,
    myProcedures: () => [...userKeys.all, 'my-procedures'] as const,
    globalProcedures: () => ['procedures', 'list'] as const,

    creates: () => [...userKeys.all, 'create'] as const,
    updates: () => [...userKeys.all, 'update'] as const,
    assigns: () => [...userKeys.all, 'assign'] as const,
    authorizations: () => [...userKeys.all, 'authorize'] as const,
};

// ----------------------------------------------------------------------
// 2. Query Options Factory
// ----------------------------------------------------------------------
export const userQueries = {
    // ... existing queries ...
    list: () => queryOptions({
        queryKey: userKeys.lists(),
        queryFn: getUsers,
    }),
    listByOrganisation: (organisationId: string) => queryOptions({
        queryKey: userKeys.byOrganisation(organisationId),
        queryFn: () => getUsersByOrganisation(organisationId),
    }),
    detail: (id: string) => queryOptions({
        queryKey: userKeys.detail(id),
        queryFn: () => getUserById(id),
    }),
    listStaffProcedures: (salonId: string) => queryOptions({
        queryKey: userKeys.staffProcedures(salonId),
        queryFn: () => getSalonStaffProcedures(salonId),
    }),
    listStaffAppointments: (date?: string) => queryOptions({
        queryKey: userKeys.staffAppointments(date),
        queryFn: () => getStaffAppointments(date),
    }),

    // YENİ: Staff Availability Query Option
    listStaffAvailability: (salonId: string, staffId: string, startDate: string, endDate: string) => queryOptions({
        queryKey: userKeys.staffAvailability(salonId, staffId, startDate, endDate),
        queryFn: () => getStaffAvailability(salonId, staffId, startDate, endDate),
        enabled: !!salonId && !!staffId && !!startDate && !!endDate,
    }),

    listMySalons: () => queryOptions({
        queryKey: userKeys.mySalons(),
        queryFn: getMySalons,
    }),
    listMyProcedures: () => queryOptions({
        queryKey: userKeys.myProcedures(),
        queryFn: getMyProcedures,
    }),
    listGlobalProcedures: () => queryOptions({
        queryKey: userKeys.globalProcedures(),
        queryFn: getAllGlobalProcedures,
    }),
};