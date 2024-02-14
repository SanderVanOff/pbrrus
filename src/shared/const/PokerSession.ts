export type PokerSession = {
    id: string,
    title: string,
    creationTime: string,
    stories?: any[],
    participants?: { id: string, teamName: string, username: string, isActive: boolean }[],
};