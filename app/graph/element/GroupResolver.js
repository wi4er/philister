module.exports = function GroupResolver(item) {
    return {
        id: item.id,
        slug: item.slug,
        createdAt: () => item.createdAt.toISOString(),
        updatedAt: () => item.updatedAt.toISOString(),
    };
}

