module.exports = function ElementResolver(item) {
    return {
        id: item.id,
        slug: item.slug,
        createdAt: () => item.createdAt.toISOString(),
        updatedAt: () => item.updatedAt.toISOString(),
        property: (filter) => require("./resolveElementProperty")(item.id, filter),
        parent: () => require("./resolveElement")(item.parent),
        children: () => require("./resolveElementChildren")(item.id),
        group: () => require("./resolveElementGroup")(item.id),
    };
}
