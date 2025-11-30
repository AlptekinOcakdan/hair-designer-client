
import {procedureKeys, procedureQueries} from "@/modules/procedures/server/queries";
import {salonKeys, salonQueries} from "@/modules/salons/server/queries";
import {userKeys, userQueries} from "@/modules/users/server/queries";

export const api = {
    procedures: procedureQueries,
    salons: salonQueries,
    users: userQueries,
};

// 2. Key'ler için Global Obje (Cache Temizleme / Invalidation)
export const queryKeys = {
    procedures: procedureKeys,
    salons: salonKeys,
    users: userKeys,
};