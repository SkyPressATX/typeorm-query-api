# SkyPress TypeORM Query API

Map URL Query Parameters to [TypeORM Find Options](https://typeorm.io/find-options).

## Basic Query Params to Find Options

| Query Param | Type                   | Find Option   | Example                                 |
| ----------- | ---------------------- | ------------- | --------------------------------------- |
| `select`    | Comma Separated String | `select`      | `/authors?select=id,firstName,lastName` |
| `load`      | Comma Separated String | `relations`   | `/authors?load=books`                   |
| `sort`      | String                 | `order`       | `/authors?sort=age`                     |
| `desc`      | Boolean                | `order`       | `/authors?sort=age&desc=true`           |
| `skip`      | Number                 | `skip`        | `/authors?skip=10`                      |
| `limit`     | Number                 | `take`        | `/authors?limit=10&skip=20`             |
| `deleted`   | Boolean                | `withDeleted` | `/authors?deleted=true`                 |
| Entity Key  | Any                    | `where`       | `/authors?firstName=Mark&lastName=Ross` |

## Advanced Query Parameters

More sophisticated "where" queries can be made by providing the following Keys paired with the `::` delimiter.

| Key   | Operator          | Example                      |
| ----- | ----------------- | ---------------------------- |
| `gt`  | `MoreThan`        | `/authors?age=gt::30`        |
| `gte` | `MoreThanOrEqual` | `/authors?age=gte::30`       |
| `lt`  | `LessThan`        | `/authors?age=lt::30`        |
| `lte` | `LessThanOrEqual` | `/authors?age=lte::30`       |
| `ne`  | `Not`             | `/authors?firstName=ne::Bob` |
