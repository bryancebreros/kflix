import groupsData from "../data/groups.json"
export const getGroups = () => {
    const data = groupsData
    console.log({data: data.groups});
    return data?.groups.map((group) => {
        const id = group.id
        console.log({group});
        return {
            id,
            imgUrl: `/static/imgGroups/${group.id}.webp`,
        }
    })
}
export const getMembers = (groupId) => {
    const data = groupsData
    console.log({groupId});
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