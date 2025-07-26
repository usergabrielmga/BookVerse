export default interface BookItem {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    description?: string | { value: string };
}

