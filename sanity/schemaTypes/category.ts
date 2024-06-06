export default {
    name: 'category',
    type: 'document',
    title: 'Blog Category',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Category Title'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'title'
            }
        },
        {
            name: 'description',
            type: 'text',
            title: 'Category Description'
        }
    ]
}
