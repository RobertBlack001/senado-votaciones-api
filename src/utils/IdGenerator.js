class IdGenerator {

    static next(collection) {

        if (collection.length === 0) {

            return 1;

        }

        return Math.max(
            ...collection.map(item => item.id)
        ) + 1;

    }

}

export default IdGenerator;