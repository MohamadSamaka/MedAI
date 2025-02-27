export function generateRolesOptions(rolesList) {
    return rolesList.map(({_id, roleName}) => {
        return `<option id="${_id}" value="${_id}">${roleName}</option>`
    }).join("")
}