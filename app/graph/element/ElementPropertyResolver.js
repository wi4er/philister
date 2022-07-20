module.exports = function ElementPropertyResolver(item) {
    return {
        value: item.value,
        PropertyId: item.PropertyId,
        createdAt: () => item.createdAt.toISOString(),
        updatedAt: () => item.updatedAt.toISOString(),
    };
}