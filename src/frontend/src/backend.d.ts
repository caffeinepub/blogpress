import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    authorAvatar: string;
    date: Time;
    tags: Array<string>;
    author: string;
    imageUrl: string;
    viewCount: bigint;
    excerpt: string;
    commentCount: bigint;
    category: string;
}
export type Time = bigint;
export interface Category {
    id: string;
    postCount: bigint;
    name: string;
}
export interface backendInterface {
    getCategories(): Promise<Array<Category>>;
    getPost(id: string): Promise<BlogPost>;
    getPosts(page: bigint, pageSize: bigint, category: string | null, search: string | null, sortBy: string): Promise<{
        total: bigint;
        posts: Array<BlogPost>;
    }>;
    getRecentPosts(limit: bigint): Promise<Array<BlogPost>>;
    getTags(): Promise<Array<string>>;
    searchSuggestions(searchQuery: string): Promise<Array<string>>;
}
