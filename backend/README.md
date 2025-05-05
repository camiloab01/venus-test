# Venus - Backend Technical Test

## Introduction

The exercise consists in building a simple API to fetch data from the given DB. This API will then be consumed by the UI in the next half of the challenge.

## Resources

The database is seeded with data, the table is called `market` and it contains a number of rows. All the environment variables needed are set in the `docker-compose.yml` file, so the DB should be easily reachable.

Please take a look at the `db/init.sql` file to know the structure of the `market` table. Existing records are also listed there.

You are free to use any library/ORM of your choice to retrieve data from the DB, or to use the preexisting mysql2 package setup included.

## Exercise

Your goal is to implement a `tvl` endpoint. TVL stands for "total value locked", it corresponds to the total sum of market supplies, calculated using the `total_supply_cents` column from each market. You will need to observe good coding and API design practices. The major requirements for this endpoint are:

1) it should be able to calculate the sum of the total supply of all `market` records from the DB
2) the response should be JSON formatted, with the following structure:

```json
{
    marketTvl: <sum from DB records>
}
```

You can also get some extra points by implementing:
- Automated testing of your endpoint
- Allowing the market records to be filtered by the `chain_id`
- Validating the endpoint input
