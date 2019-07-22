export type program = {
    name: string, 
    createdAt: string, 
    provider: string, 
    programLogo: string, 
    likeCount: number, 
    commentCount: number, 
    comments?: comment[],
    programId?: string
}

export type comment = {
    body: string, 
    createdAt: string, 
    programId: string, 
    userHandle: string, 
    userImage: string, 
    commentId?: string
}

export type like = {
    userHandle: string, 
    programId: string, 
    likeId?: string
}

export type notification = {
    recipient: string, 
    sender: string, 
    createdAt: string, 
    programId: string, 
    type: 'like' | 'comment', 
    read: boolean, 
    notificationId?: string
}

export type programLogo = {
    filepath: string, 
    mimetype: string
}