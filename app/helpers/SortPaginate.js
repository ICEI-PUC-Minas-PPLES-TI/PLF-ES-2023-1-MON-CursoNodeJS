function sortPaginate(query, attributes, dataCount) {
    let paranoid = true;
    let whre = {};

    const limit =
        query.limit && Number.parseInt(query.limit) < 50
            ? Number.parseInt(query.limit)
            : 50;

    const page = query.page ? Number.parseInt(query.page) : 1;
    const pages = Math.ceil(dataCount / limit);

    const offset = limit * (page - 1);

    const attribute =
        query.attribute && attributes && attributes.includes(query.attribute)
            ? query.attribute
            : "id";

    const order = query.order === "DESC" ? "DESC" : "ASC";

    return {
        where: whre,
        limit: limit,
        offset: offset,
        order: [[attribute, order]],
        pages: pages,
        paranoid: paranoid,
    };
}

export default {
    sortPaginate,
};
