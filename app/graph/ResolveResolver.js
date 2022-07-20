module.exports = class ResolveResolver {
    list = new Map();

    resolve(list) {
        for (const [key, value] of this.list) {
            for (const item of value) {
                item(list[key]);
            }
        }

        this.list.clear();
    }

    tick(onResolve) {
        if (!this.list.size) return;

        const oldList = this.list;
        this.list = new Map();

        onResolve(Array.from(oldList.keys()))
            .then(list => {
                for (const [key, value] of oldList) {
                    for (const item of value) {
                        item(list[key]);
                    }
                }
            });
    }

    load(id, onResolve) {
        return new Promise(resolve => {
            if (this.list.has(id)) {
                this.list.get(id).push(resolve);
            } else {
                this.list.set(id, [resolve]);
            }

            setTimeout(
                () => {
                    this.tick(onResolve);
                },
                10
            );
        });
    }
}