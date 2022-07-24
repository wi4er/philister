
module.exports = class ResolveResolver {
    list = new Map();

    addToList(id, queryKey, resolve) {
        if (this.list.has(queryKey)) {
            if (this.list.get(queryKey).get(id)) {
                this.list.get(queryKey).get(id).push(resolve);
            } else {
                this.list.get(queryKey).set(id, [resolve]);
            }
        } else {
            this.list.set(queryKey, new Map([[id, [resolve]]]));
        }
    }

    resolveList() {

    }

    load(id, query, onResolve) {
        return new Promise(resolve => {
            this.addToList(id,  JSON.stringify(query), resolve);

            setTimeout(
                () => {
                    if (!this.list.size) return;

                    const oldList = this.list;
                    this.list = new Map();

                    for (const [qKey, qValue] of oldList) {
                        onResolve(Array.from(qValue.keys()), JSON.parse(qKey))
                            .then(list => {
                                for (const [key, value] of qValue) {
                                    for (const item of value) {
                                        item(list[key]);
                                    }
                                }
                            });
                    }
                },
                10
            );
        });
    }
}