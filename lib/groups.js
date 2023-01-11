import groupsData from "../data/groups.json"
export const getGroups = () => {
    const data = groupsData
    return data?.groups.map((group) => {
        const id = group.id
        return {
            id,
            imgUrl: `/static/imgGroups/${group.id}.webp`,
        }
    })
}
export const getMembers = (groupId) => {
    const data = groupsData
    const membersData = data?.groupMembers[groupId]
    
    if (membersData) {
        return membersData?.map((member) => {
            return {
                id: member.id,
                imgUrl: `/static/members/${member.id}.webp`,
            }
    
        })
    }
    return null
    
}