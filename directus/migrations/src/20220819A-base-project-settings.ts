import type { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex('directus_settings').insert({
        'id': 1,
        'project_name': 'BDE CESI Nancy',
        'project_url': 'https://bdecesinancy.fr/',
        'project_color': '#0A33FF',
        'auth_login_attempts': 5,
        'auth_password_policy': '/^.{8,}$/',
        'custom_css': '#app, #main-content, body {\n--primary-alt: #ebedff !important;\n--primary-10: #ebedff !important;\n--primary-25: #99aaff !important;\n--primary-50: #758cff !important;\n--primary-75: #526eff !important;\n--primary-90: #2e51ff !important;\n--primary: #0a33ff !important;\n--primary-110: #415dec !important;\n--primary-125: #3f57cf !important;\n--primary-150: #3748a0 !important;\n--primary-175: #2a366f !important;\n--primary-190: #1e2752 !important;\n--v-button-background-color: #4262ff !important;\n--v-button-background-color-hover: #415dec !important;\n--sidebar-detail-color-active: #415dec !important;\n}',
        'project_descriptor': 'Le CMS du BDE de CESI Nancy',
        'default_language': 'fr-FR',
    });
}

export async function down(knex: Knex) {
    return knex('directus_settings').where('id', 1).del();
}
