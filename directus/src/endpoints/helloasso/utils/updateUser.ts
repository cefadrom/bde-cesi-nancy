import type { Membership, User } from '@bde-cesi-nancy/types';

export async function updateUser(userService: any, user: User, membership: Membership) {

    // Don't downgrade a user
    const membership_status = membership.order_form.toLowerCase().includes('cotis')
    || user.membership_status === 'cotisant'
        ? 'cotisant'
        : 'adherent';

    await userService.updateOne(
        user.id,
        {
            membership: membership.id,
            membership_status,
        },
    );

    // Return true if the membership of the user has been upgraded (aucun -> adhérent or adhérent -> cotisant)
    return {
        userUpgraded: (user.membership_status === 'aucun' && membership_status === 'adherent')
            || (user.membership_status === 'adherent' && membership_status === 'cotisant'),
    };
}
