import type { CesiAccount, UnauthorizedLogin, User } from '@bde-cesi-nancy/types';
import type { ActionHandler, FilterHandler } from '@directus/shared/src/types/events';
import type { HookConfig } from '@types';
import { v4 as uuid } from 'uuid';


export default (({ filter, action }, { database, exceptions }) => {

    filter('users.create', (async (payload: IUserCreateInput) => {

        if (payload.provider !== 'microsoft')
            return;

        const CESIUser = await database<CesiAccount>('cesi_accounts')
            .select('email')
            .where({ email: payload.email })
            .first();

        if (CESIUser)
            return;

        await database<UnauthorizedLogin>('unauthorized_logins').insert({
            id: uuid(),
            date_created: new Date(),
            email: payload.email,
            name: `${payload.last_name} ${payload.first_name}`,
        });

        throw new exceptions.ForbiddenException(`User with email ${payload.email} is not a CESI user`);

    }) as FilterHandler);


    action('users.create', (async (meta, { database }) => {

        const CESIUser = await database<CesiAccount>('cesi_accounts')
            .select('promotion')
            .where({ email: meta.payload.email })
            .first();

        if (!CESIUser)
            return;

        await database<User>('directus_users')
            .where({ id: meta.key })
            .update({ promotion: CESIUser.promotion });

    }) as ActionHandler);

}) as HookConfig;


interface IUserCreateInput {
    provider: string,
    first_name: string,
    last_name: string,
    email: string,
    external_identifier: string,
    role: string,
    auth_data: any,
    promotion: string,
}
