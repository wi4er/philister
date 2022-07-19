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

    load(id, onResolve) {
        return new Promise(resolve => {
            if (this.list.has(id)) {
                this.list.get(id).push(resolve);
            } else {
                this.list.set(id, [resolve]);
            }

            setTimeout(() => {
                if (!this.list.size) return;

                Array.from(this.list.keys());

                onResolve(Array.from(this.list.keys()))
                    .then(list => this.resolve(list));
            }, 20);
        })
    }
}