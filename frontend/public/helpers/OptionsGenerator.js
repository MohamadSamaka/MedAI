export function generateRolesOptions(rolesList) {
    return rolesList.map(({_id, roleName}) => {
        return `<option id="${_id}" value="${_id}">${roleName}</option>`
    }).join("")
}

export function generateExpertiseOptions(expertiesList) {
    return expertiesList.map(({_id, name}) => {
        return `<option id="${_id}" value="${_id}">${name}</option>`
    }).join("")
}